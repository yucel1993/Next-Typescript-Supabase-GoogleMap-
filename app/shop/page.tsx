import { Metadata } from 'next';
import type { Product } from '@/types/shop-types';
import ProductTeaser from '@/components/ProductTeaser';

export const metadata: Metadata = {
	title: 'Shop',
};

const ShopPage = async () => {
	const response = await fetch('https://fakestoreapi.com/products');

	const products = (await response.json()) as Product[]; //* JSON will do this

	return (
		<>
			<h1>Shop Page</h1>
			{products.map((item, i) => (
				<ProductTeaser key={i} {...item} />
			))}
		</>
	);
};

export default ShopPage;
