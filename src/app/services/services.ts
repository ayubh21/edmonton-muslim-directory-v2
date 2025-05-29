"use server"

import { db } from "@/lib/db/db";
import { Listing } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { revalidateAll } from "../actions/revalidate";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { client } from "@/lib/s3/client";
import { CustomFile } from "@/types/listing";

export async function UpdateListingStatus(
	listingId: number,
	status: "approved" | "rejected"
) {
	await db
		.update(Listing)
		.set({
			status: status,
			updatedAt: new Date(),
		})
		.where(eq(Listing.id, listingId));
	revalidateAll();
}

export async function UploadToS3(file: CustomFile) {
	const arrayBuffer = await file.arrayBuffer();
	try {
		const input = new PutObjectCommand({
			Bucket: "edmv2",
			Key: file.name,
			Body: Buffer.from(arrayBuffer),
			ACL: "public-read",
			ContentType: file.type,
		});

		const res = await client.send(input);
		console.log(res);
		return res;
	} catch (e) {
		console.log(e);
	}
}

export async function GetRecentlyRejectedListing() {
	const lastApproved = await db
		.select()
		.from(Listing)
		.orderBy(desc(Listing.updatedAt))
		.where(eq(Listing.status, "rejected"))
		.limit(1);
	if (!lastApproved) {
		console.log("failed to get last approved listing");
	}
	return lastApproved;
}

export async function GetRecentlyCreatedListing() {
	const lastApproved = await db
		.select()
		.from(Listing)
		.orderBy(desc(Listing.createdAt))
		.limit(1);
	if (!lastApproved) {
		console.log("failed to get last approved listing");
	}
	return lastApproved;
}

export async function GetRecentlyApprovedListing() {
	const lastApproved = await db
		.select()
		.from(Listing)
		.orderBy(desc(Listing.updatedAt))
		.where(eq(Listing.status, "approved"))
		.limit(1);
	if (!lastApproved) {
		console.log("failed to get last approved listing");
		return;
	}
	return lastApproved;
}

// export async function CalcultateTotalMonthlyListingPercentage() {}

// export async function CalcultateTotalMonthlyApprovedListings() {}

// export async function CalcultateTotalMonthlyRejectListings() {}
