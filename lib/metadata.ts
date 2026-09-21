import type { Metadata } from "next"

export const siteConfig = {
  name: "Harsh Tuwar",
  role: "Senior Full Stack Developer",
  title: "Harsh Tuwar | Senior Full Stack Developer",
  location: "Toronto, ON, Canada 🇨🇦",
  experienceStartYear: 2019,
  allowResumeDownload: false,
  description:
    "Personal portfolio and blog of Harsh Tuwar, a Senior Full Stack Developer specializing in modern web technologies, React, Next.js, TypeScript and cloud specialist.",
  url: "https://harshtuwar.vercel.app",
  ogImage: "/opengraph-image.png",
  author: {
    name: "Harsh Tuwar",
    email: "tuwarharsh08@gmail.com",
    twitter: "@harshtuwar",
    linkedin: "https://linkedin.com/in/tuwar08",
    github: "https://github.com/harsh-tuwar",
    stackoverflow: "https://stackoverflow.com/users/10497679/harsh-tuwar",
  },
  showBlogs: false,
  showProjects: false,
  images: {
    htLogo: '/images/HT_Logo.png',
    softDevHeadhshot: '/images/software-developer-headshot.png',
    manCoding: 'images/undraw_developer-avatar_f6ac.svg'
  },
  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "JavaScript",
    "Web Development",
    "Frontend",
    "Backend",
    "Portfolio",
    "Blog",
  ],
}

export function createMetadata({
  title,
  description,
  image,
  url,
  type = "website",
}: {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: "website" | "article"
}): Metadata {
  const metaTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title
  const metaDescription = description || siteConfig.description
  const metaImage = image || siteConfig.ogImage
  const metaUrl = url ? `${siteConfig.url}${url}` : siteConfig.url

  return {
    // Lets Next resolve relative image and canonical URLs to absolute ones,
    // which crawlers and social scrapers require.
    metadataBase: new URL(siteConfig.url),
    title: metaTitle,
    description: metaDescription,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
    creator: siteConfig.author.name,
    publisher: siteConfig.author.name,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type,
      locale: "en_US",
      url: metaUrl,
      title: metaTitle,
      description: metaDescription,
      siteName: siteConfig.name,
      images: [
        image
          ? { url: image, alt: metaTitle }
          : { url: siteConfig.ogImage, width: 1200, height: 630, alt: metaTitle },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
      creator: siteConfig.author.twitter,
    },
    icons: {
      icon: [
        { url: "/icon.png", sizes: "any" },
        { url: "/images/HT_Logo.png", sizes: "1024x1024", type: "image/png" },
      ],
      apple: [
        { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION in Vercel to verify the property
    // in Google Search Console without redeploying code.
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
      : {}),
    manifest: "/manifest.webmanifest",
    alternates: {
      canonical: metaUrl,
    },
  }
}
