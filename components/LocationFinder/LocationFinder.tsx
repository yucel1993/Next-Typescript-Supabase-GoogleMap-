'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

/*
1. Es soll entweder der Bereich location-finder__shop-map oder Map dargestellt werden.
Am Anfang soll der Button sichtbar sein.
2. Nach Klick auf den Button soll Map dargestellt werden, allerdings soll die Map-Komponente
dann dynamisch bei Bedarf geladen werden.
3. Weil Leaflet APIs nutzt, die nur im Browser zur Verfügung stehen, müssen wir dafür sorgen,
dass die Komponente nicht auf der Server gerendert wird.
*/
const Map = dynamic(() => import('@/components/LocationFinder/Map'), {
	ssr: false,
});

import allLocations, { LatLng } from '@/lib/cimdataLocations';

import LocationList from './LocationList';
import LocationSearch from './LocationSearch';
// Achtung, useRouter für Next ab Version 13 mit App-Verzeichnis nicht von next/router importieren!
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getDistance, getUserLocation } from '@/lib/helpers';

// Mitte von Deutschland
const defaultCenter = { lat: 51.1864708, lng: 10.0671016 };
const defaultZoom = 6;

/* const navigatorAvailable =
    typeof window !== 'undefined' && 'geolocation' in window.navigator; */

export default function LocationFinder() {
	const router = useRouter();
	const path = usePathname();
	const searchParams = useSearchParams();

	const [showMap, setShowMap] = useState(false);
	const [navigatorAvailable, setNavigatorAvailable] = useState(false);
	const [geolocationError, setGeolocationError] = useState('');
	const [userLocation, setUserLocation] = useState<null | LatLng>(
		getInitalUserLocation(searchParams)
	);
	const [mapCenter, setMapCenter] = useState(defaultCenter);
	const [zoom, setZoom] = useState(defaultZoom);

	useEffect(() => {
		setNavigatorAvailable(
			typeof window !== 'undefined' && 'geolocation' in window.navigator
		);
	}, []);

	useEffect(() => {
		if (userLocation) {
			setMapCenter(userLocation);
			setZoom(11);
			router.replace(`?lat=${userLocation.lat}&lng=${userLocation.lng}`);
		} else {
			reset();
			router.replace(path);
		}
	}, [userLocation, router, path]);

	function reset() {
		setMapCenter(defaultCenter);
		setZoom(defaultZoom);
		setUserLocation(null);
		setGeolocationError('');
	}

	async function showNearLocations() {
		setGeolocationError('');
		try {
			const location = await getUserLocation();
			console.log(location);
			const userCenter = {
				lat: location.coords.latitude,
				lng: location.coords.longitude,
			};
			setUserLocation(userCenter);
		} catch (error) {
			if (!(error instanceof GeolocationPositionError)) {
				return;
			}

			// https://developer.mozilla.org/en-US/docs/Web/API/PositionError
			switch (error.code) {
				case error.PERMISSION_DENIED:
					setGeolocationError(
						'Sie müssen die Erlaubnis zur Standortermittlung erteilen.'
					);
					break;

				case error.POSITION_UNAVAILABLE:
					setGeolocationError(
						'Ihr Standort konnte aus technischen Gründen nicht ermittelt werden.'
					);
					break;

				case error.TIMEOUT:
					setGeolocationError('Die Standortermittlung dauerte zu lange.');
			}
		}
	}

	/* 4. Speichert in die neue Variable visibleLocations entweder allLocations (wenn
   	 userLocation null ist) oder den Rückgabewert von getLocationsInRadius */
	const visibleLocations = userLocation
		? getLocationsInRadius(userLocation, 20)
		: allLocations;

	return (
		<section className="location-finder">
			{navigatorAvailable && (
				<button onClick={showNearLocations}>
					Zeige Standorte in meiner Nähe
				</button>
			)}
			{geolocationError && (
				<strong className="location-finder__error">{geolocationError}</strong>
			)}
			<LocationSearch setUserLocation={setUserLocation} />
			<div>
				<button onClick={reset}>Zurücksetzen</button>
			</div>
			{/* 5. Gebt visibleLocations statt allLocations in Map  */}
			{showMap ? (
				<Map zoom={zoom} center={mapCenter} locations={visibleLocations} />
			) : (
				<div className="location-finder__show-map">
					<button
						aria-describedby="map-privacy-info"
						onClick={() => setShowMap(true)}
					>
						Karte anzeigen
					</button>
					<small id="map-privacy-info">
						Wenn Sie die Karte anzeigen, stimmen Sie der Datenschutzerklärung
						zu.
					</small>
				</div>
			)}

			{/* 8. Erstellt eine neue Komponente namens LocationList, welche
   		 eine Liste mit den Standorten darstellt, und dabei falls vorhanden
   		 auch die Distanz nach dem Namen anzeigt. */}
			<LocationList locations={visibleLocations} />
		</section>
	);
}

/* 1. Gebt center und radius (mit Standardwert 10) in die Funktion. */
function getLocationsInRadius(center: LatLng, radius = 10) {
	/* 2. Filtert allLocations so, dass nur Standorte im Radius in dem
    neuen Array locationsInRadius enthalten sind. Nutzt dafür die
    Funktion getDistance. */

	const clonedLocations = structuredClone(allLocations);

	const locationsInRadius = clonedLocations.filter((location) => {
		const distance = getDistance(
			center.lat,
			center.lng,
			location.latLng.lat,
			location.latLng.lng
		);

		location.distance = distance;

		return distance <= radius;
	});

	locationsInRadius.sort((a, b) => a.distance! - b.distance!);

	/* 6. Ändert den Typ für CimdataLocation so, dass er eine optionale Eigenschaft
namens distance vom Typ number hat. Speichert in jede Location den
Rückgabewert von getDistance. */
	/* 7. Sortiert den Array locationsInRadius nach der distance-Eigenschaft. */
	/* 3. Gebt locationsInRadius zurück */
	return locationsInRadius;
}

function getInitalUserLocation(searchParams: URLSearchParams) {
	const lat = searchParams.get('lat');
	const lng = searchParams.get('lng');

	if (!lat || !lng) {
		return null;
	}

	return {
		lat: Number(lat),
		lng: Number(lng),
	};
}

/* Nutzt useEffect um
    1. in mapCenter den Wert von userLocation zu speichern, wenn
    userLocation nicht null ist. Zudem soll dann zoom auf 11 gesetzt
    werden.
    2. Wenn userLocation (wieder) null ist, sollen zoom und mapCenter
    wieder die Default-Werte haben.

    Achtung: Die Karte wird noch nicht reagieren!
    */
