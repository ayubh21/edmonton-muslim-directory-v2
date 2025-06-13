import { GetApprovedListings, GetListingById, GetListingBySlug, GetListings } from "@/app/actions/listing";
import ContactBusiness from "@/components/listing/contact-business";
import GoogleMapComponent from "@/components/listing/map";
import NearbyListings from "@/components/listing/nearby-listings";
import ListingSection from "@/components/listing/section";
import WorkHoursWrapper from "@/components/listing/work-hours-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db/db";
import { Listing } from "@/lib/db/schema";
import { geocode } from "@/lib/geocode";
import { eq } from "drizzle-orm";
import {
	Images,
	Info,
	Map,
	Clock2,
	Mail,
	Link2,
} from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import ListingBanner from "./shareable-link";
export default async function ListingDetails({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const user = await auth.api.getSession({ headers: await headers() })
	const listing = await GetListingBySlug(id);
	const listings = await GetApprovedListings();

	if (!listing) return null;

	const coordinates = await geocode.getCoordinates(
		listing.addresses[0].address
	);

	console.log(coordinates)

	const incrementViewCounter = async () => {
		await db.update(Listing).set({
			views: listing.views + 1,
		}).where(eq(Listing.id, parseInt(id)))
		await db.update(Listing).set({
			weekly_views: listing.weekly_views + 1
		}).where(eq(Listing.id, parseInt(id)))
		await db.update(Listing).set({
			monthly_views: listing.monthly_views + 1
		}).where(eq(Listing.id, parseInt(id)))
	}
	incrementViewCounter();


	console.log(listing.addresses[0].address)
	console.log(coordinates.lat, coordinates.lng)

	return (
		<div className="bg-gray-100">
			<ListingBanner listing={listing} />
			<div className="px-4 max-w-[1375px] mx-auto md:grid grid-cols-2 gap-2">
				<ListingSection icon={<Info size={20} />} title="About my business">
					<div className="flex flex-col justify-between gap-5">
						<span className="mt-2">
							{listing.description}
						</span>

						{listing.website_url != "" &&
							<span className="">
								<div className="flex gap-2">
									<Link2 size={20} className="text-gray-500" />
									<p className="font-semibold">Website</p>
								</div>
								<div>
									<a
										className="underline"
										href={`${listing.website_url}`}>{listing.website_url}</a>
								</div>
							</span>
						}
					</div>
				</ListingSection>

				<ListingSection icon={<Clock2 size={20} />} title="Work Hours">
					<div className="relative">
						<WorkHoursWrapper workHours={listing.work_hours} />
					</div>
				</ListingSection>
				{listing.images.galleryImages.length > 0 &&
					<ListingSection icon={<Images />} title="Gallery">
						<div className="flex gap-2 h-full w-1/2">
							{listing.images.galleryImages
								.slice(0, 2)
								.map((galleryImage, index) => (
									<img
										// quality={100}
										// unoptimized={true}
										key={index}
										className="rounded-lg object-cover  mt-2 "
										src={galleryImage}
										alt={listing.title}
									/>
								))}
						</div>
					</ListingSection>
				}
				<section>
					<div className="bg-white p-4 ps shadow-sm mb-4">
						<div>
							<div className="flex gap-2 ">
								<div
									className={` rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden`}
								>
									<span className="font-bold text-gray-500">{<Map size={20} />}</span>
								</div>
								<span className="font-semibold">Location</span>
							</div>
							<GoogleMapComponent lat={coordinates.lat} lng={coordinates.lng} />

						</div>
						<div className="flex justify-between  items-center gap-10 mt-5">
							{/* TODO redirect to google maps  */}
							{/* <span>{address[0].address}</span> */}
							<Link href={`http://maps.google.com/?ll=${coordinates.lat},${coordinates.lng}`}>
								<Button className="cursor-pointer bg-faintGrey bg-[#f2f3f2] text-black  text-center  h-full my-2 shadow-none font-normal  rounded-none mt-4 hover: hover:bg-gray-200">
									Get Directions
								</Button>
							</Link>
							<span>{listing.addresses[0].address}</span>
						</div>
					</div>
				</section>
				{!listing.tags.length &&
					<ListingSection title="Features and Amenities">
						<div className="flex flex-row flex-wrap gap-2 mt-2">
							{listing.tags.map((tag, index) => (
								<Badge variant="outline" className=" bg-white " key={index}>
									{tag.tag}
								</Badge>
							))}
						</div>
					</ListingSection>
				}
				<ListingSection icon={<Mail size={20} />} title={`Contact ${listing.title}`}>
					<div className="relative">
						<ContactBusiness />
					</div>
				</ListingSection>
			</div>
			<section className="px-6 flex flex-col gap-2">
				<NearbyListings listings={listings} position={coordinates} />
			</section>
		</div>
	);
}
