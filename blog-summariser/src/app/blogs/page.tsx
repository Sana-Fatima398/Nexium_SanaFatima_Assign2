'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar } from '@/components/ui/navbar'; 


interface Blog {
  _id: string,
  url: string,
  text: string
}


export default function GetBlogs() {

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [errors, setErrors] = useState<string | null>();
  
  useEffect(() => {
    const readBlogs = async () => {
      try{
        const response = await axios.get<Blog[]>('/api/readBlog');
        if(response.status === 200){
          setBlogs(response.data);
          console.log("data  received");
        }
      }
      catch(errors){
        console.error('Error fetching blogs:', errors);
        setErrors("Failed to read blogs");
      }
    }
    readBlogs();
  },  []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-10">
        <h1 className="text-5xl text-center font-bold">Blogs</h1>
   
        </div>
          <div className="m-8 p-10">
            {errors && <p style={{ color: "red" }}>{errors}</p>}
            {blogs.length === 0 ? (
                <p className="text-center text-lg mb-4">Loading Blogs ...</p>
              ) : (
                <div className="grid gap-6">
                  {blogs.map((blog) => (
                    <div key={blog._id} className="border bg-secondary border-gray-200 dark:border-gray-700 p-4 rounded-lg shadow-lg">
                    <h2 className='font-bold m-2'><a href={blog.url}>{blog.url}</a></h2>
                      <p className='m-2 text-justify'>{blog.text}</p>
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