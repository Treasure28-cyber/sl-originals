import type {Metadata} from 'next';
import {Shell} from '@/components/shell';
import {PageMotion} from '@/components/page-motion';
import './globals.css';
const siteUrl=process.env.NEXT_PUBLIC_SITE_URL||'https://sl-originals-ruby.vercel.app';
export const metadata:Metadata={
 metadataBase:new URL(siteUrl),
 title:{default:'SL ORIGINALS | Nigerian Streetwear from Warri',template:'%s | SL ORIGINALS'},
 description:'Discover Nigerian streetwear from SL ORIGINALS, an independent clothing brand rooted in Warri. Shop graphic T-shirts, tracksuits, caps and original designs.',
 applicationName:'SL ORIGINALS',
 keywords:['Nigerian streetwear','streetwear brand in Nigeria','clothing brand in Warri','graphic T-shirts Nigeria','Nigerian fashion brand','tracksuits Nigeria','SL ORIGINALS'],
 alternates:{canonical:'/'},
 openGraph:{type:'website',locale:'en_NG',siteName:'SL ORIGINALS',title:'SL ORIGINALS | Nigerian Streetwear from Warri',description:'Shop original graphic tees, tracksuits and streetwear from SL ORIGINALS, an independent clothing brand rooted in Warri, Nigeria.',url:'/',images:[{url:'/products/logo.png',width:512,height:512,alt:'SL ORIGINALS brand logo'}]},
 twitter:{card:'summary',title:'SL ORIGINALS | Nigerian Streetwear from Warri',description:'Original graphic tees, tracksuits and streetwear rooted in Warri, Nigeria.',images:['/products/logo.png']},
 robots:{index:true,follow:true,googleBot:{index:true,follow:true,'max-image-preview':'large','max-snippet':-1,'max-video-preview':-1}},
};
const organizationJsonLd={
 '@context':'https://schema.org','@type':'Organization','name':'SL ORIGINALS','url':siteUrl,'logo':`${siteUrl}/products/logo.png`,
 'description':'Independent Nigerian streetwear and original clothing designs rooted in Warri, Delta State.',
 'areaServed':{'@type':'Country','name':'Nigeria'},
 'sameAs':['https://www.instagram.com/sl_originals001/','https://www.snapchat.com/add/SL_originals']
};
const websiteJsonLd={'@context':'https://schema.org','@type':'WebSite','name':'SL ORIGINALS','url':siteUrl,'inLanguage':'en-NG'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en-NG"><body><Shell>{children}</Shell><PageMotion/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify([organizationJsonLd,websiteJsonLd]).replace(/</g,'\\u003c')}}/></body></html>}
