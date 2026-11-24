'use client';
import {useEffect} from 'react';
import {usePathname} from 'next/navigation';

const targets = [
 'main .page-title','main>.eyebrow','main>section>.eyebrow','main .section-heading',
 'main .editorial-hero .shop-campaign-title','main .shop-tools','main .archive-intro','main .archive-toolbar',
 'main .product-grid>.product-card','main .archive-grid>.archive-card',
 'main .about-grid>*','main .info-grid>*','main .detail-grid>*',
 'main .manifesto>*','main .custom-banner','main .perks>span',
 'main .studio-invite','main .product-gallery','footer .footer-top>div'
].join(',');
/** Progressive enhancement: content remains visible without JS or observer support. */
export function PageMotion(){
 const pathname=usePathname();
 useEffect(()=>{
  if(!('IntersectionObserver' in window)||!Element.prototype.animate)return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  if(reduced.matches)return;
  const animations=new Map<Element,Animation>();
  const seen=new WeakSet<Element>();
  let disposed=false,frame=0;
  const observer=new IntersectionObserver(entries=>{
   for(const entry of entries){if(!entry.isIntersecting)continue;const animation=animations.get(entry.target);if(animation?.playState==='paused')animation.play();observer.unobserve(entry.target)}
  },{threshold:0,rootMargin:'0px 0px -25px 0px'});
  function register(){
   if(disposed||reduced.matches)return;
   for(const element of document.querySelectorAll<HTMLElement>(targets)){
    if(seen.has(element)||element.closest('.campaign-hero,dialog'))continue;
    seen.add(element);
    // Animate only the parent when a selected panel already contains this node.
    if(element.parentElement?.closest('[data-motion-panel]'))continue;
    const box=element.getBoundingClientRect();if(!box.width||!box.height||box.bottom<0)continue;
    // Keep the first screen immediately visible when a route arrives.
    if(box.top<window.innerHeight)continue;
    const parent=element.parentElement;
    const group=parent?.matches('.product-grid,.archive-grid,.perks,.footer-top');
    const index=parent?Array.from(parent.children).indexOf(element):0;
    const paired=parent?.matches('.about-grid,.info-grid,.detail-grid,.manifesto');
    const offset=paired?(index===0?'-16px 0px':'16px 0px'):'0px 20px';
    const animation=element.animate([{opacity:0,translate:offset},{opacity:1,translate:'0px 0px'}],{
     duration:420,delay:group?(index%4)*45:paired?index*60:0,easing:'cubic-bezier(.16,1,.3,1)',fill:'both'
    });
    animation.pause();animations.set(element,animation);element.dataset.motionPanel='true';
    animation.onfinish=()=>{animation.cancel();animations.delete(element)};
    observer.observe(element);
   }
  }
  register();
  const mutation=new MutationObserver(records=>{if(records.some(record=>record.addedNodes.length)){cancelAnimationFrame(frame);frame=requestAnimationFrame(register)}});
  const main=document.querySelector('main');if(main)mutation.observe(main,{childList:true,subtree:true});
  const onFocus=(event:FocusEvent)=>{const node=event.target as Element;for(const [element,animation] of animations){if(element===node||element.contains(node)){animation.cancel();animations.delete(element);observer.unobserve(element)}}};
  const stop=()=>{for(const animation of animations.values())animation.cancel();animations.clear();observer.disconnect()};
  const onPreference=()=>{if(reduced.matches)stop()};
  document.addEventListener('focusin',onFocus);reduced.addEventListener('change',onPreference);
  return()=>{disposed=true;cancelAnimationFrame(frame);observer.disconnect();mutation.disconnect();stop();document.removeEventListener('focusin',onFocus);reduced.removeEventListener('change',onPreference);document.querySelectorAll('[data-motion-panel]').forEach(element=>element.removeAttribute('data-motion-panel'))};
 },[pathname]);
 return null;
}
