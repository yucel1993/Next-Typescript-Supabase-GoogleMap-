import Poll from '@/components/Polls/Poll';
import SlowComponent from '@/components/SlowComponet';

export default function Home() {
	return (
		<main className="default-layout">
			<h1>Willkommen zu Next</h1>
			{/* https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming#streaming-with-suspense */}
			{/* https://skeletonreact.com/ oder https://mhnpd.github.io/react-loader-spinner/ */}
			{/* <Suspense fallback={<strong>Laden…</strong>}>
				<SlowComponent />
			</Suspense> */}
			<SlowComponent />

			<Poll id={1} />
		</main>
	);
}
