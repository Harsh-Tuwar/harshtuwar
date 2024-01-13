import { Client } from '@notionhq/client';
import { NextResponse } from 'next/server';

export async function GET() {
	const notion = new Client({
		auth: process.env.NOTION_API_KEY,
	});

	const data = await notion.databases.query({
		database_id: process.env.NOTION_BOOKS_DATABASE_ID!
	});

	return NextResponse.json(data.results);
};
