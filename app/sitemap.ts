import type { MetadataRoute } from "next"
import { getAllBlogs } from "@/lib/notion/content"
import { siteConfig } from "@/lib/metadata"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getAllBlogs()

  // Anchor static pages to the newest published post rather than "now", so
  // lastmod only moves when something actually changed.
  const lastContentChange = blogPosts
    .map((post) => new Date(post.publishedAt))
    .filter((date) => !Number.isNaN(date.getTime()))
    .sort((a, b) => b.getTime() - a.getTime())[0] ?? new Date()

  const staticPages = [
    {
      url: siteConfig.url,
      lastModified: lastContentChange,
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: lastContentChange,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    ...(siteConfig.showProjects ? [{
      url: `${siteConfig.url}/projects`,
      lastModified: lastContentChange,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }] : []),
    {
      url: `${siteConfig.url}/blog`,
      lastModified: lastContentChange,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/contact`,
      lastModified: lastContentChange,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ]

  // Posts resolve by slug, not id — listing ids here made every blog URL in the
  // sitemap redirect to the homepage.
  const blogPages = blogPosts
    .filter((post) => post.slug)
    .map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))

  return [...staticPages, ...blogPages]
}
