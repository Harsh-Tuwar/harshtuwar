import { Navigation } from "@/components/navigation"
import { BlogPost } from "@/components/blog-post"
import { StructuredData } from "@/components/structured-data"
import { createMetadata } from "@/lib/metadata"
import { notFound } from "next/navigation"
import { getBlogPost } from '@/lib/notion/content';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const response = await getBlogPost(slug);
  const metadata = response.metadata;

  if (!metadata) {
    return createMetadata({
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    })
  }

  return createMetadata({
    title: metadata.title,
    description: metadata.excerpt,
    url: `/blog/${metadata.dynamicUrl}`,
    type: "article",
    image: metadata.heroImage,
  })
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const response = await getBlogPost(slug);
  
  if (!response) {
    notFound()
  }

  const post = response.metadata;
  const markdown = response.markdown;
  
  return (
    <main className="min-h-screen">
      <Navigation />
      
      <BlogPost markdown={markdown} metadata={post} />

      <StructuredData
        type="Article"
        data={{
          headline: post.title,
          description: post.excerpt,
          image: post.heroImage,
          datePublished: post.publishedAt,
          dateModified: post.publishedAt,
          articleSection: post.category,
          keywords: post.tags,
        }}
      />
    </main>
  )
}
