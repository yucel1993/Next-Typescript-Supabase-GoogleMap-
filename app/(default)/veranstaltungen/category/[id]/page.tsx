// pages/[id]/page.tsx

import React from 'react';

import { supabaseBackend } from '@/lib/subaseClient';

type Props = {
	params: {
		id: string;
	};
};

const Page = async ({ params }: Props) => {
	const { id } = params;
	console.log({ id });

	const { data, error } = await supabaseBackend
		.from('Events')
		.select(
			`
            *
            , Venue:Venues(*),
            Category:Category(*)
          `
		)
		.eq('category', +id);
	if (!data) return;

	console.log(data[0].Category!.name);

	return (
		<div>
			<h1>{data[0].Category!.name}</h1>
			{data?.map((item) => (
				<div key={item.event_id}>
					<h2>{item.name}</h2>
					<h4>{item.description}</h4>
				</div>
			))}
		</div>
	);
};

export default Page;
