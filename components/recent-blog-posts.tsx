import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import { GetRecentBlogsResponse } from '@/types/global.types'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import RecentBlogPostsSkeleton from '@/components/skeletons/recent-blog-posts-skeleton';

const RECENT_BLOGS_ENDPOINT = 'api/content/blogs/recent';

async function getRecentBlogs(): Promise<{
  data: GetRecentBlogsResponse[]
}> {
  const url = process.env?.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

  const res = await fetch(`${url}/${RECENT_BLOGS_ENDPOINT}`, {
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error("Failed to fetch content.");
  }

  const jsonData = await res.json();

  return {
    data: jsonData.data
  }
}

export async function RecentBlogPosts() {
  const response = await getRecentBlogs();

  if (!response) {
    notFound()
  }

  const recentPosts = response.data.slice(0, 3)

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-bold text-3xl sm:text-4xl text-foreground mb-4">Latest Blog Posts</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sharing insights, tutorials, and thoughts on modern web development
          </p>
        </div>

        <Suspense fallback={<RecentBlogPostsSkeleton />}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {recentPosts.map((post) => (
              <Card
                key={post.slug}
                className="group relative overflow-hidden border border-border/50 rounded-2xl shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-500 bg-card"
              >

                {/* Content */}
                <div className="p-6 flex flex-col justify-between h-full">
                  {/* Categories */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.category.map((cat) => (
                      <span
                        key={cat.name}
                        className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full font-medium tracking-wide"
                      >
                        {cat.name}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <CardTitle className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>

                  {/* Meta info */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4 pr-10">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{post.publishedAt}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Excerpt */}
                  <CardDescription className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                  </CardDescription>

                  {/* Read More Button */}
                  <div className="flex justify-end mt-auto">
                    <Button asChild variant="outline" size="sm" className="group/btn text-primary border-primary/40 hover:bg-primary hover:text-background transition">
                      <Link href={`/blog/${post.slug}`}>
                        Read More
                        <ArrowRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>          
        </Suspense>

        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/blog">
              View All Posts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
