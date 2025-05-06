import { Listing } from "@/types/listing";
import { clsx, type ClassValue } from "clsx";
import { stubTrue } from "lodash";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatWorkHours() {}

export function getListingCountByStatus(listing: Listing[], status: string) {
  const filteredListings = listing.filter(
    (listing) => listing.status == status
  );
  return filteredListings;
}
