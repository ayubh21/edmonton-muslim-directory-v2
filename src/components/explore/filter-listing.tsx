"use client";

import { useMediaQuery } from "@react-hook/media-query";
import { RiUserLocationLine } from "react-icons/ri";
import { BsMap } from "react-icons/bs";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { FaListUl, FaSliders } from "react-icons/fa6";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { categoriesList, tagList } from "@/lib/constants";
import { Latlng, Listing } from "@/types/listing";
import { geocode } from "@/lib/geocode";
import { produce } from "immer";
import { Slider } from "../ui/slider";
import { Input } from "../ui/input";
import { Search, X } from "lucide-react";
import ListingList from "./listing-list";
import { getDistanceFromLatLonInKm, shuffleArray } from "@/lib/utils";
import MapView from "./map-view";
import FilterSpinner from "./filter-spinner";
import LoadingComponent from "../loading-indicator";

interface FilterListingProps {
	listings: Listing[];
}

interface Filters {
	category: string;
	proximity: number[];
	searchText: string;
	tags: string[];
	orderBy: string;
}
export default function FilterListing({ listings }: FilterListingProps) {
	const isDesktop = useMediaQuery("(min-width: 1200px)");
	const [hideOnMobile, setHideOnMobile] = useState(false);
	const [isLoading, setIsLoading] = useState(false)
	const [filteredListings, setFilteredListings] = useState<Listing[]>(listings);
	const [open, setOpen] = useState(false);
	const [isMapView, setIsMapView] = useState(false);
	const [filters, setFilters] = useState<Filters>({
		category: "",
		proximity: [40],
		searchText: "",
		tags: [],
		orderBy: "",
	});

	const [position, setPosition] = useState<Latlng>({
		lat: 0,
		lng: 0,
	});
	const [address, setAddress] = useState("");
	const [isSpinning, setIsSpinning] = useState(false);
	const clearFilters = () => {
		setIsSpinning(true);
		setFilters({
			category: "",
			searchText: "",
			tags: [],
			orderBy: "",
			proximity: [],
		});
		setAddress("");
		setFilteredListings(listings);
		setTimeout(() => {
			setIsSpinning(false);
		}, 1000);
	};

	useEffect(() => {
		const addressFromCoordinates = async () => {
			const response = await geocode.getAddress(position);
			if (response.results.length > 0) {
				setAddress(response.results[0].formatted_address);
			}
		};
		addressFromCoordinates();
	}, [position]);

	useEffect(() => {
		setHideOnMobile(isDesktop);
	}, [isDesktop]);
	// use hideOnMobile in your render!

	const applyFilter = () => {
		console.log("test");
		let initialListings = listings;

		if (filters.searchText) {
			initialListings = initialListings.filter(({ title }) =>
				title.toLowerCase().includes(filters.searchText.toLowerCase())
			);
		}
		if (filters.category) {
			initialListings = initialListings.filter(({ categories }) => {
				return (
					categories.filter((category) => {
						return category.category === filters.category;
					}).length > 0
				);
			});
		}
		// TODO only works for one address, implement multiple in the future
		if (filters.proximity && address) {
			initialListings = initialListings.filter((listing) => {
				const distance = getDistanceFromLatLonInKm(
					listing.addresses[0].lat,
					listing.addresses[0].lng,
					position.lat,
					position.lng
				);
				return distance <= filters.proximity[0];
			});
		}

		if (filters.tags.length > 0) {
			initialListings = initialListings.filter((listing) => {
				return listing.tags.some((tagObj) => {
					return filters.tags.includes(tagObj.tag);
				});
			});
		}

		if (filters.orderBy) {
			switch (filters.orderBy) {
				case "Latest": {
					initialListings = initialListings.sort(
						(a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
					);
					break;
				}
				case "Random": {
					shuffleArray(initialListings);
					break;
				}
				case "A-Z": {
					initialListings = initialListings.sort((a, b) =>
						a.title.toLowerCase().localeCompare(b.title.toLowerCase())
					);
					break;
				}
			}
		}
		setFilteredListings(initialListings);
		setOpen(false);
	};


	useEffect(() => {
		let initialListings = listings;

		if (filters.searchText) {
			initialListings = initialListings.filter(({ title }) =>
				title.toLowerCase().includes(filters.searchText.toLowerCase())
			);
		}
		setFilteredListings(initialListings);
	}, [filters.searchText, listings]);

	const handleCurrentDisplay = () => {
		setIsMapView(!isMapView);
	};

	const handleLocationAccess = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					setPosition(
						produce((draft) => {
							draft.lat = latitude;
							draft.lng = longitude;
						})
					);
				},
				(error) => {
					switch (error.code) {
						case error.PERMISSION_DENIED:
							alert("you must have location enabled to use this feature");
							break;
						case error.POSITION_UNAVAILABLE:
							alert("Location information is unavailable.");
							break;
						case error.TIMEOUT:
							alert("The request to get user location timed out.");
							break;
						default:
							alert("An unknown error occurred.");
					}
				}
			);
		} else {
			alert("Geolocation is not supported by this browser.");
		}
	};

	const getArrOfCoordinates = () => {
		const coordinates: Latlng[] = [];
		filteredListings.forEach((listing) => {
			listing.addresses.forEach((address) => {
				coordinates.push({
					lat: address.lat,
					lng: address.lng,
				});
			});
		});

		return coordinates;
	};

	return (
		<>
			<div className="relative">
				{!isLoading &&
					<LoadingComponent isLoading={isLoading} setIsLoading={setIsLoading} />
				}
				{!hideOnMobile ?
					<div>
						{/* {!isDesktop && ( */}
						<Drawer open={open} onOpenChange={setOpen}>
							<div className="flex  justify-between w-full mb-4 px-4">
								<div className="flex flex-row-reverse  items-center justify-between ">
									<Input
										value={filters.searchText}
										onChange={(e) =>
											setFilters(
												produce((draft) => {
													draft.searchText = e.target.value;
												})
											)
										}
										type="text"
										placeholder="What are you looking for?"
										className="border-none focus:outline-none  focus-visible:ring-0 placeholder:text-black "
									/>
									<Search size={20} />
								</div>
								<DrawerTrigger className="">
									<div className="flex justify-between">
										<span className="font-semibold flex gap-2 justify-center items-center cursor-pointer ">
											Filters
											<FaSliders className="basis-1/3 text-emerald-600 border-none " />
										</span>
									</div>
								</DrawerTrigger>
							</div>

							{isMapView ? (
								<div>
									<MapView
										positions={getArrOfCoordinates()}
										filteredListings={filteredListings}
									/>
								</div>
							) : (
								<DrawerContent className="h-screen ">
									<DrawerHeader className="w-full">
										<DrawerTitle className="text-center text-2xl flex justify-around gap-2">
											<span className="bg-[#f2f3f2] p-2.5 cursor-pointer">
												<FilterSpinner
													clearFilters={clearFilters}
													isSpinning={isSpinning}
													setIsSpinning={setIsSpinning}
												/>
											</span>
											<span className="bg-[#f2f3f2] p-2.5 cursor-pointer">
												<X onClick={() => setOpen(!open)} />
											</span>
											<Button
												onClick={applyFilter}
												className=" bg-emerald-600 hover:bg-emerald-800 rounded-none basis-4/5 px-2"
											>
												Apply Filters
											</Button>
										</DrawerTitle>
									</DrawerHeader>
									<div className="px-4 ">
										<div>
											<input
												type="text"
												value={filters.searchText}
												onChange={(e) =>
													setFilters(
														produce((draft) => {
															draft.searchText = e.target.value;
														})
													)
												}
												// onChange={filterWithSearch}
												placeholder="What are you looking for?"
												className="placeholder placeholder:text-black w-full py-3.5 focus:outline-none border-b focus:border-b-emerald-600 mb-4 "
											/>
										</div>
										<div>
											<Select
												value={filters.category}
												onValueChange={(value) =>
													setFilters(
														produce((draft) => {
															draft.category = value;
														})
													)
												}
											>
												<div className="focus:border-b-emerald-600 border-b pb-2">
													<SelectTrigger className="w-full border-none font-semibold cursor-pointer">
														<div className="text-left">
															<h3 className="font-normal">Categories</h3>
															<SelectValue placeholder="" />
														</div>
													</SelectTrigger>
												</div>
												<SelectContent side="bottom">
													<div>
														{categoriesList.map((_, index) => (
															<div key={index}>
																<SelectItem
																	value={categoriesList[index]}
																	key={index}
																>
																	{categoriesList[index]}
																</SelectItem>
															</div>
														))}
													</div>
												</SelectContent>
											</Select>
										</div>
										<div className="flex justify-between items-center">
											<input
												type="text"
												value={address}
												onChange={(e) => setAddress(e.target.value)}
												placeholder="Where to look?"
												className="placeholder:font-normal placeholder:text-black w-full py-3.5 focus:outline-none border-b focus:border-b-emerald-600 mb-4 font-semibold"
											/>
											<RiUserLocationLine
												onClick={handleLocationAccess}
												className="h-5 w-5 mb-3.5 hover:opacity-25"
											/>
										</div>
										<div className="mb-4">
											{address && (
												<div>
													<h3 className=" mb-2">{`Proximity ${filters.proximity}km`}</h3>
													<Slider
														defaultValue={[40]}
														className="bg-emerald-600"
														max={40}
														onValueChange={(v) => {
															setFilters(
																produce((draft) => {
																	draft.proximity = v;
																})
															);
														}}
													/>
												</div>
											)}
										</div>
										<div className="mb-4">
											<h2 className="mb-2">Features</h2>
											{tagList.map((tag, index) => (
												<div className="flex gap-2" key={index}>
													<input
														value={tag}
														onClick={() =>
															filters.tags.includes(tag)
																? setFilters(
																	produce((draft) => {
																		draft.tags.splice(
																			draft.tags.indexOf(tag),
																			1
																		);
																	})
																)
																: setFilters(
																	produce((draft) => {
																		draft.tags.push(tag);
																	})
																)
														}
														className={`h-8 w-8 mb-2 peer:checked:black`}
														checked={filters.tags.includes(tag)}
														onChange={(e) => { }}
														type="checkbox"
													/>
													{tag}
												</div>
											))}
										</div>

										<div>
											<Select
												value={filters.orderBy}
												onValueChange={(value) =>
													setFilters(
														produce((draft) => {
															draft.orderBy = value;
														})
													)
												}
											>
												<div className="focus:border-b-emerald-600 border-b pb-2">
													<SelectTrigger className="w-full border-none font-semibold cursor-pointer">
														<div className="text-left">
															<h3 className="font-normal">Order By</h3>
															<SelectValue placeholder="" />
														</div>
													</SelectTrigger>
												</div>
												<SelectContent side="bottom">
													<div>
														{["Latest", "Random", "A-Z"].map(
															(filter, index) => (
																<div key={index}>
																	<SelectItem value={filter} key={index}>
																		{filter}
																	</SelectItem>
																</div>
															)
														)}
													</div>
												</SelectContent>
											</Select>
										</div>
										{/* TODO style checked checkbox */}
									</div>
									<DrawerFooter>
										<DrawerClose className="text-right">Close</DrawerClose>
									</DrawerFooter>
								</DrawerContent>
							)}
						</Drawer>
						{/* )} */}

						<section className="bg-[#f4f4f4] h-screen ">
							{filteredListings.length > 0 ? (
								<div className="p-4">
									<ListingList
										listings={filteredListings}
										className="space-y-4 grid md:grid-cols-2 gap-2 "
									/>
								</div>
							) : (
								<div className="col-span-full py-12 text-center">
									<div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
										<Search className="h-12 w-12 text-gray-300" />
									</div>
									<h3 className="text-xl font-semibold mb-2">
										No businesses found
									</h3>
									<p className="text-gray-500 mb-4">
										We could not find any businesses matching your search
										criteria.
									</p>
									<Button
										variant="outline"
										className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
										onClick={clearFilters}
									>
										Clear All Filters
									</Button>
								</div>
							)}
						</section>

						<div className="w-full">
							{isLoading &&
								<Button
									onClick={handleCurrentDisplay}
									className="bg-white text-black rounded-md bottom-5 -translate-x-1/2 left-1/2 fixed z-50 hover:bg-gray-100 cursor-pointer w-32 py-6  shadow-sm"
								>
									{isMapView ? (
										<FaListUl className="text-emerald-600" />
									) : (
										<BsMap className="text-emerald-600" />
									)}
									{isMapView ? "List View" : "Map View"}
								</Button>
							}
						</div>
					</div>
					: (
						<div className="flex gap-2 h-[calc(100vh-100px)]">
							<section className="  p-4  flex-none  w-1/3  max-w-[550px]">
								<div className=" ">
									<div className="px-4 ">
										<div>
											<input
												type="text"
												value={filters.searchText}
												onChange={(e) =>
													setFilters(
														produce((draft) => {
															draft.searchText = e.target.value;
														})
													)
												}
												// onChange={filterWithSearch}
												placeholder="What are you looking for?"
												className="placeholder placeholder:text-black w-full py-3.5 focus:outline-none border-b focus:border-b-emerald-600 mb-4 "
											/>
										</div>
										<div>
											<Select
												value={filters.category}
												onValueChange={(value) =>
													setFilters(
														produce((draft) => {
															draft.category = value;
														})
													)
												}
											>
												<div className="focus:border-b-emerald-600 border-b pb-2">
													<SelectTrigger className="w-full border-none font-semibold cursor-pointer">
														<div className="text-left">
															<h3 className="font-normal">Categories</h3>
															<SelectValue placeholder="" />
														</div>
													</SelectTrigger>
												</div>
												<SelectContent side="bottom">
													<div>
														{categoriesList.map((_, index) => (
															<div key={index}>
																<SelectItem
																	value={categoriesList[index]}
																	key={index}
																>
																	{categoriesList[index]}
																</SelectItem>
															</div>
														))}
													</div>
												</SelectContent>
											</Select>
										</div>
										<div className="flex justify-between items-center">
											<input
												type="text"
												value={address}
												onChange={(e) => setAddress(e.target.value)}
												placeholder="Where to look?"
												className="placeholder:font-normal placeholder:text-black w-full py-3.5 focus:outline-none border-b focus:border-b-emerald-600 mb-4 font-semibold"
											/>
											<RiUserLocationLine
												onClick={handleLocationAccess}
												className="h-5 w-5 mb-3.5 hover:opacity-25"
											/>
										</div>
										<div className="mb-4">
											{address && (
												<div>
													<h3 className=" mb-2">{`Proximity ${filters.proximity}km`}</h3>
													<Slider
														defaultValue={[40]}
														className="bg-emerald-600"
														max={40}
														onValueChange={(v) => {
															setFilters(
																produce((draft) => {
																	draft.proximity = v;
																})
															);
														}}
													/>
												</div>
											)}
										</div>
										<div className="mb-4">
											<h2 className="mb-2">Features</h2>
											{tagList.map((tag, index) => (
												<div className="flex gap-2" key={index}>
													<input
														value={tag}
														onClick={() =>
															filters.tags.includes(tag)
																? setFilters(
																	produce((draft) => {
																		draft.tags.splice(
																			draft.tags.indexOf(tag),
																			1
																		);
																	})
																)
																: setFilters(
																	produce((draft) => {
																		draft.tags.push(tag);
																	})
																)
														}
														className={`h-8 w-8 mb-2 peer:checked:black`}
														checked={filters.tags.includes(tag)}
														onChange={(e) => { }}
														type="checkbox"
													/>
													{tag}
												</div>
											))}
										</div>

										<div>
											<Select
												value={filters.orderBy}
												onValueChange={(value) =>
													setFilters(
														produce((draft) => {
															draft.orderBy = value;
														})
													)
												}
											>
												<div className="focus:border-b-emerald-600 border-b pb-2">
													<SelectTrigger className="w-full border-none font-semibold cursor-pointer">
														<div className="text-left">
															<h3 className="font-normal">Order By</h3>
															<SelectValue placeholder="" />
														</div>
													</SelectTrigger>
												</div>
												<SelectContent side="bottom">
													<div>
														{["Latest", "Random", "A-Z"].map((filter, index) => (
															<div key={index}>
																<SelectItem value={filter} key={index}>
																	{filter}
																</SelectItem>
															</div>
														))}
													</div>
												</SelectContent>
											</Select>
										</div>
									</div>
									<div className=" flex flex-col justify-center items-center gap-3">
										<Button
											onClick={applyFilter}
											className=" bg-emerald-600 hover:bg-emerald-800 rounded-md basis-4/5 px-2 w-full p-4"
										>
											<Search /> Search
										</Button>
										<FilterSpinner
											clearFilters={clearFilters}
											isSpinning={isSpinning}
											setIsSpinning={setIsSpinning}
											label="Reset Filters"
										/>
									</div>
								</div>
							</section>
							<section className="bg-[#f4f4f4] border-2 flex-none w-1/3 max-w-[550px]  flex flex-col">
								{filteredListings.length > 0 ? (
									<div className="overflow-y-auto flex-1 p-4">
										<ListingList
											listings={filteredListings}
											className="grid gap-4"
										/>
									</div>
								) : (
									<div className="col-span-full py-12 text-center">
										<div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
											<Search className="h-12 w-12 text-gray-300" />
										</div>
										<h3 className="text-xl font-semibold mb-2">
											No businesses found
										</h3>
										<p className="text-gray-500 mb-4">
											We could not find any businesses matching your search criteria.
										</p>
										<Button
											variant="outline"
											className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
											onClick={clearFilters}
										>
											Clear All Filters
										</Button>
									</div>
								)}
							</section>
							<section className=" flex-auto overflow-hidden ">
								<MapView
									positions={getArrOfCoordinates()}
									filteredListings={filteredListings}
								/>
							</section>
						</div>
					)}
			</div>
		</>
	);
}
