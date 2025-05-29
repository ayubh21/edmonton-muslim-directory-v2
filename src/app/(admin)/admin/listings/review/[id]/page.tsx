import ReviewListing from "@/components/admin/review-listing";
import { GetListingById, GetUserByListingId } from "@/app/actions/listing";

export default async function ReviewListingPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const listingId = parseInt(id);
	const listing = await GetListingById(listingId);
	if (!listing) return null;
	const name = await GetUserByListingId(listing?.userId)
	return (
		<div>
			<ReviewListing listing={listing} addresses={listing.addresses} name={name} />
		</div>
	);
}

