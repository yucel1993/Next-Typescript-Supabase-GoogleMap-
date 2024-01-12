import type { Metadata } from 'next';
import { getFormattedPrice } from '@/lib/helpers';
import { Product } from '@/types/shop-types';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Props = {
	params: {
		// Alles aus der URL ist vom Typ String. id entspricht Ordnernamen [id]
		id: string;
	};
};
export default async function SingleProductPage({ params }: Props) {
	const { title, description, price } = await getProductData(params.id);
	await new Promise((resolve) => setTimeout(resolve, 4000));

	return (
		<>
			<article>
				<h1>{title}</h1>
				<p>{description}</p>
				<strong>{getFormattedPrice(price * 100)}</strong>
			</article>
			<Link href="/shop">Zurück zur Produktübersicht</Link>
		</>
	);
}

/*
Für dynamische Metadaten, die nicht fest in die Datei geschrieben werden können,
kann man eine asynchrone Funktion mit dem vorgegebenen Namen generateMetadata
exportieren.
https://nextjs.org/docs/app/api-reference/functions/generate-metadata
*/
export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { title } = await getProductData(params.id);

	return {
		title,
	};
}

/* Next "de-dupliziert" mehrfache Aufrufe des selben Fetch-Befehls,
d.h. fetch wird nur einmal aufgerufen und das Ergebnis wird danach
aus dem Cache zurückgegeben. */
async function getProductData(id: string): Promise<Product> {
	const response = await fetch(`https://fakestoreapi.com/products/${id}`);

	/* notFound() wirft einen Fehler, der entweder von einer error.tsx oder einer
 not-found.tsx-Datei "aufgefangen" wird, je nachdem, welche in der Ordnerstruktur
 näher an der Datei ist, in der man notFound() aufruft. not-found.tsx muss also
 mindestens im selben Ordner wie error.tsx liegen, oder in einem tiefer
 verschachtelten Ordner "näher" an der Datei, in der der Fehler geworfen wird.
 https://nextjs.org/docs/app/api-reference/functions/not-found#notfound

 Die not-found-Datei dient dazu, eine besondere Seite für nicht gefundene
 URLs anzuzeigen.
 https://nextjs.org/docs/app/api-reference/file-conventions/not-found

 (Funktioniert bei der fakestore.api nicht, bei einer "echten" API sollte
 response.status 404 sein, oder alternativ sollte im geparsten JSON-Objekt
  die Information stecken, das nichts gefunden wurde.)
  */
	if (response.status === 404) {
		notFound();
	}

	const product = (await response.json()) as Product;

	return product;
}
