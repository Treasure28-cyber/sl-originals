'use client';
import {useEffect,useRef,useState} from 'react';
import {Check,X} from 'lucide-react';
import {validateCircleSignup} from '@/lib/newsletter';
const storageKey='sl-circle-welcome-v1';
export function WelcomeCircle(){
 const dialog=useRef<HTMLDialogElement>(null);const opener=useRef<HTMLElement|null>(null);
 const [open,setOpen]=useState(false),[status,setStatus]=useState<'idle'|'saving'|'success'>('idle'),[error,setError]=useState('');
 function remember(value:string){try{localStorage.setItem(storageKey,value)}catch{}}
 function close(){remember(status==='success'?'joined':'dismissed');setOpen(false)}
 useEffect(()=>{let seen=false;try{seen=!!localStorage.getItem(storageKey)}catch{}
 const timer=seen?undefined:window.setTimeout(()=>{const bagOpen=document.querySelector('.cart-overlay');if(!bagOpen)setOpen(true)},2800);
 const show=()=>{setError('');setStatus('idle');setOpen(true)};window.addEventListener('sl:open-circle',show);return()=>{clearTimeout(timer);window.removeEventListener('sl:open-circle',show)}},[]);
 useEffect(()=>{const modal=dialog.current;if(!modal)return;if(open){opener.current=document.activeElement as HTMLElement;modal.showModal();const previous=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=previous;modal.close();opener.current?.focus()}}},[open]);
 async function submit(event:React.FormEvent<HTMLFormElement>){event.preventDefault();if(status==='saving')return;const form=new FormData(event.currentTarget);const payload={firstName:form.get('firstName'),email:form.get('email'),month:form.get('month'),day:form.get('day'),consent:form.get('consent')==='on',website:form.get('website')};
 try{validateCircleSignup(payload)}catch(e){setError(e instanceof Error?e.message:'Please review the form.');return}
 setStatus('saving');setError('');try{const response=await fetch('/api/newsletter',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});const result=await response.json();if(!response.ok)throw new Error(result.error||'Please try again.');setStatus('success');remember('joined')}catch(e){setError(e instanceof Error?e.message:'Could not connect. Please try again.');setStatus('idle')}
 }
 return <><button className="circle-footer-link" type="button" onClick={()=>window.dispatchEvent(new Event('sl:open-circle'))}>Join the Circle</button><dialog ref={dialog} className="circle-dialog" aria-labelledby="circle-title" aria-describedby="circle-description" onCancel={event=>{event.preventDefault();close()}} onClick={event=>{if(event.target===event.currentTarget)close()}}>
 <div className="circle-layout"><button type="button" className="circle-close" aria-label="Close welcome popup" onClick={close}><X size={20}/></button>
 <div className="circle-content">{status==='success'?<div className="circle-success" role="status"><span><Check size={28}/></span><h2 id="circle-title">Welcome<br/>to the Circle.</h2><p id="circle-description">You're on the list. Stay original.</p><button autoFocus className="circle-submit" onClick={close}>KEEP EXPLORING</button></div>:<><p className="circle-eyebrow">SL ORIGINALS</p><h2 id="circle-title">Join the Circle.</h2><p id="circle-description">First looks. New drops. Your kind of originals.</p>
 <form onSubmit={submit}><label htmlFor="circle-name">First name<input id="circle-name" name="firstName" required maxLength={80} autoComplete="given-name" placeholder="Your first name"/></label><label htmlFor="circle-email">Email address<input id="circle-email" name="email" type="email" required maxLength={254} autoComplete="email" placeholder="you@example.com"/></label>
 <fieldset className="circle-birthday"><legend>Birthday <span>(optional)</span></legend><div><label><span className="sr-only">Birth month</span><select name="month" defaultValue="" aria-label="Birth month"><option value="">Month</option>{['January','February','March','April','May','June','July','August','September','October','November','December'].map((month,i)=><option key={month} value={i+1}>{month}</option>)}</select></label><label><span className="sr-only">Birth day</span><input name="day" type="number" min="1" max="31" inputMode="numeric" placeholder="Day" aria-label="Birth day"/></label></div></fieldset>
 <div className="circle-honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
 <label className="circle-consent"><input name="consent" type="checkbox" required/><span>Email me SL ORIGINALS drops and offers.</span></label>
 {error&&<p className="circle-error" role="alert">{error}</p>}<button className="circle-submit" type="submit" disabled={status==='saving'}>{status==='saving'?'JOINING…':'LET ME IN'}</button>
 </form><p className="circle-privacy">Your details are used for brand updates. Unsubscribe anytime.</p></>}
 </div><div className="circle-visual" aria-hidden="true"><span className="circle-visual-word">ORIGINAL</span><img className="circle-visual-logo" src="/products/logo.png" alt=""/><img className="circle-visual-model" src="/products/racing-set.png" alt=""/><div className="circle-visual-caption"><strong>MOVE DIFFERENT.</strong></div></div></div>
 </dialog></>;
}
