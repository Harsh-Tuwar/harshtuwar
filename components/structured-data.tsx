import { siteConfig } from "@/lib/metadata"

interface StructuredDataProps {
  type: "Person" | "Article" | "WebSite" | "Organization" | "BreadcrumbList"
  data?: Record<string, any>
}

/**
 * schema.org URLs must be absolute. Next's `metadataBase` resolves relative
 * URLs for <meta> tags but does nothing for hand-built JSON-LD, so hero images
 * were being emitted as "/api/notion-image?..." and ignored by rich results.
 */
function absolute(url?: string): string | undefined {
  if (!url) return undefined
  return url.startsWith("http") ? url : `${siteConfig.url}${url.startsWith("/") ? "" : "/"}${url}`
}

export function StructuredData({ type, data = {} }: StructuredDataProps) {
  const getStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
    }

    switch (type) {
      case "Person":
        return {
          ...baseData,
          "@type": "Person",
          name: siteConfig.author.name,
          url: siteConfig.url,
          email: siteConfig.author.email,
          jobTitle: "Senior Full Stack Developer",
          worksFor: {
            "@type": "Organization",
            name: "Freelance",
          },
          sameAs: [
            siteConfig.author.linkedin,
            siteConfig.author.github,
            `https://twitter.com/${siteConfig.author.twitter.replace("@", "")}`,
          ],
          knowsAbout: [
            "JavaScript",
            "TypeScript",
            "React",
            "Next.js",
            "Node.js",
            "Web Development",
            "Full Stack Development",
          ],
          ...data,
        }

      case "WebSite":
        return {
          ...baseData,
          "@type": "WebSite",
          name: siteConfig.name,
          url: siteConfig.url,
          description: siteConfig.description,
          author: {
            "@type": "Person",
            name: siteConfig.author.name,
          },
          ...data,
        }

      case "Article": {
        const { image, url, ...rest } = data
        return {
          ...baseData,
          "@type": "Article",
          ...(url ? { mainEntityOfPage: { "@type": "WebPage", "@id": absolute(url) } } : {}),
          author: {
            "@type": "Person",
            name: siteConfig.author.name,
            url: siteConfig.url,
          },
          publisher: {
            "@type": "Person",
            name: siteConfig.author.name,
            url: siteConfig.url,
          },
          ...(absolute(image) ? { image: absolute(image) } : {}),
          ...rest,
        }
      }

      case "BreadcrumbList":
        return {
          ...baseData,
          "@type": "BreadcrumbList",
          itemListElement: (data.items ?? []).map(
            (item: { name: string; url: string }, i: number) => ({
              "@type": "ListItem",
              position: i + 1,
              name: item.name,
              item: absolute(item.url),
            }),
          ),
        }

      case "Organization":
        return {
          ...baseData,
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
          logo: `${siteConfig.url}/images/HT_Logo.png`,
          sameAs: [
            siteConfig.author.linkedin,
            siteConfig.author.github,
            `https://twitter.com/${siteConfig.author.twitter.replace("@", "")}`,
          ],
          ...data,
        }

      default:
        return baseData
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData()),
      }}
    />
  )
}
