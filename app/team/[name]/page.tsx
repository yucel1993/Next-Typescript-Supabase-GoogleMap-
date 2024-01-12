'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

type Prop = {
	params: {
		name: string;
	};
};

const page = ({ params }: Prop) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const router = useRouter();

	return (
		<div>
			<h2>Our Mentor {params.name}</h2>

			<button onClick={() => router.back()}>Zurück</button>
		</div>
	);
};

export default page;
