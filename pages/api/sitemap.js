// eslint-disable-next-line import/no-anonymous-default-export
export default async (_, res) => {
	res.setHeader('Content-Type', 'text/xml');
	res.write(`<?xml version="1.0" encoding="UTF-8"?>
	<urlset
		  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
		  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
				http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
	<url>
	  <loc>https://www.harshtuwar.ml/</loc>
	  <lastmod>2022-04-11T03:05:16+00:00</lastmod>
	  <priority>1.00</priority>
	</url>
	<url>
	  <loc>https://www.harshtuwar.ml/about</loc>
	  <lastmod>2022-04-11T03:05:16+00:00</lastmod>
	  <priority>0.80</priority>
	</url>
	<url>
	  <loc>https://www.harshtuwar.ml/projects</loc>
	  <lastmod>2022-04-11T03:05:16+00:00</lastmod>
	  <priority>0.80</priority>
	</url>
	<url>
	  <loc>https://www.harshtuwar.ml/contact</loc>
	  <lastmod>2022-04-11T03:05:16+00:00</lastmod>
	  <priority>0.80</priority>
	</url>
	
	
	</urlset>
	`);

	res.end();

	return res.status(200);
}
