import Link from "next/link";
import Image from "next/image";
import { Star, MapPin, PhoneCall, Phone } from "lucide-react";

import { Badge } from "@/components/ui/badge";

interface BusinessCardProps {
  id: number;
  coverImage: string;
  logo: string;
  title: string;
  // category: string;
  // address: string;
  // rating: number;
  // price: string;
  tagLine: string;
  phoneNumber: string;
}

export default function BusinessCard({
  id,
  logo,
  coverImage,
  title,
  // category,
  // address,
  tagLine,
  phoneNumber,
}: BusinessCardProps) {
  return (
    <Link href={`/business/${id}`}>
      <div className="bg-white rounded-md overflow-hidden  hover:shadow-md transition-shadow relative min-h-[285px] ">
        <div className="relative h-30 w-full">
          <Image src={coverImage} alt={title} fill className="object-cover" />
        </div>
        <div className="p-4">
          <div className=" my-2">
            <div>
              <h3 className="font-semibold text-lg  text-gray-900">{title}</h3>
            </div>
            <p className="text-[#7E7E89]">{tagLine}</p>
            <div className="flex gap-2">
              <Phone className="h-3 w-3 mt-2" />

              {phoneNumber}
            </div>
            {/* <div className="flex items-center bg-amber-50 px-2 py-1 rounded text-amber-700"> */}
            {/* <Star className="h-4 w-4 fill-amber-500 text-amber-500 mr-1" /> */}
            {/* <span className="text-sm font-medium">{rating}</span> */}
            {/* </div> */}
          </div>

          <div className="flex items-center gap-2 mb-3 mt-4">
            <Badge variant="outline" className="text-xs font-normal">
              {/* {category} */}
              Test
            </Badge>
            {/* <div className="flex items-center text-gray-500 text-xs">
              <MapPin className="h-3 w-3 mr-1" />
              {/* {address} */}
            {/* </div>  */}
          </div>
          {/* <p className="text-gray-600 text-sm line-clamp-2">{tagLine}</p> */}
        </div>
        <div className="absolute bottom-36 left-4 mt-2">
          <img src={logo} alt={title} className="h-14 w-14 rounded-full" />
        </div>
      </div>
    </Link>
  );
}
