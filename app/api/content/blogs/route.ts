import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';
import { DatabaseObjectResponse, PageObjectResponse, PartialDatabaseObjectResponse, PartialPageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { GetAllBlogsResponse, NotionPageProps } from '@/types/global.types';

function parseContent(response: (PageObjectResponse | PartialPageObjectResponse | PartialDatabaseObjectResponse | DatabaseObjectResponse)[]): GetAllBlogsResponse[] {
	return response.map((pageItem) => {
		const id = pageItem.id;
		const itemProps = (pageItem as PageObjectResponse).properties as unknown as NotionPageProps;

		const status = itemProps.status.status;
		const heroImage = itemProps.heroImage.files[0].file.url;
		const tags = itemProps.tags.multi_select;
		const publishedAt = itemProps.publishedAt.rich_text[0].plain_text;
		const heroImageName = itemProps.heroImage.files[0].name;
		const category = itemProps.category.multi_select;
		const excerpt = itemProps.excerpt.rich_text[0].plain_text;
		const slug = itemProps.slug.rich_text[0].plain_text;
		const author = itemProps.author.rich_text[0].plain_text;
		const readTime = itemProps.readTime.rich_text[0].plain_text;
		const title = itemProps.title.title[0].plain_text;
		const dynamicUrl = (pageItem as any).url.replace('https://www.notion.so/', '');

		return {
			id,
			status,
			heroImage,
			heroImageName,
			tags,
			publishedAt,
			category,
			excerpt,
			slug,
			author,
			readTime,
			title,
			dynamicUrl
		}
	});
}

export async function GET() {
	try {
		const notion = new Client({
			auth: process.env.NOTION_API_KEY
		});

		const page = await notion.databases.query({
			database_id: "2543324a94d08091b9eadf72ae36e3c3"
		});

		return NextResponse.json({
			success: true,
			data: parseContent(page.results)
		}, { status: 200 });
	} catch (error) {
		console.error("Fetch Blogs Error: ", error);
		return NextResponse.json({
			error: 'Internal server error!',
		}, { status: 500 });
	}
}
