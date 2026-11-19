'use client';
import Link from 'next/link';
import {Product,money} from '@/lib/data';
import {useEffect,useRef,useState} from 'react';
import {Plus,Pause,Play} from 'lucide-react';
import {shopImage,shopImageStyle} from '@/lib/shop-images';

export function ProductCard({product}:{product:Product}){
 const paired=!!(product.front&&product.back);
 const [showBack,setShowBack]=useState(false),[paused,setPaused]=useState(false);
 const card=useRef<HTMLElement>(null);
 const primarySource=product.front||(product.finished&&!product.finished.endsWith('.svg')?product.finished:product.mockup);
 useEffect(()=>{
  if(!paired)return;
  const touch=window.matchMedia('(hover: none), (pointer: coarse)');
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let visible=false,timer:ReturnType<typeof setInterval>|undefined;
  const stop=()=>{clearInterval(timer);timer=undefined};
  const update=()=>{stop();if(touch.matches&&!reduced.matches&&!paused&&visible&&!document.hidden)timer=setInterval(()=>setShowBack(value=>!value),3000);else if(!touch.matches||reduced.matches)setShowBack(false)};
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;update()},{threshold:0.2});
  if(card.current)observer.observe(card.current);
  touch.addEventListener('change',update);reduced.addEventListener('change',update);document.addEventListener('visibilitychange',update);
  return()=>{stop();observer.disconnect();touch.removeEventListener('change',update);reduced.removeEventListener('change',update);document.removeEventListener('visibilitychange',update)};
 },[paired,paused]);
 const hover=(back:boolean)=>{if(window.matchMedia('(hover: hover) and (pointer: fine)').matches)setShowBack(back)};
 return <article ref={card} className={`product-card ${paired?'has-back':''} ${showBack?'show-back':''}`} onMouseEnter={()=>hover(true)} onMouseLeave={()=>hover(false)}>
  <Link href={`/product/${product.slug}`} className="product-card-link">
   <div className="product-image">
    <img className="primary-product-image" loading="lazy" decoding="async" src={shopImage(primarySource)} style={shopImageStyle(primarySource)} alt={`${product.name}${paired?' front view':''}`}/>
    {paired&&<img className="back-product-image" loading="lazy" decoding="async" src={shopImage(product.back!)} style={shopImageStyle(product.back!)} alt={`${product.name} back view`}/>}
    <span className="image-hint">{paired?(showBack?'BACK VIEW':'FRONT VIEW'):'EXPLORE THE PIECE'}</span>
    {product.badge&&<span className="badge">{product.badge}</span>}
    <span className="card-arrow" aria-hidden="true"><Plus size={20}/></span>
   </div>
   <div className="product-meta"><div><small>{product.category}</small><h3>{product.name}</h3></div><span>{money(product.price)}</span></div>
  </Link>
  {paired&&<button type="button" className="card-slideshow-control" aria-label={`${paused?'Play':'Pause'} automatic views of ${product.name}`} aria-pressed={paused} onClick={()=>setPaused(value=>!value)}>{paused?<Play size={14}/>:<Pause size={14}/>}<span>{paused?'Play views':'Pause views'}</span></button>}
 </article>
}
