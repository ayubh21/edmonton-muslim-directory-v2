import ReviewListing from "@/components/admin/review-listing";
import { GetListingById } from "@/app/actions/listing";

export default async function ReviewListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listingId = parseInt(id);
  const listing = await GetListingById(listingId);
  if (!listing) return null;
  return (
    <div>
      hello
      <ReviewListing listing={listing} addresses={listing.addresses} />
    </div>
  );
}
