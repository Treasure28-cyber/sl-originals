import {Detail} from '@/components/product-detail';
import {getProducts} from '@/lib/products';
import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
export async function generateMetadata({params}:{params:{slug:string}}):Promise<Metadata>{
 const product=(await getProducts()).find(item=>item.slug===params.slug);
 if(!product)return {title:'Product not found',robots:{index:false,follow:false}};
 const description=`Shop ${product.name} from SL ORIGINALS, an independent streetwear brand in Warri, Nigeria. View product details and contact us to confirm availability.`;
 const path=`/product/${product.slug}`;
 return {title:`${product.name} | Nigerian Streetwear`,description,alternates:{canonical:path},openGraph:{type:'website',title:`${product.name} | SL ORIGINALS`,description,url:path,images:[{url:product.mockup,alt:product.name}]},twitter:{card:'summary_large_image',title:`${product.name} | SL ORIGINALS`,description,images:[product.mockup]}};
}
export async function generateStaticParams(){return (await getProducts()).map(product=>({slug:product.slug}))}
export const revalidate=60;
export default async function Page({params}:{params:{slug:string}}){const products=await getProducts();const product=products.find(p=>p.slug===params.slug);if(!product)notFound();const siteUrl=process.env.NEXT_PUBLIC_SITE_URL||'https://sl-originals-ruby.vercel.app';const productJsonLd={'@context':'https://schema.org','@type':'Product','name':product.name,'description':`Original ${product.category.toLowerCase()} from SL ORIGINALS, a Nigerian streetwear brand rooted in Warri.`,'image':[product.mockup],'url':`${siteUrl}/product/${product.slug}`,'brand':{'@type':'Brand','name':'SL ORIGINALS'},'offers':{'@type':'Offer','url':`${siteUrl}/product/${product.slug}`,'priceCurrency':'NGN','price':product.price,'availability':product.status==='coming-soon'?'https://schema.org/OutOfStock':'https://schema.org/InStock'}};return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(productJsonLd).replace(/</g,'\\u003c')}}/><Detail product={product} products={products.filter(item=>item.id!==product.id).slice(0,4)}/></>}
