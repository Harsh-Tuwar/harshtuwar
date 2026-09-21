import { getAllBlogs } from "@/lib/notion/content"
import { siteConfig } from "@/lib/metadata"

/**
 * /llms.txt — a plain-text map of this site for LLM agents.
 *
 * Generated from the same Notion source as the blog so it cannot drift out of
 * date the way a hand-written file would.
 *
 * Worth knowing: llms.txt is a proposed convention, not a standard any major
 * AI vendor has committed to reading. What actually drives citation today is
 * robots.txt, the sitemap, and content being present in the initial HTML.
 * This is cheap insurance, not the mechanism.
 */

const u = (path = "") => `${siteConfig.url}${path}`

export async function GET() {
  const posts = (await getAllBlogs()).filter((post) => post.slug)

  const pages = [
    ["About", "/about", `Background, experience and skills.`],
    ["Blog", "/blog", "All articles."],
    ["Contact", "/contact", "Get in touch."],
    ...(siteConfig.showProjects ? [["Projects", "/projects", "Selected work."] as const] : []),
  ]

  const body = `# ${siteConfig.name}

> ${siteConfig.role} based in ${siteConfig.location.replace(/\s*[\u{1F1E6}-\u{1F1FF}]{2}\s*$/u, "")}. ${siteConfig.description}

Personal site and engineering blog. Writing focuses on frontend systems, React,
Next.js, TypeScript, and lessons from ${new Date().getFullYear() - siteConfig.experienceStartYear}+ years of startup engineering.

## Writing

${posts.map((post) => `- [${post.title}](${u(`/blog/${post.slug}`)}): ${post.excerpt}`).join("\n")}

## Pages

${pages.map(([label, path, note]) => `- [${label}](${u(path)}): ${note}`).join("\n")}

## Contact

- Email: ${siteConfig.author.email}
- GitHub: ${siteConfig.author.github}
- LinkedIn: ${siteConfig.author.linkedin}
- Stack Overflow: ${siteConfig.author.stackoverflow}
`

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  })
}
