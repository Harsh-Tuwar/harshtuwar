import type React from "react"
import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { StructuredData } from "@/components/structured-data"
import { ScrollToTop } from "@/components/scroll-to-top"
import { createMetadata } from "@/lib/metadata"
import "./globals.css"
// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'

// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css'

// used for rendering equations (optional)
import 'katex/dist/katex.min.css'

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "900"],
})

export const metadata: Metadata = createMetadata({})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <head>
        <StructuredData type="Person" />
        <StructuredData type="WebSite" />
        <meta name="theme-color" content="#10b981" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#059669" media="(prefers-color-scheme: dark)" />
      </head>
      <body className="font-sans antialiased theme-transition">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
          storageKey="portfolio-theme"
        >
          {children}
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}
