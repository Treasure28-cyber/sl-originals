'use client';
import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {Product} from './data';
export type Item={product:Product;size:string;color:string;quantity:number};
type Cart={items:Item[];open:boolean;setOpen:(v:boolean)=>void;add:(p:Product,s:string,c:string)=>void;change:(i:number,d:number)=>void;clear:()=>void};
export const useCart=create<Cart>()(persist((set)=>({items:[],open:false,setOpen:(open)=>set({open}),add:(product,size,color)=>{if(product.status==='coming-soon')return;set(state=>{const items=[...state.items]; const i=items.findIndex(x=>x.product.id===product.id&&x.size===size&&x.color===color);if(i>=0)items[i]={...items[i],quantity:items[i].quantity+1};else items.push({product,size,color,quantity:1});return {items,open:true}})},change:(i,d)=>set(state=>({items:state.items.map((x,j)=>j===i?{...x,quantity:x.quantity+d}:x).filter(x=>x.quantity>0)})),clear:()=>set({items:[]})}),{name:'sl-originals-cart',partialize:state=>({items:state.items})}));
