import { Calendar, Clock, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { GetAllBlogsResponse } from '@/types/global.types'

interface BlogPostCardProps {
  post: GetAllBlogsResponse
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article className="relative h-full flex flex-col bg-linear-to-br from-card via-card to-muted/5 rounded-3xl overflow-hidden border border-border/50 hover:border-primary/40 transition-all duration-700 shadow-lg hover:shadow-2xl hover:shadow-primary/10">

        {/* Decorative Corner Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Image Container */}
        <div className="relative h-56 overflow-hidden">
          {/* Subtle overlay for better text contrast */}
          <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-background/20 z-10 mix-blend-multiply" />

          <img
            src={post.heroImage || "/placeholder.svg"}
            alt={post.heroImageName}
            className="w-full h-full object-cover group-hover:scale-105 group-hover:rotate-1 transition-all duration-700 ease-out"
          />

          {/* Floating Category Pills */}
          <div className="absolute top-5 left-5 z-20 flex flex-wrap gap-2">
            {post.category.slice(0, 2).map((cat) => (
              <span
                key={cat.id}
                className="inline-flex items-center px-3 py-1 text-xs font-semibold tracking-wide uppercase bg-primary text-primary-foreground rounded-full shadow-md"
              >
                {cat.name}
              </span>
            ))}
          </div>

          {/* Hover Overlay with Icon */}
          <div className="absolute inset-0 bg-primary/90 z-30 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
            <div className="transform scale-50 group-hover:scale-100 transition-transform duration-500">
              <ArrowUpRight className="w-12 h-12 text-primary-foreground" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="flex-1 flex flex-col p-7 space-y-5">

          {/* Meta Information */}
          <div className="flex items-center gap-5 text-xs text-muted-foreground font-medium">
            <time className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {post.publishedAt}
            </time>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold leading-snug line-clamp-2 text-foreground group-hover:text-primary transition-colors duration-300">
            {post.title}
          </h3>

          {/* Divider */}
          <div className="w-12 h-0.5 bg-linear-to-r from-primary to-transparent group-hover:w-20 transition-all duration-500" />

          {/* Excerpt */}
          <p className="flex-1 text-sm leading-relaxed text-muted-foreground/90 line-clamp-3">
            {post.excerpt}
          </p>

          {/* Tags Section */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-border/30">
            {post.tags.slice(0, 4).map((tag) => (
              <span
                key={tag.id}
                className="inline-flex items-center px-2.5 py-0.5 text-[10px] font-medium tracking-wider uppercase text-muted-foreground/80 bg-muted/50 rounded-md hover:bg-muted hover:text-foreground transition-colors"
              >
                {tag.name}
              </span>
            ))}
            {post.tags.length > 4 && (
              <span className="inline-flex items-center px-2.5 py-0.5 text-[10px] font-medium tracking-wider uppercase text-muted-foreground/60 bg-muted/30 rounded-md">
                +{post.tags.length - 4}
              </span>
            )}
          </div>

          {/* Read More Link */}
          <div className="flex items-center justify-between pt-3">
            <span className="text-sm font-semibold text-primary group-hover:underline underline-offset-4 decoration-2">
              Read more
            </span>
            <ArrowUpRight className="h-5 w-5 text-primary transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </div>
        </div>

        {/* Bottom Accent Line */}
        <div className="h-1 bg-linear-to-r from-transparent via-primary to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
      </article>
    </Link>
  )
}
