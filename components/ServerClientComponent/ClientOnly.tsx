'use client';

export default function ClientOnly() {
	const isServer = typeof window === 'undefined';

	const renderInfo = `Client-Komponente gerendert auf ${
		isServer ? 'Server' : 'Client (Browser)'
	}`;

	console.log(renderInfo);
	// if (isServer) return null;

	return (
		<div>
			<strong style={{ color: 'red' }}>ClientOnly-Komponente</strong>
			{/* <div>Bildschirmbreite: {window.innerWidth}</div> */}
		</div>
	);
}
