
import { GetListingsByUserId } from "@/app/actions/listing";
import { revalidateAll } from "@/app/actions/revalidate";
import AnalyticsDashboard from "@/components/analytics-dashboard";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db/db";
import { Listing } from "@/types/listing";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { RiEmotionSadLine } from "react-icons/ri";


export default async function Account() {
	const session = await auth.api.getSession({ headers: await headers() })
	if (!session) {
		redirect("/")
	}

	const listings = await GetListingsByUserId(session.user.id)
	const approvedListing: Listing[] = []
	listings.forEach((listing) => {
		if (listing.status == "approved") {
			approvedListing.push(listing);
		}
	})

	return (
		<div className="bg-[#f4f4f4] h-screen  w-full mx-auto">
			<div className="max-w-[1850px] mx-auto">
				{listings.length > 0 ? (
					<div className="w-full h-screen">
						<AnalyticsDashboard listings={approvedListing} name={session.user.name} />
					</div>
				) :
					<div className="col-span-full py-12 text-center h-screen">
						<div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
							<RiEmotionSadLine className="h-12 w-12 text-[#c4c4c4]" />
						</div>
						<p className="text-[#52525B] mb-4">
							Uh oh there are no listings associated with your account.
						</p>
					</div>
				}
			</div>
		</div>
	)
}
