import ReviewListing from "@/components/admin/review-listing";
import { GetListingById, GetUserByListing } from "@/app/actions/listing";

export default async function ReviewListingPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const listingId = parseInt(id);
	const listing = await GetListingById(listingId);
	if (!listing) return null;
	const name = await GetUserByListing(listing.id)
	if (!listing || !name) {
		return
	}
	return (
		<div>
			<ReviewListing listing={listing} addresses={listing.addresses} name={name} />
		</div>
	);
}

