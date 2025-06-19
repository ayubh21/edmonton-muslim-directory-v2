"use client";

import {
	CheckCircle,
	ChevronLeft,
	Globe,
	Mail,
	MapPin,
	Phone,
	XCircle,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { Listing } from "@/types/listing";
import { Badge } from "../ui/badge";
import moment from "moment";
import { useEffect, useState } from "react";
import {
	AdvancedMarker,
	APIProvider,
	Map,
	Pin,
} from "@vis.gl/react-google-maps";
import { UpdateListingStatus } from "@/app/services/services";
import { geocode } from "@/lib/geocode";
import { SendListingApprovedEmailConfirmation, SendListingRejectedEmailConfirmation } from "@/app/actions/listing";
import { toast } from "sonner";

type Address = {
	address: string;
};

type ReviewListingProps = {
	listing: Listing;
	name: string;
	addresses: Address[];
};


export default function ReviewListing({ ...props }: ReviewListingProps) {

	const [lat, setLat] = useState(0);
	const [lng, setLng] = useState(0);


	useEffect(() => {
		const handleGetCoordinatesFromAddress = async () => {
			console.log(props.addresses[0]);
			if (props.addresses[0]) {
				const results = await geocode.getCoordinates(props.addresses[0].address);
				if (results) {
					setLat(results.lat);
					setLng(results.lng);
				}
			}
		};
		handleGetCoordinatesFromAddress();
	}, [props.addresses]);


	const handleUpdateAndSendListingStatus = async (status: "approved" | "rejected") => {
		await UpdateListingStatus(props.listing.id!, status)

		if (props.listing.status == "approved") {
			await SendListingApprovedEmailConfirmation(props.listing.email, props.name, props.listing.title)
			toast("listing approved")
		}
		if (props.listing.status == "rejected") {
			await SendListingRejectedEmailConfirmation(props.listing.email, props.name, props.listing.title)
			toast("listing rejected")
		}
	}


	return (
		<div className="space-y-6">
			<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
				<div className="flex items-center gap-2">
					<Link
						href="/admin"
						className="text-emerald-600 hover:text-emerald-700"
					>
						<ChevronLeft className="h-5 w-5" />
					</Link>
					<h1 className="text-2xl font-semibold">Review Listing</h1>
				</div>
				<div className="flex items-center gap-2">
					<Button
						onClick={() => handleUpdateAndSendListingStatus("rejected")}
						variant="outline"
						className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
					>
						<XCircle className="h-4 w-4" />
						Reject
					</Button>
					<Button
						onClick={() => handleUpdateAndSendListingStatus("approved")}
						className="gap-2 bg-emerald-600 hover:bg-emerald-700"
					>
						<CheckCircle className="h-4 w-4" />
						Approve
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="lg:col-span-2 space-y-6">
					<Card>
						<CardHeader className="pb-3">
							<div className="flex items-center justify-between">
								<div>
									<CardTitle className="text-xl">
										{props.listing.title}
									</CardTitle>
									<CardDescription>
										Submitted by on {props.name}
									</CardDescription>
								</div>
								<Badge className="bg-blue-500">New Listing</Badge>
							</div>
						</CardHeader>
						<CardContent>
							<Tabs defaultValue="details">
								<TabsList className="mb-4 flex flex-row gap-2">
									<TabsTrigger value="details">Details</TabsTrigger>
									<TabsTrigger value="images">Images</TabsTrigger>
									<TabsTrigger value="location">Location</TabsTrigger>
									<TabsTrigger value="features">Features</TabsTrigger>
								</TabsList>

								{/* <TabsContent value="details" className="space-y-4"> */}
								<div>
									<h3 className="font-medium mb-2">Business Description</h3>
									<div className="bg-gray-50 p-4 rounded-md text-sm my-4">
										{props.listing.description}
									</div>
								</div>

								<div className="mb-4">
									<h3 className="font-medium mb-2">Contact Information</h3>
									<div className="space-y-2">
										<div className="flex items-start">
											<Phone className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
											<span className="text-sm">
												{props.listing.phone_number}
											</span>
										</div>
										<div className="flex items-start">
											<Mail className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
											<span className="text-sm">{props.listing.email}</span>
										</div>
										<div className="flex items-start">
											<Globe className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
											<span className="text-sm">
												{props.listing.website_url}
											</span>
										</div>
									</div>
								</div>

								{/*}
								<div>
									<h3 className="font-medium mb-2">Business Hours</h3>
									<div className="flex items-start">
										<Clock className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
									</div>
								</div>
								{/* </TabsContent> */}

								<TabsContent value="images">
									<div className="space-y-4">
										<div>
											<h3 className="font-medium mb-2">Cover Image</h3>
											<div className="relative aspect-video rounded-lg overflow-hidden max-w-96">
												<Image
													src={
														props.listing.images.coverImage ||
														"/placeholder.svg"
													}
													alt={`${props.listing.title} cover image`}
													fill
													className="object-cover "
												/>
											</div>
										</div>

										<div>
											<h3 className="font-medium mb-2">Logo</h3>
											<div className="relative h-24 w-24 rounded-lg overflow-hidden">
												<Image
													src={props.listing.images.logo}
													alt={`${props.listing.title} logo`}
													fill
													className="object-cover"
												/>
											</div>
										</div>

										<div>
											<h3 className="font-medium mb-2">Gallery Images</h3>
											<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
												{props.listing.images.galleryImages.map(
													(galleryImage, index) => (
														<div
															key={index}
															className="relative aspect-video rounded-lg overflow-hidden"
														>
															<img
																src={galleryImage}
																alt={`${props.listing.title} gallery image ${index + 1
																	}`}
																className="object-cover"
															/>
														</div>
													)
												)}
											</div>
										</div>
									</div>
								</TabsContent>

								<TabsContent value="location">
									<div className="space-y-4">
										<div>
											<h3 className="font-medium mb-2">Address</h3>
											<div className="flex items-start">
												<MapPin className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
												<span className="text-sm">
													{props.addresses[0].address}
												</span>
											</div>
										</div>

										<div>
											<h3 className="font-medium mb-2">Map Location</h3>
											<div className="relative h-[300px] bg-gray-100 rounded-lg">
												<div className="absolute inset-0 flex items-center justify-center">
													<APIProvider
														apiKey={
															process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!
														}
													>
														<Map
															defaultCenter={{ lat: lat, lng: lng }}
															defaultZoom={10}
															streetViewControl={false}
															mapTypeControl={false}
															mapId={process.env.NEXT_PUBLIC_MAP_ID}
															zoomControl={false}
														>
															<AdvancedMarker position={{ lat: lat, lng: lng }}>
																<Pin />
															</AdvancedMarker>
														</Map>
													</APIProvider>
												</div>
											</div>
										</div>
									</div>
								</TabsContent>

								<TabsContent value="features">
									{props.listing.tags.length > 0 &&
										<div>
											<h3 className="font-medium mb-2">Business Features</h3>
											<div className="flex flex-wrap gap-2">
												{props.listing.tags.map((tag, index) => (
													<Badge
														key={index}
														variant="outline"
														className="bg-gray-50"
													>
														{tag.tag}
													</Badge>
												))}
											</div>
										</div>
									}
								</TabsContent>
							</Tabs>
						</CardContent>
					</Card>

					{/* <Alert
            variant="warning"
            className="bg-amber-50 text-amber-800 border-amber-200"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Verification Required</AlertTitle>
            <AlertDescription>
              Please verify all business information before approving this
              listing. Check for accuracy, appropriate content, and ensure it
              meets our community guidelines.
            </AlertDescription>
          </Alert> */}
				</div>

				<div className="space-y-6">
					{/*
					<Card>
						<CardHeader>
							<CardTitle>Review Decision</CardTitle>
							<CardDescription>
								Approve or reject this business listing
							</CardDescription>
						</CardHeader>
						<CardContent>
							<RadioGroup defaultValue="approve" className="space-y-4">
								<div className="flex items-start space-x-2">
									<RadioGroupItem
										value="approve"
										id="approve"
										className="mt-1"
									/>
									<div className="grid gap-1.5">
										<Label htmlFor="approve" className="font-medium">
											Approve Listing
										</Label>
										<p className="text-sm text-gray-500">
											The listing will be published and visible to all users.
										</p>
									</div>
								</div>
								<div className="flex items-start space-x-2">
									<RadioGroupItem value="reject" id="reject" className="mt-1" />
									<div className="grid gap-1.5">
										<Label htmlFor="reject" className="font-medium">
											Reject Listing
										</Label>
										<p className="text-sm text-gray-500">
											The listing will be rejected and the submitter will be
											notified.
										</p>
									</div>
								</div>
							</RadioGroup>

							<Separator className="my-4" />

							<div className="space-y-4">
								<div>
									<Label htmlFor="feedback" className="font-medium">
										Feedback to Submitter
									</Label>
									<Textarea
										id="feedback"
										placeholder="Provide feedback about this listing..."
										className="mt-1.5 min-h-[100px]"
									/>
									<p className="text-xs text-gray-500 mt-1">
										This message will be sent to the submitter along with your
										decision.
									</p>
								</div>

								<div className="flex items-center space-x-2">
									<Switch id="notify" />
									<Label htmlFor="notify">Send email notification</Label>
								</div>

								<div className="flex items-center space-x-2">
									<Switch id="featured" />
									<Label htmlFor="featured">Mark as featured listing</Label>
								</div>
							</div>

							<div className="mt-6 flex flex-col gap-2">
								<Button className="w-full bg-emerald-600 hover:bg-emerald-700">
									<CheckCircle className="h-4 w-4 mr-2" />
									Approve Listing
								</Button>
								<Button
									variant="outline"
									className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
								>

									Reject Listing
								</Button>
							</div>
						</CardContent>
					</Card>
					*/}
					{/* TODO ensure submitter info comes from user and not listing */}
					<Card className="">
						<CardHeader>
							<CardTitle>Submitter Information</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-2">
								<div>
									<p className="text-sm font-medium">Name</p>
									<p className="text-sm text-gray-500">{props.name}</p>
								</div>
								<div>
									<p className="text-sm font-medium">Email</p>
									<p className="text-sm text-gray-500">{props.listing.email}</p>
								</div>
								<div>
									<p className="text-sm font-medium">Submission Date</p>
									<p className="text-sm text-gray-500">
										{moment(props.listing.createdAt).format("MMM Do, YYYY")}
									</p>
								</div>
							</div>

							<Separator className="my-4" />

							<Button variant="outline" className="w-full">
								Contact Submitter
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
