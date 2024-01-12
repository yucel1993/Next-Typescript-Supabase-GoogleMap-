import { stripHtmlTags } from '@/lib/helpers';
import { Grapgql, GrapqlSlug } from '@/types/blog-type';
import { request, gql } from 'graphql-request';
import Image from 'next/image';
import { notFound } from 'next/navigation';

type Props = {
	params: {
		slug: string;
	};
};
const WP_URL = process.env.GRAPQL_BASE!;

export default async function page({ params: { slug } }: Props) {
	const post = await getPostData(slug);

	return (
		<div>
			<header>
				<h1>{post.post.title}</h1>
				<time dateTime={post.post.date.substring(0, 10)}>
					{new Date(post.post.date).toLocaleDateString('de')}
				</time>
			</header>
			{/* Bild, falls Bilddaten vorhanden, mit der Image-Komponente darstellen */}
			{post.post.featuredImage.node.sourceUrl && (
				<Image
					className="full-width-image-blog"
					alt={post.post.featuredImage.node.sourceUrl}
					src={post.post.featuredImage.node.sourceUrl}
					width={100}
					height={100}
					sizes="(max-width: 56rem) 90vw, 54rem"
				/>
			)}
			{/* <div dangerouslySetInnerHTML={} /> */}
			<p>{stripHtmlTags(post.post.content)}</p>
		</div>
	);
}

async function getPostData(slug: string) {
	const query = gql`{
    post(id: "${slug}", idType: SLUG) {
      title
	  content
      featuredImage {
        node {
          sourceUrl(size: LARGE)
        }
      }
      date
    }
  }
`;

	const response = (await request(WP_URL, query)) as GrapqlSlug;
	// return { ...data[0], img };
	console.log(response);
	return response;
}

/* Metadaten dynamisch generieren */

export async function generateMetadata({ params: { slug } }: Props) {
	const post = await getPostData(slug);

	return {
		title: post.post.title,
	};
}

/* export async function generateStaticParams() {

} */

export async function generateStaticParams() {
	const query = gql`
		{
			posts {
				nodes {
					slug
				}
			}
		}
	`;

	const response = (await request(WP_URL, query)) as {
		posts: {
			nodes: { slug: string }[];
		};
	};

	return response.posts.nodes.map((post) => ({ params: { slug: post.slug } }));
}
