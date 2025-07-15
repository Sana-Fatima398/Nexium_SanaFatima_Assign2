import connectDB from "../../../../lib/mongoose";
import Blog from "../../../../models/blog";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const blogs = await Blog.find();
        return NextResponse.json(blogs, { status: 200 });
    } catch (error) {
        console.error("Error reaading blog:", error);
        return NextResponse.json({ error: "Failed to read blog" }, { status: 500 });
    }
}               