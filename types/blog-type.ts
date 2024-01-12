export type Blog = {
	id: number;
	slug: string;
	title: {
		rendered: string;
	};

	date: string;
	excerpt: {
		rendered: string;
	};
	featured_media: number;
	img?: string | null;
};

export type Grapgql = {
	title: string;
	date: React.ReactNode;
	excerpt: string;
	slug: string;
};

export type GrapqlSlug = {
	post: {
		title: string;
		date: string;
		content: string;
		featuredImage: {
			node: {
				sourceUrl: string;
			};
		};
	};
};

// export type BlogPostRest = {
//     id: number;
//     slug: string;
//     date: string;
//     title: {
//    	 rendered: string;
//     };
//     excerpt: {
//    	 rendered: string;
//     };
//     content: {
//    	 rendered: string;
//     };
//     featured_media: number;
// };

// export type BlogImageRest = {
//     id: number;
//     guid: {
//    	 rendered: string;
//     };
//     alt_text: string;
//     media_details: {
//    	 width: number;
//    	 height: number;
//     };
// };

// export type BlogPostBaseGql = {
//     title: string;
//     date: Date;
// };

// export type BlogPostTeaserGql = BlogPostBaseGql & {
//     excerpt: string;
//     slug: string;
// };

// export type BlogPostSingleGql = BlogPostBaseGql & {};
