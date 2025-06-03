import BusinessCard from "../business-card";
import { Listing } from "@/types/listing";

interface ListingListProps {
	listings: Listing[];
	className: string;
}

export default function ListingList({ listings, className }: ListingListProps) {
	// having trouble thinking about how im gonna render categories
	return (
		<div className={className}>
			{listings.map((listing, index) => (
				<div
					className="overflow-y-hidden shadow-sm"
					key={index}>
					<BusinessCard
						id={listing.id!}
						logo={listing.images.logo}
						coverImage={listing.images.coverImage}
						title={listing.title}
						// category={listing.}
						tagLine={listing.tag_line!}
						phoneNumber={listing.phone_number!}
					// address=""
					/>
				</div>
			))}
		</div>
		// pagination
	);
}
