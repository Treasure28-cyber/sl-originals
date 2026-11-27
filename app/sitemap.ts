import type {MetadataRoute} from 'next';
import {getProducts} from '@/lib/products';

export default async function sitemap():Promise<MetadataRoute.Sitemap>{
 const siteUrl=process.env.NEXT_PUBLIC_SITE_URL||'https://sl-originals-ruby.vercel.app';
 const pages=['','/shop','/about','/contact','/custom-order','/lookbook'];
 const staticEntries:MetadataRoute.Sitemap=pages.map(path=>({url:`${siteUrl}${path}`,changeFrequency:path==='/shop'?'daily':'weekly',priority:path===''?1:path==='/shop'?0.9:0.6}));
 const products=await getProducts();
 const productEntries:MetadataRoute.Sitemap=products.filter(product=>product.status!=='coming-soon').map(product=>({url:`${siteUrl}/product/${product.slug}`,changeFrequency:'weekly',priority:0.7}));
 return [...staticEntries,...productEntries];
}
