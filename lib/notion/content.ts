import { notion } from './index';
import { NotionToMarkdown } from "notion-to-md";
import { NOTION_IDS } from './constants';
import {
  parseParagraphBlocks,
  parseBlogPosts,
  parseRecentBlogPosts,
  parseBlogPost,
  parseSkillCategories,
  parseTechnologies
} from './parsers';
import {
  RichText,
  GetAllBlogsResponse,
  GetRecentBlogsResponse,
  SkillCategory,
  Technology
} from '@/types/global.types';

// Initialize Notion to Markdown converter
const n2m = new NotionToMarkdown({ notionClient: notion });

/**
 * Get home page headline content from Notion
 * Returns formatted paragraphs with rich text annotations
 */
export async function getHeadlineContent(): Promise<RichText[][]> {
  const responseFromNotion = await notion.blocks.children.list({
    block_id: NOTION_IDS.HOME_HEADLINE,
  });

  return parseParagraphBlocks(responseFromNotion);
}

/**
 * Get about page content from Notion
 * Returns formatted paragraphs with rich text annotations
 */
export async function getAboutContent(): Promise<RichText[][]> {
  const responseFromNotion = await notion.blocks.children.list({
    block_id: NOTION_IDS.ABOUT_PAGE,
  });

  return parseParagraphBlocks(responseFromNotion);
}

/**
 * Get all blog posts from Notion database
 * Returns full list of published blog posts with metadata
 */
export async function getAllBlogs(): Promise<GetAllBlogsResponse[]> {
  const page = await notion.dataSources.query({
    data_source_id: NOTION_IDS.ALL_BLOGS_DATASOURCE
  });

  return parseBlogPosts(page.results);
}

/**
 * Get recent blog posts from Notion database
 * Returns limited set of recent posts for homepage display
 */
export async function getRecentBlogs(): Promise<GetRecentBlogsResponse[]> {
  const page = await notion.dataSources.query({
    data_source_id: NOTION_IDS.RECENT_BLOGS_DATASOURCE
  });

  return parseRecentBlogPosts(page.results);
}

/**
 * Get a single blog post by ID with markdown content
 * Returns both the markdown content and metadata for the blog post
 */
export async function getBlogPost(pageId: string): Promise<{
  markdown: string,
  metadata: GetAllBlogsResponse
}> {
  const metadata = await notion.pages.retrieve({
    page_id: pageId,
  });

  const mdblocks = await n2m.pageToMarkdown(pageId);
  const mdString = n2m.toMarkdownString(mdblocks);

  return {
    markdown: mdString.parent,
    metadata: parseBlogPost(metadata)
  };
}

/**
 * Get skill categories from Notion database
 * Returns all skill categories sorted by order field
 */
export async function getSkillCategories(): Promise<SkillCategory[]> {
  if (!NOTION_IDS.SKILL_CATEGORIES_DATASOURCE) {
    console.warn('SKILL_CATEGORIES_DATASOURCE not configured. Using fallback data.');
    return [];
  }

  const page = await notion.dataSources.query({
    data_source_id: NOTION_IDS.SKILL_CATEGORIES_DATASOURCE
  });

  const categories = parseSkillCategories(page.results);
  return categories.sort((a, b) => a.order - b.order);
}

/**
 * Get technologies from Notion database
 * Returns all technologies sorted by order field
 */
export async function getTechnologies(): Promise<Technology[]> {
  if (!NOTION_IDS.TECHNOLOGIES_DATASOURCE) {
    console.warn('TECHNOLOGIES_DATASOURCE not configured. Using fallback data.');
    return [];
  }

  const page = await notion.dataSources.query({
    data_source_id: NOTION_IDS.TECHNOLOGIES_DATASOURCE
  });

  const technologies = parseTechnologies(page.results);
  return technologies.sort((a, b) => a.order - b.order);
}
