import type {CSSProperties} from 'react';
import overrides from './shop-image-overrides.json';
import cards from './shop-card-images.json';
type Override={source?:string;mask?:string};
const images=overrides as Record<string,Override>;
const previews=cards as Record<string,string>;
/** Small white-background previews for cards; original detail assets remain untouched. */
export function shopImage(source:string){return previews[source]||images[source]?.source||source;}
export function shopImageStyle(source:string):CSSProperties|undefined{
 if(previews[source])return undefined;
 const mask=images[source]?.mask;
 return mask?{maskImage:`url("${mask}")`,WebkitMaskImage:`url("${mask}")`}:undefined;
}
