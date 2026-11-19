import type {CSSProperties} from 'react';
import overrides from './shop-image-overrides.json';
type Override={source?:string;mask?:string};
const images=overrides as Record<string,Override>;
/** Use original artwork with a separately generated background-removal matte. */
export function shopImage(source:string){return images[source]?.source||source;}
export function shopImageStyle(source:string):CSSProperties|undefined{
 const mask=images[source]?.mask;
 return mask?{maskImage:`url("${mask}")`,WebkitMaskImage:`url("${mask}")`}:undefined;
}
