"use server";

import { db } from "@/lib/db/db";
import { Listing } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GetListings() {
  const listing = await db.select().from(Listing);

  if (!listing) {
    console.log("failed to get all listings");
  }
  return listing;
}

export async function GetListingById(listingId: string) {
  const listing = await db
    .select()
    .from(Listing)
    .where(eq(Listing.id, listingId));
  if (!listing) {
    console.log("failed to get listing");
    return;
  }
  return listing;
}

// export async function GetRecentlyApprovedListing() {
//   const lastApproved = await Listings1.find({ status: "approved" })
//     .sort({ timestamp: -1 })
//     .limit(1);
//   console.log(lastApproved);
//   return await serializeMongooseDoc(lastApproved[0]);
// }

// export async function GetRecentlyRejectedListing() {
//   try {
//     const lastRejected = await Listings1.find({ status: "rejected" })
//       .sort({ timestamp: -1 })
//       .limit(1);

//     if (!lastRejected.length) {
//       return null;
//     }

//     console.log(serializeMongooseDoc(lastRejected[0]));
//     return serializeMongooseDoc(lastRejected[0]);
//   } catch (error) {
//     console.error("Error fetching recently rejected listing:", error);
//     return null;
//   }
// }

// export async function GetRecentlyCreatedListing() {
//   const lastCreated = await Listings1.find({}).sort({ _id: 1 });
//   return await serializeMongooseDoc(lastCreated);
// }

// export async function CalcultateTotalMonthlyListingPercentage() {}

// export async function CalcultateTotalMonthlyApprovedListings() {}

// export async function CalcultateTotalMonthlyRejectListings() {}
