'use client';
import Link from 'next/link';
import {Product,money,contact,colourName} from '@/lib/data';
import {useRouter} from 'next/navigation';
import {ArrowUpRight} from 'lucide-react';
import {catalogueQuery,selectCatalogue} from '@/lib/catalogue';
import {EditorialHero} from './editorial-hero';
import {ProductCard} from './product-card';
export function Shop({products,category='All',sort='latest'}:{products:Product[];category?:string;sort?:string}){
const router=useRouter();
const {categories,selectedCategory,selectedSort,shown}=selectCatalogue(products,category,sort);
return <main className="section shop-page"><EditorialHero variant="shop"/>
<div className="shop-tools" id="shop-collection"><nav className="filters" aria-label="Filter products by category">{categories.map(c=><Link prefetch={true} key={c} href={catalogueQuery(c,selectedSort)} className={selectedCategory===c?'selected':''} aria-current={selectedCategory===c?'page':undefined}>{c}</Link>)}</nav>
<form className="sort-form" action="/shop" method="get" onSubmit={event=>{event.preventDefault();const form=new FormData(event.currentTarget);router.push(catalogueQuery(String(form.get('category')||'All'),String(form.get('sort')||'latest')),{scroll:false})}}><input type="hidden" name="category" value={selectedCategory}/><label className="sr-only" htmlFor="catalogue-sort">Sort products</label><select id="catalogue-sort" name="sort" aria-label="Sort products" defaultValue={selectedSort} key={selectedSort} onChange={event=>event.currentTarget.form?.requestSubmit()}><option value="latest">Latest drop</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></form></div>
<div className="result-count" role="status"><span className="catalogue-count">{shown.length} {selectedCategory==='All'?'ORIGINAL PIECES':selectedCategory.toUpperCase()}</span><span>DESIGNS FROM THE ORIGINALS COLLECTION</span></div>
<div className="product-grid">{shown.map(p=><ProductCard key={p.id} product={p}/>)}</div>
{shown.length===0&&<div className="empty"><h2>No pieces in this collection yet.</h2><a href="/shop" className="button">VIEW ALL PIECES</a></div>}
<p className="catalogue-note">Preview prices are shown in NGN. Confirm the current price, availability and delivery with us on WhatsApp before ordering.</p>
<section className="studio-invite"><div><p className="eyebrow">MADE FOR YOUR PEOPLE</p><h2>HAVE AN IDEA?</h2><p>Ask about custom pieces for your crew, event or occasion.</p></div><Link href="/custom-order" className="button">START A CUSTOM ORDER</Link></section></main>}
