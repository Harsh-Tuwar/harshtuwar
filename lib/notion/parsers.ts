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
  SkillCategory,
  Technology,
  NotionSkillCategoryProps,
  NotionTechnologyProps,
  Experience,
  NotionExperienceProps,
  Education,
  NotionEducationProps
} from '@/types/global.types';
import {
  parsePlainText,
  parseRichText,
  parseMultiSelect,
  parseFile,
  parseTitle,
  parseStatus,
  parseSelect,
  parseNumber,
  parseUrl
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

/**
 * Parse experiences from Notion database query response
 * Extracts experience metadata including company name, position, skills, tenure, etc.
 */
export function parseExperiences(
  response: (PageObjectResponse | PartialPageObjectResponse | DataSourceObjectResponse | PartialDataSourceObjectResponse)[]
): Experience[] {
  return response.map((pageItem) => {
    const id = pageItem.id;
    const itemProps = (pageItem as PageObjectResponse).properties as unknown as NotionExperienceProps;

    const companyName = parseTitle(itemProps.CompanyName);
    const position = parsePlainText(itemProps.Position);
    const skills = parseMultiSelect(itemProps.Skills);
    const tenure = parsePlainText(itemProps.Tenure);
    const companyLogoData = parseFile(itemProps.CompanyLogo);
    const url = parseUrl(itemProps.URL);
    const ordinal = parseNumber(itemProps.Ordinal);

    return {
      id,
      companyName,
      position,
      skills,
      tenure,
      companyLogo: companyLogoData?.url || '',
      url,
      ordinal
    };
  });
}

/**
 * Parse education from Notion database query response
 * Extracts education metadata including institution name, degree, skills, period, etc.
 */
export function parseEducation(
  response: (PageObjectResponse | PartialPageObjectResponse | DataSourceObjectResponse | PartialDataSourceObjectResponse)[]
): Education[] {
  return response.map((pageItem) => {
    const id = pageItem.id;
    const itemProps = (pageItem as PageObjectResponse).properties as unknown as NotionEducationProps;

    const instName = parseTitle(itemProps.InstName);
    const degreeName = parsePlainText(itemProps.DegreeName);
    const skills = parseMultiSelect(itemProps.Skills);
    const period = parsePlainText(itemProps.Period);
    const instLogoData = parseFile(itemProps.InstLogo);
    const instUrl = parseUrl(itemProps.InstUrl);
    const ordinal = parseNumber(itemProps.Ordinal);

    return {
      id,
      instName,
      degreeName,
      skills,
      period,
      instLogo: instLogoData?.url || '',
      instUrl,
      ordinal
    };
  });
}
