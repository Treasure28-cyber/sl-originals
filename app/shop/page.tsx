import {Shop} from '@/components/shop';
import {getProducts} from '@/lib/products';
import type {Metadata} from 'next';
export const metadata:Metadata={title:'Shop Nigerian Streetwear & Graphic Tees',description:'Shop original graphic T-shirts, tracksuits, caps and streetwear from SL ORIGINALS, a clothing brand rooted in Warri, Nigeria.',alternates:{canonical:'/shop'},openGraph:{title:'Shop Nigerian Streetwear & Graphic Tees | SL ORIGINALS',description:'Explore original graphic tees, tracksuits and streetwear rooted in Warri, Nigeria.',url:'/shop'}};
export default async function Page({searchParams}:{searchParams:{category?:string;sort?:string}}){
  return <Shop products={await getProducts()} category={searchParams.category} sort={searchParams.sort}/>;
}
