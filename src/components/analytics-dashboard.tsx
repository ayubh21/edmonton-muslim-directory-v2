"use client"
import { useState } from "react"
import { Eye, TrendingUp, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { DeleteListing, GetListingById } from "@/app/actions/listing"
import { Listing } from "@/types/listing"
import BusinessCard from "./business-card"
import { Button } from "./ui/button"
import { Dialog, DialogHeader, DialogTitle, DialogContent } from "./ui/dialog"
import { useRouter } from "next/navigation"
import moment from "moment"
import { toast } from "sonner"

interface AnalyticsDashboardProps {
	listings: Listing[];
	name: string;
}



export default function AnalyticsDashboard({ name, listings }: AnalyticsDashboardProps) {
	const [open, setOpen] = useState(false);
	const [currentListing, setCurrentListing] = useState<Listing>(listings[0])
	const router = useRouter();

	const dailyChange = Math.round((currentListing.views - currentListing.count_of_last_24) / currentListing.count_of_last_24 * 100)
	const weeklyChange = Math.round((currentListing.weekly_views - currentListing.count_of_last_seven_days) / currentListing.count_of_last_seven_days * 100)
	const monthlyChange = Math.round((currentListing.monthly_views - currentListing.count_of_last_30) / currentListing.count_of_last_30 * 100)

	const handleCurrentActiveListing = async (id: string) => {
		const listing = await GetListingById(parseInt(id))
		if (!listing) {
			return;
		}
		setCurrentListing(listing)
	}

	const handleDeleteListing = async () => {
		await DeleteListing(currentListing.id)
		setOpen(false)
		toast('Listing Deleted Successfully')
		location.reload();
	}

	console.log(listings)
	return (
		<div className="space-y-8 p-6">
			{/* Header */}
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
				<div>
					<h1 className="text-4xl font-semibold text-gray-900">Hello, {name} </h1>
					<p className="text-gray-600">Track your business listing performance</p>
				</div>
				<div className="flex items-center gap-3">
					<Select value={currentListing.id.toString()} onValueChange={(id: string) => handleCurrentActiveListing(id)}>
						<SelectTrigger className="w-[200px] rounded-xl p-4">
							<SelectValue placeholder="Filter by listing" />
						</SelectTrigger>
						<SelectContent>
							{listings.map((listing, index) => (
								<SelectItem className=""
									key={index} value={listing.id.toString()}>{listing.title}</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 border-0 text-white">
					<CardContent className="p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-emerald-100 text-sm font-medium">Last 24 Hours</p>
								<p className="text-3xl font-bold">{currentListing.views}</p>
							</div>
							<div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
								<Eye className="h-6 w-6" />
							</div>
						</div>
						<div className="mt-4 flex items-center">
							<Badge className="bg-white/20 text-white hover:bg-white/30">% {dailyChange}</Badge>
							<span className="text-blue-100 text-sm ml-2">vs yesterday</span>
						</div>
					</CardContent>
				</Card>
				<Card className="bg-gradient-to-br from-purple-500 to-purple-600 border-0 text-white">
					<CardContent className="p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-purple-100 text-sm font-medium">Last 7 days </p>
								<p className="text-3xl font-bold">{currentListing.weekly_views}</p>
							</div>
							<div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
								<Calendar className="h-6 w-6" />
							</div>
						</div>
						<div className="mt-4 flex items-center">
							<Badge className="bg-white/20 text-white hover:bg-white/30">% {weeklyChange}</Badge>
							<span className="text-blue-100 text-sm ml-2">vs last week</span>
						</div>
					</CardContent>
				</Card>
				<Card className="bg-gradient-to-br from-blue-500 to-blue-600 border-0 text-white">
					<CardContent className="p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-purple-100 text-sm font-medium">Last 30 days </p>
								<p className="text-3xl font-bold">{currentListing.monthly_views}</p>
							</div>
							<div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
								<TrendingUp className="h-6 w-6" />
							</div>
						</div>
						<div className="mt-4 flex items-center">
							<Badge className="bg-white/20 text-white hover:bg-white/30">% {monthlyChange}</Badge>
							<span className="text-blue-100 text-sm ml-2">vs last month</span>
						</div>
					</CardContent>
				</Card>
			</div>
			<div className="sm:grid grid-cols-1  md:max-w-2/3 ">
				<BusinessCard
					id={currentListing.id!}
					logo={currentListing.images.logo}
					coverImage={currentListing.images.coverImage}
					title={currentListing.title}
					address={currentListing.addresses[0].address}
					category={currentListing.categories[0].category}
					tagLine={currentListing.tag_line!}
					phoneNumber={currentListing.phone_number!}
				/>
				<div className="flex justify-between mt-4">
					<Button onClick={() => setOpen(!open)}>
						Delete
					</Button>
					<button
						onClick={() => router.push(`listing/${currentListing.id}`)}
						className=" text-black underline font-semibold cursor-pointer">
						View
					</button>
				</div>
			</div>

			<Dialog open={open} onOpenChange={(open) => setOpen(open)} defaultOpen={false}>
				<DialogHeader>
				</DialogHeader>
				<DialogContent>
					<DialogTitle className="text-center">Are you sure you want to delete?</DialogTitle>
					<div className="flex flex-col">
						<p className="font-semibold">Details</p>
						<span>
							<p>
								Title: {currentListing.title}
							</p>
							<p>
								ID: {currentListing.id}
							</p>
							<p>
								views to date: {currentListing.views}
							</p>
							<p>
								listing created on: {moment(currentListing.createdAt).format("MMM Do, YYYY")}

							</p>
							<p>
								Submitted by: {name}
							</p>
						</span>
						<span>
						</span>
					</div>
					<div className="  w-full">
						<div className="flex justify-between ">
							<Button
								onClick={handleDeleteListing}
								className="bg-red-500 hover:bg-red-400"	>
								Yes Delete My Listing
							</Button>
							<Button onClick={() => setOpen(false)}>
								No Don't Delete it.
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div >
	)
}

