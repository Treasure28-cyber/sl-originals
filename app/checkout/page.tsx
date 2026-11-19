import {Checkout} from '@/components/store';
export default function Page(){return <Checkout paystackEnabled={process.env.CHECKOUT_ENABLED==='true'&&!!process.env.PAYSTACK_SECRET_KEY&&!!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID&&!!process.env.NEXT_PUBLIC_SITE_URL} whatsappNumber={process.env.NEXT_PUBLIC_WHATSAPP_NUMBER||'2349046116130'}/>}
