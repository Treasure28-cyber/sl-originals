// Use ImageGen cutout alpha only as a vector matte; display the untouched original artwork.
const fs=require('fs');const {createCanvas,loadImage}=require('../tmp/pdf-tools/node_modules/@napi-rs/canvas');
const specs=[
 ['night','/products/night-tee.jpg',[54,72,1178,1038]],
 ['dream','/products/dream-tee.jpg',[64,316,878,804]],
 ['hustle','/products/skull-tank.png',[272,214,735,863]],
 ['crest','/products/crest-cap.jpg',null],
 ['cargo-back','/products/utility-cargo-back.png',[166,153,472,700]],
 ['red-camo-back','/products/red-camo-back.png',[198,32,640,969]],
 ['snapback-black-front','/products/snapback-black-front.png',[31,226,739,580]],
 ['snapback-black-back','/products/snapback-black-back.png',[31,239,739,556]],
 ['snapback-red-front','/products/snapback-red-front.png',[40,207,730,580]],
 ['snapback-red-back','/products/snapback-red-back.png',[45,211,727,555]],
 ['property-caps','/SL_Originals_images/'+encodeURIComponent('ChatGPT Image Jan 25, 2026, 03_25_48 PM.png'),[58,32,886,950]],
 ['contrast-panel','/SL_Originals_images/'+encodeURIComponent("Men's Autumn_Winter Hooded Jacket Set, Two-Tone Patchwork, Loose Fit, Zip-Up Front, Letter Print Mens Two Piece Set Mens Co Ord Set Men Two Piece Set Brown Mens 2 Piece Outfits Brown Mens Jogging Set.jpg"),[95,27,557,914]]
];
(async()=>{const manifest={};const review=[];for(const [key,src,bbox] of specs){const cutout='public/products/white/'+key+'-cutout.png';if(!fs.existsSync(cutout))continue;const generated=await loadImage(cutout),original=await loadImage('public'+decodeURIComponent(src));const c=createCanvas(generated.width,generated.height),ctx=c.getContext('2d');ctx.drawImage(generated,0,0);const pixels=ctx.getImageData(0,0,c.width,c.height).data;const runs=[];let minX=c.width,minY=c.height,maxX=0,maxY=0;for(let y=0;y<c.height;y+=2){let start=-1;for(let x=0;x<=c.width;x++){const filled=x<c.width&&pixels[(y*c.width+x)*4+3]>180;if(filled&&start<0)start=x;if(!filled&&start>=0){if(x-start>=Math.max(5,c.width*.003)){runs.push([start,y,x-start]);minX=Math.min(minX,start);minY=Math.min(minY,y);maxX=Math.max(maxX,x);maxY=Math.max(maxY,y+2)}start=-1}}}if(!runs.length)throw Error('Missing alpha mask: '+key);let box=bbox;if(!box){const temp=createCanvas(original.width,original.height),t=temp.getContext('2d');t.drawImage(original,0,0);const p=t.getImageData(0,0,temp.width,temp.height).data;let x0=original.width,y0=original.height,x1=0,y1=0;for(let y=0;y<temp.height;y++)for(let x=0;x<temp.width;x++){const i=(y*temp.width+x)*4;if(Math.min(p[i],p[i+1],p[i+2])<170){x0=Math.min(x0,x);y0=Math.min(y0,y);x1=Math.max(x1,x);y1=Math.max(y1,y)}}box=[x0,y0,x1-x0+1,y1-y0+1]}
const [x,y,w,h]=box,sx=w/(maxX-minX),sy=h/(maxY-minY);const path=runs.map(([rx,ry,width])=>`M${rx} ${ry}h${width}v2h-${width}z`).join('');const mask=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${original.width} ${original.height}" width="${original.width}" height="${original.height}"><g transform="translate(${x-minX*sx} ${y-minY*sy}) scale(${sx} ${sy})"><path fill="#fff" d="${path}"/></g></svg>`;const maskPath='/products/white/'+key+'-mask.svg';fs.writeFileSync('public'+maskPath,mask);manifest[src]={mask:maskPath};review.push({key,src,mask:maskPath});console.log(key+' mask ready')}
manifest['/products/utility-cargo-front.png']={source:'/products/cargo.png'};fs.writeFileSync('lib/shop-image-overrides.json',JSON.stringify(manifest,null,2));fs.writeFileSync('tmp/shop-mask-review.json',JSON.stringify(review,null,2));})();
