import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone } from "lucide-react";

import { Badge } from "@/components/ui/badge";

interface BusinessCardProps {
	id: number;
	coverImage: string
	logo: string;
	title: string;
	category: string;
	address: string;
	slug: string;
	// rating: number;
	// price: string;
	tagLine: string;
	phoneNumber: string;
}

export default function BusinessCard({
	id,
	slug,
	logo,
	coverImage,
	title,
	category,
	address,
	tagLine,
	phoneNumber,
}: BusinessCardProps) {
	return (
		<Link href={`/listing/${slug}`}>
			<div className="bg-white rounded-md overflow-hidden   transition-shadow relative min-h-[285px] hover:opacity-95 ">
				<div className="relative h-30 w-full ">
					<Image
						priority
						src={coverImage}
						alt={title}
						fill
						className="object-cover hover:opacity-100"
					/>
				</div>
				<div className="p-4 hover:hei">
					<div className=" my-2">
						<div>
							<h3 className="font-semibold text-lg  text-gray-900">{title}</h3>
						</div>
						<p className="text-[#52525B]">{tagLine}</p>
						<div className="flex gap-2 text-sm items-center mt-2 text-[#52525B]">
							<Phone className="h-3 w-3 " />

							{phoneNumber}
						</div>
					</div>
					<div className="flex items-center gap-2 mb-3 ">
						<Badge variant="outline" className="text-xs font-normal">
							{category}
						</Badge>
						<div className="flex items-center text-[#52525B] text-xs">
							<MapPin className="h-3 w-3 mr-1" />
							{address}
						</div>
					</div>
					{/* <p className="text-gray-600 text-sm line-clamp-2">{tagLine}</p> */}
				</div>
				<div className="absolute bottom-36 left-4 mt-2">
					<img src={logo ? logo : undefined} alt={title} className="h-14 w-14 rounded-full" />
				</div>
			</div>
		</Link>
	);
}
