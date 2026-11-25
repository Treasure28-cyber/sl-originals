import {ArrowDown,Plus} from 'lucide-react';

const content={
 shop:{label:'SHOP SL ORIGINALS',bold:'SHOP',script:'the new drop.',description:'Warri roots. Pieces made to move different.',action:'SHOP THE COLLECTION',target:'#shop-collection'},
 about:{label:'THE SL ORIGINALS STORY',bold:'ROOTED',script:'in originality.',description:'Warri roots. A worldwide point of view.',action:'MEET SL ORIGINALS',target:'#our-story'},
 contact:{label:'LET’S CONNECT',bold:'TALK',script:'to the originals.',description:'Your next conversation starts here.',action:'GET IN TOUCH',target:'#contact-details'},
 custom:{label:'YOUR VISION. OUR STUDIO.',bold:'MAKE',script:'it yours.',description:'Your idea. An original made for you.',action:'START YOUR CUSTOM ORDER',target:'#custom-brief'},
 archive:{label:'BEHIND THE PRINTS',bold:'THE',script:'SL lookbook.',description:'Explore the graphics and pieces in the collection.',action:'VIEW THE LOOKBOOK',target:'#studio-collection'}
};

export function EditorialHero({variant}:{variant:keyof typeof content}){
 const item=content[variant];
 const shop=variant==='shop';
 return <section className={`shop-campaign editorial-hero editorial-hero-${variant}`} aria-labelledby="editorial-title">
  <div className="shop-campaign-grain" aria-hidden="true"/>
  {!shop&&<div className="shop-campaign-brand" aria-hidden="true">SL ORIGINALS</div>}
  <div className={`shop-campaign-top ${shop?'shop-hero-corners':''}`}>
   <span>{item.label}</span><span>WARRI ROOTS. WORLDWIDE MINDSET.</span>
  </div>
  <div className="shop-campaign-title">
   <h1 id="editorial-title"><span>{item.bold}</span><em>{item.script}</em></h1>
   <p>{item.description}</p>
  </div>
  <div className="shop-campaign-bottom">
   <span>REAL IS RARE.<br/><b>SO ARE YOU.</b></span>
   <a href={item.target} className={`shop-campaign-cta ${shop?'shop-hero-scroll-link':''}`}>
    {item.action}{shop?<ArrowDown size={16}/>:<Plus size={16}/>}
   </a>
   <span>INDEPENDENT SPIRIT.<br/>ORIGINAL BY DESIGN.</span>
  </div>
  <div className={`shop-campaign-ticket ${shop?'shop-paper-accent':''}`} aria-hidden="true"><img src="/products/logo.png" alt=""/><span>SL ORIGINALS</span>{!shop&&<small>AN ORIGINAL POINT OF VIEW</small>}</div>
 </section>;
}
