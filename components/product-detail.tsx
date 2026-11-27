'use client';

import Link from 'next/link';
import Image from 'next/image';
import {useState} from 'react';
import {ArrowUpRight,MessageCircle,Plus} from 'lucide-react';
import {Product,money,contact,colourName} from '@/lib/data';
import {useCart} from '@/lib/cart';
import {ProductCard} from './product-card';

export function Detail({product,products}:{product:Product;products:Product[]}){
 const [view,setView]=useState(product.front?'front':'mockup');
 const [size,setSize]=useState('');
 const [color,setColor]=useState(product.colors[0]);
 const [error,setError]=useState('');
 const cart=useCart();
 const gallery=product.gallery||[];
 const image=view.startsWith('gallery-')?gallery[Number(view.slice(8))]:view==='front'?product.front:view==='back'?product.back:view==='finished'?product.finished:product.mockup;
 const comingSoon=product.status==='coming-soon';
 const orderMessage=comingSoon?`Hi SL Originals, I’m interested in ${product.name}. Please let me know when it will be available.`:`Hi SL Originals, I’d like to order ${product.name}. Size: ${size||'please advise'}. Colour: ${colourName(color)}. Please confirm availability, price and delivery details.`;
 const orderUrl=`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(orderMessage)}`;

 return <main className="section detail-page">
  <div className="breadcrumb"><Link href="/shop">SHOP</Link> / {product.category.toUpperCase()} / {product.name.toUpperCase()}</div>
  <div className="detail-grid">
   <div>
    <div className="view-toggle">
     {product.front&&<button className={view==='front'?'selected':''} onClick={()=>setView('front')}>FRONT</button>}
     {product.back&&<button className={view==='back'?'selected':''} onClick={()=>setView('back')}>BACK</button>}
     {product.finished&&!product.finished.endsWith('.svg')&&<button className={view==='finished'?'selected':''} onClick={()=>setView('finished')}>FINISHED PRODUCT</button>}
     <button className={view==='mockup'?'selected':''} onClick={()=>setView('mockup')}>DESIGN MOCKUP</button>
    </div>
    <div className="detail-image">
     <Image width={1000} height={1250} sizes="(max-width: 700px) 90vw, 50vw" priority src={image||product.mockup} alt={`${product.name} ${view==='front'?'front view':view==='back'?'back view':view==='finished'?'finished photo placeholder':'design mockup'}`}/>
     <span>{view==='front'?'FRONT VIEW':view==='back'?'BACK VIEW':view==='finished'?'FINISHED PHOTO COMING SOON':'DESIGN PREVIEW - COLOURS MAY VARY'}</span>
    </div>
    {gallery.length>0&&<div className="product-gallery" aria-label="More product images">{gallery.map((src,index)=><button key={`${src}-${index}`} type="button" aria-label={`View image ${index+1} of ${product.name}`} aria-pressed={view===`gallery-${index}`} onClick={()=>setView(`gallery-${index}`)}><Image width={180} height={225} sizes="120px" src={src} alt=""/></button>)}</div>}
   </div>
   <div className="detail-info">
    <p className="eyebrow">SL ORIGINALS / {product.category.toUpperCase()}</p>
    <h1>{product.name}</h1>
    {comingSoon?<p className="availability-note">Coming soon. Ask us on WhatsApp for an availability update.</p>:<div className="price">{money(product.price)}</div>}
    <p>{product.description}</p>
    <div className="option-label">COLOUR <span>{colourName(color)}</span></div>
    <div className="swatches">{product.colors.map(c=><button key={c} aria-label={colourName(c)} aria-pressed={c===color} className={c===color?'chosen':''} style={{background:c}} onClick={()=>setColor(c)}/>)}</div>
    <div className="option-label">SELECT SIZE <details><summary>Size guide</summary><p>Garment measurements are being confirmed. <a href={contact.whatsappUrl} target="_blank" rel="noreferrer">Message us for sizing help.</a></p></details></div>
    <div className="sizes">{product.sizes.map(s=><button className={size===s?'selected':''} onClick={()=>{setSize(s);setError('')}} key={s}>{s}</button>)}</div>
    {error&&<p role="alert" className="error">{error}</p>}
    {!comingSoon&&<button className="button add-button" onClick={()=>{if(!size){setError('Choose your size first.');return}cart.add(product,size,color)}}>ADD TO BAG <Plus size={20}/></button>}
    <a className="button whatsapp-detail-button" href={orderUrl} target="_blank" rel="noreferrer"><MessageCircle size={18}/>{comingSoon?'ASK ABOUT THIS DESIGN':'ORDER ON WHATSAPP'}</a>
    <div className="product-accordions">
     {[
      ['THE DETAILS','Product fabric, fit and care details are being finalized. Message us for current information.'],
      ['DELIVERY & RETURNS','Delivery fees and timing are confirmed before payment. Please contact us about exchanges before ordering.'],
      ['CARE GUIDE','Care instructions will be supplied with your finished piece.']
     ].map(([title,body])=><details key={title}><summary>{title}<Plus size={14}/></summary><p>{body}</p></details>)}
    </div>
   </div>
  </div>
  <div className="section-heading related"><h2>YOU MAY ALSO LIKE</h2><Link href="/shop" className="text-link">VIEW ALL <ArrowUpRight size={18}/></Link></div>
  <div className="product-grid">{products.filter(p=>p.id!==product.id).slice(0,4).map(p=><ProductCard key={p.id} product={p}/>)}</div>
 </main>
}
