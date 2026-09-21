"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import Image from 'next/image'
import { siteConfig as config } from '@/lib/metadata'

function ThemeToggle({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeToggle = () => {
    const currentTheme = resolvedTheme || theme
    setTheme(currentTheme === "dark" ? "light" : "dark")
  }

  return (
    <button
      onClick={handleThemeToggle}
      // `relative` gives the stacked icons a containing block; without it the
      // absolutely positioned moon resolved against the fixed <nav>.
      className={cn(
        "relative inline-flex items-center justify-center h-9 w-9 rounded-md text-foreground/80 hover:text-primary hover:bg-primary/10",
        className,
      )}
      aria-label="Toggle theme"
    >
      {/* Rendered only after mount: the server cannot know the resolved theme,
          and announcing the wrong one is worse than announcing none. */}
      {mounted && (
        <>
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform duration-200 dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform duration-200 dark:rotate-0 dark:scale-100" />
        </>
      )}
    </button>
  )
}

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    handleScroll()
    // A scroll listener that never calls preventDefault should say so, or it
    // blocks the compositor on every frame.
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    ...(config.showProjects ? [{ href: "/projects", label: "Projects" }] : []),
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ]

  const isActiveLink = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href))

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-[background-color,border-color,box-shadow] duration-200",
        isScrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="shrink-0 rounded-md" aria-label={`${config.name} — home`}>
            <Image
              src={config.images.htLogo}
              width={44}
              height={44}
              alt=""
              priority
              /* The mark is a near-black glyph on transparency, so it
                 disappears against the dark theme's background. */
              className="h-11 w-11 object-contain dark:invert"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActiveLink(item.href) ? "page" : undefined}
                className={cn(
                  "relative text-sm font-medium hover:text-primary",
                  isActiveLink(item.href)
                    ? "text-primary after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full"
                    : "text-foreground/80",
                )}
              >
                {item.label}
              </Link>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="hover:bg-primary/10"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        <div
          id="mobile-nav"
          // Collapsing with max-height alone left the links keyboard-focusable
          // and screen-reader visible while the menu looked closed.
          inert={!isMobileMenuOpen}
          className={cn(
            "md:hidden overflow-hidden transition-[max-height,opacity] duration-200 ease-out",
            isMobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="bg-background/95 backdrop-blur-sm border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActiveLink(item.href) ? "page" : undefined}
                  className={cn(
                    "block px-3 py-2 rounded-md text-sm font-medium",
                    isActiveLink(item.href)
                      ? "text-primary bg-primary/10"
                      : "text-foreground/80 hover:text-primary hover:bg-primary/5",
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
