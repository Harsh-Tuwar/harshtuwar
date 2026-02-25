"use client"

import { Suspense, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ChevronDown, ChevronUp } from "lucide-react"
import { GetAllBlogsResponse } from '@/types/global.types'
import BlogGridSkeleton from '@/components/skeletons/blog-grid-skeleton'
import { BlogPostCard } from '@/components/blog-post-card'

const COLLAPSED_LIMIT = 6

interface BlogGridProps {
  initialBlogs: GetAllBlogsResponse[]
}

export function BlogGrid({ initialBlogs }: BlogGridProps) {
  const categories = Array.from(new Set(initialBlogs.flatMap((post) => post.category.map((c) => c.name))))
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [showAll, setShowAll] = useState(false)

  const visibleCategories = showAll ? categories : categories.slice(0, COLLAPSED_LIMIT)
  const hiddenCount = categories.length - COLLAPSED_LIMIT

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    )
  }

  const filteredPosts = initialBlogs.filter((post: GetAllBlogsResponse) => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.some((cat) => post.category.some((c) => c.name === cat))
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
        <div className="mb-12 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Tag cloud */}
          <div className="flex flex-wrap gap-2 items-center">
            <button
              onClick={() => setSelectedCategories([])}
              className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors ${
                selectedCategories.length === 0
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted/50 text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
              }`}
            >
              All
            </button>

            {visibleCategories.map((category) => {
              const isActive = selectedCategories.includes(category)
              return (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary border-primary/40"
                      : "bg-muted/50 text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              )
            })}

            {categories.length > COLLAPSED_LIMIT && (
              <button
                onClick={() => setShowAll((prev) => !prev)}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {showAll ? (
                  <>Show less <ChevronUp className="h-3.5 w-3.5" /></>
                ) : (
                  <>+{hiddenCount} more <ChevronDown className="h-3.5 w-3.5" /></>
                )}
              </button>
            )}
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
                setSelectedCategories([])
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
