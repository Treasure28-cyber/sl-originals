'use client';

import Link from 'next/link';
import {shopImage} from '@/lib/shop-images';
import {Suspense,useEffect,useState} from 'react';
import {useSearchParams} from 'next/navigation';
import {CreditCard,MessageCircle,LockKeyhole,ShoppingBag,Check,ChevronLeft} from 'lucide-react';
import {useCart} from '@/lib/cart';
import {money,colourName} from '@/lib/data';

type Props={paystackEnabled:boolean;whatsappNumber:string};
export function Checkout(props:Props){return <Suspense fallback={<main className="section">Loading checkout…</main>}><CheckoutBody {...props}/></Suspense>}

function CheckoutBody({paystackEnabled,whatsappNumber}:Props){
 const cart=useCart();const params=useSearchParams();
 const [ready,setReady]=useState(false);const [busy,setBusy]=useState(false);const [status,setStatus]=useState('');const [paid,setPaid]=useState(false);
 const [method,setMethod]=useState<'whatsapp'|'paystack'>('whatsapp');
 const number=whatsappNumber.replace(/\D/g,'');const whatsappEnabled=/^[1-9]\d{7,14}$/.test(number)&&!/^2340+$/.test(number);
 const subtotal=cart.items.reduce((sum,item)=>sum+item.product.price*item.quantity,0);
 useEffect(()=>setReady(true),[]);
 const reference=params.get('reference');
 useEffect(()=>{if(!reference)return;let active=true;setBusy(true);fetch(`/api/verify?reference=${encodeURIComponent(reference)}`).then(r=>r.json()).then(data=>{if(!active)return;if(data.paid){useCart.getState().clear();setPaid(true);setStatus('Payment verified. Thank you for your order.')}else setStatus(data.error||'Payment could not be verified. Please keep your payment reference.')}).catch(()=>{if(active)setStatus('Could not verify payment. Please keep your payment reference and contact the store.')}).finally(()=>{if(active)setBusy(false)});return()=>{active=false}},[reference]);

 return <main className="section checkout-page checkout-redesign">
  <Link href="/shop" className="checkout-back"><ChevronLeft size={16}/> Continue shopping</Link>
  <div className="checkout-heading"><div><p className="eyebrow">MADE ORIGINAL. MADE YOURS.</p><h1>Make it yours.</h1><p>A few details, then your originals are one step closer.</p></div><span className="checkout-secure"><LockKeyhole size={16}/> Secure checkout</span></div>
  {status&&<div role="status" className="form-result">{status}</div>}
  {!ready?<p className="muted">Loading your bag…</p>:cart.items.length>0?<div className="checkout-layout">
   <form className="checkout-form" onSubmit={async e=>{
    e.preventDefault();if(busy)return;setStatus('');const form=new FormData(e.currentTarget);
    const name=String(form.get('name')||'').trim(),email=String(form.get('email')||'').trim(),phone=String(form.get('phone')||'').trim(),address=String(form.get('address')||'').trim(),city=String(form.get('city')||'').trim(),state=String(form.get('state')||'').trim();
    if(!name||!email||!phone||!address||!city||!state){setStatus('Please complete your contact and delivery details.');return}
    if(method==='whatsapp'){
     if(!whatsappEnabled){setStatus('WhatsApp ordering will be available as soon as our store number is connected.');return}
     const message=['Hello SL ORIGINALS, I’d like to place an order.','',...cart.items.map(x=>`${x.product.name} | ${x.size} | ${colourName(x.color)} | Qty ${x.quantity} | ${money(x.product.price*x.quantity)}`),'',`Subtotal: ${money(subtotal)}`,'Delivery fee: please confirm before payment.','',`Name: ${name}`,`Email: ${email}`,`Phone: ${phone}`,`Delivery: ${address}, ${city}, ${state}, Nigeria`,'','Please confirm availability, delivery cost and payment details.'].join('\n');
     window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`,'_blank','noopener,noreferrer');setStatus('Your order is ready in WhatsApp. Send the message there to confirm it with us. Your bag is saved until payment.');return;
    }
    if(!paystackEnabled)return;setBusy(true);
    try{const response=await fetch('/api/checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,name,phone,address:`${address}, ${city}, ${state}, Nigeria`,items:cart.items.map(x=>({id:x.product.id,size:x.size,color:x.color,quantity:x.quantity}))})});const data=await response.json();if(!response.ok)throw new Error(data.error||'Checkout unavailable');window.location.assign(data.url)}catch(error){setStatus(error instanceof Error?error.message:'Checkout unavailable. Please try again.');setBusy(false)}
   }}>
    <section className="checkout-panel"><h2>Contact & delivery</h2><p>Where should we send your originals?</p>
     <label>Full name<input name="name" required autoComplete="name" placeholder="Your full name" maxLength={120}/></label>
     <div className="form-row"><label>Email address<input name="email" type="email" required autoComplete="email" placeholder="you@example.com" maxLength={254}/></label><label>Phone number<input name="phone" type="tel" required autoComplete="tel" placeholder="+234" maxLength={30}/></label></div>
     <label>Delivery address<input name="address" required autoComplete="street-address" placeholder="House number and street" maxLength={300}/></label>
     <div className="form-row"><label>City<input name="city" required autoComplete="address-level2" placeholder="City" maxLength={100}/></label><label>State<input name="state" required autoComplete="address-level1" placeholder="State" maxLength={100}/></label></div>
     <div className="delivery-note">Delivering in Nigeria. Delivery cost and timing are confirmed before payment.</div>
    </section>
    <section className="checkout-panel"><h2>Your checkout, your choice.</h2><p>Choose how you’d like to complete your order.</p>
     <fieldset className="payment-options"><legend className="sr-only">Checkout method</legend>
      <label className={`payment-option ${method==='whatsapp'?'is-selected':''}`}><input type="radio" name="method" value="whatsapp" checked={method==='whatsapp'} onChange={()=>setMethod('whatsapp')}/><MessageCircle size={24}/><span><strong>Checkout through WhatsApp</strong><small>Confirm your order, delivery and payment with us.</small></span></label>
      <label className={`payment-option ${method==='paystack'?'is-selected':''} ${!paystackEnabled?'is-unavailable':''}`}><input type="radio" name="method" value="paystack" disabled={!paystackEnabled} checked={method==='paystack'} onChange={()=>setMethod('paystack')}/><CreditCard size={24}/><span><strong>Pay with Paystack {!paystackEnabled&&<b className="payment-badge">Coming soon</b>}</strong><small>{paystackEnabled?'Continue to Paystack’s secure payment page.':'Online payments are being set up. Choose WhatsApp to order.'}</small></span></label>
     </fieldset>
     {!whatsappEnabled&&method==='whatsapp'&&<p className="checkout-availability">WhatsApp ordering is being connected. Please check back shortly.</p>}
     <button className="button checkout-submit" disabled={busy||(method==='whatsapp'?!whatsappEnabled:!paystackEnabled)}>{method==='whatsapp'?<MessageCircle size={19}/>:<LockKeyhole size={18}/>} {busy?'PLEASE WAIT…':method==='whatsapp'?'CONTINUE TO WHATSAPP':'CONTINUE TO PAYSTACK'}</button>
     <p className="checkout-footnote">{method==='whatsapp'?'Opens WhatsApp with your order details. Send the message to place your order.':'You’ll complete payment securely on Paystack.'}</p>
    </section>
   </form>
   <aside className="order-summary checkout-summary"><div className="checkout-summary-title"><h2>Your originals</h2><span>{cart.items.reduce((n,x)=>n+x.quantity,0)} items</span></div>
    {cart.items.map(x=><div className="checkout-product" key={`${x.product.id}-${x.size}-${x.color}`}><div className="checkout-product-image"><img src={shopImage(x.product.front||x.product.mockup)} alt={x.product.name}/><span>{x.quantity}</span></div><div><h3>{x.product.name}</h3><p>{x.size} / {colourName(x.color)}</p></div><strong>{money(x.quantity*x.product.price)}</strong></div>)}
    <div className="checkout-totals"><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><div><span>Delivery</span><span>Confirmed before payment</span></div></div>
    <div className="checkout-subtotal"><span>Order subtotal<small>Excludes delivery</small></span><strong><small>NGN</small> {money(subtotal)}</strong></div>
    <div className="summary-assurance"><Check size={18}/><p>Original designs. Personal service.<br/>We’ll help with the finishing touches.</p></div><Link href="/shop" className="checkout-edit">Continue shopping</Link>
   </aside>
  </div>:<div className="checkout-empty"><ShoppingBag size={40}/><h2>{paid?'Thank you for shopping original.':'Your bag is waiting for an original.'}</h2><Link href="/shop" className="button">EXPLORE THE DROP</Link></div>}
 </main>
}
