"use client"


import dynamic from "next/dynamic";
import { use, useEffect, useRef, useState } from "react"
import AutocompleteResult from "@/components/autocomplete-result";
import { AutocompleteCustom } from "@/components/autocomplete-custom";

const APIProvider = dynamic(() => import("@vis.gl/react-google-maps").then((pkg) => pkg.APIProvider), {
	ssr: false
});

const Map = dynamic(() => import("@vis.gl/react-google-maps").then((pkg) => pkg.Map), {
	ssr: false
});

const AdvancedMarker = dynamic(() => import("@vis.gl/react-google-maps").then((pkg) => pkg.AdvancedMarker), {
	ssr: false
});

const Pin = dynamic(() => import("@vis.gl/react-google-maps").then((pkg) => pkg.Pin), {
	ssr: false
});

const MapControl = dynamic(() => import("@vis.gl/react-google-maps").then((pkg) => pkg.MapControl), {
	ssr: false
});



export default function ListingLocation() {
	const [selected, setSelected] = useState<google.maps.places.Place | null>(null);
	return (
		<div className="">
			<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!} libraries={["places"]}>
				<AutocompleteCustom  onPlaceSelect={setSelected} />
				<AutocompleteResult place={selected} />
				<div className="h-56 mt-20">
					<Map
						defaultZoom={10}
						streetViewControl={false}
						mapTypeControl={false}
						defaultCenter={{ lat: 53.5461, lng: -113.4937 }}
						mapId={process.env.NEXT_PUBLIC_MAP_ID}
						zoomControl={false}
					>

						<AdvancedMarker position={
							{ lat: 53.5461, lng: -113.4937 }
						}>
							<Pin
							/>
						</AdvancedMarker>
					</Map>
				</div>
			</APIProvider>
		</div>
	)
}


