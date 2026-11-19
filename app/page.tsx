import {Home} from '@/components/store';
import {getProducts} from '@/lib/products';
export default async function Page(){return <Home products={await getProducts()}/>}
