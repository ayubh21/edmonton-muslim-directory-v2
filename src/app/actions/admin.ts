import Listings1 from "@/lib/db/models";

export async function GetPendingListings() {
  const listings = await Listings1.find({});
  const data = JSON.parse(JSON.stringify(listings));
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

export async function CalcultateTotalMonthlyListingPercentage() {}

export async function CalcultateTotalMonthlyApprovedListings() {}

export async function CalcultateTotalMonthlyRejectListings() {}

export async function GetNewDailyListings() {}
