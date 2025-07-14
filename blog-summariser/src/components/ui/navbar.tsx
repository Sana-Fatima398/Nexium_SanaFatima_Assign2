'use client';
import Link from 'next/link';
import { ModeToggle } from '@/components/ui/mode-toggle';


function Navbar() {
  return (
    <nav className="bg-primary p-4 mb-7 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 text-2xl font-bold text-white">
        <img width="24" height="24" src="https://img.icons8.com/office/40/making-notes.png" alt="making-notes" aria-hidden="true"/>
          Blog Summarizer
        </div>
        <div className="hidden md:flex space-x-6">
        <Link href="/" className="text-white hover:text-gray-200 transition">Home</Link>    
          <a href="/summaries" className="text-white hover:text-gray-200 transition">Summaries</a>
        </div>
        <div>
          <ModeToggle />
        </div>
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

export {Navbar}