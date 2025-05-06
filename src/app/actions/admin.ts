"use server";

import { db } from "@/lib/db/db";
import { Listing } from "@/lib/db/schema";
import { desc, eq, sql } from "drizzle-orm";

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
  }
  return lastApproved;
}

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
