"use client"

import { ArrowRight, Calendar, Clock, Sparkles } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { GetRecentBlogsResponse } from '@/types/global.types';

interface RecentBlogPostsClientProps {
  posts: GetRecentBlogsResponse[]
}

function BlogPostCard({ post, index }: { post: GetRecentBlogsResponse; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/blog/${post.slug}`} className="block group h-full">
        <div className="relative h-full overflow-hidden rounded-2xl bg-background/60 backdrop-blur-xl border border-border/30 shadow-lg shadow-primary/5 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:scale-[1.02] hover:border-primary/40">
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Glow effect */}
          <div className="absolute -inset-px bg-gradient-to-br from-primary/20 via-transparent to-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />

          <div className="relative p-8 flex flex-col h-full">
            {/* Header with categories and sparkle icon */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex flex-wrap gap-2">
                {post.category.map((cat) => (
                  <span
                    key={cat.name}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-primary/20 to-primary/10 text-primary border border-primary/20 backdrop-blur-sm"
                  >
                    {cat.name}
                  </span>
                ))}
              </div>
              <Sparkles className="h-5 w-5 text-primary/40 group-hover:text-primary group-hover:rotate-12 transition-all duration-500" />
            </div>

            {/* Title */}
            <h3 className="font-montserrat text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-6 flex-grow">
              {post.excerpt}
            </p>

            {/* Footer with meta info */}
            <div className="flex items-center justify-between pt-4 border-t border-border/30">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-primary/60" />
                  <span>{post.publishedAt}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-primary/60" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Arrow indicator */}
              <div className="flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:gap-2.5 transition-all duration-300">
                <span className="hidden sm:inline">Read</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export function RecentBlogPostsClient({ posts }: RecentBlogPostsClientProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post, index) => (
        <BlogPostCard key={post.slug} post={post} index={index} />
      ))}
    </div>
  )
}
