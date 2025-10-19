import { NextResponse } from 'next/server';
import { GetPageResponse, PageObjectResponse } from '@notionhq/client';
import { GetAllBlogsResponse, NotionPageProps } from '@/types/global.types';
import { notion } from '@/lib/notion';
import { NotionToMarkdown } from "notion-to-md";

const n2m = new NotionToMarkdown({ notionClient: notion });

function parseContent(response: GetPageResponse): GetAllBlogsResponse {
	const id = response.id;
	const itemProps = (response as PageObjectResponse).properties as unknown as NotionPageProps;

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
	const dynamicUrl = (response as any).url.replace('https://www.notion.so/', '');
	const featuredImage = itemProps.featuredImage.files[0].file.url;

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
		dynamicUrl,
		featuredImage
	}
}

export async function GET(
	request: Request,
	{ params }: { params: Promise<{ slug: string }> }
) {
	try {
		const { slug } = await params;

		const metadata = await notion.pages.retrieve({
			page_id: slug,
		});

		const mdblocks = await n2m.pageToMarkdown(slug);
  		const mdString = n2m.toMarkdownString(mdblocks);

		return NextResponse.json({
			success: true,
			slug,
			metadata: parseContent(metadata),
			data: mdString.parent,
		});
	} catch (error) {
		console.error("Fetch Blogs Error: ", error);
		return NextResponse.json({
			error: 'Internal server error!',
		}, { status: 500 });
	}
}
