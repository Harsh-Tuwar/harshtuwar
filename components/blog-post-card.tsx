import { Calendar, Clock, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { GetAllBlogsResponse } from '@/types/global.types'

interface BlogPostCardProps {
  post: GetAllBlogsResponse
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article className="relative h-full flex flex-col bg-card rounded-2xl overflow-hidden border border-border/60 hover:border-primary/40 transition-[border-color,box-shadow,transform] duration-200 ease-out shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-0.5">

        {/* Image Container */}
        <div className="relative h-56 overflow-hidden bg-muted">
          {post.heroImage ? (
            <Image
              src={post.heroImage}
              /* The title sits directly below, so repeating it here — or worse,
                 reading out the upload's filename — only adds noise. */
              alt=""
              fill
              /* Notion serves the original upload; one hero is 5740px wide.
                 Routing it through the optimizer ships a card-sized image. */
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-[1.03] transition-transform duration-300 ease-out"
            />
          ) : (
            <div className="w-full h-full bg-linear-to-br from-muted to-card" />
          )}

          {/* Floating Category Pills */}
          <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap gap-2">
            {post.category.slice(0, 2).map((cat) => (
              <span
                key={cat.id}
                className="inline-flex items-center px-3 py-1 text-xs font-semibold tracking-wide uppercase bg-primary text-primary-foreground rounded-full shadow-md"
              >
                {cat.name}
              </span>
            ))}
          </div>
        </div>

        {/* Content Container */}
        <div className="flex-1 flex flex-col p-6 space-y-4">

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
          <h3 className="text-xl font-bold leading-snug line-clamp-2 text-foreground group-hover:text-primary transition-colors duration-150">
            {post.title}
          </h3>

          {/* Divider */}
          <div className="w-12 h-0.5 bg-linear-to-r from-primary to-transparent group-hover:w-20 transition-[width] duration-300 ease-out" />

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
            <ArrowUpRight className="h-5 w-5 text-primary transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 ease-out" />
          </div>
        </div>

        {/* Bottom Accent Line */}
        <div className="h-0.5 bg-linear-to-r from-transparent via-primary to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
      </article>
    </Link>
  )
}
