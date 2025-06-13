"use client"

import BusinessCard from "@/components/business-card";
import CategoryCard from "@/components/category-card";
import ListingList from "@/components/explore/listing-list";
import GetListedSection from "@/components/get-listed-section";
import { Button } from "@/components/ui/button";
import { Listing } from "@/types/listing";
import { useRouter } from "next/navigation";
import HeroSearch from "./home-search-client";

export default function HomeClient({ listings }: { listings: Listing[] }) {
	const router = useRouter()
	return (
		<div className=""	>
			<section className="py-20 bg-white relative overflow-hidden flex flex-row justify-center">
				<div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full -mr-32 -mt-32 opacity-70"></div>
				<div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full -ml-32 -mb-32 opacity-70"></div>


				<div className=" relative z-10 mt-10">
					<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 ">
						<div className="w-full p-2">
							<h2 className="text-3xl font-semibold text-gray-900 mb-2 text-center w-full">Browse Popular Categories</h2>
							<p className="text-gray-600 text-center">Find the best Muslim-owned businesses in Edmonton</p>
						</div>
					</div>
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-20 px-6">
						<CategoryCard
							icon="Utensils"
							title="Restaurants"
							count={42}
							color="bg-amber-50"
							iconColor="text-amber-500"
							listings={listings}
						/>
						<CategoryCard
							icon="ShoppingBag"
							title="Grocery"
							count={28}
							color="bg-emerald-50"
							iconColor="text-emerald-500"
							listings={listings}
						/>
						<CategoryCard
							icon="Stethoscope"
							listings={listings}
							title="Healthcare"
							count={35}
							color="bg-blue-50"
							iconColor="text-blue-500"
						/>
						<CategoryCard
							icon="GraduationCap"
							title="Education"
							count={19}
							color="bg-purple-50"
							iconColor="text-purple-500"
							listings={listings}
						/>
						<CategoryCard
							icon="Briefcase"
							title="Professional"
							count={31}
							color="bg-gray-50"
							iconColor="text-gray-500"
							listings={listings}
						/>
						<CategoryCard
							listings={listings}
							icon="Plane" title="Travel" count={16} color="bg-red-50" iconColor="text-red-500" />
					</div>
				</div>
			</section>
			<section className="flex flex-row justify-center w-full">
				<GetListedSection />
			</section>
			{listings.length >= 3 ?
				(
					<section className="w-full bg-white px-6   ">
						<div className="max-w-[1850px] flex flex-col justify-center items-center mx-auto">
							<div className="flex justify-between items-center w-full">
								<h2 className="text-center font-semibold py-6 text-2xl">Explore Listings</h2>
								<button
									className="cursor-pointer text-emerald-700 font-semibold underline"
									onClick={() => router.push('/explore')}>
									View All
								</button>
							</div>
							<div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
								{listings.slice(0, 3).map((listing, index) => (
									<div
										className="overflow-y-hidden shadow-sm"
										key={index}>
										<BusinessCard
											slug={listing.slug}
											id={listing.id!}
											logo={listing.images.logo}
											coverImage={listing.images.coverImage}
											title={listing.title}
											address={listing.addresses[0].address}
											category={listing.categories[0].category}
											tagLine={listing.tag_line!}
											phoneNumber={listing.phone_number!}
										/>
									</div>
								))}
							</div>
						</div>
					</section>
				) : null
			}
		</div>
	)
}
