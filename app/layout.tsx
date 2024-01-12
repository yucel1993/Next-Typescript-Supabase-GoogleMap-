import type { Viewport, Metadata } from 'next';
// https://nextjs.org/docs/app/building-your-application/optimizing/fonts
import { Karla, Merriweather, Rubik_Bubbles } from 'next/font/google';

/* Globale Styles, die auf allen Seiten geladen werden.
Wenn man größere Mengen spezifischer Styles hat, kann man
auch in einzelnen page- bzw. Komponenten-Dateien css oder
scss-Dateien importieren.
*/

import '@/sass/style.scss';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import NewsletterForm from '@/components/NewsLetter/NewsLetterForm';

// https://nextjs.org/docs/app/api-reference/functions/generate-viewport
export const viewport: Viewport = {
	// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name/theme-color
	themeColor: [
		{ color: 'hotpink', media: '(prefers-color-scheme: light)' },
		{ color: 'purple', media: '(prefers-color-scheme: dark)' },
	],
};

// https://nextjs.org/docs/app/building-your-application/optimizing/metadata
export const metadata: Metadata = {
	title: 'Next',
	description: 'Eine Next-Website',
	icons: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
};

const karlaStyles = Karla({
	subsets: ['latin'],
	weight: ['500', '800'],
	style: 'normal',
	display: 'swap',
	variable: '--font-karla',
});

const rubikBubbles = Rubik_Bubbles({
	subsets: ['latin'],
	weight: ['400'],
	style: ['normal'],
	display: 'swap',
	variable: '--font-rubik',
});

const merriweatherStyles = Merriweather({
	subsets: ['latin'],
	weight: ['300', '400', '700', '900'],
	style: ['italic', 'normal'],
	display: 'swap',
	variable: '--font-merriweather',
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={`${karlaStyles.variable} ${merriweatherStyles.variable} ${rubikBubbles.variable}`}
			>
				<div className="site-wrapper">
					<Header />
					<div className="site-content">{children}</div>
				</div>
				<NewsletterForm />

				<Footer />
			</body>
		</html>
	);
}
