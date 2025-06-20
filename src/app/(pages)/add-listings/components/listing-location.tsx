/*global google*/
"use client"
import React, { useState, useEffect, useRef } from "react";
import {
	GoogleMap,
	Libraries,
	Marker,
	StandaloneSearchBox,
	useJsApiLoader,
} from "@react-google-maps/api";
import { produce } from "immer";
import { MdDelete, MdMyLocation } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Latlng } from "@/types/listing";
import { useListingFormContext } from "./listing-form-context";
import LoadingComponent from "@/components/loading-indicator";
import { geocode } from "@/lib/geocode";

type Locations = {
	coordinates: Latlng[];
	addresses: string[];
};

const libraries: Libraries = ["places"];

export default function ListingLocation() {
	const { isLoaded, loadError } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
		libraries: libraries,
	});

	if (loadError) {
		console.error('Google Maps loading error:', loadError);
		return <div className="p-4 text-center text-red-500">Google Maps Error. Please try refreshing the page.</div>;
	}

	if (!isLoaded) {
		return null;
	}

	return <LocationForm />;
}

// ✅ This component only renders when Google Maps is ready
function LocationForm() {
	const { setValue, getValues, register, formState: { errors }, setError, clearErrors } = useListingFormContext();
	const [locations, setLocations] = useState<Locations>({
		coordinates: [{ lat: 53.5461, lng: -113.4938 }],
		addresses: []
	});
	const [showCoordinates, setShowCoordinates] = useState(false);
	const [lat, setLat] = useState("");
	const [lng, setLng] = useState("");
	// ✅ Now 'google' is available because this component only renders after API loads
	const commandRef = useRef(new Map<number, google.maps.places.SearchBox>());

	useEffect(() => {
		if (!getValues("addresses")) {
			setValue("addresses", []);
		}
	}, [getValues, setValue]);

	useEffect(() => {
		setValue("addresses", locations.addresses);
		if (locations.addresses.length > 0 && locations.addresses.some(addr => addr.trim() !== "")) {
			clearErrors("addresses");
		}
	}, [locations.addresses, setValue, clearErrors]);

	const handleOnPlacesChanged = async (index: number) => {
		try {
			const searchBox = commandRef.current.get(index);
			const searchResults = searchBox?.getPlaces();

			if (searchResults && searchResults.length > 0) {
				const placeAddress = searchResults[0].formatted_address;
				if (!placeAddress) return;

				const location = await geocode.getCoordinates(placeAddress);
				if (location) {
					setLocations(
						produce((draft) => {
							if (index < draft.coordinates.length) {
								draft.coordinates[index].lat = location.lat;
								draft.coordinates[index].lng = location.lng;
								draft.addresses[index] = placeAddress;
							}
						})
					);
				}
			}
		} catch (error) {
			console.error("Error getting place details:", error);
		}
	};

	const handleAddLocations = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setLocations(
			produce((draft) => {
				draft.coordinates.push({ lat: 53.5461, lng: -113.4938 });
				draft.addresses.push("");
			})
		);
	};

	const handleGetAddress = async (latitude: number, longitude: number, index: number) => {
		try {
			const coordinates: Latlng = { lat: latitude, lng: longitude };
			const data = await geocode.getAddress(coordinates);

			if (data.results && data.results.length > 0) {
				const formattedAddress = data.results[0].formatted_address;

				setLocations(
					produce((draft) => {
						if (index < draft.addresses.length) {
							draft.addresses[index] = formattedAddress;
						}
					})
				);

				clearErrors("addresses");
			}
		} catch (error) {
			console.error("Error getting address:", error);
		}
	};

	const handleRemoveLocation = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
		e.preventDefault();
		if (locations.coordinates.length <= 1) return;

		setLocations(
			produce((draft) => {
				draft.coordinates.splice(index, 1);
				draft.addresses.splice(index, 1);
			})
		);
	};

	const handleManualCoordinateChange = async (index: number) => {
		if (lat && lng) {
			setLocations(
				produce((draft) => {
					if (index < draft.coordinates.length) {
						draft.coordinates[index].lat = Number(lat);
						draft.coordinates[index].lng = Number(lng);
					}
				})
			);

			await handleGetAddress(Number(lat), Number(lng), index);
		}
	};

	const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
		const newValue = e.target.value;

		setLocations(
			produce((draft) => {
				draft.addresses[index] = newValue;
			})
		);

		if (newValue.trim() !== "") {
			clearErrors("addresses");
		}
	};

	const mapOptions = {
		zoomControl: false,
		fullscreenControl: false,
		mapTypeControl: false,
		streetViewControl: false
	};

	return (
		<div className="mt-3">
			<div className="px-4 pt-4">
				{locations.coordinates.map((location, index) => (
					<div key={index}>
						<div>
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
										onChange={(e) => handleAddressInputChange(e, index)}
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
								<div className="flex gap-4">
									<div className="flex-1">
										<label className="block mb-1">Latitude</label>
										<input
											className="w-full outline-none py-3.5 border-b-black border-b focus:border-b-emerald-600"
											type="text"
											value={lat}
											onChange={(e) => setLat(e.target.value)}
											onBlur={() => handleManualCoordinateChange(index)}
										/>
									</div>
									<div className="flex-1">
										<label className="block mb-1">Longitude</label>
										<input
											className="w-full outline-none py-3.5 border-b-black border-b focus:border-b-emerald-600"
											type="text"
											value={lng}
											onChange={(e) => setLng(e.target.value)}
											onBlur={() => handleManualCoordinateChange(index)}
										/>
									</div>
								</div>
							)}
						</div>

						<div className="h-56">
							<GoogleMap
								mapContainerClassName="map-container"
								zoom={10}
								options={mapOptions}
								center={location}
							>
								<Marker
									position={{ lat: location.lat, lng: location.lng }}
								/>
							</GoogleMap>
						</div>

						<div className="relative my-4">
							<hr />
							<div className="absolute inset-0 flex items-center justify-center">
								<button
									onClick={(e) => handleRemoveLocation(e, index)}
									className="bg-white p-2 rounded-full shadow-lg"
									disabled={locations.coordinates.length <= 1}
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
		</div>
	);
}
