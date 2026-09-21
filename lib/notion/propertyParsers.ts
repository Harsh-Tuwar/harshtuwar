import type { RichText } from '@/types/global.types';

type NotionFile = {
  name: string;
  type?: 'file' | 'external';
  file?: { url: string };
  external?: { url: string };
};

export type NotionFilesProperty = { files: NotionFile[] };

/** Image-bearing properties that /api/notion-image is allowed to serve. */
export type NotionImageProp = 'heroImage' | 'featuredImage' | 'CompanyLogo' | 'InstLogo';

type NotionPageLike = {
  id: string;
  last_edited_time?: string;
  properties?: Partial<Record<NotionImageProp, NotionFilesProperty>>;
};

/**
 * Helper functions for parsing Notion property types
 * These provide type-safe and null-safe access to Notion properties
 */

/**
 * Parse plain text from a Notion rich_text property
 * Safely extracts the plain text from the first rich_text element
 */
export function parsePlainText(property: { rich_text: { plain_text: string }[] } | undefined): string {
  if (!property?.rich_text || property.rich_text.length === 0) {
    return '';
  }
  return property.rich_text[0].plain_text;
}

/**
 * Parse rich text array from a Notion rich_text property
 * Returns all rich text elements with their annotations
 */
export function parseRichText(property: { rich_text: any[] } | undefined): RichText[] {
  if (!property?.rich_text || property.rich_text.length === 0) {
    return [];
  }

  return property.rich_text.map((rt: any) => ({
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

/**
 * Parse multi-select property from Notion
 * Returns array of selected options with id, name, and color
 */
export function parseMultiSelect(property: { multi_select: { id: string; name: string; color: string }[] } | undefined): { id: string; name: string; color: string }[] {
  if (!property?.multi_select) {
    return [];
  }
  return property.multi_select;
}

/**
 * Parse files property from Notion
 * Returns the first file's URL and name
 *
 * A Notion file is either an upload (`file.url`, signed and expiring) or an
 * external link (`external.url`, stable). Reading `file.file.url` blindly
 * throws on the external kind.
 */
export function parseFile(property: NotionFilesProperty | undefined): { url: string; name: string } | null {
  const file = property?.files?.[0];
  if (!file) {
    return null;
  }

  const url = file.type === 'external' ? file.external?.url : file.file?.url;
  if (!url) {
    return null;
  }

  return { url, name: file.name };
}

/**
 * Build a stable URL for an image held in a Notion files property.
 *
 * The URL Notion returns is signed for one hour, so storing it in a page that
 * gets statically cached guarantees a broken image once the cache outlives the
 * signature. This points at /api/notion-image, which resolves a fresh signed
 * URL per request. The `v` stamp busts the cache when the image is replaced.
 */
export function notionImageUrl(page: NotionPageLike, prop: NotionImageProp): string {
  if (!parseFile(page?.properties?.[prop])) {
    return '';
  }

  const version = String(page.last_edited_time ?? '').replace(/\D/g, '');
  return `/api/notion-image?page=${page.id}&prop=${prop}&v=${version}`;
}

/**
 * Parse files array from Notion
 * Returns all files with their URLs and names
 */
export function parseFiles(property: NotionFilesProperty | undefined): { url: string; name: string }[] {
  if (!property?.files || property.files.length === 0) {
    return [];
  }

  return property.files
    .map(file => ({
      url: (file.type === 'external' ? file.external?.url : file.file?.url) ?? '',
      name: file.name,
    }))
    .filter(file => file.url !== '');
}

/**
 * Parse title property from Notion
 * Extracts the plain text from the title field
 */
export function parseTitle(property: { title: { plain_text: string }[] } | undefined): string {
  if (!property?.title || property.title.length === 0) {
    return '';
  }
  return property.title[0].plain_text;
}

/**
 * Parse status property from Notion
 * Returns the status object with id, name, and color
 */
export function parseStatus(property: { status: { id: string; name: string; color: string } } | undefined): { id: string; name: string; color: string } | null {
  if (!property?.status) {
    return null;
  }
  return property.status;
}

/**
 * Parse select property from Notion
 * Returns the selected option with id, name, and color
 */
export function parseSelect(property: { select: { id: string; name: string; color: string } } | undefined): { id: string; name: string; color: string } | null {
  if (!property?.select) {
    return null;
  }
  return property.select;
}

/**
 * Parse number property from Notion
 * Returns the number value
 */
export function parseNumber(property: { number: number } | undefined): number {
  if (!property || property.number === undefined) {
    return 0;
  }
  return property.number;
}

/**
 * Parse URL property from Notion
 * Returns the URL string
 */
export function parseUrl(property: { url: string } | undefined): string {
  if (!property?.url) {
    return '';
  }
  return property.url;
}
