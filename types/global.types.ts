
type NotionMultiSelect = {
	id: string
	name: string
	color: string
}

type NotionText = {
	rich_text: {
		plain_text: string
	}[]
}

export type NotionPageProps = {
	publishedAt: NotionText,
	excerpt: NotionText,
	slug: NotionText,
	author: NotionText,
	readTime: NotionText,
	featuredImage: {
		files: {
			name: string
			file: {
				url: string
			}
		}[]
	}
	title: {
		title: {
			plain_text: string
		}[]
	},
	status: {
		id: string
		status: {
			id: string
			name: string
			color: string
		}
	},
	heroImage: {
		files: {
			name: string
			file: {
				url: string
			}
		}[]
	},
	tags: {
		multi_select: NotionMultiSelect[]
	},
	category: {
		multi_select: NotionMultiSelect[]
	},
}

export type GetAllBlogsResponse = {
	id: string,
	status: NotionMultiSelect,
	heroImage: string,
	heroImageName: string,
	tags: NotionMultiSelect[],
	publishedAt: string,
	category: NotionMultiSelect[],
	excerpt: string,
	slug: string,
	author: string,
	readTime: string,
	title: string,
	dynamicUrl: string,
	featuredImage?: string
}

export type GetRecentBlogsResponse = {
	id: string,
	category: NotionMultiSelect[],
	excerpt: string,
	readTime: string,
	title: string,
	slug: string,
	publishedAt: string,
	dynamicUrl: string,
}