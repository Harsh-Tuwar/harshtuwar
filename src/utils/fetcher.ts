export const fetcher = (url: string) => fetch(url).then((r) => r.json()).catch((e) => console.log(e));

export const aboutMeFetcher = (url: string) => fetch(url).then(async (res) => {
	const aboutMeRes = await res.json();

	return {
		aboutMe: aboutMeRes.aboutMe,
		workExp: aboutMeRes.workExp,
		certs: aboutMeRes.certs,
		edu: aboutMeRes.eduData
	};
});
