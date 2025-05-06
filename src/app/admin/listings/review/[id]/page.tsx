import ReviewListing from "@/components/admin/review-listing";
import { GetListingById } from "@/app/actions/listing";
import { GetAddressesByListingId } from "@/app/actions/listing";

export default async function ReviewListingPage({
  params,
}: {
  params: { id: number };
}) {
  const listing = await GetListingById(params.id);
  const listingAddresses = await GetAddressesByListingId(params.id);
  console.log(listingAddresses);
  if (!listing) return null;
  return (
    <div>
      hello
      <ReviewListing listing={listing} addresses={listingAddresses} />
    </div>
  );
}
