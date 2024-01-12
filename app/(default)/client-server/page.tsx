import ClientComponent from '@/components/ServerClientComponent/ClientComponent';
import ClientOnly from '@/components/ServerClientComponent/ClientOnly';
import ServerComponent from '@/components/ServerClientComponent/ServerComponent';

import React from 'react';

const ClientServer = () => {
	// const DynamicClientOnly = dynamic(
	// 	() => import('../../../components/ServerClientComponent/ClientOnly')
	// );
	return (
		<>
			<h1> Client-Server</h1>

			<ServerComponent />
			<ClientComponent slot={<ServerComponent />}>
				<ServerComponent />
			</ClientComponent>
			<ClientOnly />
			{/* <DynamicClientOnly /> */}
		</>
	);
};

export default ClientServer;
