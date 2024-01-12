import { Grapgql } from '@/types/blog-type';
import Link from 'next/link';

type Props = Grapgql;
export default function BlogTeaserGQL({ title, slug, excerpt, date }: Props) {
	return (
		<article>
			<h2>
				<Link href={`/blog/gql-blog/${slug}`}> {title}</Link>
			</h2>
			<time dateTime="2023-12-24">{date}</time>

			<div>{excerpt}</div>
		</article>
	);
}
