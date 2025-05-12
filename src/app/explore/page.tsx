import FilterListing from "@/components/explore/filter-listing";
import ListingList from "@/components/explore/listing-list";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { GetListings } from "../actions/listing";
import { db } from "@/lib/db/db";

export default async function Explore() {
  const listings = await GetListings();

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
