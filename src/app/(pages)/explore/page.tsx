import { GetApprovedListings } from "@/app/actions/listing";
import FilterListing from "@/components/explore/filter-listing";
import { Latlng } from "@/types/listing";

export default async function Explore() {
	const listings = await GetApprovedListings();
	console.log(listings);
	listings.map((listing) => { });
	return (
		<div className="h-full">
			{/* <div className="w-full"></div> */}
			<section className="my-4 h-full">
				<FilterListing listings={listings} />
			</section>
		</div>
	);
}
