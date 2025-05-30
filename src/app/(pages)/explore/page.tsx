import { GetApprovedListings } from "@/app/actions/listing";
import FilterListing from "@/components/explore/filter-listing";
import { Latlng } from "@/types/listing";

export default async function Explore() {
	const listings = await GetApprovedListings();
	console.log(listings);
	listings.map((listing) => { });
	return (
		<div className="overflow-y-hidden overscroll-auto">
			{/* <div className="w-full"></div> */}
			<section className="">
				<FilterListing listings={listings} />
			</section>
		</div>
	);
}
