import { Navigation } from "@/components/navigation"
import { BlogPost } from "@/components/blog-post"
import { StructuredData } from "@/components/structured-data"
import { blogPosts } from "@/lib/blog-data"
import { createMetadata } from "@/lib/metadata"
import { notFound } from "next/navigation"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = blogPosts.find((post) => post.slug === params.slug)

  if (!post) {
    return createMetadata({
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    })
  }

  return createMetadata({
    title: post.title,
    description: post.excerpt,
    url: `/blog/${post.slug}`,
    type: "article",
    image: post.image,
  })
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Navigation />
      <BlogPost post={post} />
      <StructuredData
        type="Article"
        data={{
          headline: post.title,
          description: post.excerpt,
          image: post.image,
          datePublished: post.publishedAt,
          dateModified: post.publishedAt,
          wordCount: post.content.split(" ").length,
          articleSection: post.category,
          keywords: post.tags,
        }}
      />
    </main>
  )
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}
