import { CimdataLocation } from '@/lib/cimdataLocations';

type PropsWithDistance = {
	locations: (CimdataLocation & { distance?: number })[];
};
export default function LocationList({ locations }: PropsWithDistance) {
	console.log({ locations });
	return (
		<ul className="location-finder__list">
			{locations.map(({ title, distance }) => (
				<li key={title}>
					{title} {distance && `(${distance.toFixed(2)}) km`}
				</li>
			))}
		</ul>
	);
}
