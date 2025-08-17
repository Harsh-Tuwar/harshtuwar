import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { RecentBlogPosts } from "@/components/recent-blog-posts"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <RecentBlogPosts />
    </main>
  )
}
