import Link from "next/link";
import {
	ArrowUpRight,
	ArrowDown,
	ArrowUp,
	Store,
	CheckCircle,
	XCircle,
	Clock,
} from "lucide-react";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// import { DashboardChart } from "@/components/admin/dashboard-chart";
import { RecentActivityTable } from "@/components/admin/recent-activity";
import ListingApprovals from "@/components/admin/listing-approvals";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getListingCountByStatus } from "@/lib/utils";
import { GetListings } from "@/app/actions/listing";

export default async function Admin() {
	const data = await GetListings();
	const pendingListingCount = getListingCountByStatus(data, "pending").length;
	const approvedListingCount = getListingCountByStatus(data, "approved").length;
	const rejectedListingCount = getListingCountByStatus(data, "rejected").length;
	const session = await auth.api.getSession({ headers: await headers() });


	return (
		<div className="space-y-6">
			<div className="">
				<div>
					<h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
					<p className="text-gray-500 text-lg">
						Welcome back, {session?.user.name}{" "}
						{"Here's what's happening with your directory."}
					</p>
				</div>
				<div className="flex items-center gap-2 my-4">
					<Button asChild variant="outline">
						<Link href="/admin/listings/pending">
							<Clock className="mr-2 h-4 w-4" />
							Pending Approvals
							<Badge variant="destructive" className="ml-2">
								{pendingListingCount}
							</Badge>
						</Link>
					</Button>
					{/*
					<Button asChild>
						<Link href="/admin/listings">
							View All Listings
							<ArrowUpRight className="ml-2 h-4 w-4" />
						</Link>
					</Button>
					*/}
				</div>

				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total Listings
							</CardTitle>
							<Store className="h-4 w-4 text-gray-500" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{data.length}</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Approved</CardTitle>
							<CheckCircle className="h-4 w-4 text-gray-500" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{approvedListingCount}
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Pending</CardTitle>
							<Clock className="h-4 w-4 text-gray-500" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{pendingListingCount}
							</div>
							<p className="text-xs text-gray-500">
								<span className="text-amber-500 inline-flex items-center">
									<ArrowUp className="mr-1 h-3 w-3" />4
								</span>{" "}
								new today
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Rejected</CardTitle>
							<XCircle className="h-4 w-4 text-gray-500" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{rejectedListingCount}
							</div>
						</CardContent>
					</Card>
				</div>
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
					<Card className="lg:col-span-4">
						<CardHeader>
							<CardTitle>Listings Overview</CardTitle>
							<CardDescription>
								Listing submissions and approvals over time
							</CardDescription>
						</CardHeader>
						{/*
	            <CardContent>
	              <DashboardChart />
	            </CardContent>
							*/}
					</Card>
					<Card className="lg:col-span-3">
						<CardHeader>
							<CardTitle>Recent Activity</CardTitle>
							<CardDescription>Latest actions on the platform</CardDescription>
						</CardHeader>
						<CardContent>
							<RecentActivityTable />
						</CardContent>
					</Card>
				</div>
				{/* <div> */}
			</div>

			<ListingApprovals data={data} />

		</div>
	);
	// }
}
