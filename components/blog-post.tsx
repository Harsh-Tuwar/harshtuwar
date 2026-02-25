import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GetAllBlogsResponse } from '@/types/global.types'
import { Calendar, Clock, User, ArrowLeft, Eye } from "lucide-react"
import Link from "next/link"
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ShareButton } from '@/components/blog-share-button';

export async function BlogPost({
  markdown,
  metadata
}: {
  markdown: string;
  metadata: GetAllBlogsResponse
}) {
  return (
    <article className="relative">
      {/* Hero Section with Background */}
      <div className="relative bg-linear-to-br from-background via-muted/10 to-background overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to all articles
          </Link>

          {/* Category Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {metadata.category.map((cat) => (
              <span
                key={cat.id}
                className="inline-flex items-center px-3 py-1 text-xs font-semibold tracking-wide uppercase bg-primary text-primary-foreground rounded-full"
              >
                {cat.name}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6 leading-[1.1] tracking-tight">
            {metadata.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-muted-foreground/90 mb-10 leading-relaxed max-w-3xl">
            {metadata.excerpt}
          </p>

          {/* Metadata Bar */}
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-foreground">{metadata.author}</span>
                <span className="text-xs">Author</span>
              </div>
            </div>

            <div className="h-8 w-px bg-border" />

            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="font-medium">{metadata.publishedAt}</span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4 text-primary" />
              <span className="font-medium">{metadata.readTime}</span>
            </div>

            <div className="ml-auto">
              <ShareButton />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image - Full Bleed */}
      <div className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent z-10" />
        <img
          src={metadata.featuredImage || "/placeholder.svg"}
          alt={metadata.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Tags Section */}
        <div className="flex flex-wrap gap-2 mb-12 pb-8 border-b border-border/50">
          {metadata.tags.map((tag) => (
            <span
              key={tag.id}
              className="inline-flex items-center px-3 py-1 text-xs font-medium tracking-wider uppercase text-muted-foreground/80 bg-muted/50 rounded-md hover:bg-muted hover:text-foreground transition-colors"
            >
              {tag.name}
            </span>
          ))}
        </div>

        {/* Post Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground prose-h1:text-4xl prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-p:leading-relaxed prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-a:underline-offset-4 prose-code:bg-muted prose-code:text-primary prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-pre:shadow-sm prose-img:rounded-xl prose-img:shadow-lg prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-muted/30 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:text-muted-foreground prose-ul:my-6 prose-ol:my-6 prose-li:my-2 prose-li:text-muted-foreground prose-hr:border-border prose-th:text-foreground prose-td:text-muted-foreground">
          <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
        </div>

        {/* Post Footer */}
        <footer className="mt-20 pt-10 border-t-2 border-border/50">
          {/* Tags Recap */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              Topics Covered
            </h3>
            <div className="flex flex-wrap gap-2">
              {metadata.tags.map((tag) => (
                <Badge
                  key={tag.id}
                  variant="outline"
                  className="text-sm py-1.5 px-4 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                >
                  {tag.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 bg-muted/30 rounded-2xl border border-border/50">
            <div className="text-center sm:text-left">
              <p className="text-sm text-muted-foreground mb-2">
                Enjoyed this article?
              </p>
              <p className="text-lg font-semibold text-foreground">
                Explore more content
              </p>
            </div>

            <Button asChild size="lg" className="font-semibold shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all">
              <Link href="/blog">
                <Eye className="mr-2 h-4 w-4" />
                View All Articles
              </Link>
            </Button>
          </div>
        </footer>
      </div>
    </article>
  )
}
