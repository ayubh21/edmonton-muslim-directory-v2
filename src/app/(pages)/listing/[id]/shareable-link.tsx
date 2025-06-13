"use client"

import LoadingComponent from "@/components/loading-indicator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { Listing } from "@/types/listing"
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { useMediaQuery } from "@react-hook/media-query";
import { BadgeCheck, CopyIcon, MapPin, Share2 } from "lucide-react";
import Image from "next/image"
import Link from "next/link";
import { useEffect, useState } from "react";

interface ListingBannerProps {
	listing: Listing;
}

export default function ListingBanner({ listing }: ListingBannerProps) {
	console.log(listing)
	const [open, setOpen] = useState(false);
	const [isClicked, setIsClicked] = useState(false)
	const [isMounted, setIsMounted] = useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");
	const BASE_URL = 'yegmuslimconnect.ca'
	useEffect(() => {
		setIsMounted(true)
	}, [isMounted])


	if(!isMounted) return <LoadingComponent isLoading={isMounted} setIsLoading={setIsMounted}/>

	const handleClick = () => {
		navigator.clipboard.writeText(`${BASE_URL}/listing/${listing.slug}`)
		setIsClicked(true)
	}


	if(isDesktop) {
	return (
		<div>
			<div className="mx-auto relative   overflow-hidden mb-8  max-h-[700px]">
				<div className="aspect-[2/1]  min-h-[300px] ">
					<Image
						src={listing.images.coverImage || "/placeholder.svg"}
						alt={listing.title}
						fill
						className="object-cover aspect-square"
					/>
				</div>
				<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
				<div className="  absolute bottom-0 left-0 p-6 text-white">
					<div className="flex  flex-col mb-2">
						<div className="flex">

							<h1 className="text-3xl md:text-4xl font-bold mr-2">
								{listing.title}
							</h1>
							<BadgeCheck className="h-6 w-6 text-emerald-400 mt-3" />
						</div>
						<span className="mr-6 block">
							{listing.tag_line}
						</span>
						{/* TODO render only if listing is verified */}
					</div>
					<div className="flex items-center  flex-wrap gap-3">
						{listing.categories.map((category, index) => (
							<div key={index}>
								<Badge className="bg-emerald-500 hover:bg-emerald-600 text-white">
									{category.category}
								</Badge>
							</div>
						))}
						<div className="flex items-center">
							<MapPin className="h-4 w-4 mr-1" />
							<span>{listing.addresses[0].address}</span>
						</div>
					</div>
				</div>

				<div className="absolute top-4 right-4 flex gap-2">
					<Button
						size="icon"
						variant="secondary"
						className="rounded-full bg-white/80 hover:bg-white"
						onClick={() => setOpen(!open)}
					>
						<Share2
							size={20} className="h-5 w-5 text-gray-700" />
					</Button>
				</div>
				<Dialog open={open} onOpenChange={(open) => setOpen(open)} >
					<DialogContent>
						<div className="flex justify-between mt-5">
							<DialogTitle className="text-center underline">{`${BASE_URL}/listing/${listing.id}`}</DialogTitle>
							<Tooltip>
								<TooltipTrigger asChild>
									<CopyIcon size={20} onClick={handleClick} className={`${!isClicked ? "text-black" : "text-gray-200"}`} />
								</TooltipTrigger>
								<TooltipContent>
									Copy to clipboard!
								</TooltipContent>
							</Tooltip>
						</div>
					</DialogContent>
				</Dialog >
			</div>
		</div >
	)
	}

	if(!isDesktop) {
		return (
		<div>
			<div className="mx-auto relative   overflow-hidden   max-h-[700px]">
				<div className="aspect-[2/1]  min-h-[300px] ">
					<Image
						src={listing.images.coverImage || "/placeholder.svg"}
						alt={listing.title}
						fill
						className="object-cover aspect-square"
					/>
				</div>
				<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

				<div className="absolute top-4 right-4 flex gap-2">
					<Button
						size="icon"
						variant="secondary"
						className="rounded-full bg-white/80 hover:bg-white"
						onClick={() => setOpen(!open)}
					>
						<Share2
							size={20} className="h-5 w-5 text-gray-700" />
					</Button>
				</div>
				<Dialog open={open} onOpenChange={(open) => setOpen(open)} >
					<DialogContent>
						<div className="flex justify-between mt-5">
							<DialogTitle className="text-center underline">{`${BASE_URL}/listing/${listing.slug}`}</DialogTitle>
							<Tooltip>
								<TooltipTrigger asChild>
									<CopyIcon size={20} onClick={handleClick} className={`${!isClicked ? "text-black" : "text-gray-200"}`} />
								</TooltipTrigger>
								<TooltipContent>
									Copy to clipboard!
								</TooltipContent>
							</Tooltip>
						</div>
					</DialogContent>
				</Dialog >
			</div>
				<div className="  p-5 bg-white mb-10">
					<div className="flex  flex-col mb-2">
						<div className="flex">

							<h1 className="text-3xl md:text-4xl font-bold  mr-2 text-black">
								{listing.title}
							</h1>
							<BadgeCheck className="h-6 w-6 text-emerald-400 mt-3" />
						</div>
						<span className="mr-6 block">
							{listing.tag_line}
						</span>
						{/* TODO render only if listing is verified */}
					</div>
					<div className="flex items-center  flex-wrap gap-3">
						{listing.categories.map((category, index) => (
							<div key={index}>
								<Badge className="bg-emerald-500 hover:bg-emerald-600 text-white">
									{category.category}
								</Badge>
							</div>
						))}
						<div className="flex items-center">
							<MapPin className="h-4 w-4 mr-1" />
							<span className="text-xs">{listing.addresses[0].address}</span>
						</div>
					</div>
				</div>
		</div >
		)
	}
}