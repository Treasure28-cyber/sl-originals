import {InfoPage} from '@/components/info-page';
import type {Metadata} from 'next';
export const metadata:Metadata={title:'Custom Clothing & T-Shirt Orders',description:'Plan custom T-shirts and clothing with SL ORIGINALS in Warri, Nigeria. Share your idea and confirm design, quantity, price and timing with the team.',alternates:{canonical:'/custom-order'},openGraph:{title:'Custom Clothing Orders | SL ORIGINALS',description:'Bring your idea to SL ORIGINALS for custom clothing and graphic T-shirt orders in Warri, Nigeria.',url:'/custom-order'}};
export default function Page(){return <InfoPage type="custom"/>}
