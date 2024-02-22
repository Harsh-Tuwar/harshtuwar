import { NextResponse } from 'next/server';

const CERTS_DATABASE_ID = 'e7c18a7833534ec083ab9a1d6f3ca2fe';
const WORK_EXP_DATABASE_ID = 'f2281d86df84429385387d6eb97f0fd4';
const EDUCATION_DATABASE_ID = '3e9b9087ea5049b4b5413edcf8d2af2b';
const ABOUT_SECTION_PARAGRAPHS_BLOCK_ID = '4a73a288f1cc4f818d8236128c700d63';

const NOTION_API_ENDPOINT = 'https://api.notion.com/v1';

// TODO: Type this
export async function GET() {
	const educationData: any = [];
	const aboutMeParas: string[] = [];
	const workExData: any = [];
	const certsData: any = [];

	const headers = {
		'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
		'Notion-Version': '2022-06-28'
	};

	const aboutMeReq = await fetch(`${NOTION_API_ENDPOINT}/blocks/${ABOUT_SECTION_PARAGRAPHS_BLOCK_ID}/children`, {
		headers,
		cache: 'no-store'
	});

	const aboutMeRes = await aboutMeReq.json();

	if (aboutMeRes.results.length) {
		// TODO: type this
		aboutMeRes.results.forEach((item: any) => {
			const type = item.type;
			const value = item[type].rich_text;

			if (value && value[0]) {
				aboutMeParas.push(value[0].plain_text)
			}
		});
	}

	const workExpReq = await fetch(`${NOTION_API_ENDPOINT}/databases/${WORK_EXP_DATABASE_ID}/query`, {
		headers,
		method: 'POST',
		cache: 'no-store'
	});

	const workExpRes = await workExpReq.json();

	workExpRes.results.forEach((item: any) => {
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


	const certsReq = await fetch(`${NOTION_API_ENDPOINT}/databases/${CERTS_DATABASE_ID}/query`, {
		headers,
		method: 'POST',
		cache: 'no-store'
	});

	const certsResp = await certsReq.json();

	certsResp.results.forEach((item: any) => {
		const certObj = item.properties;
		const ordinal = certObj['Ordinal']['number'];
		const certName = certObj['CertificateName']['rich_text'];
		const skills = certObj['Skills']['multi_select'];
		const period = certObj['Period']['rich_text'];
		const orgName = certObj['OrgName']['title'];
		const orgLogo = certObj['OrgLogo']['files'];
		const certUrl = certObj['CertURL'];

		certsData.push({
			ordinal: ordinal,
			orgName: orgName[0].plain_text,
			certName: certName[0].plain_text,
			period: period[0].plain_text,
			skills: skills,
			orgLogo: orgLogo[0].file.url,
			url: certUrl.url
		});
	});

	const eduReq = await fetch(`${NOTION_API_ENDPOINT}/databases/${EDUCATION_DATABASE_ID}/query`, {
		headers,
		method: 'POST',
		cache: 'no-store'
	});

	const eduRes = await eduReq.json();

	eduRes.results.forEach((item: any) => {
		const eduObj = item.properties;
		const ordinal = eduObj['Ordinal']['number'];
		const instName = eduObj['InstName']['title'];
		const skills = eduObj['Skills']['multi_select'];
		const period = eduObj['Period']['rich_text'];
		const degreeName = eduObj['DegreeName']['rich_text'];
		const instLogo = eduObj['InstLogo']['files'];
		const instUrl = eduObj['InstURL'];

		educationData.push({
			ordinal,
			instName: instName[0].plain_text,
			skills: skills,
			period: period[0].plain_text,
			degree: degreeName[0].plain_text,
			logo: instLogo[0].file.url,
			url: instUrl.url
		});
	});

	return NextResponse.json({
		aboutMe: aboutMeParas,
		workExp: workExData,
		certs: certsData,
		eduData: educationData
	});
}
