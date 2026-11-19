import {Shop} from '@/components/shop';
import {getProducts} from '@/lib/products';
export default async function Page({searchParams}:{searchParams:{category?:string;sort?:string}}){
  return <Shop products={await getProducts()} category={searchParams.category} sort={searchParams.sort}/>;
}
