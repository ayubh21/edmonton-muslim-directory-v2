
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@radix-ui/react-separator";
import { ChevronDown, Search } from "lucide-react";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { GetListings } from "../actions/listing";
import HomeClient from "./home-client";
import HeroSearch from "./home-search-client";

export default async function Home() {
	const listings = await GetListings();

	return (
		<div className=" flex-col bg-gradient-to-r from-emerald-50 to-teal-50  mx-auto !w-full">
			<section className="py-16 md:py-24 overflow-hidden max-w-[1850px]  mx-auto flex flex-row justify-center items-center gap-10">
				<div className="  z-10 px-8">
					<section>
						<div className="container relative z-10 ">
							<div className="">
								<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
									Discover Edmonton's{" "}
									<span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
										Muslim-Owned
									</span>{" "}
									Businesses
								</h1>
								<p className="text-xl text-gray-600 mb-10 leading-relaxed text-left">
									Supporting our local community through business connections across Edmonton, Alberta
								</p>
								<HeroSearch />
							</div>
						</div>
					</section>
				</div>
				<div className=" overflow-visible hidden lg:block flex-end">
					<div className="overflow-visible w-9/10">
					</div>
				</div>
			</section>
			<HomeClient listings={listings} />
			<Footer />
		</div>
	)
}
