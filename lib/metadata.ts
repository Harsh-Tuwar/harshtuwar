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
  url: "https://johndoe.dev",
  ogImage: "https://johndoe.dev/og-image.png",
  author: {
    name: "Harsh Tuwar",
    email: "tuwarharsh08@gmail.com",
    twitter: "@johndoe",
    linkedin: "https://linkedin.com/in/tuwar08",
    github: "https://github.com/harsh-tuwar",
  },
  showBlogs: false,
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
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
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
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
    alternates: {
      canonical: metaUrl,
    },
  }
}
