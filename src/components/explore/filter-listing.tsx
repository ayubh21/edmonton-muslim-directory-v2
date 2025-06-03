"use client";

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

	const [isDesktop, setIsDesktop] = useState(false);
	const [isClient, setIsClient] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
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

	useEffect(() => {
		const checkScreenSize = () => {
			setIsDesktop(window.innerWidth >= 1200);
		};

		checkScreenSize();
		setIsClient(true);

		window.addEventListener('resize', checkScreenSize);
		return () => window.removeEventListener('resize', checkScreenSize);
	}, []);

	const clearFilters = () => {
		setIsSpinning(true);
		setFilters({
			category: "",
			searchText: "",
			tags: [],
			orderBy: "",
			proximity: [40],
		});
		setAddress("");
		setFilteredListings(listings);
		setTimeout(() => {
			setIsSpinning(false);
		}, 1000);
	};

	useEffect(() => {
		const addressFromCoordinates = async () => {
			if (position.lat !== 0 && position.lng !== 0) {
				const response = await geocode.getAddress(position);
				if (response.results.length > 0) {
					setAddress(response.results[0].formatted_address);
				}
			}
		};
		addressFromCoordinates();
	}, [position]);

	const applyFilter = () => {
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
		if (filters.proximity && address && position.lat !== 0) {
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
					setPosition({
						lat: latitude,
						lng: longitude,
					});
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

	// Filter Form Component
	const FilterForm = ({ inDrawer = false }) => (
		<div className="px-4">
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
					placeholder="What are you looking for?"
					className="placeholder placeholder:text-black w-full py-3.5 focus:outline-none border-b focus:border-b-emerald-600 mb-4"
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
						<SelectTrigger className="w-full border-none font-semibold cursor-pointer shadow-none">
							<div className="text-left">
								<h3 className="font-normal">Categories</h3>
								<SelectValue placeholder="" />
							</div>
						</SelectTrigger>
					</div>
					<SelectContent side="bottom">
						<div>
							{categoriesList.map((category, index) => (
								<div key={index}>
									<SelectItem value={category} key={index}>
										{category}
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
					className="h-5 w-5 mb-3.5 hover:opacity-25 cursor-pointer"
				/>
			</div>
			<div className="mb-4">
				{address && (
					<div>
						<h3 className="mb-2">{`Proximity ${filters.proximity[0]}km`}</h3>
						<Slider
							value={filters.proximity}
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
					<div className="flex gap-2 items-center" key={index}>
						<input
							id={`tag-${index}`}
							onClick={() =>
								filters.tags.includes(tag)
									? setFilters(
										produce((draft) => {
											draft.tags.splice(draft.tags.indexOf(tag), 1);
										})
									)
									: setFilters(
										produce((draft) => {
											draft.tags.push(tag);
										})
									)
							}
							className="h-5 w-5 mb-2 border-2"
							checked={filters.tags.includes(tag)}
							onChange={() => { }}
							type="checkbox"
						/>
						<label htmlFor={`tag-${index}`} className="mb-2">{tag}</label>
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
						<SelectTrigger className="w-full border-none font-semibold cursor-pointer shadow-none">
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
	);

	if (!isClient) {
		return (
			<LoadingComponent isLoading={isLoading} setIsLoading={setIsLoading} />
		);
	}

	return (
		<div className="relative">
			{!isDesktop ? (
				<div>
					<Drawer open={open} onOpenChange={setOpen}>
						<div className="flex justify-between w-full mb-4 px-4">
							<div className="flex flex-row-reverse items-center justify-between pt-2">
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
									className="border-none focus:outline-none focus-visible:ring-0 placeholder:text-black shadow-none"
								/>
								<Search size={20} />
							</div>
							<DrawerTrigger className="shadow-none">
								<div className="flex justify-between">
									<span className="font-semibold flex gap-2 justify-center items-center cursor-pointer">
										Filters
										<FaSliders className="basis-1/3 text-emerald-600 border-none" />
									</span>
								</div>
							</DrawerTrigger>
						</div>

						<DrawerContent className="h-screen">
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
										className="bg-emerald-600 hover:bg-emerald-800 rounded-none basis-4/5 px-2"
									>
										Apply Filters
									</Button>
								</DrawerTitle>
							</DrawerHeader>
							<FilterForm inDrawer={true} />
							<DrawerFooter>
								<DrawerClose className="text-right">Close</DrawerClose>
							</DrawerFooter>
						</DrawerContent>
					</Drawer>

					{/* Single View Content - No Overlap */}
					<section className="bg-[#f4f4f4] min-h-screen">
						{isMapView ? (
							<div className="h-[calc(100vh-100px)]">
								<MapView
									positions={getArrOfCoordinates()}
									filteredListings={filteredListings}
								/>
							</div>
						) : (
							<div className="p-4">
								{filteredListings.length > 0 ? (
									<ListingList
										listings={filteredListings}
										className="space-y-4 grid md:grid-cols-2 gap-2"
									/>
								) : (
									<div className="col-span-full py-12 text-center">
										<div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
											<Search className="h-12 w-12 text-gray-300" />
										</div>
										<h3 className="text-xl font-semibold mb-2">No businesses found</h3>
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
							</div>
						)}
					</section>

					{/* View Toggle Button */}
					<Button
						onClick={handleCurrentDisplay}
						className="bg-white text-black rounded-md bottom-5 -translate-x-1/2 left-1/2 fixed z-50 hover:bg-gray-100 cursor-pointer w-32 py-6 shadow-lg"
					>
						{isMapView ? (
							<>
								<FaListUl className="text-emerald-600 mr-2" />
								List View
							</>
						) : (
							<>
								<BsMap className="text-emerald-600 mr-2" />
								Map View
							</>
						)}
					</Button>
				</div>
			) : (
				/* Desktop Layout */
				<div className="flex gap-2 h-[calc(100vh-100px)]">
					{/* Filters Panel */}
					<section className="p-4 flex-none w-1/3 max-w-[550px]">
						<FilterForm />
						<div className="flex flex-col justify-center items-center gap-3 mt-6">
							<Button
								onClick={applyFilter}
								className="bg-emerald-600 hover:bg-emerald-800 rounded-md basis-4/5 px-2 w-full p-4"
							>
								<Search className="mr-2" /> Search
							</Button>
							<FilterSpinner
								clearFilters={clearFilters}
								isSpinning={isSpinning}
								setIsSpinning={setIsSpinning}
								label="Reset Filters"
							/>
						</div>
					</section>

					<section className="bg-[#f4f4f4] border-2 flex-none w-1/3 max-w-[550px] flex flex-col">
						{filteredListings.length > 0 ? (
							<div className="overflow-y-auto flex-1 p-4">
								<ListingList listings={filteredListings} className="grid gap-4" />
							</div>
						) : (
							<div className="col-span-full py-12 text-center">
								<div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
									<Search className="h-12 w-12 text-gray-300" />
								</div>
								<h3 className="text-xl font-semibold mb-2">No businesses found</h3>
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

					<section className="flex-auto overflow-hidden">
						<MapView
							positions={getArrOfCoordinates()}
							filteredListings={filteredListings}
						/>
					</section>
				</div>
			)}
		</div>
	);
}
