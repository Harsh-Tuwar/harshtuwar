import { notion } from '@/lib/notion';
import { GetRecentBlogsResponse, NotionPageProps } from '@/types/global.types';
import { DataSourceObjectResponse, PageObjectResponse, PartialDataSourceObjectResponse, PartialPageObjectResponse } from '@notionhq/client';
import { NextResponse } from 'next/server';

function parseContent(response: (PageObjectResponse | PartialPageObjectResponse | DataSourceObjectResponse | PartialDataSourceObjectResponse)[]): GetRecentBlogsResponse[] {
	return response.map((pageItem) => {
		const id = pageItem.id;
		const itemProps = (pageItem as PageObjectResponse).properties as unknown as NotionPageProps;

		const category = itemProps.category.multi_select;
		const excerpt = itemProps.excerpt.rich_text[0].plain_text;
		const readTime = itemProps.readTime.rich_text[0].plain_text;
		const title = itemProps.title.title[0].plain_text;
		const slug = itemProps.slug.rich_text[0].plain_text;
		const publishedAt = itemProps.publishedAt.rich_text[0].plain_text;
		const dynamicUrl = (pageItem as any).url.replace('https://www.notion.so/', '');

		return {
			id,
			category,
			excerpt,
			readTime,
			title,
			slug,
			publishedAt,
			dynamicUrl
		}
	});
}

export async function GET() {
	try {
		const page = await notion.dataSources.query({
			data_source_id: '2913324a-94d0-80bb-9527-000bf25b39a9'
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
