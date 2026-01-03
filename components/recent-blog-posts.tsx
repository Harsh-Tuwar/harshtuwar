import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import RecentBlogPostsSkeleton from '@/components/skeletons/recent-blog-posts-skeleton';
import { getRecentBlogs } from '@/lib/notion/content';
import { RecentBlogPostsClient } from './recent-blog-posts-client';

export async function RecentBlogPosts() {
  const posts = await getRecentBlogs();

  if (!posts) {
    notFound()
  }

  const recentPosts = posts.slice(0, 3)

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-4">
            <Sparkles className="h-4 w-4" />
            <span>Latest Articles</span>
          </div>
          <h2 className="font-montserrat font-bold text-4xl sm:text-5xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-4">
            Recent Blog Posts
          </h2>
          <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
            Sharing insights, tutorials, and thoughts on modern web development
          </p>
        </div>

        <Suspense fallback={<RecentBlogPostsSkeleton />}>
          <RecentBlogPostsClient posts={recentPosts} />
        </Suspense>

        {/* View All Button */}
        <div className="text-center mt-16">
          <Button
            asChild
            size="lg"
            className="group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
          >
            <Link href="/blog">
              View All Posts
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
