"use server";

import Listings1 from "@/lib/db/models";
import { Listing } from "@/types/listing";
import { revalidatePath } from "next/cache";
import { revalidateAll } from "./revalidate";
import { serializeMongooseDoc } from "@/lib/utils";

export async function GetListings() {
  const listings = await Listings1.find({});
  const data = JSON.parse(JSON.stringify(listings)) as Listing[];
  return data;
}

export async function GetListingById(id: string) {
  const listing = await Listings1.findById(id);
  if (!listing) {
    console.log("failed to get listing");
    return;
  }
  return listing;
}

export async function GetRecentlyApprovedListing() {
  const lastApproved = await Listings1.find({ status: "approved" })
    .sort({ timestamp: -1 })
    .limit(1);
  console.log(lastApproved);
  return await serializeMongooseDoc(lastApproved[0]);
}

export async function GetRecentlyRejectedListing() {
  try {
    const lastRejected = await Listings1.find({ status: "rejected" })
      .sort({ timestamp: -1 })
      .limit(1);

    if (!lastRejected.length) {
      return null;
    }

    console.log(serializeMongooseDoc(lastRejected[0]));
    return serializeMongooseDoc(lastRejected[0]);
  } catch (error) {
    console.error("Error fetching recently rejected listing:", error);
    return null;
  }
}

export async function GetRecentlyCreatedListing() {
  const lastCreated = await Listings1.find({}).sort({ _id: 1 });
  return await serializeMongooseDoc(lastCreated);
}

export async function CalcultateTotalMonthlyListingPercentage() {}

export async function CalcultateTotalMonthlyApprovedListings() {}

export async function CalcultateTotalMonthlyRejectListings() {}

// GetRecentlyCreatedListing();
