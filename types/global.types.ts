
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

export type RichText = {
  text: string;
  annotations: {
	bold: boolean;
	italic: boolean;
	underline: boolean;
	strikethrough: boolean;
	code: boolean;
	color: string;
  };
};

export interface NotionResultItem {
	type: string
	paragraph: {
		rich_text: [
			type: string,
			plain_text: string,
			annotation: {
				bold: boolean,
				italic: boolean,
				strikethrough: boolean,
				underline: boolean,
				code: boolean,
				color: string
			}
		]
	}
}

// Skills Section Types
export type SkillCategory = {
	id: string
	name: string
	description: string
	icon: string
	color: string
	order: number
}

export type Technology = {
	id: string
	name: string
	color: string
	order: number
}

export type NotionSkillCategoryProps = {
	name: {
		title: {
			plain_text: string
		}[]
	}
	description: NotionText
	icon: {
		select: {
			id: string
			name: string
			color: string
		}
	}
	color: {
		select: {
			id: string
			name: string
			color: string
		}
	}
	order: {
		number: number
	}
}

export type NotionTechnologyProps = {
	name: {
		title: {
			plain_text: string
		}[]
	}
	color: {
		select: {
			id: string
			name: string
			color: string
		}
	}
	order: {
		number: number
	}
}