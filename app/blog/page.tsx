import { Navigation } from "@/components/navigation"
import { BlogHero } from "@/components/blog-hero"
import { BlogGrid } from "@/components/blog-grid"
import { createMetadata } from "@/lib/metadata"

export const metadata = createMetadata({
  title: "Blog",
  description:
    "Read my latest articles on web development, React, Next.js, TypeScript, and modern programming techniques.",
  url: "/blog",
})

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <BlogHero />
      <BlogGrid />
    </main>
  )
}
