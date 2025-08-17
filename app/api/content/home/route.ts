import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

type RichText = {
  text: string;
  annotations: {
    bold: boolean;
    italic: boolean;
    underline: boolean;
    strikethrough: boolean;
    code: boolean;
    color: string;
  };
};

interface NotionResultItem { 
	type: string
	paragraph: {
		rich_text: [
			type: string,
			plain_text: string,
			annotation: {
				bold: boolean,
				italic: boolean,
				strikethrough: boolean,
				underline: boolean,
				code: boolean,
				color: string
			}
		]
	}
}


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
		const notion = new Client({
			auth: process.env.NOTION_API_KEY,
		});

		const responseFromNotion = await notion.blocks.children.list({
			block_id: "02c78ac2798b4a5095299849ae322874",
		});

		const paragraphs = parseBlocks(responseFromNotion);
		
		return NextResponse.json({
			success: true,
			data: paragraphs
		}, { status: 200 })
	} catch (error) {
		console.error("Fetch Content Error: ", error);
		return NextResponse.json({
			error: 'Internal server error!',
		}, { status: 500 });
	}
}
