
import Footer from "@/components/footer";
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
									Discover Edmonton&apos;s{" "}
									<span className="bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
										Muslim-Owned{" "}
									</span>
									Businesses
								</h1>
								<p className="text-xl text-gray-600 mb-10 leading-relaxed xl:text-center text-left">
									Supporting our local community through business connections across Edmonton, Alberta.
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
			<section className="p-4 bg-white relative overflow-hidden mx-auto">
				<div className=" relative z-10">
					<div className="max-w-4xl mx-auto text-center">
						<h3 className="text-2xl font-semibold text-gray-900 mb-3 ">
							Powered by Your{" "}
							<span className="bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
								Donations
							</span>
						</h3>
						<p className="text-gray-600 text-lg leading-relaxed">
							This platform is made possible through the generous donations of our community members who believe in
							supporting Muslim-owned businesses in Edmonton.
						</p>
						<div className="mt-6 flex items-center justify-center space-x-8 text-sm text-gray-500">
							<div className="flex items-center">
								<div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
								Community Supported
							</div>
							<div className="flex items-center">
								<div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
								Non-Profit Initiative
							</div>
							<div className="flex items-center">
								<div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
								100% Volunteer Run
							</div>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</div>
	)
}
