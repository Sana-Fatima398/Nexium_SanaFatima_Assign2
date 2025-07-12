import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function POST(request: NextRequest) {

    try{
        const { url } = await request.json();
        const response = await axios.get(url, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        });
        const html = response.data as string;
        const $ = cheerio.load(html);
        const text = $('p').map((_, el) => $(el).text().trim()).get().join(' ');

        if (!text) {
        return NextResponse.json({ error: 'No text found on the page' }, { status: 400 });
        }

        return NextResponse.json({ text });
    } 
    catch (error) {
        return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Failed to scrape' },
        { status: 500 }
        );
    }
}
