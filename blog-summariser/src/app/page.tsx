import React from 'react';

import {Button} from '@/components/ui/button';

export default function Heeloo(){

  return (
    <div className='m-10'>
      <div className='h-9 m-6'>
        <h1 className='text-4xl'>Blog Summarizer</h1>
      </div>
      <div className='flex flex-row row items-center justify-center h-screen w-full p-10 bg-blue-500 rounded-4xl'>
        <div className='grid-cols-6 h-96 w-96 m-4 bg-amber-600'>
          <textarea
          className='bg-white w-full h-80 rounded-2xl'
          
          >
            
          </textarea>
          <Button className='bg-blue-100 text-black w-full hover:bg-indigo-400'>Generate Summary</Button>
        </div>
        
        <div className='bg-white grid-cols-6 h-96 w-96 m-4 rounded-2xl p-4'>
          <h1 className='text-2xl'>Summary</h1>
          <div className='bg-slate-500'></div>
        </div>
        

      </div>
    </div>);
}