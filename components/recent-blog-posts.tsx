import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import { GetRecentBlogsResponse } from '@/types/global.types'
import { notFound } from 'next/navigation'

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {recentPosts.map((post) => (
            <Card key={post.slug} className="group hover:shadow-lg transition-all duration-300 border-border/50 pt-6">
              <CardHeader>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                  {post.category.map((cat) => <span className="bg-primary/10 text-primary px-2 py-1 rounded-md font-medium">{cat.name}</span>)}
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {post.publishedAt}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4 leading-relaxed">{post.excerpt}</CardDescription>
                <Button asChild variant="ghost" className="p-2 h-auto font-semibold text-primary">
                  <Link href={`/blog/${post.slug}`}>
                    Read More
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

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
