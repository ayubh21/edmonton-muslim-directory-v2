import { AdvancedMarker, Pin, useMap } from '@vis.gl/react-google-maps';
import React, { useEffect, useState } from 'react';

interface Props {
	place: google.maps.places.Place | null;
}

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
