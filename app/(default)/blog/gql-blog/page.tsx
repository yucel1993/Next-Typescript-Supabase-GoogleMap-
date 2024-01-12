import type { Metadata } from 'next';
import { request, gql } from 'graphql-request';
import { Grapgql } from '@/types/blog-type';
import BlogTeaserGQL from '@/components/Blog/BlogTeaserGQL';

export const metadata: Metadata = {
	title: 'GQL-Blog',
	description: 'Die neuesten Meldungen',
};

const WP_URL = process.env.GRAPQL_BASE!;
export default async function GqlBlogPage() {
	const query = gql`
		{
			posts {
				nodes {
					title
					slug
					excerpt
					date
				}
			}
		}
	`;

	const response = (await request(WP_URL, query)) as {
		posts: { nodes: Grapgql[] };
	};
	// console.log(response);
	// console.log(response.posts);
	return (
		<>
			<h1>Grapgql</h1>
			{response.posts.nodes.map((item) => (
				<BlogTeaserGQL key={item.title} {...item} />
			))}
			{/* Für jeden Eintrag in posts eine GqlBlogTeaserRest-Komponente */}
		</>
	);
}
