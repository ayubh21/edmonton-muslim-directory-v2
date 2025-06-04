import BusinessCard from "../business-card";
import { Listing } from "@/types/listing";

interface ListingListProps {
	listing: Listing;
	index: number;
	className: string;
}

export default function ListingList({ listing, className, index }: ListingListProps) {
	// having trouble thinking about how im gonna render categories
	return (
		<div className={className} key={index}>
			<div
				className="overflow-y-hidden shadow-sm"
			>
				<BusinessCard
					id={listing.id}
					logo={listing.images.logo}
					coverImage={listing.images.coverImage}
					title={listing.title}
					address={listing.addresses[0].address}
					// category={listing.}
					tagLine={listing.tag_line!}
					phoneNumber={listing.phone_number!}
				// address=""
				/>
			</div>
		</div>
		// pagination
	);
}
