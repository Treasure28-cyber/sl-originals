import {Detail} from '@/components/product-detail';
import {getProducts} from '@/lib/products';
import {notFound} from 'next/navigation';
export async function generateStaticParams(){return (await getProducts()).map(product=>({slug:product.slug}))}
export const revalidate=60;
export default async function Page({params}:{params:{slug:string}}){const products=await getProducts();const product=products.find(p=>p.slug===params.slug);if(!product)notFound();return <Detail product={product} products={products.filter(item=>item.id!==product.id).slice(0,4)}/>}
