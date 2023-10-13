const { Client } = require('@notionhq/client');

export default async (_, res) => {
	const notion = new Client({
		auth: process.env.NOTION_API_KEY,
	});

	const aboutMeParas = [];
	const aboutMeSecData = await notion.blocks.children.list({
		block_id: '4a73a288f1cc4f818d8236128c700d63'
	});

	if (aboutMeSecData.results.length) {
		aboutMeSecData.results.forEach((item) => {
			const type = item.type;
			const value = item[type].rich_text;

			if (value && value[0]) {
				aboutMeParas.push(value[0].plain_text)
			}
		});
	}

	const workExData = [];
	const workExpSecData = await notion.databases.query({
		database_id: 'f2281d86df84429385387d6eb97f0fd4'
	});

	workExpSecData.results.forEach((item) => {
		const workExObj = item.properties;
		const tenure = workExObj['Tenure']['rich_text'];
		const ordinal = workExObj['Ordinal']['number'];
		const position = workExObj['Position']['rich_text'];
		const skills = workExObj['Skills']['multi_select'];
		const companyName = workExObj['CompanyName']['title'];
		const compUrl = workExObj['URL'];
		const compLogo = workExObj['CompanyLogo']['files'];

		workExData.push({
			skills: skills,
			ordinal: ordinal,
			tenure: tenure[0].plain_text,
			position: position[0].plain_text,
			companyName: companyName[0].plain_text,
			url: compUrl.url,
			logo: compLogo[0].file.url
		});
	})

	return res.status(200).json({
		aboutMe: aboutMeParas,
		workExp: workExData
	});
};
