import Link from 'next/link';
import { ReactNode } from 'react';

type Props = {
	children: ReactNode;
};
type Category = string[];
export default async function layout({ children }: Props) {
	/* Hier die Kategorien laden: https://fakestoreapi.com/products/categories */

	const response = await fetch('https://fakestoreapi.com/products/categories');
	const category = (await response.json()) as Category;
	console.log(category);

	return (
		<div className="sidebar-layout">
			<main className="sidebar-layout__main">{children}</main>
			<aside className="sidebar-layout__sidebar">
				<h2 id="product-categories">Kategorien</h2>
				<nav
					className="category-navigation"
					aria-labelledby="product-categories"
				>
					<ul className="capitalize">
						{category.map((item, i) => (
							<li key={i}>
								<Link href={`/shop/category/${item}`}>{item}</Link>
							</li>
						))}
					</ul>
				</nav>
			</aside>
		</div>
	);
}
