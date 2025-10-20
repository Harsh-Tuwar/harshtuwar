import { notion } from '@/lib/notion';
import { RichText, NotionResultItem } from '@/types/global.types';
import { NextResponse } from 'next/server';

function parseBlocks(apiResponse: any): RichText[][] {
  if (!apiResponse?.results) return [];

  return apiResponse.results.map((block: NotionResultItem) => {
    if (block.type === "paragraph" && block.paragraph?.rich_text) {
      return block.paragraph.rich_text.map((rt: any) => ({
        text: rt.plain_text,
        annotations: {
          bold: rt.annotations.bold,
          italic: rt.annotations.italic,
          underline: rt.annotations.underline,
          strikethrough: rt.annotations.strikethrough,
          code: rt.annotations.code,
          color: rt.annotations.color,
        },
      }));
    }
    return [];
  });
}

export async function GET() {
	try {
		const responseFromNotion = await notion.blocks.children.list({
			block_id: '2923324a94d080188a8df932cba65334'
		});

		const paragraphs = parseBlocks(responseFromNotion);

		return NextResponse.json({
			success: true,
			data: paragraphs
		}, { status: 200 });
	} catch (error) {
		console.error("Fetch Content Error: ", error);
		return NextResponse.json({
			error: 'Internal server error!',
		}, { status: 500 });
	}
}
