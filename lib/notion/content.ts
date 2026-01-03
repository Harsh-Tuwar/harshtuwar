import { notion } from './index';
import { NotionToMarkdown } from "notion-to-md";
import {
  parseParagraphBlocks,
  parseBlogPosts,
  parseRecentBlogPosts,
  parseBlogPost
} from './parsers';
import {
  RichText,
  GetAllBlogsResponse,
  GetRecentBlogsResponse
} from '@/types/global.types';

// Initialize Notion to Markdown converter
const n2m = new NotionToMarkdown({ notionClient: notion });

// Notion Block IDs and Data Source IDs
const NOTION_IDS = {
  HOME_HEADLINE: "02c78ac2798b4a5095299849ae322874",
  ABOUT_PAGE: "2923324a94d080188a8df932cba65334",
  ALL_BLOGS_DATASOURCE: "2543324a-94d0-800b-a6ce-000bcc893e63",
  RECENT_BLOGS_DATASOURCE: "2913324a-94d0-80bb-9527-000bf25b39a9",
} as const;

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
