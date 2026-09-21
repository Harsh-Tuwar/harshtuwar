import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import RecentBlogPostsSkeleton from '@/components/skeletons/recent-blog-posts-skeleton';
import { getRecentBlogs } from '@/lib/notion/content';
import { BlogPostCard } from '@/components/blog-post-card';

export async function RecentBlogPosts() {
  const posts = await getRecentBlogs();

  if (!posts) {
    notFound()
  }

  const recentPosts = posts.slice(0, 3)

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-muted/20 to-background" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-4xl sm:text-5xl text-foreground tracking-tight mb-4">
            Recent Blog Posts
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sharing insights, tutorials, and thoughts on modern web development
          </p>
        </div>

        <Suspense fallback={<RecentBlogPostsSkeleton />}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        </Suspense>

        {/* View All Button */}
        <div className="text-center mt-16">
          <Button
            asChild
            size="lg"
            className="group shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 transition-[box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5"
          >
            <Link href="/blog">
              View All Posts
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200 ease-out" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
