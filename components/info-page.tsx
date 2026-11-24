'use client';

import Link from 'next/link';
import Image from 'next/image';
import {useState} from 'react';
import {ArrowRight,ArrowUpRight,MessageCircle} from 'lucide-react';
import {contact} from '@/lib/data';
import {EditorialHero} from './editorial-hero';

export function InfoPage({type}:{type:'about'|'contact'|'custom'}){
 const [submitted,setSubmitted]=useState(false);
 const [brief,setBrief]=useState('');
 if(type==='about')return <main className="section editorial-page">
  <EditorialHero variant="about"/>
  <section className="about-intro" id="our-story"><div className="about-grid">
   <Image width={900} height={1100} src="/products/artwork.png" alt="SL Originals Night Shift graphic artwork"/>
   <div><h2>REAL IS RARE.</h2><p>SL Originals makes statement streetwear rooted in Warri, Delta State.</p><p>Built for people who move their own way. Warri roots. Worldwide mindset.</p><Link href="/shop" className="button">SHOP THE COLLECTION <ArrowUpRight size={19}/></Link></div>
  </div></section>
 </main>;

 if(type==='custom')return <main className="section info-page editorial-page">
  <EditorialHero variant="custom"/>
  <div className="info-grid custom-order-content" id="custom-brief">
   <div><h2>Bring the idea. We’ll talk through the rest.</h2><p>Custom pieces for crews, events, birthdays, churches and schools. Share what you have in mind; we’ll confirm options, quantity, pricing and timing before you commit.</p>
    <ol className="custom-order-steps"><li><b>01</b><span>Send your idea and any reference images.</span></li><li><b>02</b><span>Discuss design, quantity, price and timing.</span></li><li><b>03</b><span>Approve the details before production begins.</span></li></ol>
    <a className="button custom-whatsapp-button" href={`${contact.whatsappUrl}?text=${encodeURIComponent('Hi SL Originals, I’m interested in a custom order. I’d like to make something for my crew, event or occasion. Please let me know what details you need.')}`} target="_blank" rel="noreferrer"><MessageCircle size={18}/> START A CUSTOM ORDER</a>
   </div>
   <div className="contact-block"><small>WHATSAPP</small><p><a href={contact.whatsappUrl}>{contact.phone}</a></p><small>INSTAGRAM</small><p><a href={contact.instagramUrl}>@{contact.instagram}</a></p></div>
  </div>
 </main>;

 return <main className="section info-page editorial-page">
  <EditorialHero variant="contact"/>
  <div className="info-grid" id="contact-details">
   <div><h2>Talk to SL Originals.</h2><p>Questions about a piece, an order or a collaboration? Reach us through WhatsApp or social media.</p>
    <div className="contact-block"><small>PHONE / WHATSAPP</small><p><a href={contact.whatsappUrl}>{contact.phone}</a></p><small>INSTAGRAM</small><p><a href={contact.instagramUrl}>@{contact.instagram}</a></p><small>SNAPCHAT</small><p><a href={contact.snapchatUrl}>{contact.snapchat}</a></p></div>
   </div>
   <form onSubmit={event=>{event.preventDefault();setSubmitted(true)}}>
    <label>Your message<textarea required minLength={10} value={brief} onChange={event=>{setBrief(event.target.value);setSubmitted(false)}} placeholder="What would you like to ask?" rows={5}/></label>
    <button className="button">PREPARE MESSAGE <ArrowUpRight size={18}/></button>
    <p className="muted">This form prepares a message to copy. It does not send to an inbox.</p>
    {submitted&&<div className="form-result" role="status"><strong>Your message is ready.</strong><p>{brief}</p><button type="button" className="text-link" onClick={async()=>{await navigator.clipboard.writeText(brief);setSubmitted(false)}}>COPY MESSAGE <ArrowRight size={16}/></button></div>}
   </form>
  </div>
 </main>;
}
