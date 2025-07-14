import connectDB from "../../../../lib/mongoose";
import Blog from "../../../../models/blog";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();
        const { url, text } = await request.json();
        const newBlog = new Blog({ url, text });
        await newBlog.save();
        return NextResponse.json({ message: "Blog saved successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error saving blog:", error);
        return NextResponse.json({ error: "Failed to save blog" }, { status: 500 });
    }
}               