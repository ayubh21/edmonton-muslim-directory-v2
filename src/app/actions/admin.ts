import Listings1 from "@/lib/db/models";

export async function GetPendingListings() {
  const listings = await Listings1.find({});
  const data = JSON.parse(JSON.stringify(listings));
  console.log("here");
  console.log(data);
  return data;
}

export async function CalcultateTotalMonthlyListingPercentage() {}

export async function CalcultateTotalMonthlyApprovedListings() {}

export async function CalcultateTotalMonthlyRejectListings() {}

export async function GetNewDailyListings() {}
