import { Navigation } from "@/components/navigation"
import { BlogPost } from "@/components/blog-post"
import { StructuredData } from "@/components/structured-data"
import { createMetadata } from "@/lib/metadata"
import { notFound } from "next/navigation"
import { GetAllBlogsResponse, NotionPageProps } from '@/types/global.types'
import { notion } from '@/lib/notion';
import { NotionToMarkdown } from "notion-to-md";
import { GetPageResponse, PageObjectResponse } from '@notionhq/client';

const n2m = new NotionToMarkdown({ notionClient: notion });

function parseContent(response: GetPageResponse): GetAllBlogsResponse {
  const id = response.id;
  const itemProps = (response as PageObjectResponse).properties as unknown as NotionPageProps;

  const status = itemProps.status.status;
  const heroImage = itemProps.heroImage.files[0].file.url;
  const tags = itemProps.tags.multi_select;
  const publishedAt = itemProps.publishedAt.rich_text[0].plain_text;
  const heroImageName = itemProps.heroImage.files[0].name;
  const category = itemProps.category.multi_select;
  const excerpt = itemProps.excerpt.rich_text[0].plain_text;
  const slug = itemProps.slug.rich_text[0].plain_text;
  const author = itemProps.author.rich_text[0].plain_text;
  const readTime = itemProps.readTime.rich_text[0].plain_text;
  const title = itemProps.title.title[0].plain_text;
  const dynamicUrl = (response as any).url.replace('https://www.notion.so/', '');
  const featuredImage = itemProps.featuredImage.files[0].file.url;

  return {
    id,
    status,
    heroImage,
    heroImageName,
    tags,
    publishedAt,
    category,
    excerpt,
    slug,
    author,
    readTime,
    title,
    dynamicUrl,
    featuredImage
  }
}

export async function getBlockContent(pageId: string): Promise<{
  markdown: string,
  metadata: GetAllBlogsResponse
}> {
  const metadata = await notion.pages.retrieve({
    page_id: pageId,
  });

  const mdblocks = await n2m.pageToMarkdown(pageId);
  const mdString = n2m.toMarkdownString(mdblocks);

  return { markdown: mdString.parent, metadata: parseContent(metadata) };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const response = await getBlockContent(slug);
  const metadata = response.metadata;

  if (!metadata) {
    return createMetadata({
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    })
  }

  return createMetadata({
    title: metadata.title,
    description: metadata.excerpt,
    url: `/blog/${metadata.dynamicUrl}`,
    type: "article",
    image: metadata.heroImage,
  })
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const response = await getBlockContent(slug);
  
  if (!response) {
    notFound()
  }

  const post = response.metadata;
  const markdown = response.markdown;
  
  return (
    <main className="min-h-screen">
      <Navigation />
      
      <BlogPost markdown={markdown} metadata={post} />

      <StructuredData
        type="Article"
        data={{
          headline: post.title,
          description: post.excerpt,
          image: post.heroImage,
          datePublished: post.publishedAt,
          dateModified: post.publishedAt,
          articleSection: post.category,
          keywords: post.tags,
        }}
      />
    </main>
  )
}
