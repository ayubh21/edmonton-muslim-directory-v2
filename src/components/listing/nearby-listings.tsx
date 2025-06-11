"use client"

import { Latlng, Listing } from "@/types/listing"
import BusinessCard from "../business-card";
import { useEffect, useState } from "react";
import { getDistanceFromLatLonInKm } from "@/lib/utils";
import { useParams} from "next/navigation";

interface NearbyListings {
	listings: Listing[];
	position: Latlng
	proximity?: number
}

export default function NearbyListings({ listings, position, proximity = 20 }: NearbyListings) {

	const params = useParams()

	const [nearbyListings, setNearbyListings] = useState<Listing[]>([])
	useEffect(() => {
		const currentListingId = parseInt(params.id as string)
		let initialListings = listings
		initialListings = initialListings.filter((listing) => {

			if (listing.id === currentListingId) {
				return;
			}
			const distance = getDistanceFromLatLonInKm(
				listing.addresses[0].lat,
				listing.addresses[0].lng,
				position.lat,
				position.lng
			);
			return distance <= proximity
		});
		initialListings = initialListings.slice(0, 4)
		setNearbyListings(initialListings)
	}, [position.lat, position.lng, listings, params.id, proximity])

	return (
	<div>

{nearbyListings.length == 3  ? (
		<div className="grid md:grid-cols-2 gap-2 lg:grid-cols-3">
				<h3 className="text-center font-semibold text-xl">Nearby Listings</h3>
			{nearbyListings.map((listing, index) => (
				<div key={index} className="shadow-sm">
					<BusinessCard
						category={listing.categories[0].category}
						address={listing.addresses[0].address}
						logo={listing.images.logo}
						title={listing.title}
						id={listing.id}
						coverImage={listing.images.coverImage}
						tagLine={listing.tag_line ? listing.tag_line : ""}
						phoneNumber={listing.phone_number}
					/>
				</div>
			))}		
				</div>	
): null}
</div>	
	)
}
