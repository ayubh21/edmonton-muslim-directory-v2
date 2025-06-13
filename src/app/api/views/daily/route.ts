import { GetApprovedListings, updateDailyViews } from "@/app/actions/listing";
import { NextResponse } from "next/server";

export async function POST() {
	const listings = await GetApprovedListings();

	console.log(listings);
	if (!listings.length) {
		return NextResponse.json({ message: "failed to get approved listings" }, { status: 500 })
	}

	const response = listings.map(async (listing) => {
		return new Promise(async (resolve) => {
			const result = await updateDailyViews(listing.id)
			resolve(result);
		}

		)
	})
	const res = await Promise.allSettled(response)
	console.log(res);
	return NextResponse.json({ message: "listing view count updated successfully" }, { status: 200 })
}


