import {NextResponse} from 'next/server';
import {createHash,randomUUID} from 'crypto';
import {mkdir,writeFile} from 'fs/promises';
import path from 'path';
import {createClient} from '@sanity/client';
import {validateCircleSignup} from '@/lib/newsletter';
export const runtime='nodejs';
export async function POST(request:Request){
 const origin=request.headers.get('origin');
 if(origin&&origin!==new URL(request.url).origin&&origin!==process.env.NEXT_PUBLIC_SITE_URL)return NextResponse.json({error:'Please submit from the SL ORIGINALS website.'},{status:403});
 if(Number(request.headers.get('content-length')||0)>4096)return NextResponse.json({error:'The form is too large.'},{status:413});
 let body;try{const text=await request.text();if(text.length>4096)return NextResponse.json({error:'The form is too large.'},{status:413});body=JSON.parse(text)}catch{return NextResponse.json({error:'Please submit a valid form.'},{status:400})}
 if(body&&typeof body==='object'&&body.website)return NextResponse.json({ok:true});
 let signup;try{signup=validateCircleSignup(body)}catch(error){return NextResponse.json({error:error instanceof Error?error.message:'Please review your details.'},{status:400})}
 const record={...signup,consentVersion:'circle-v1',consentedAt:new Date().toISOString(),source:'welcome-popup'};
 const id='circle.'+createHash('sha256').update(signup.email).digest('hex');
 try{
  if(process.env.SANITY_WRITE_TOKEN&&process.env.NEXT_PUBLIC_SANITY_PROJECT_ID&&process.env.SANITY_SUBSCRIBER_DATASET){
   const client=createClient({projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,dataset:process.env.SANITY_SUBSCRIBER_DATASET,apiVersion:'2024-01-01',useCdn:false,token:process.env.SANITY_WRITE_TOKEN});
   await client.createIfNotExists({_id:id,_type:'circleSubscriber',...record});
  }else if(process.env.NODE_ENV!=='production'){
   const directory=path.join(process.cwd(),'.data','circle');await mkdir(directory,{recursive:true});
   try{await writeFile(path.join(directory,id+'.json'),JSON.stringify(record,null,2),{flag:'wx',mode:0o600})}catch(error){if((error as NodeJS.ErrnoException).code!=='EEXIST')throw error}
  }else{return NextResponse.json({error:'The Circle is not open for signups yet. Please try again soon.'},{status:503})}
  return NextResponse.json({ok:true});
 }catch{console.error('Circle signup could not be saved',randomUUID());return NextResponse.json({error:'We could not save your signup. Please try again.'},{status:503})}
}
