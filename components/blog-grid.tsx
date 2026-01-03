"use client"

import { Suspense, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, Search } from "lucide-react"
import Link from "next/link"
import { GetAllBlogsResponse } from '@/types/global.types'
import BlogGridSkeleton from '@/components/skeletons/blog-grid-skeleton'

const categories = ["All", "React", "NextJS", "TypeScript", "Web Development", "Performance", "Tutorial"]

interface BlogGridProps {
  initialBlogs: GetAllBlogsResponse[]
}

export function BlogGrid({ initialBlogs }: BlogGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const blogPosts = initialBlogs

  const filteredPosts = blogPosts && blogPosts.filter((post: GetAllBlogsResponse) => {
    const matchesCategory = selectedCategory === "All" || post.category.findIndex((ic) => ic.name === selectedCategory) !== -1
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.name.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesCategory && matchesSearch
  })

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search and Filter Controls */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

  
        {/* Blog Posts Grid */}
        <Suspense fallback={<BlogGridSkeleton />}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts?.map((post: GetAllBlogsResponse) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        </Suspense>

        {filteredPosts?.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No posts found matching your criteria.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All")
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

interface BlogPostCardProps {
  post: GetAllBlogsResponse
}

function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/20 h-full flex flex-col">
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={post.heroImage || "/placeholder.svg"}
          alt={post.heroImageName}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 brightness-70"
        />
        <div className="absolute top-4 right-4 space-x-1">
          {post.category.map((i) => {
            return <Badge key={i.id} variant="secondary" className="bg-background/95 text-primary hover:text-primary hover:bg-background/95">{i.name}</Badge>
          })}
        </div>
      </div>

      <CardHeader className="flex-1">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {post.publishedAt}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {post.readTime}
          </div>
        </div>

        <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">{post.title}</CardTitle>
        <CardDescription className="leading-relaxed line-clamp-3">{post.excerpt}</CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag.id} variant="outline" className="text-xs">
                {tag.name}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{post.tags.length - 3}
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {/* <User className="h-4 w-4" /> */}
              {/* {post.author} */}
            </div>

            <Button asChild size="sm" variant="ghost" className="text-primary hover:text-background">
              <Link href={`/blog/${post.id}`} >Read More →</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
