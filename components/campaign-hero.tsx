'use client';
import {useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {Plus,RotateCcw} from 'lucide-react';

/** A staged campaign entrance adapted from the supplied screen recording. */
export function CampaignHero(){
 const [replay,setReplay]=useState(0);
 return <section className="hero campaign-hero campaign-hero-animated" aria-label="SL Originals signature collection">
  <div className="campaign-scene" key={replay}>
   <div className="campaign-backdrop" aria-hidden="true"><span>SL ORIGINALS</span><img src="/products/logo.png" alt=""/></div>
   <div className="campaign-heading"><span>INDEPENDENT STREETWEAR / WARRI, NG</span><p>AN ORIGINAL<br/>POINT OF VIEW.</p></div>
   <div className="campaign-model"><Image width={900} height={1200} sizes="(max-width:700px) 85vw, 50vw" priority src="/products/racing-set.png" alt="Mannequin wearing the SL Originals black, red and white Rareform 99 tracksuit"/><span className="campaign-model-caption">SIGNATURE SILHOUETTE / DESIGN MOCKUP</span></div>
   <div className="campaign-story"><span className="campaign-kicker">THE ORIGINALS COLLECTION</span><h1>REAL IS<br/><em>RARE.</em></h1><p>For the ones who move different.<br/>Warri roots. Worldwide mindset.</p><Link href="/shop" className="button">EXPLORE THE DROP</Link><Link href="/about" className="campaign-story-link">Discover our story</Link></div>
   <Link href="/product/rareform-99" className="campaign-piece"><span className="campaign-piece-top">IN FOCUS <Plus size={16}/></span><div className="campaign-piece-image"><Image width={240} height={320} sizes="200px" src="/products/racing-set.png" alt="Rareform 99 tracksuit detail"/></div><strong>RAREFORM 99</strong><span>Signature tracksuit</span><span className="campaign-piece-action">DISCOVER THE PIECE</span></Link>
  </div>
  <div className="campaign-bottom"><span>LESS ORDINARY. MORE ORIGINAL.</span><span>SCROLL TO EXPLORE</span><button className="campaign-replay" type="button" aria-label="Replay hero entrance animation" onClick={()=>setReplay(value=>value+1)}><RotateCcw size={13} aria-hidden="true"/> REPLAY INTRO</button></div>
 </section>;
}
