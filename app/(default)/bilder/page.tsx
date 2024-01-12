/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Image from 'next/image';
import hongKong from '@/img/hong-kong.jpg';

export const metadata: Metadata = {
	title: 'Bilder',
};

export default function BilderPage() {
	return (
		<>
			<h1>Bilder</h1>
			{/*
  	Wenn man ein Bild, das auf dem Server liegt, zuvor importiert
  	und bei src einsetzt, kann man width und height weglassen.
  	placeholder="blur" erzeugt eine verschwommene sehr kleine
  	Variante des Bildes, die sofort sichtbar ist und dann später
  	durch das volle Bild ausgetauscht wird.
  	Demo: https://image-component.nextjs.gallery/placeholder
  	*/}
			<Image
				src={hongKong}
				alt="Hong Kong"
				sizes="(max-width: 56rem) 90vw,  54rem"
				placeholder="blur"
			/>

			{/* x-Descriptor für einfache oder doppelte Auflösung,
   		 nur geeignet, wenn das Bild immer in der selben Größe
   		 erscheint, z.B. bei Logos oder Icons.
   		 In srcSet kann die Angabe zu 1x weggelassen werden, dann
   		 wird src für 1x verwendet.
   		 Bei width und height kommt es nur auf das korrekte Seitenverhältnis
   		 an, damit der Browser schon vor dem Laden der Datei weiß,
   		 wieviel vertikalen Platz er freihalten muss.
   		  */}
			<img
				className="logo"
				src="/img/logo@1x.jpg"
				alt="Bildbeschreibung"
				srcSet="/img/logo@1x.jpg 1x, /img/logo@2x.jpg 2x"
				width="32"
				height="10"
				loading="lazy"
			/>

			<img
				className="full-width-image"
				src="https://picsum.photos/id/1011/900/450"
				srcSet="https://picsum.photos/id/1011/450/225 450w, https://picsum.photos/id/1011/900/450 900w, https://picsum.photos/id/1011/1350/675 1350w, https://picsum.photos/id/1011/1800/900 1800w"
				sizes="(width <= 56rem) 90vw, 54rem"
				width="2"
				height="1"
				alt="Frau im Kanu"
				loading="lazy"
			/>

			<picture>
				<source
					media="(width <= 30rem) and (orientation: portrait)"
					srcSet="/img/header-image-portrait.jpg"
					width="1"
					height="2"
				/>
				<source
					media="(width <= 40rem) and (orientation: portrait)"
					srcSet="/img/header-image-square.jpg"
					width="1"
					height="1"
				/>
				<img
					className="full-width-image"
					src="/img/header-image-landscape@1000.jpg"
					srcSet="/img/header-image-landscape@1000.jpg 1000w,/img/header-image-landscape@1500.jpg 1500w,/img/header-image-landscape@2000.jpg 2000w"
					sizes="(max-width: 56rem) 90vw,  54rem"
					width="1000"
					height="667"
					loading="lazy"
					alt="Mann mit Kind am Strand"
				/>
			</picture>

			<picture>
				<source srcSet="/img/herbst.avif" type="image/avif" />
				<source srcSet="/img/herbst.webp" type="image/webp" />
				<img
					className="full-width-image"
					src="/img/herbst.jpg"
					alt="Herbstliche Blätter"
					loading="lazy"
					width="4"
					height="3"
				/>
			</picture>

			<Image
				alt="Hong Kong"
				className="full-width-image"
				src="/img/hong-kong.jpg"
				sizes="(max-width: 56rem) 90vw,  54rem"
				width={5184}
				height={3456}
			/>
		</>
	);
}
