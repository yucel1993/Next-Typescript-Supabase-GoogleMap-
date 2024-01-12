/*
https://syntax.fm/show/636/what-are-headless-components
https://www.downshift-js.com/use-combobox
*/

import { useDebouncedValue } from '@/lib/hooks/useDebouncedValue';

import { UseComboboxStateChange, useCombobox } from 'downshift';
import axios from 'redaxios';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { LatLng, Suggestion } from '@/lib/cimdataLocations';

type Props = {
	setUserLocation: Dispatch<SetStateAction<LatLng | null>>;
};
export default function LocationSearch({ setUserLocation }: Props) {
	const [term, setTerm] = useState('');
	const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
	const debouncedTerm = useDebouncedValue(term, 600);

	useEffect(() => {
		if (debouncedTerm.length < 2) {
			setSuggestions([]);
			return;
		}

		async function fetchSuggestions() {
			try {
				const { data } = await axios<Suggestion[]>('/api/locations', {
					params: {
						search: debouncedTerm,
					},
				});

				setSuggestions(data);
			} catch (e) {
				console.log(e);
			}
		}

		fetchSuggestions();
	}, [debouncedTerm]);

	function handleSelection(selection: UseComboboxStateChange<Suggestion>) {
		const selectedSuggestion = selection.selectedItem;

		if (!selectedSuggestion) {
			return;
		}

		setUserLocation({
			lat: Number(selectedSuggestion.latitude),
			lng: Number(selectedSuggestion.longitude),
		});
	}

	const {
		getLabelProps,
		getInputProps,
		getMenuProps,
		isOpen,
		getItemProps,
		highlightedIndex,
		reset,
	} = useCombobox({
		items: suggestions, // Suchvorschläge
		// Wird bei jeder Texteingabe aufgerufen:
		onInputValueChange: (inputData) => setTerm(inputData.inputValue ?? ''),
		itemToString, // Wandelt ausgewähltes Objekt in einen String für das input-Element um
		// Wird aufgerufen, wenn das ausgewählte Objekt sich ändert:
		onSelectedItemChange: handleSelection,
	});

	function clearSearch() {
		setTerm('');
		setUserLocation(null);
		reset();
	}

	return (
		<div className="combobox">
			<label htmlFor="location-search" {...getLabelProps()}>
				Ort oder Postleitzahl
			</label>

			<div className="input-delet-wrapper">
				<input
					id="location-search"
					className="combobox__input"
					{...getInputProps()}
				/>
				<button aria-label="Eingabe löschen" onClick={clearSearch}>
					&times;
				</button>
			</div>
			<ul className="combobox__list" {...getMenuProps()}>
				{isOpen &&
					suggestions.map((suggestion, index) => (
						<li
							key={suggestion.place + suggestion.zipcode + suggestion.latitude}
							{...getItemProps({ item: suggestion, index })}
							className={`combobox__item ${
								index === highlightedIndex ? 'combobox__item--highlighted' : ''
							}`}
						>
							{suggestion.zipcode} {suggestion.place}
						</li>
					))}
			</ul>
		</div>
	);
}

function itemToString(item: Suggestion | null) {
	if (!item) {
		return '';
	}

	return `${item.zipcode} ${item.place}`;
}

/* 1. Erschafft einen Typ Suggestion, der zur Rückgabe von /api/locations passt */

/* 2.
 Schafft einen state Namens term (string). Dann nutzt den useDebouncedValue-Hook,
 um die Tastatureingabe verzögert in die Variable debouncedTerm zu speichern. */

/* 3. useEffect, redaxios und debouncedTerm nutzen, um Schnittstelle
  anzufragen und das Ergebnis in den State suggestions zu speichern. Prüft,
  ob mindestens zwei Zeichen eingegeben wurden. */

/* 4. Zeigt die suggestions im ul-Element an. */
