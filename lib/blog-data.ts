import { notion } from '@/lib/notion';
import { DataSourceObjectResponse, PageObjectResponse, PartialDataSourceObjectResponse, PartialPageObjectResponse } from '@notionhq/client';
import { GetAllBlogsResponse, NotionPageProps } from '@/types/global.types';

function parseContent(response: (PageObjectResponse | PartialPageObjectResponse | DataSourceObjectResponse | PartialDataSourceObjectResponse)[]): GetAllBlogsResponse[] {
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
    }
  });
}

export async function getAllBlogs(): Promise<GetAllBlogsResponse[]> {
  const page = await notion.dataSources.query({
    data_source_id: "2543324a-94d0-800b-a6ce-000bcc893e63"
  });

  return parseContent(page.results);
}
