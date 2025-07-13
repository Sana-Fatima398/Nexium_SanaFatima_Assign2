'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();
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
  );
}

export function Navbar() {
  return (
    <nav className="bg-primary p-4 mb-7 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold text-white">
          Blog Summarizer
        </div>
        <div className="hidden md:flex space-x-6">
        <Link href="/" className="text-white hover:text-gray-200 transition">Home</Link>
     
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
}

type Summary = {
  id: number;
  text: string;
  created_at: string;
};

export default function GetSummaries() {
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const supabase = createClient();

  useEffect(() => {
    async function fetchSummaries() {
      const { data, error } = await supabase
        .from('Summary') 
        .select('id, text, created_at')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching summaries:', error);
        alert('Failed to load summaries. Check console for details.');
      } else {
        setSummaries(data || []);
      }
    }
    fetchSummaries();
  }, [supabase]);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-10">
        <h1 className="text-5xl text-center font-bold mb-10">Saved Summaries</h1>
   
      </div>
      <div className="m-10 p-10 bg-secondary rounded-4xl shadow-lg">
      
        {summaries.length === 0 ? (
          <p className="text-center text-lg mb-4">Loading Summaries ...</p>
        ) : (
          <div className="grid gap-4">
            {summaries.map((item) => (
              <div key={item.id} className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
              
                <p><strong>Summary:</strong> {item.text}</p>
           
                <p><strong>Created:</strong> {new Date(item.created_at).toLocaleString('en-US', { timeZone: 'Asia/Karachi' })}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <footer className="bg-primary text-white p-4 mt-10 text-center">
        <p>© {new Date().getFullYear()} Blog Summarizer. All rights reserved.</p>
        <p className="text-sm">Created by <a href=""></a></p>
      </footer>
    </div>
  );
}