import { Product } from '@/types/shop-types';
import Image from 'next/image';

import Link from 'next/link';

type Prop = Pick<Product, 'title' | 'price' | 'image' | 'id'>;
export default function ProductTeaser({ title, price, image, id }: Prop) {
	return (
		<article className="product-teaser">
			<Link href={`/shop/${id}`}>
				<h2 className="product-teaser__title capitalize">{title}</h2>
				<strong>{price} €</strong>

				<Image
					width={400}
					height={400}
					className="product-teaser__image"
					sizes="(max-width: 56rem) 90vw,  54rem"
					src={image}
					alt="png"
				/>
			</Link>
		</article>
	);
}
