import axios from 'axios';
import type { Blog } from '@/types/blog-type';
import { Metadata } from 'next';
import { extractTime, stripHtmlTags, formatDate } from '@/lib/helpers';
import Image from 'next/image';

type BlogPostRest = {
	source_url: string;
};

type Props = {
	params: {
		slug: string;
	};
};
export default async function page({ params: { slug } }: Props) {
	const post = await getPostData(slug);

	return (
		<div>
			<header>
				<h1>{post.title.rendered}</h1>
				<time dateTime="">{extractTime(post.date)}</time>

				<div>
					<time dateTime="">{formatDate(post.date)}</time>
					{post.img && (
						<Image
							className="full-width-image-blog"
							alt={post.img}
							src={post.img}
							width={20}
							height={20}
							sizes="(width <= 56rem) 90vw, 54rem"
						/>
					)}
				</div>
			</header>
			{/* Bild, falls Bilddaten vorhanden, mit der Image-Komponente darstellen */}

			<div>{stripHtmlTags(post.excerpt.rendered)}</div>
		</div>
	);
}

/* Daten des zum Slug passenden Beitrags laden. Falls kein Beitrag gefunden
wurde, die not-found-Seite anzeigen. */
async function getPostData(slug: string): Promise<Blog> {
	const response = await fetch(
		`${process.env.WP_REST_BASE}/posts?slug=${slug}`
	);
	const data = (await response.json()) as Blog[];
	// console.log(data);
	// console.log(data[0].featured_media);
	const img = await getImageData(data[0].featured_media);
	return { ...data[0], img };
}

/* Bilddaten laden, falls der Beitrag ein Titelbild hat */
async function getImageData(id: number): Promise<string | null> {
	if (!id) return null;
	const response = await fetch(`${process.env.WP_REST_BASE}/media/${id}`);
	const data = (await response.json()) as BlogPostRest;
	console.log(data);
	console.log('imag data', data.source_url);
	if (!data) return null;
	return data.source_url;
}

/* Dynamisch den Titel in Metadten einfügen */
export async function generateMetadata({
	params: { slug },
}: Props): Promise<Metadata> {
	const { title } = await getPostData(slug);

	return {
		title: title.rendered,
	};
}

/* Dynamisch den Titel in Metadaten einfügen */

// import type { BlogImageRest, BlogPostRest } from '@/types/blog-types';
// import Image from 'next/image';
// import { notFound } from 'next/navigation';

// const WP_REST_BASE = process.env.WP_REST_BASE;

// type Props = {
//     params: {
//    	 slug: string;
//     };
// };
// export default async function page({ params: { slug } }: Props) {
//     const { title, content, date, featured_media } = await getPostData(slug);

//     const imageData = await getImageData(featured_media);

//     return (
//    	 <div>
//    		 <header>
//    			 <h1>{title.rendered}</h1>
//    			 <time dateTime={date.substring(0, 10)}>
//    				 {new Date(date).toLocaleDateString('de')}
//    			 </time>
//    		 </header>
//    		 {/* Bild, falls Bilddaten vorhanden, mit der Image-Komponente darstellen */}
//    		 {imageData && (
//    			 <Image
//    				 className="full-width-image"
//    				 alt={imageData.alt_text}
//    				 src={imageData.guid.rendered}
//    				 width={imageData.media_details.width}
//    				 height={imageData.media_details.height}
//    				 sizes="(width <= 56rem) 90vw, 54rem"
//    			 />
//    		 )}
//    		 <div dangerouslySetInnerHTML={{ __html: content.rendered }} />
//    	 </div>
//     );
// }

// /* Daten des zum Slug passenden Beitrags laden. Falls kein Beitrag gefunden
// wurde, die not-found-Seite anzeigen. */
// async function getPostData(slug: string) {
//     const response = await fetch(`${WP_REST_BASE}/posts?slug=${slug}`);

//     const posts = (await response.json()) as BlogPostRest[];

//     const post = posts[0];

//     if (!post) {
//    	 notFound();
//     }

//     return post;
// }

// /* Bilddaten laden, falls der Beitrag ein Titelbild hat */
// async function getImageData(imageId: number) {
//     if (!imageId) {
//    	 return null;
//     }

//     const response = await fetch(`${WP_REST_BASE}/media/${imageId}`);

//     if (!response.ok) {
//    	 return null;
//     }

//     const imageData = (await response.json()) as BlogImageRest;

//     return imageData;
// }

// /* Dynamisch den Titel in Metadaten einfügen */
// export async function generateMetadata({ params: { slug } }: Props) {
//     const { title } = await getPostData(slug);

//     return {
//    	 title: title.rendered,
//     };
// }

/* Mit dieser Funktion können alle Werte von slug, die aktuell bekannt sind,
schon vorab an Next mitgeteilt werden, so dass die Seiten für diese Slugs
schon beim build erzeugt werden können, und nicht dynamisch beim ersten Aufrufen
des Slugs (mit Wartezeit) erzeugt werden müssen.
https://nextjs.org/docs/app/api-reference/functions/generate-static-params
*/

// export async function generateStaticParams() {
// 	const response = await fetch(`${WP_REST_BASE}/posts`);

// 	const posts = (await response.json()) as BlogPostRest[];

// 	return posts.map((post) => ({ params: { slug: post.slug } }));
// }
