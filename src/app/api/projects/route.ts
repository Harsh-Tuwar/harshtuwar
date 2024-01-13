import { Client } from '@notionhq/client';
import { NextResponse } from 'next/server';

const PROJECTS_DATABASE_ID = 'daa316e4bf1c45a2943ae6de7c3d4970';

// TODO: type this
export async function GET() {
	const notion = new Client({
		auth: process.env.NOTION_API_KEY,
	});

	const projects: any[] = [];

	const projectsData = await notion.databases.query({
		database_id: PROJECTS_DATABASE_ID
	});

	projectsData.results.forEach((project: any) => {
		const projObj = project.properties;
		const title = projObj['projectTitle']['title'];
		const image = projObj['image']['files'];
		const site = projObj['site'];
		const github = projObj['github'];
		const description = projObj['description']['rich_text'];
		const skills = projObj['techStack']['multi_select'];
		const ordinal = projObj['ordinal']['number'];

		projects.push({
			ordinal,
			title: title[0].plain_text,
			image: image[0].file.url,
			site: site.url,
			github: github.url,
			description: description[0].plain_text,
			skills
		});
	});

	return NextResponse.json({
		projects
	});
}