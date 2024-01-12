import { supabase } from '@/lib/subaseClient';
import { notFound } from 'next/navigation';
import React from 'react';
type Props = {
	params: {
		id: number;
	};
};

const page = async ({ params }: Props) => {
	const { data, error: biggerError } = await supabase.from('Events').select(
		`
    *,
    Venue:Venues(*)
  `
	);
	console.log({ data });

	const { data: event, error } = await supabase
		.from('Events')
		.select(
			`
        *,
        Venue:Venues(*)
      `
		)
		.eq('event_id', params.id)
		.limit(1)
		.single();
	console.log(event);

	if (!event) {
		notFound();
	}
	const relevantPlaces = await getNetxEventsInVenue(
		event.Venue.venue_id,
		event.event_id
	);
	console.log('Similar Places:', relevantPlaces);

	return (
		<div>
			<h2>{event.name}</h2>
			<h3>{event.description}</h3>
			<h4>{new Date(event.created_at).toLocaleString('de')}</h4>
			{event.timeStamp && (
				<h4>Created At:{new Date(event.timeStamp).toLocaleString('de')}</h4>
			)}
			<h4>Ort:{event.Venue.name}</h4>

			{/* here  show other similar eventplaces   */}
		</div>
	);
};

export default page;

// Metadaten ergänzen

/* Dies Funktion soll die nächsten Veranstaltungen im selben
Veranstaltungsort wie die angezeigte Veranstaltung aus der Datenbank
holen. Die angezeigte Veranstaltung soll dabei nicht aus der Datenbank
geholt werden.  */

async function getNetxEventsInVenue(
	displayedEventVenueName: number,
	id: number
) {
	console.log({ displayedEventVenueName, id });
	try {
		const { data: similarEvents, error } = await supabase
			.from('Events')
			.select('*')
			.neq('event_id', id) // Exclude the displayed event
			.eq('Venue.venue_id', displayedEventVenueName);

		if (error || similarEvents === null) {
			console.error('Error fetching similar events.');
			return [];
		}

		return similarEvents;
	} catch (error) {
		console.error('Error fetching similar events:', error);
		return [];
	}
}
