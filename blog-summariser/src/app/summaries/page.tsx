'use client';
import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client'; 
import { Navbar } from '@/components/ui/navbar'; 




export default function GetSummaries() {
  
  type Summary = {
    id: number;
    text: string;
    created_at: string;
  };

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
        <h1 className="text-5xl text-center font-bold">Saved Summaries</h1>
   
      </div>
      <div className="m-8 p-10">
      
        {summaries.length === 0 ? (
          <p className="text-center text-lg mb-4">Loading Summaries ...</p>
        ) : (
          <div className="grid gap-6">
            {summaries.map((item) => (
              <div key={item.id} className="border bg-secondary border-gray-200 dark:border-gray-700 p-4 rounded-lg shadow-lg">
              <h2 className='font-bold m-2'>Summary:</h2>
                <p className='m-2 text-justify'>{item.text}</p>
           
                <p className='m-2'><strong>Created:</strong> {new Date(item.created_at).toLocaleString('en-US', { timeZone: 'Asia/Karachi' })}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <footer className="bg-primary text-white p-4 mt-10 text-center">
        <p>© {new Date().getFullYear()} Blog Summarizer. All rights reserved.</p>
        <p className="text-sm">Created by Sana Fatima</p>
      </footer>
    </div>
  );
}