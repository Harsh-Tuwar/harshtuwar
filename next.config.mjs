/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    localPatterns: [
      // The Notion image proxy identifies an image by query string, which the
      // default local pattern (`{ pathname: '**', search: '' }`) rejects.
      { pathname: "/api/notion-image" },
      { pathname: "**", search: "" },
    ],
    remotePatterns: [
      { protocol: "https", hostname: "i.scdn.co", pathname: "/**" },
      { protocol: "https", hostname: "prod-files-secure.s3.us-west-2.amazonaws.com", pathname: "/**" },
    ],
  },
}

export default nextConfig
