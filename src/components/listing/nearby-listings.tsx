"use client"

import { Latlng, Listing } from "@/types/listing"
import BusinessCard from "../business-card";
import { useEffect, useState } from "react";
import { getDistanceFromLatLonInKm } from "@/lib/utils";

interface NearbyListings {
	listings: Listing[];
	position: Latlng
	proximity?: number
}

export default function NearbyListings({ listings, position, proximity = 20 }: NearbyListings) {
	console.log(listings);

	const [nearbyListings, setNearbyListings] = useState<Listing[]>([])
	useEffect(() => {
		let initialListings = listings
		initialListings = initialListings.filter((listing) => {
			const distance = getDistanceFromLatLonInKm(
				listing.addresses[0].lat,
				listing.addresses[0].lng,
				position.lat,
				position.lng
			);
			return distance <= proximity
		});
		initialListings = initialListings.slice(2)
		// nearbyListings.push(initialListings)
		setNearbyListings(initialListings)
	}, [])

	return (
		<div className="grid md:grid-cols-2 gap-2 lg:grid-cols-3">
			{nearbyListings.map((listing, index) => (
				<div key={index} className="shadow-sm">
					<BusinessCard
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
	)
}
