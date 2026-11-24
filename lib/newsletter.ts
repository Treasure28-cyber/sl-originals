export type CircleSignup={firstName:string;email:string;birthday:string;consent:true};
export function validateCircleSignup(input:unknown):CircleSignup{
 if(!input||typeof input!=='object')throw new Error('Please complete the form.');
 const value=input as Record<string,unknown>;
 const firstName=typeof value.firstName==='string'?value.firstName.trim():'';
 const email=typeof value.email==='string'?value.email.trim().toLowerCase():'';
 if(firstName.length<1||firstName.length>80)throw new Error('Enter your first name (up to 80 characters).');
 if(email.length>254||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))throw new Error('Enter a valid email address.');
 if(value.consent!==true)throw new Error('Please agree to receive SL ORIGINALS emails.');
 const month=String(value.month||'').trim(),day=String(value.day||'').trim();
 let birthday='';
 if(month||day){const m=Number(month),d=Number(day);if(!/^\d{1,2}$/.test(month)||!/^\d{1,2}$/.test(day)||m<1||m>12||d<1||d>new Date(Date.UTC(2000,m,0)).getUTCDate())throw new Error('Enter a valid birthday month and day, or leave both blank.');birthday=`${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`;}
 return {firstName,email,birthday,consent:true};
}
