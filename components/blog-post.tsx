import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"
import type { blogPosts } from "@/lib/blog-data"

interface BlogPostProps {
  post: (typeof blogPosts)[0]
}

export function BlogPost({ post }: BlogPostProps) {
  return (
    <article className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-8 -ml-4">
          <Link href="/blog">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </Button>

        {/* Post Header */}
        <header className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {post.category}
            </Badge>
          </div>

          <h1 className="font-montserrat font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="font-inter text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">{post.excerpt}</p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {post.author}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {post.publishedAt}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </div>
            <Button variant="ghost" size="sm" className="ml-auto">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-12">
          <img
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Post Content */}
        <div className="prose prose-lg max-w-none prose-headings:font-montserrat prose-headings:font-semibold prose-p:font-inter prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-muted prose-pre:border">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Post Footer */}
        <footer className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">Tags:</span>
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <Button asChild>
              <Link href="/blog">View All Posts</Link>
            </Button>
          </div>
        </footer>
      </div>
    </article>
  )
}
