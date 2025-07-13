'use client';
import React from 'react';
import { useState } from 'react';
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import dictionary from './dictionary';
import { createClient } from '@/utils/supabase/client';

import {Button} from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


export function ModeToggle() {
  const { setTheme } = useTheme()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export function Navbar () {
  return (
    <nav className="bg-primary p-4 mb-7 shadow-md">
      <div className="container mx-auto flex items-center justify-between">

        <div className="text-2xl font-bold text-white">
          Blog Summarizer
        </div>

  
        <div className="hidden md:flex space-x-6">
          <a href="/app/" className="text-white hover:text-gray-200 transition">Home</a>
          <a href="/about" className="text-white hover:text-gray-200 transition">About</a>
          <a href="/summaries" className="text-white hover:text-gray-200 transition">Summaries</a>
          <a href="/contact" className="text-white hover:text-gray-200 transition">Contact</a>
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
};
export default function Summarizers(){

  const [url, setUrl] = useState('');
  const [scrapedText, setScrapedText] = useState('');
  const [summary, setSummary] = useState('');
  const [urduTranslation, setUrduTranslation] = useState('');
  const supabase = createClient();

  const summarizeText = (text: string): string => {
    const sentences = text.split('.').filter((s) => s.trim());
    const keySentences = sentences
      .filter((s) => s.split(' ').length > 7) 
      .slice(0, 10); 
    return keySentences.join('. ') + (keySentences.length > 0 ? '.' : '');
  };

  const translateToUrdu = (text: string): string => {
    let translated = text;
    for (const [en, ur] of Object.entries(dictionary)) {
      translated = translated.replace(new RegExp(`\\b${en}\\b`, 'gi'), ur as string);
    }
    
    const sentences = translated.split('.').filter((s) => s.trim());
    const adjustedSentences = sentences.map((s) => {
      const words = s.trim().split(' ');
      if (words.length > 2) {
        const subject = words.slice(0, -2).join(' ');
        const verb = words[words.length - 1];
        const object = words[words.length - 2];
        return `${subject} ${object} ${verb}`;
      }
      return s;
    });
    return adjustedSentences.join('۔ ') + (adjustedSentences.length > 0 ? '۔' : '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
     try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to scrape');
      
      setScrapedText(data.text);
      const summaryText = summarizeText(data.text);
      setSummary(summaryText);
      setUrduTranslation(translateToUrdu(summaryText));
      
      const { error } = await supabase
        .from('Summary')
        .insert([
          { text:summaryText },
        ]);
        if(error){
        console.error('Supabase insert error:', error);
        alert('Failed to save summary to database. Check console for details.');
        }

     
    } 
    catch (err) {
      console.error('Error:', err);
      setScrapedText('');
      setSummary('');
      alert('Failed to scrape the URL. Please check the console for details.');
    } 
  }
  return (
    <div className=''>
      <Navbar/>
      
      <div className='m-10 p-10 bg-secondary rounded-4xl shadow-lg'>
        <h1 className='text-4xl text-center font-bold mb-4'>Blog Summarizer</h1>
        <p className='text-center text-lg mb-8'>Enter a blog URL to get a concise summary of its content.</p>
        <form onSubmit={handleSubmit}>
          <textarea
          className='bg-white w-full h-20 p-4 rounded-sm'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder=" Enter blog URL (e.g., https://example.com/blog)"
          
          >
            
          </textarea>

          <Button className='bg-primary text-black w-full hover:bg-violet-400'>Make scrape</Button>
        </form>
      </div>
        <div className='m-10 p-10 bg-secondary rounded-4xl shadow-lg'>
        <h2 className='text-4xl text-center font-bold m-5'>Urdu Translation</h2>
        <p className='text-justify text-lg mb-4'>{urduTranslation}</p>
      </div>
      <div className='m-10 p-10 bg-secondary rounded-4xl shadow-lg'>
        <h2 className='text-4xl text-center font-bold m-5'>Scraped Text</h2>
        <p className='text-justify text-lg mb-4'>{scrapedText}</p>
      </div>
      <div className='m-10 p-10 bg-secondary rounded-4xl shadow-lg'>
        <h2 className='text-4xl text-center font-bold m-5'>Summary</h2>
        <p className='text-justify text-lg mb-4'>{summary}</p>
      </div>
    
      <footer className='bg-primary text-white p-4 mt-10 text-center'>
        <p>&copy; {new Date().getFullYear()} Blog Summarizer. All rights reserved.</p>
        <p className='text-sm'>Created by <a href=''></a></p>
        </footer>
    </div>);
}