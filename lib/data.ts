export type Product = { id: string; slug: string; name: string; category: string; price: number; mockup: string; finished: string; front?: string; back?: string; gallery?: string[]; colors: string[]; sizes: string[]; description: string; badge?: string };
// TODO: Replace sample names, prices, descriptions, sizes and availability with the approved client catalogue.
const seeds = [
 ['night-shift','Night Shift Graphic Tee','Tees',28000,'night-tee.jpg','NEW DROP'],
 ['rareform-99','Rareform 99 Tracksuit','Sets',65000,'racing-set.png','SIGNATURE'],
 ['build-your-dream','Build Your Dream Tee','Tees',25000,'dream-tee.jpg',''],
 ['originals-crest','Originals Crest Trucker','Headwear',15000,'crest-cap.jpg',''],
 ['utility-cargo','Worldwide Utility Cargo','Pants',38000,'cargo.png',''],
 ['born-to-ride','Born to Ride Tee','Tees',26000,'ride-tee.png',''],
 ['hustle-never-dies','Hustle Never Dies Tank','Tanks',24000,'skull-tank.png',''],
 ['members-only','Members Only Rugby','Tops',35000,'members-polo.png','']
];
export const fallbackProducts: Product[] = seeds.map(([slug,name,category,price,file,badge]) => ({ id: String(slug),slug:String(slug),name:String(name),category:String(category),price:Number(price),mockup:`/products/${file}`,...(['rareform-99','utility-cargo','members-only'].includes(String(slug))?{front:`/products/${slug}-front.png`,back:`/products/${slug}-back.png`}:{}),finished:`/products/${slug}-finished.svg`,badge:String(badge),colors:['#171717','#efefeb','#b82025'],sizes:category==='Headwear'?['One size']:['S','M','L','XL','XXL'],description:'An original point of view. A statement silhouette with bold SL ORIGINALS artwork, made for your everyday rotation. Real is rare.' }));

