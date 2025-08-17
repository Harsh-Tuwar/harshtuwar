import { siteConfig } from "@/lib/metadata"

interface StructuredDataProps {
  type: "Person" | "Article" | "WebSite" | "Organization"
  data?: Record<string, any>
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
          potentialAction: {
            "@type": "SearchAction",
            target: `${siteConfig.url}/blog?search={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
          ...data,
        }

      case "Article":
        return {
          ...baseData,
          "@type": "Article",
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
          ...data,
        }

      case "Organization":
        return {
          ...baseData,
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
          logo: `${siteConfig.url}/logo.png`,
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
