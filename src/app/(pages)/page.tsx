"use client";

import CategoryCard from "@/components/category-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@radix-ui/react-separator";

import { ChevronDown, Search } from "lucide-react";
import Login from "../(no-layout)/auth/login/page";

export default function Home() {
	return (
		<div className=" flex-col bg-gradient-to-r from-emerald-50 to-teal-50  mx-auto !w-full">
			<section className="py-16 md:py-24 overflow-hidden max-w-[1850px]  mx-auto flex justify-between items-center gap-10">
				<div className="  z-10 px-8">
					<div className="">
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
							{"Discover Edmonton's"}{" "}
							<span className="text-emerald-600">Muslim-Owned</span> Businesses
						</h1>
						<p className="text-lg text-gray-600 mb-8">
							Supporting our local community through business connections across
							Edmonton, Alberta
						</p>
						<div className="bg-white p-4 rounded-xl shadow-lg">
							<div className="flex flex-col md:flex-row md:items-center gap-4">
								<div className="flex-1 relative">
									<Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
									<Input
										type="search"
										placeholder="Search for businesses..."
										className="pl-10 h-12 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
									/>
								</div>
								<Separator
									orientation="vertical"
									className="hidden md:block h-8"
								/>
								<div className="relative">
									<div className="flex h-12 w-full md:w-[180px] items-center justify-between rounded-md border-0 bg-white px-3 py-2 text-sm">
										<span className="text-gray-500">All Categories</span>
										<ChevronDown className="h-4 w-4 text-gray-500" />
									</div>
								</div>
								<Separator
									orientation="vertical"
									className="hidden md:block h-8"
								/>
								<div className="relative">
									<div className="flex h-12 w-full md:w-[180px] items-center justify-between rounded-md border-0 bg-white px-3 py-2 text-sm">
										<span className="text-gray-500">All Areas</span>
										<ChevronDown className="h-4 w-4 text-gray-500" />
									</div>
								</div>
								<Button className="h-12 bg-emerald-600 hover:bg-emerald-700 md:w-36 w-full">
									<Search className="h-5 w-5 mr-2" />
									Search
								</Button>
							</div>
						</div>
					</div>
				</div>
				<div className=" overflow-visible hidden lg:block flex-end">
					<div className="overflow-visible w-9/10">
						<img
							src={"/banner-bg.webp"}
							alt="Edmonton skyline"
							className="object-cover  rounded-xl "
						/>
					</div>
				</div>
			</section>
			{/* Categories Section */}
			<section className="py-16 bg-white  ">
				<div className="mx-auto  px-8 max-w-[1850px]">
					<div className="flex flex-col md:flex-row justify-center md:items-center mb-10">
						<div className="text-center">
							<h2 className="text-3xl font-semibold text-gray-900 mb-2 text-center w-full">
								Browse Popular Categories
							</h2>
							<p className="text-gray-600 mr-auto w-full">
								Find the best Muslim-owned businesses in Edmonton
							</p>
						</div>
					</div>

					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
						<CategoryCard
							icon="Utensils"
							title="Restaurants"
							count={42}
							color="bg-amber-50"
							iconColor="text-amber-500"
						/>
						<CategoryCard
							icon="ShoppingBag"
							title="Grocery"
							count={28}
							color="bg-emerald-50"
							iconColor="text-emerald-500"
						/>
						<CategoryCard
							icon="Stethoscope"
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
						/>
						<CategoryCard
							icon="Briefcase"
							title="Professional"
							count={31}
							color="bg-gray-50"
							iconColor="text-gray-500"
						/>
						<CategoryCard
							icon="Plane"
							title="Travel"
							count={16}
							color="bg-red-50"
							iconColor="text-red-500"
						/>
					</div>
				</div>
			</section>
			{/* Featured Businesses */}
			<section className="py-16 bg-gray-50">
				<div className="container  px-8 mx-auto">
					<div className="flex flex-col md:flex-row justify-center md:items-center mb-10">
						<div className="text-center">
							<h2 className="text-3xl font-semibold text-gray-900 mb-2">
								Featured Businesses
							</h2>
							<p className="text-gray-600 text-center w-full">
								Discover top-rated Muslim-owned businesses in Edmonton
							</p>
						</div>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{/* <BusinessCard
              id={1}
              image="https://picsum.photos/400/300?random=1"
              name="Barakah Cafe"
              tagLine="custom tagline"
              phoneNumber="1234"
              // category="Restaurant"
              // area="Downtown"
              // rating={4.8}
              // price="$$"
              // description="Authentic Middle Eastern cuisine with a modern twist in the heart of downtown Edmonton."
            />

            <BusinessCard
              id={1}
              image="https://picsum.photos/400/300?random=1"
              name="Barakah Cafe"
              tagLine="custom tagline"
              phoneNumber="1234"
              // category="Restaurant"
              // area="Downtown"
              // rating={4.8}
              // price="$$"
              // description="Authentic Middle Eastern cuisine with a modern twist in the heart of downtown Edmonton."
            />
            <BusinessCard
              id={1}
              image="https://picsum.photos/400/300?random=1"
              name="Barakah Cafe"
              tagLine="custom tagline"
              phoneNumber="1234"
              // category="Restaurant"
              // area="Downtown"
              // rating={4.8}
              // price="$$"
              // description="Authentic Middle Eastern cuisine with a modern twist in the heart of downtown Edmonton."
            />
            <BusinessCard
              id={1}
              image="https://picsum.photos/400/300?random=1"
              name="Barakah Cafe"
              tagLine="custom tagline"
              phoneNumber="1234"
              // category="Restaurant"
              // area="Downtown"
              // rating={4.8}
              // price="$$"
              // description="Authentic Middle Eastern cuisine with a modern twist in the heart of downtown Edmonton."
            />
            <BusinessCard
              id={1}
              image="https://picsum.photos/400/300?random=1"
              name="Barakah Cafe"
              tagLine="custom tagline"
              phoneNumber="1234"
              // category="Restaurant"
              // area="Downtown"
              // rating={4.8}
              // price="$$"
              // description="Authentic Middle Eastern cuisine with a modern twist in the heart of downtown Edmonton."
            /> */}
					</div>
				</div>
			</section>
		</div>
	);
}
