import {Detail} from '@/components/store';
import {getProducts} from '@/lib/products';
import {notFound} from 'next/navigation';
export default async function Page({params}:{params:{slug:string}}){const products=await getProducts();const product=products.find(p=>p.slug===params.slug);if(!product)notFound();return <Detail product={product} products={products}/>}
