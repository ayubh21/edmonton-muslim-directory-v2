import React, { FormEvent, use, useCallback, useEffect, useState } from 'react';
import { useAutocompleteSuggestions } from '@/hooks/use-autocomplete-suggestions';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { Latlng } from '@/types/listing';
import { geocode } from '@/lib/geocode';
import { useListingFormContext } from '@/app/(pages)/add-listings/components/listing-form-context';
import { produce } from 'immer';

interface Props {
	onPlaceSelect: (place: google.maps.places.Place | null) => void;
}


function useDebounce(input: string, delay: number) {
	const [ debouncedValue, setDebouncedValue] = useState(input);
	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(input)
		}, delay)
		return () => {
			clearTimeout(handler)
		}
	},[input, delay])
	return debouncedValue;
}

export const AutocompleteCustom = ({onPlaceSelect}: Props) => {
	const places = useMapsLibrary('places');
	const [inputValue, setInputValue] = useState<string>('');
	const debouncedValue = useDebounce(inputValue, 500)
	const [currentSuggestions, setCurrentSuggestions] = useState<string[]>([])
	const { setValue, getValues, register, formState: { errors }, clearErrors } = useListingFormContext();

	const { suggestions, resetSession } = useAutocompleteSuggestions(debouncedValue);

	const handleInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		if(newValue != inputValue) {
			setInputValue(newValue)
		}
		setCurrentSuggestions([])
		if (inputValue != "") {
			clearErrors("addresses")
		}
	}, [inputValue, clearErrors]);

	const handleSuggestionClick = useCallback(
		async (suggestion: google.maps.places.AutocompleteSuggestion) => {
			if (!places) return;
			if (!suggestion.placePrediction) return;

			const place = suggestion.placePrediction.toPlace();
			await place.fetchFields({
				fields: [
					'viewport',
					'location',
					'svgIconMaskURI',
					'iconBackgroundColor',
				],
			});

			if (place) {
				const coordinates: Latlng = {
					lat: place!.location!.lat(),
					lng: place!.location!.lng()
				}
				const data = await geocode.getAddress(coordinates)
				setCurrentSuggestions(
					produce((draft) => {
						draft.push(data.results[0].formatted_address)
					})
				)
			}

			// calling fetchFields invalidates the session-token, so we now have to call
			// resetSession() so a new one gets created for further search
			resetSession();
			onPlaceSelect(place);

		},
		[places, onPlaceSelect, resetSession]
	);


	useEffect(() => {
		setValue("addresses", currentSuggestions)
		if (currentSuggestions.length > 0 && currentSuggestions.some(addr => addr.trim() !== "")) {
			clearErrors("addresses")
		}
	}, [currentSuggestions, setValue, clearErrors])



	return (
		<div className="">
			<input
				{...register(`addresses`)}
				value={currentSuggestions.length > 0  ? currentSuggestions[0] : inputValue}
				onChange={handleInput}
				placeholder="Enter Location"
				className={`w-full text-left py-3.5 placeholder-black outline-none top-0 ${errors.addresses ? "border-b border-red-500" : "border-b focus:border-b-emerald-600"}`} />
			{suggestions.length > 0 && (
				<ul className="shadow-lg">
					{suggestions.map((suggestion, index) => {
						return (
							<div key={index} className='flex hover:bg-gray-200 cursor-pointer '>
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 -960 960 960" className=" shrink-0 my-2 mx-1.5 place-autocomplete-element-place-icon-default-pin"><path d="M480-80q-14 0-24-8t-15-21q-19-56-47.5-105T314-329q-51-66-82.5-126T200-600q0-117 81.5-198.5T480-880q117 0 198.5 81.5T760-600q0 91-34.5 151.5T646-329q-54 72-81.5 119.5T519-109q-5 14-15.5 21.5T480-80Zm0-143q17-34 38.5-67t63.5-88q43-56 70.5-103.5T680-600q0-83-58.5-141.5T480-800q-83 0-141.5 58.5T280-600q0 71 27.5 118.5T378-378q42 55 63.5 88t38.5 67Zm0-277q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Zm0-100Z"></path></svg>
								<li
									key={index}
									className="text-sm text-ellipsis truncate my-2 "
									onClick={() => handleSuggestionClick(suggestion)}>
									{suggestion.placePrediction?.text.text}
								</li>
								<hr className='h-3 ' />
							</div>
						);
					})}
				</ul>
			)}
		</div>
	);
};
