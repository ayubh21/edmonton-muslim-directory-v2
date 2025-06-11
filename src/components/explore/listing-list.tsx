import BusinessCard from "../business-card";
import { Listing } from "@/types/listing";

interface ListingListProps {
	listings: Listing[];
	className: string;
}

export default function ListingList({ listings, className }: ListingListProps) {
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
						address={listing.addresses[0].address}
						category={listing.categories[0].category}
						tagLine={listing.tag_line!}
						phoneNumber={listing.phone_number!}
					/>
				</div>
			))}
		</div>
	);
}
