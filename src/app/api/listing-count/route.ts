//
//


import { GetApprovedListings, GetListings, updateDailyViews } from "@/app/actions/listing";
import { db } from "@/lib/db/db";
import { Listing } from "@/lib/db/schema";
import { and, gte, sql } from "drizzle-orm";
import moment from "moment";
import { NextResponse } from "next/server";

export async function POST() {
	const listings = await GetListings()
	// get listing count 

	listings.length;
	// const res = await Promise.allSettled(response)
	// console.log(res);
	return NextResponse.json({ message: "listing view count updated successfully" }, { status: 200 })
}


