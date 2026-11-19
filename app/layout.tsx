import type {Metadata} from 'next';
import {Shell} from '@/components/shell';
import {PageMotion} from '@/components/page-motion';
import './globals.css';
export const metadata:Metadata={title:'SL ORIGINALS — Real is Rare',description:'Independent streetwear from Warri. Discover graphic tees, signature sets and everyday originals.'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body><Shell>{children}</Shell><PageMotion/></body></html>}