// TODO: Confirm these additional product names, prices and availability with the client.
const source = (filename:string) => '/SL_Originals_images/'+encodeURIComponent(filename);
const additionalProducts: Array<{slug:string;name:string;category:string;price:number;source:string;colors:string[];pair?:string;gallery:string[];badge?:string}> = [
 {slug:'rareform-white',name:'Rareform 99 White Tracksuit',category:'Sets',price:65000,source:"Group 433 (1).png",colors:['#efefeb'],pair:'rareform-white',gallery:["20260126_0441_Image Generation_remix_01kftx0p6wezq8ngb0wryyj9f6.png","Group 364.png","Group 433 (1).png","Group 433.png","task_01kftx0mhmezc938wbvcb92dhr_1769355679_img_0.webp"],badge:'SIGNATURE'},
 {slug:'ocean-camo',name:'Ocean Camo Cargo',category:'Pants',price:38000,source:"Group 297.png",colors:['#1769bb'],gallery:["Group 297.png","Group 301.png"]},
 {slug:'red-camo',name:'Red Camo Cargo',category:'Pants',price:38000,source:"SL-MK-removebg-preview.png",colors:['#b82025'],pair:'red-camo',gallery:["Group 435 (1).png","Group 435.png","SL-MK-removebg-preview.png","SL-MK.png","SL-MK3.png"]},
 {slug:'snapback-black',name:'Property Snapback - Black',category:'Headwear',price:15000,source:"Group_397-removebg-preview.png",colors:['#171717'],pair:'snapback-black',gallery:["Group 397.png","Group 404.png","Group 405.png","Group_397-removebg-preview.png","Sun Solar Energy Logo Design Template.  Green energy logos (5).png","Sun_Solar_Energy_Logo_Design_Template.__Green_energy_logos__5_-removebg-preview.png","WhatsApp Image 2026-01-19 at 5.43.59 PM.jpeg"]},
 {slug:'snapback-red',name:'Property Snapback - Red',category:'Headwear',price:15000,source:"Group 391.png",colors:['#b82025'],pair:'snapback-red',gallery:["Group 391.png","SLCAP.png"]},
 {slug:'property-caps',name:'Property of Originals Cap Collection',category:'Headwear',price:15000,source:"ChatGPT Image Jan 25, 2026, 03_25_48 PM.png",colors:['#1769bb','#b82025','#171717'],gallery:["ChatGPT Image Jan 25, 2026, 03_25_48 PM.png"]},
 {slug:'globe-beanie',name:'Globe Logo Beanie',category:'Headwear',price:12000,source:"WhatsApp_Image_2026-01-26_at_4.45.17_AM__1__1-removebg-preview.png",colors:['#171717'],pair:'beanie',gallery:["task_01kftxqdw4easvnyj88jxkbpmv_1769356440_img_0.webp","WhatsApp Image 2026-01-26 at 4.45.17 AM (1) 1.png","WhatsApp Image 2026-01-26 at 4.45.17 AM (1).jpeg","WhatsApp_Image_2026-01-26_at_4.45.17_AM__1__1-removebg-preview.png"]},
 {slug:'rich-club',name:'Rich Club Graphic Tank',category:'Tanks',price:24000,source:"WhatsApp_Image_2026-01-26_at_4.45.17_AM_1-removebg-preview.png",colors:['#171717'],pair:'rich-club',gallery:["task_01kftxtp1dfavs5fd0jf0j215c_1769356557_img_0.webp","WhatsApp Image 2026-01-26 at 4.45.17 AM 1.png","WhatsApp Image 2026-01-26 at 4.45.17 AM.jpeg","WhatsApp_Image_2026-01-26_at_4.45.17_AM_1-removebg-preview.png"]},
 {slug:'reaper',name:'Property Reaper Tank',category:'Tanks',price:24000,source:"WhatsApp_Image_2026-01-17_at_5.26.22_AM_1-removebg-preview.png",colors:['#efefeb'],pair:'reaper',gallery:["SLM.png","WhatsApp Image 2026-01-17 at 5.26.22 AM 1.png","WhatsApp_Image_2026-01-17_at_5.26.22_AM_1-removebg-preview.png"]},
 {slug:'born-to-ride-blue',name:'Born to Ride Tee - Blue',category:'Tees',price:26000,source:"WhatsApp Image 2026-01-26 at 5.44.11 AM.jpeg",colors:['#1769bb'],gallery:["WhatsApp Image 2026-01-26 at 5.44.11 AM.jpeg"]},
 {slug:'born-to-ride-white',name:'Born to Ride Tee - White',category:'Tees',price:26000,source:"WhatsApp Image 2026-01-26 at 5.44.13 AM.jpeg",colors:['#efefeb'],gallery:["WhatsApp Image 2026-01-26 at 5.44.13 AM.jpeg"]},
 {slug:'road-rules',name:'Road Rules Graphic Tee',category:'Tees',price:26000,source:"WhatsApp Image 2026-01-26 at 5.44.14 AM.jpeg",colors:['#efefeb'],gallery:["WhatsApp Image 2026-01-26 at 5.44.14 AM.jpeg"]},
 {slug:'contrast-panel',name:'Contrast Panel Tracksuit',category:'Sets',price:58000,source:"Men's Autumn_Winter Hooded Jacket Set, Two-Tone Patchwork, Loose Fit, Zip-Up Front, Letter Print Mens Two Piece Set Mens Co Ord Set Men Two Piece Set Brown Mens 2 Piece Outfits Brown Mens Jogging Set.jpg",colors:['#8a7161'],gallery:["Men's Autumn_Winter Hooded Jacket Set, Two-Tone Patchwork, Loose Fit, Zip-Up Front, Letter Print Mens Two Piece Set Mens Co Ord Set Men Two Piece Set Brown Mens 2 Piece Outfits Brown Mens Jogging Set.jpg"],badge:'STUDIO CONCEPT'}
];
additionalProducts.forEach(item=>{
 fallbackProducts.push({id:item.slug,slug:item.slug,name:item.name,category:item.category,price:item.price,mockup:source(item.source),finished:`/products/${item.slug}-finished.svg`,colors:item.colors,sizes:item.category==='Headwear'?['One size']:['S','M','L','XL','XXL'],description:'An SL ORIGINALS design study with a bold point of view. Preview the original artwork and available views. Product details are awaiting client confirmation.',badge:item.badge,gallery:item.gallery.map(source),...(item.pair?{front:`/products/${item.pair}-front.png`,back:`/products/${item.pair}-back.png`}:{})});
});
for(const product of fallbackProducts){
 const related:Record<string,string[]>={'rareform-99':["Gemini_Generated_Image_j6vurkj6vurkj6vu-removebg-preview.png","Group 356 (1).png","Group 430.png","Group 431.png"],'utility-cargo':["Group 435 (1).png","Group 435.png","SL-MK1.png","SL-MK2-removebg-preview.png","SL-MK2.png"],'members-only':["Group 436 (1).png","Group 436.png","WhatsApp_Image_2026-01-08_at_12.20.54_AM-removebg-preview.png","WhatsApp_Image_2026-01-08_at_12.21.06_AM-removebg-preview.png"]};
 if(related[product.slug])product.gallery=related[product.slug].map(source);
}
export function colourName(hex:string){return ({'#171717':'Black','#efefeb':'Off white','#b82025':'Red','#1769bb':'Blue','#8a7161':'Brown'} as Record<string,string>)[hex]||hex;}

export const money = (amount:number) => new Intl.NumberFormat('en-NG',{style:'currency',currency:'NGN',maximumFractionDigits:0}).format(amount);
// TODO: Replace contact placeholders with confirmed client details.
export const contact = {address:'[Boutique Address], Warri, Delta State, Nigeria',phone:'+234 000 000 0000',email:'hello@[brandname].com',instagram:'@[brandname]',tiktok:'@[brandname]'};
