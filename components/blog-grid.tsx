"use client"

import { Suspense, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { GetAllBlogsResponse } from '@/types/global.types'
import BlogGridSkeleton from '@/components/skeletons/blog-grid-skeleton'
import { BlogPostCard } from '@/components/blog-post-card'

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
