import { updateDailyViews } from "@/app/actions/listing";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
	const body = await req.json();
	const { id } = body



	const result = await updateDailyViews(id)
	if (!result) {
		return NextResponse.json({ message: 'Error updating daily count' }, { status: 500 })
	}
	return NextResponse.json({ message: "listing view count updated successfully" }, { status: 200 })
}
