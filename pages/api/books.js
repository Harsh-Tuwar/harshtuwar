const { Client } = require('@notionhq/client');

// eslint-disable-next-line import/no-anonymous-default-export
export default async (_, res) => {
	const notion = new Client({
		auth: process.env.NOTION_API_KEY,
	});

	const data = await notion.databases.query({ database_id: process.env.NOTION_BOOKS_DATABASE_ID });

	return res.status(200).json(data.results);
};
