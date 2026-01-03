import {
  DataSourceObjectResponse,
  PageObjectResponse,
  PartialDataSourceObjectResponse,
  PartialPageObjectResponse,
  GetPageResponse,
  ListBlockChildrenResponse
} from '@notionhq/client';
import {
  RichText,
  NotionPageProps,
  GetAllBlogsResponse,
  GetRecentBlogsResponse,
  SkillCategory,
  Technology,
  NotionSkillCategoryProps,
  NotionTechnologyProps
} from '@/types/global.types';
import {
  parsePlainText,
  parseRichText,
  parseMultiSelect,
  parseFile,
  parseTitle,
  parseStatus,
  parseSelect,
  parseNumber
} from './propertyParsers';

/**
 * Parse paragraph blocks from Notion API response into RichText format
 * Used for simple text content like about page and home page headline
 */
export function parseParagraphBlocks(apiResponse: ListBlockChildrenResponse): RichText[][] {
  if (!apiResponse?.results) return [];

  return apiResponse.results.map((block: any) => {
    if (block.type === "paragraph" && block.paragraph) {
      return parseRichText(block.paragraph);
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

    const status = parseStatus(itemProps.status)!;
    const heroImageData = parseFile(itemProps.heroImage);
    const tags = parseMultiSelect(itemProps.tags);
    const publishedAt = parsePlainText(itemProps.publishedAt);
    const category = parseMultiSelect(itemProps.category);
    const excerpt = parsePlainText(itemProps.excerpt);
    const slug = parsePlainText(itemProps.slug);
    const author = parsePlainText(itemProps.author);
    const readTime = parsePlainText(itemProps.readTime);
    const title = parseTitle(itemProps.title);
    const dynamicUrl = (pageItem as any).url.replace('https://www.notion.so/', '');

    return {
      id,
      status,
      heroImage: heroImageData?.url || '',
      heroImageName: heroImageData?.name || '',
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

    const category = parseMultiSelect(itemProps.category);
    const excerpt = parsePlainText(itemProps.excerpt);
    const readTime = parsePlainText(itemProps.readTime);
    const title = parseTitle(itemProps.title);
    const slug = parsePlainText(itemProps.slug);
    const publishedAt = parsePlainText(itemProps.publishedAt);
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

  const status = parseStatus(itemProps.status)!;
  const heroImageData = parseFile(itemProps.heroImage);
  const tags = parseMultiSelect(itemProps.tags);
  const publishedAt = parsePlainText(itemProps.publishedAt);
  const category = parseMultiSelect(itemProps.category);
  const excerpt = parsePlainText(itemProps.excerpt);
  const slug = parsePlainText(itemProps.slug);
  const author = parsePlainText(itemProps.author);
  const readTime = parsePlainText(itemProps.readTime);
  const title = parseTitle(itemProps.title);
  const dynamicUrl = (response as any).url.replace('https://www.notion.so/', '');
  const featuredImageData = parseFile(itemProps.featuredImage);

  return {
    id,
    status,
    heroImage: heroImageData?.url || '',
    heroImageName: heroImageData?.name || '',
    tags,
    publishedAt,
    category,
    excerpt,
    slug,
    author,
    readTime,
    title,
    dynamicUrl,
    featuredImage: featuredImageData?.url
  };
}

/**
 * Parse skill categories from Notion database query response
 * Extracts skill category metadata including name, description, icon, and color
 */
export function parseSkillCategories(
  response: (PageObjectResponse | PartialPageObjectResponse | DataSourceObjectResponse | PartialDataSourceObjectResponse)[]
): SkillCategory[] {
  return response.map((pageItem) => {
    const id = pageItem.id;
    const itemProps = (pageItem as PageObjectResponse).properties as unknown as NotionSkillCategoryProps;

    const name = parseTitle(itemProps.name);
    const description = parsePlainText(itemProps.description);
    const icon = parseSelect(itemProps.icon);
    const color = parseSelect(itemProps.color);
    const order = parseNumber(itemProps.order);

    return {
      id,
      name,
      description,
      icon: icon?.name || 'Code2',
      color: color?.name || 'from-cyan-500 to-blue-500',
      order
    };
  });
}

/**
 * Parse technologies from Notion database query response
 * Extracts technology metadata including name and color
 */
export function parseTechnologies(
  response: (PageObjectResponse | PartialPageObjectResponse | DataSourceObjectResponse | PartialDataSourceObjectResponse)[]
): Technology[] {
  return response.map((pageItem) => {
    const id = pageItem.id;
    const itemProps = (pageItem as PageObjectResponse).properties as unknown as NotionTechnologyProps;

    const name = parseTitle(itemProps.name);
    const color = parseSelect(itemProps.color);
    const order = parseNumber(itemProps.order);

    return {
      id,
      name,
      color: color?.name || 'bg-gray-500/10 text-gray-700 dark:text-gray-300 border-gray-500/20',
      order
    };
  });
}
