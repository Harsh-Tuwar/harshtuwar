import {
  DataSourceObjectResponse,
  PageObjectResponse,
  PartialDataSourceObjectResponse,
  PartialPageObjectResponse,
  GetPageResponse
} from '@notionhq/client';
import {
  RichText,
  NotionResultItem,
  NotionPageProps,
  GetAllBlogsResponse,
  GetRecentBlogsResponse
} from '@/types/global.types';

/**
 * Parse paragraph blocks from Notion API response into RichText format
 * Used for simple text content like about page and home page headline
 */
export function parseParagraphBlocks(apiResponse: any): RichText[][] {
  if (!apiResponse?.results) return [];

  return apiResponse.results.map((block: NotionResultItem) => {
    if (block.type === "paragraph" && block.paragraph?.rich_text) {
      return block.paragraph.rich_text.map((rt: any) => ({
        text: rt.plain_text,
        annotations: {
          bold: rt.annotations.bold,
          italic: rt.annotations.italic,
          underline: rt.annotations.underline,
          strikethrough: rt.annotations.strikethrough,
          code: rt.annotations.code,
          color: rt.annotations.color,
        },
      }));
    }
    return [];
  });
}

/**
 * Parse blog posts from Notion database query response
 * Extracts all blog metadata including title, excerpt, tags, etc.
 */
export function parseBlogPosts(
  response: (PageObjectResponse | PartialPageObjectResponse | DataSourceObjectResponse | PartialDataSourceObjectResponse)[]
): GetAllBlogsResponse[] {
  return response.map((pageItem) => {
    const id = pageItem.id;
    const itemProps = (pageItem as PageObjectResponse).properties as unknown as NotionPageProps;

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
    const dynamicUrl = (pageItem as any).url.replace('https://www.notion.so/', '');

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
      dynamicUrl
    };
  });
}

/**
 * Parse recent blog posts from Notion database query response
 * Similar to parseBlogPosts but with fewer fields for homepage display
 */
export function parseRecentBlogPosts(
  response: (PageObjectResponse | PartialPageObjectResponse | DataSourceObjectResponse | PartialDataSourceObjectResponse)[]
): GetRecentBlogsResponse[] {
  return response.map((pageItem) => {
    const id = pageItem.id;
    const itemProps = (pageItem as PageObjectResponse).properties as unknown as NotionPageProps;

    const category = itemProps.category.multi_select;
    const excerpt = itemProps.excerpt.rich_text[0].plain_text;
    const readTime = itemProps.readTime.rich_text[0].plain_text;
    const title = itemProps.title.title[0].plain_text;
    const slug = itemProps.slug.rich_text[0].plain_text;
    const publishedAt = itemProps.publishedAt.rich_text[0].plain_text;
    const dynamicUrl = (pageItem as any).url.replace('https://www.notion.so/', '');

    return {
      id,
      category,
      excerpt,
      readTime,
      title,
      slug,
      publishedAt,
      dynamicUrl
    };
  });
}

/**
 * Parse a single blog post page from Notion
 * Extracts metadata for a specific blog post including featured image
 */
export function parseBlogPost(response: GetPageResponse): GetAllBlogsResponse {
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
  };
}
