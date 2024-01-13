/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		// domains: [
		// 	'www.colorbook.io',
		// 	'picsum.photos',
		// 	'i.gr-assets.com',
		// 	'covers.oreillystatic.com',
		// 	'spin.atomicobject.com',
		// 	'personalmba.com',
		// 	'upload.wikimedia.org',
		// 	'images-na.ssl-images-amazon.com'
		// ],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'www.colorbook.io',
				pathname: '**'
			},
			{
				protocol: 'https',
				hostname: 'picsum.photos',
				pathname: '**'
			},
			{
				protocol: 'https',
				hostname: 'i.gr-assets.com',
				pathname: '**'
			},
			{
				protocol: 'https',
				hostname: 'covers.oreillystatic.com',
				pathname: '**'
			},
			{
				protocol: 'https',
				hostname: 'spin.atomicobject.com',
				pathname: '**'
			},
			{
				protocol: 'https',
				hostname: 'personalmba.com',
				pathname: '**'
			},
			{
				protocol: 'https',
				hostname: 'upload.wikimedia.org',
				pathname: '**'
			},
			{
				protocol: 'https',
				hostname: 'images-na.ssl-images-amazon.com',
				pathname: '**'
			},
		]
	},
}

module.exports = nextConfig
