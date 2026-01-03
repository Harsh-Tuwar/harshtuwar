import type { MetadataRoute } from "next"
import { getAllBlogs } from "@/lib/notion/content"
import { siteConfig } from "@/lib/metadata"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    // {
    //   url: `${siteConfig.url}/projects`,
    //   lastModified: new Date(),
    //   changeFrequency: "monthly" as const,
    //   priority: 0.8,
    // },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ]

  const blogPosts = await getAllBlogs();

  const blogPages = blogPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.id}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...staticPages, ...blogPages]
}
