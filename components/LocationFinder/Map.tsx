import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
/* Eigentlich wollen wir https://github.com/yuzhva/react-leaflet-markercluster
nutzen, aktuell ist das Paket aber nicht mit react-leaflet 4 kompatibel, und wird
wohl auch nicht mehr weiterentwickelt. Die @changey-Version ist nur ein
Fork mit Bugfix, um Kompatibel mit react-leaflet 4 zu sein. */
// @ts-ignore
import MarkerClusterGroup from '@changey/react-leaflet-markercluster';
import { LatLng } from 'leaflet';
import { CimdataLocation } from '@/lib/cimdataLocations';
import { useEffect } from 'react';
type Props = {
	zoom: number;
	center: {
		lat: number;
		lng: number;
	};
	locations?: CimdataLocation[];
};

export default function Map({ zoom, center, locations = [] }: Props) {
	return (
		<MapContainer zoom={zoom} center={center} scrollWheelZoom={false}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<MarkerClusterGroup>
				{locations.map(({ title, latLng }) => (
					<Marker key={title} position={latLng}>
						<Popup>{title}</Popup>
					</Marker>
				))}
			</MarkerClusterGroup>
			<MapController zoom={zoom} center={center} />
		</MapContainer>
	);
}

function MapController({ zoom, center }: Props) {
	/* map enthält die Leaflet-Instanz. */
	const map = useMap();

	/* Hier werden Methoden der Leaflet-Bibliothek verwendet, ganz unabhängig
    	von React!
   	https://leafletjs.com/reference.html#map-methods-for-modifying-map-state
    	(Achtung: Da map.setView() das map-Objekt zurückgibt, müssen wir bei der Callback-
    	Funktion in useEffect geschweifte Klammern verwenden, um die automatische Rückgabe
    	bei einzeiligen Pfeilfunktionen zu vermeiden. React würde sonst map für die
    	"Aufräum-Funktion" des Effekts halten und als Funktion aufrufen, was zum Absturz
    	des Programms führen würde.)
    	*/
	useEffect(() => {
		map.setView(center, zoom);
	}, [zoom, center, map]);

	return null;
}
