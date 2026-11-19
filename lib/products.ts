import {createClient} from '@sanity/client';
import {fallbackProducts, Product} from './data';
export async function getProducts():Promise<Product[]> {
 if(!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return fallbackProducts;
 const client=createClient({projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,dataset:process.env.NEXT_PUBLIC_SANITY_DATASET||'production',apiVersion:'2024-01-01',useCdn:false});
 return client.fetch(`*[_type == "product"]{"id":_id,"slug":slug.current,name,category,price,"mockup":mockup.asset->url,"finished":finished.asset->url,"front":front.asset->url,"back":back.asset->url,"gallery":gallery[].asset->url,colors,sizes,description,badge}`,{}, {next:{revalidate:60}});
}
