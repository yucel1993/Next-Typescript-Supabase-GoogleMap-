'use client';

// Error-Komponenten müssen use client nutzen

// https://nextjs.org/docs/app/building-your-application/routing/error-handling
type Props = {
	error: Error;
	reset: () => void;
};
export default function ErrorPage({ error, reset }: Props) {
	return (
		<main className="default-layout">
			<h1>Es gab ein Problem!</h1>
			<p>{error.message}</p>
			{/*
reset ist eine Funktion, mit der man die selbe Aktion (z.B. Seite laden)
nochmal probieren kann.
*/}
			<button onClick={reset}>Nochmal versuchen</button>
		</main>
	);
}
