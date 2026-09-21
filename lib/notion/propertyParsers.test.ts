/**
 * Self-check for the Notion image URL logic.
 *
 * These two functions decide whether every image on the site loads, and they
 * only misbehave against data shapes that are awkward to produce by hand, so
 * they get a check rather than a manual click-through.
 *
 *   node --experimental-strip-types lib/notion/propertyParsers.test.ts
 */
import assert from "node:assert/strict"
import { parseFile, parseFiles, notionImageUrl } from "./propertyParsers.ts"

// An uploaded file: Notion returns a signed, expiring URL under `file`.
assert.deepEqual(
  parseFile({ files: [{ name: "hero.png", type: "file", file: { url: "https://s3/hero.png?sig=1" } }] }),
  { url: "https://s3/hero.png?sig=1", name: "hero.png" },
)

// An external file: the URL lives under `external`. Reading `file.file.url`
// here used to throw and take the whole page down.
assert.deepEqual(
  parseFile({ files: [{ name: "logo.svg", type: "external", external: { url: "https://cdn/logo.svg" } }] }),
  { url: "https://cdn/logo.svg", name: "logo.svg" },
)

assert.equal(parseFile(undefined), null)
assert.equal(parseFile({ files: [] }), null)
// Present but malformed: no url anywhere.
assert.equal(parseFile({ files: [{ name: "broken" }] }), null)

// parseFiles drops entries it cannot resolve rather than emitting empty srcs.
assert.deepEqual(
  parseFiles({
    files: [
      { name: "a", type: "file", file: { url: "https://s3/a.png" } },
      { name: "b" },
      { name: "c", type: "external", external: { url: "https://cdn/c.png" } },
    ],
  }),
  [
    { url: "https://s3/a.png", name: "a" },
    { url: "https://cdn/c.png", name: "c" },
  ],
)

// A page with an image yields a stable proxy URL stamped with its edit time,
// so replacing the image in Notion busts the cache.
assert.equal(
  notionImageUrl(
    {
      id: "2de3324a-94d0-8090-8d16-e180437bcc26",
      last_edited_time: "2026-01-04T19:57:00.000Z",
      properties: { heroImage: { files: [{ name: "h.png", type: "file", file: { url: "https://s3/h.png" } }] } },
    },
    "heroImage",
  ),
  "/api/notion-image?page=2de3324a-94d0-8090-8d16-e180437bcc26&prop=heroImage&v=20260104195700000",
)

// No image on the property means no src at all, so callers render their
// fallback instead of pointing at a URL that will 404.
assert.equal(
  notionImageUrl({ id: "abc", last_edited_time: "2026-01-04T19:57:00.000Z", properties: {} }, "heroImage"),
  "",
)

// Crucially: a raw signed S3 URL must never survive into rendered output.
const rendered = notionImageUrl(
  {
    id: "2de3324a-94d0-8090-8d16-e180437bcc26",
    last_edited_time: "2026-01-04T19:57:00.000Z",
    properties: { heroImage: { files: [{ name: "h.png", type: "file", file: { url: "https://prod-files-secure.s3.us-west-2.amazonaws.com/h.png?X-Amz-Expires=3600" } }] } },
  },
  "heroImage",
)
assert.ok(!rendered.includes("X-Amz"), "signed URL leaked into the page")

console.log("propertyParsers: all checks passed")
