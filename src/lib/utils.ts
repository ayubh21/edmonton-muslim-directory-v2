import { Listing } from "@/types/listing";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatWorkHours() {}

// TODO optimize with generics
export function serializeMongooseDoc(doc: any) {
  const data = JSON.parse(JSON.stringify(doc));
  return data;
}

export function getPendingListings(listing: Listing[]) {
  const filteredListings = listing.filter(
    (listing) => listing.status == "pending"
  );
  return filteredListings;
}
