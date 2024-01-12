import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
// import CustomClientOnly from './ServerClientComponent/ClientOnly'; // Renamed dynamically imported component
import ServerComponent from './ServerClientComponent/ServerComponent';
import ClientComponent from './ServerClientComponent/ClientComponent';

export const metadata: Metadata = {
	title: 'Client-Server',
};

export default function ClientServerPage() {
	const DynamicClientOnly = dynamic(
		() => import('./ServerClientComponent/ClientOnly')
	);

	return (
		<>
			<h1>Client und Server</h1>
			<ServerComponent />
			<ClientComponent slot={<ServerComponent />}>
				<ServerComponent />
			</ClientComponent>
			{/* <CustomClientOnly /> Use the statically imported component */}
			<DynamicClientOnly /> {/* Use the dynamically imported component */}
		</>
	);
}
