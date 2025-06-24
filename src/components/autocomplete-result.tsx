import { AdvancedMarker, Pin, useMap } from '@vis.gl/react-google-maps';
import React, { useEffect } from 'react';

interface Props {
	place: google.maps.places.Place | null;
}

// a function that returns a number
const AutocompleteResult = ({ place }: Props) => {

	const map = useMap();
	useEffect(() => {
		if (!map || !place) return;
		if (place.viewport) map.fitBounds(place.viewport);
	}, [map, place]);

	if (!place) return null;

	return (
		<AdvancedMarker position={place.location}>
			<Pin
			/>
		</AdvancedMarker>
	);
};

export default React.memo(AutocompleteResult);
