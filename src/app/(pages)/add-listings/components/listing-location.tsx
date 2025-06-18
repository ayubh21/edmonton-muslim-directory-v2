import React, { useState, useEffect, useRef, useCallback } from "react";
import {
	Libraries,
	StandaloneSearchBox,
	useJsApiLoader,
} from "@react-google-maps/api";
import { AdvancedMarker, Map as GMap, Pin } from "@vis.gl/react-google-maps";
import { fromPlaceId, setKey } from "react-geocode";
import { produce } from "immer";
import { MdDelete, MdMyLocation } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Latlng } from "@/types/listing";
import { useListingFormContext } from "./listing-form-context";
import LoadingComponent from "@/components/loading-indicator";

type Locations = {
	coordinates: Latlng[];
	addresses: string[];
};

const libraries: Libraries = ["places"];


export default function ListingLocation() {
	const { setValue, getValues, register, formState: { errors }, setError, clearErrors, trigger } = useListingFormContext()
	const [isLoading, setIsLoading] = useState(false);
	const [locations, setLocations] = useState<Locations>({
		coordinates: [{ lat: 53.5461, lng: -113.4938 }], addresses: []
	});
	const [showCoordinates, setShowCoordinates] = useState(false);
	const [lat, setLat] = useState("");
	const [lng, setLng] = useState("");
	const commandRef = useRef(new Map<number, google.maps.places.SearchBox>())

	useEffect(() => {
		if (!getValues("addresses")) {
			setValue("addresses", []);
		}
	}, [getValues, setValue, locations.addresses]);

	useEffect(() => {
		setValue("addresses", locations.addresses);
		if (locations.addresses.length > 0 && locations.addresses.some(addr => addr.trim() !== "")) {
			clearErrors("addresses");
		}
	}, [locations.addresses, setValue, clearErrors]);

	useEffect(() => {
		setKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!);
	},);


	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
		libraries: libraries,
		version: "weekly",
	});

	if (!isLoaded) return null;

	const handleOnPlacesChanged = async (index: number) => {
		// call get places from the correct index of my map	
		const searchBox = commandRef.current.get(index)
		const searchResults = searchBox?.getPlaces()
		if (searchResults && searchResults.length > 0) {
			const placeId = searchResults[0].place_id;
			const placeAddress = searchResults[0].formatted_address;

			if (placeId) {
				try {
					const results = await fromPlaceId(placeId);
					const location = results.results[0].geometry.location;


					for (let i = 0; i < locations.coordinates.length; i++) {
						if (i == index) {
							setLocations(
								produce((draft) => {
									if (index < draft.coordinates.length) {
										draft.coordinates[index].lat = location.lat;
										draft.coordinates[index].lng = location.lng;
										draft.addresses[index] = placeAddress!
									}
								})
							);
						}
					}
					// Clear validation errors after selecting a place
				} catch (error) {
					console.error("Error getting place details:", error);
				}
			}
		}
	};

	const handleAddLocations = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setLocations(
			produce((draft) => {
				draft.coordinates.push({ lat: 53.5461, lng: -113.4938 });
				draft.addresses.push("")
			})
		);
	};

	const handleGetAddress = async (
		latitude: number,
		longitude: number,
		index: number
	) => {
		try {
			const options = {
				method: "GET",
				headers: {
					"User-Agent":
						"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
				},
			};

			const response = await fetch(
				`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
				options
			);

			const data = await response.json();
			if (data.results && data.results.length > 0) {
				const formattedAddress = data.results[0].formatted_address;

				clearErrors("addresses");
			}
		} catch (e) {
			console.log(e);
		}
	};

	const handleRemoveLocation = (
		e: React.MouseEvent<HTMLButtonElement>,
		index: number
	) => {
		e.preventDefault();

		// Don't remove if it's the last one
		if (locations.coordinates.length <= 1) return;
		setLocations(
			produce((draft) => {
				draft.coordinates.splice(index, 1);
				draft.addresses.splice(index, 1)
			})
		);
	};

	const handleManualCoordinateChange = async (index: number) => {
		if (lat && lng) {
			// Update coordinates
			setLocations(
				produce((draft) => {
					if (index < draft.coordinates.length) {
						draft.coordinates[index].lat = Number(lat);
						draft.coordinates[index].lng = Number(lng);
					}
				})
			);

			// Get address from coordinates
			await handleGetAddress(Number(lat), Number(lng), index);
		}
	};

	const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
		const newValue = e.target.value;

		setLocations(
			produce((draft) => {
				draft.addresses[index] = newValue;
			})
		)

		if (newValue.trim() !== "") {
			clearErrors("addresses");
		}
	};


	return (
		<div className={"mt-3"}>
			{isLoaded && (
				<div className={"px-4 pt-4"}>
					{locations.coordinates.map((location, index) => (
						<div key={index}>
							<div className={""}>
								<StandaloneSearchBox
									onLoad={(ref) => commandRef.current.set(index, ref)}
									onPlacesChanged={() => handleOnPlacesChanged(index)}
								>
									<div className="items-center mb-4 relative">
										<input
											{...register(`addresses.${index}`, { minLength: 1 })}
											type="text"
											placeholder="Enter your location"
											className={`w-full text-left py-3.5 placeholder-black outline-none top-0 ${errors.addresses ? "border-b border-red-500" : "border-b focus:border-b-emerald-600"}`}
										/>
										<MdMyLocation
											size={18}
											className="absolute right-0 bottom-4"
										/>
									</div>
								</StandaloneSearchBox>
								<button
									onClick={() => setShowCoordinates(!showCoordinates)}
									className="text-right w-full py-5 outline-none"
								>
									Enter coordinates manually
								</button>

								{showCoordinates && (
									<div className="flex">
										<div>
											<label>Latitude</label>
											<input
												className="w-full outline-none py-3.5 border-b-black border-b focus:border-b-emerald-600"
												type="text"
												value={lat}
												onChange={(e) => setLat(e.target.value)}
												onBlur={() => handleManualCoordinateChange(index)}
											/>
										</div>
										<div>
											<label>Longitude</label>
											<input
												className="locationBorder w-full outline-none focus:border-b-violet py-3.5 border-b-black border-b focus:border-b-emerald-600"
												type="text"
												value={lng}
												onChange={(e) => setLng(e.target.value)}
												onBlur={() => handleManualCoordinateChange(index)}
											/>
										</div>
									</div>
								)}
							</div>

							<div className={"h-56"}>
								<GMap
									defaultCenter={location}
									defaultZoom={10}
									streetViewControl={false}
									mapTypeControl={false}
									center={location}
									mapId={process.env.NEXT_PUBLIC_MAP_ID}
									zoomControl={false}
								>
									<AdvancedMarker
										position={{ lat: location.lat, lng: location.lng }}
									>
										<Pin />
									</AdvancedMarker>
								</GMap>
							</div>

							<div className="relative my-4">
								<hr />
								<div className="absolute inset-0 flex items-center justify-center">
									<button
										onClick={(e) => handleRemoveLocation(e, index)}
										className="bg-white p-2 rounded-full shadow-lg"
									// disabled={locations.coordinates.length <= 1}
									>
										<MdDelete className="cursor-pointer" />
									</button>
								</div>
							</div>
						</div>
					))}

					<Button
						onClick={handleAddLocations}
						className="bg-faintGrey text-black text-center w-full h-full my-8 shadow-none font-normal p-4 hover:bg-[#f2f3f2]"
					>
						Add Location
					</Button>
				</div>
			)}
		</div>
	);
}