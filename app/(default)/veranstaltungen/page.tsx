import { supabase } from '@/lib/subaseClient';

import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
	title: 'Events',
};
const page = async () => {
	const { data, error } = await supabase.from('Events').select(
		`
    *,
    Venue:Venues(*)
  `
	);

	const { data: Category, error: CategoryError } = await supabase
		.from('Category')
		.select(
			`
    *
   
  `
		);

	console.log({ Category });

	if (error) {
		return;
	}

	return (
		<div className="sidebar-layout">
			{data.map((item) => (
				<Link href={`/veranstaltungen/${item.event_id}`} key={item.name}>
					<h2>{item.name}</h2>
					<h5>{item.description}</h5>
					<h5>StandOrt:{item.Venue.name}</h5>
				</Link>
			))}
			<div>
				<h2> Categories</h2>{' '}
				{Category?.map((item) => (
					<Link
						href={`/veranstaltungen/category/${item.category_id}`}
						key={item.category_id}
					>
						<h4>{item.name}</h4>
					</Link>
				))}
			</div>
		</div>
	);
};

export default page;
