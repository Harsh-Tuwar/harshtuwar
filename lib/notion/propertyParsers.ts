import { RichText } from '@/types/global.types';

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
 */
export function parseFile(property: { files: { name: string; file: { url: string } }[] } | undefined): { url: string; name: string } | null {
  if (!property?.files || property.files.length === 0) {
    return null;
  }

  const file = property.files[0];
  return {
    url: file.file.url,
    name: file.name,
  };
}

/**
 * Parse files array from Notion
 * Returns all files with their URLs and names
 */
export function parseFiles(property: { files: { name: string; file: { url: string } }[] } | undefined): { url: string; name: string }[] {
  if (!property?.files || property.files.length === 0) {
    return [];
  }

  return property.files.map(file => ({
    url: file.file.url,
    name: file.name,
  }));
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
