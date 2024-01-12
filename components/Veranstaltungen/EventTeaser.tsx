import type { Event } from '@/types/database-types';
import Link from 'next/link';

export type EventTeaserProps = Event & {};

export default function EventTeaser({
	name,

	event_id,
}: EventTeaserProps) {
	return (
		<article>
			{/* Name soll auch Link auf Einzelansicht sein. Link-Ziel
   		 soll /veranstaltungen/eventId
   		 Auf der Einzelansicht einfach nur Titel, Datum und falls
   		 vorhanden Beschreibung anzeigen.
   		 */}
			<h2>
				<Link href={`/veranstaltungen/${event_id}`}>{name}</Link>
			</h2>
			<dl>
				<dt>Datum:</dt>
				{/* <dd>
					<time dateTime={date}>{new Date(date).toLocaleDateString('de')}</time>
				</dd> */}
				<dt>Veranstaltungsort:</dt>

				<dd>Venue Name</dd>

				{/* Kategorien nur darstellen, wenn es welche gibt.
Beschriftung mit Singular oder Plural. 
Kategorien kommagetrennt auflisten.
*/}
				<dt>Kategeorie / Kategorien</dt>
				<dd>Party, Konzert</dd>
			</dl>
		</article>
	);
}
