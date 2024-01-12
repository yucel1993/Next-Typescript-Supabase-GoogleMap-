import React from 'react';
import type { Product } from '@/types/shop-types';
import ProductTeaser from '@/components/ProductTeaser';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
type Prop = {
	params: {
		name: string;
	};
};
const Category = async ({ params }: Prop) => {
	const response = await fetch('https://fakestoreapi.com/products');

	const products = (await response.json()) as Product[];

	const myProduct: Product[] = products.filter(
		(item) =>
			decodeURIComponent(item.category) === decodeURIComponent(params.name)
	);
	if (!(myProduct.length > 1)) notFound();

	return (
		<div>
			<h1>{decodeURIComponent(params.name)}</h1>
			{myProduct.map((item, i) => (
				<ProductTeaser key={i} {...item} />
			))}
		</div>
	);
};

export default Category;

export function generateMetadata({ params }: Prop): Metadata {
	return {
		title: params.name,
	};
}
