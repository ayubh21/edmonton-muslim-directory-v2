import { GetCategoriesByListingId, GetListings } from "@/app/actions/listing";
import { db } from "@/lib/db/db";
import BusinessCard from "../business-card";

export default async function ListingList() {
  const listings = await GetListings();
  console.log(listings);
  // having trouble thinking about how im gonna render categories

  return (
    <div className="space-y-4 grid md:grid-cols-2 gap-2">
      {listings.map((listing, index) => (
        <div key={index} className="">
          <BusinessCard
            id={listing.id}
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
