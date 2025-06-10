import { udpateWeeklyViews } from "@/app/actions/listing";
import { revalidateAll } from "@/app/actions/revalidate";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
	console.log("test")
	const body = await req.json();
	const { id } = body
	const res = await udpateWeeklyViews(id)
	if (!res) {
		return NextResponse.json({ message: 'Error updating daily count' }, { status: 500 })
	}
	revalidateAll();
	return NextResponse.json({ message: "listing view count updated successfully" }, { status: 200 })
}
