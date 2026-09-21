import { notion } from "@/lib/notion"

/**
 * Stable URLs for images stored in Notion.
 *
 * Notion hands out S3 URLs signed with `X-Amz-Expires=3600`. Any such URL baked
 * into a page that then gets statically cached is dead an hour later, which is
 * why every image on a prerendered page eventually 403s. Pages embed a URL
 * pointing here instead; we resolve a fresh signed URL per request and stream
 * the bytes back under a URL that never changes.
 *
 * Accepts either `?block=<id>` (an image block inside post content) or
 * `?page=<id>&prop=<name>` (a files property such as a hero image).
 */

const ALLOWED_PROPS = new Set(["heroImage", "featuredImage", "CompanyLogo", "InstLogo"])
const UUID = /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i

/** Notion files are either uploads (signed, expiring) or external links (stable). */
function fileUrl(file: any): string | null {
  if (!file) return null
  return (file.type === "external" ? file.external?.url : file.file?.url) ?? null
}

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams
  const blockId = params.get("block")
  const pageId = params.get("page")
  const prop = params.get("prop")

  let source: string | null = null

  try {
    if (blockId) {
      if (!UUID.test(blockId)) return new Response("Invalid block id", { status: 400 })
      const block: any = await notion.blocks.retrieve({ block_id: blockId })
      source = fileUrl(block.image)
    } else if (pageId && prop) {
      // Without the allowlist this endpoint would read any property of any page
      // the integration can see.
      if (!UUID.test(pageId)) return new Response("Invalid page id", { status: 400 })
      if (!ALLOWED_PROPS.has(prop)) return new Response("Unknown property", { status: 400 })
      const page: any = await notion.pages.retrieve({ page_id: pageId })
      source = fileUrl(page.properties?.[prop]?.files?.[0])
    } else {
      return new Response("Provide ?block=<id> or ?page=<id>&prop=<name>", { status: 400 })
    }
  } catch {
    return new Response("Not found in Notion", { status: 404 })
  }

  if (!source) return new Response("No image on that block or property", { status: 404 })

  const upstream = await fetch(source)
  if (!upstream.ok || !upstream.body) {
    return new Response("Could not fetch image from Notion", { status: 502 })
  }

  return new Response(upstream.body, {
    headers: {
      "Content-Type": upstream.headers.get("content-type") ?? "image/png",
      // Callers append `v=<last edited stamp>`, so a replaced image arrives on a
      // new URL and this response is safe to cache hard.
      //
      // `s-maxage` is the one that matters: Vercel's Edge Network ignores a
      // bare `max-age` for CDN caching, so without it every request would
      // re-run this function and spend two round trips (Notion, then S3)
      // against Notion's ~3 req/sec rate limit.
      "Cache-Control": "public, max-age=31536000, s-maxage=31536000, immutable",
    },
  })
}
