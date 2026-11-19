import {Home} from '@/components/home';
import {getProducts} from '@/lib/products';
export default async function Page(){return <Home products={(await getProducts()).slice(0,4)}/>}
