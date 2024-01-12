import BlogTeaserRest from '@/components/Blog/BlogTeaserRest';
import axios from 'axios';
import React from 'react';
import type { Blog } from '@/types/blog-type';

const WP_Rest_Base = process.env.WP_REST_BASE;
console.log(WP_Rest_Base);

const Blog = async () => {
	const { data } = await axios<Blog[]>(`${WP_Rest_Base}/posts`);
	// console.log(data);

	return (
		<div>
			<h1> Blog</h1>
			{data.map((item) => (
				<BlogTeaserRest key={item.id} {...item} />
			))}
		</div>
	);
};

export default Blog;
