import { Suspense } from 'react';
import { Button } from "@/components/ui/button"
import { siteConfig as config } from '@/lib/metadata'
import { ArrowRight, Github, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"
import HeadlineSkeleton from '@/app/(content)/(home)/HeadlineSkeleton';
import HeadlineContent from '@/app/(content)/(home)/HeadlineContent';

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/50 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="font-montserrat font-black text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight">
                Hi, I'm <span className="text-primary">{config.name}</span>
              </h1>
              <h2 className="font-montserrat font-semibold text-xl sm:text-2xl text-muted-foreground">
                {config.role}
              </h2>
              <Suspense fallback={<HeadlineSkeleton />}>
                <HeadlineContent />
              </Suspense>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="font-semibold">
                <Link href="/projects">
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Get In Touch</Link>
              </Button>
            </div>

            <div className="flex items-center space-x-6">
              <Link
                href="https://github.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </Link>
              <Link
                href="https://linkedin.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link
                href="https://twitter.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </Link>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <img
                  src={config.images.softDevHeadhshot}
                  alt="John Doe - Senior Full Stack Developer"
                  className="w-72 h-72 rounded-full object-cover border-4 border-background shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-accent/10 rounded-full animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
