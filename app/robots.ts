import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/metadata"

/**
 * Crawlers that retrieve pages to answer questions and cite sources. These are
 * the ones that decide whether this site can show up in ChatGPT, Claude,
 * Perplexity or Siri answers, so they get an explicit allow rather than relying
 * on the wildcard rule.
 */
const AI_SEARCH_CRAWLERS = [
  "OAI-SearchBot", // ChatGPT search
  "ChatGPT-User", // ChatGPT browsing on a user's behalf
  "Claude-SearchBot", // Claude search
  "Claude-User", // Claude browsing on a user's behalf
  "PerplexityBot", // Perplexity
  "Applebot", // Siri / Spotlight, renders JS
  "Applebot-Extended",
]

/**
 * Crawlers that collect text for model training rather than for answering a
 * live question. Blocking these does NOT reduce visibility in AI answers —
 * the search crawlers above are separate user agents.
 *
 * They are allowed today because the goal here is maximum reach. To opt out of
 * model training, add this to `rules` below:
 *
 *   { userAgent: AI_TRAINING_CRAWLERS, disallow: "/" },
 */
export const AI_TRAINING_CRAWLERS = [
  "GPTBot", // OpenAI training
  "ClaudeBot", // Anthropic training
  "Google-Extended", // Gemini training
  "CCBot", // Common Crawl
  "Bytespider", // ByteDance
  "Meta-ExternalAgent", // Meta
]

export default function robots(): MetadataRoute.Robots {
  // The Notion image proxy lives under /api/ but serves the hero images used in
  // link previews and image search, so it has to stay crawlable. The longer,
  // more specific Allow wins over the Disallow.
  const allow = ["/", "/api/notion-image"]
  const disallow = ["/api/"]

  return {
    rules: [
      { userAgent: "*", allow, disallow },
      { userAgent: AI_SEARCH_CRAWLERS, allow, disallow },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  }
}
