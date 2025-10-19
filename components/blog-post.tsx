import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GetAllBlogsResponse } from '@/types/global.types'
import { Calendar, Clock, User, ArrowLeft, Share2 } from "lucide-react"
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
            {metadata.category.map((cat) => (
              <Badge key={cat.id} variant="secondary" className="bg-primary/10 text-primary">
                {cat.name}
              </Badge>
            ))}
          </div>

          <h1 className="font-montserrat font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
            {metadata.title}
          </h1>

          <p className="font-inter text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">{metadata.excerpt}</p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {metadata.author}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {metadata.publishedAt}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {metadata.readTime}
            </div>
            {/* <Button variant="ghost" size="sm" className="ml-auto" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button> */}
            <ShareButton />
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {metadata.tags.map((tag) => (
              <Badge key={tag.id} variant="outline" className="text-xs">
                {tag.name}
              </Badge>
            ))}
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-12">
          <img
            src={metadata.featuredImage || "/placeholder.svg"}
            alt={metadata.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Post Content */}
        <div className="prose prose-lg max-w-none prose-headings:font-montserrat prose-headings:font-semibold prose-p:font-inter prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-muted prose-pre:border">
          <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
        </div>

        {/* Post Footer */}
        <footer className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">Tags:</span>
              {metadata.tags.map((tag) => (
                <Badge key={tag.id} variant="outline" className="text-xs">
                  {tag.name}
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
