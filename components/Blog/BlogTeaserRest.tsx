import { Blog } from '@/types/blog-type';
import { formatDate, stripHtmlTags, extractTime } from '@/lib/helpers';
import Link from 'next/link';

type Props = Blog;
export default function BlogTeaserRest({
	id,
	title,
	date,
	excerpt,
	slug,
}: Props) {
	return (
		<article>
			<h2>
				<Link href={`/blog/${slug}`}> {title.rendered}</Link>
			</h2>
			<time dateTime="2023-12-24">{formatDate(date)}</time>
			<div>
				<time>{extractTime(date)}</time>
			</div>

			<div>{stripHtmlTags(excerpt.rendered)}</div>
		</article>
	);
}
