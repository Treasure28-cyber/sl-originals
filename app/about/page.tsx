import {InfoPage} from '@/components/info-page';
import type {Metadata} from 'next';
export const metadata:Metadata={title:'About Our Warri Clothing Brand',description:'Meet SL ORIGINALS, an independent Nigerian streetwear brand from Warri creating original graphic clothing with a worldwide mindset.',alternates:{canonical:'/about'},openGraph:{title:'About SL ORIGINALS | Warri Streetwear Brand',description:'Learn about the independent streetwear brand rooted in Warri, Delta State.',url:'/about'}};
export default function Page(){return <InfoPage type="about"/>}
