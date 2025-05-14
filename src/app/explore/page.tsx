import FilterListing from "@/components/explore/filter-listing";
import { GetApprovedListings } from "../actions/listing";
import { Latlng } from "@/types/listing";

export default async function Explore() {
  const listings = await GetApprovedListings();
  console.log(listings);
  listings.map((listing) => {});
  return (
    <div className="">
      <div className="w-full"></div>
      <section className="my-4 px-4">
        <div className="">
          <FilterListing listings={listings} />
        </div>
      </section>
    </div>
  );
}
