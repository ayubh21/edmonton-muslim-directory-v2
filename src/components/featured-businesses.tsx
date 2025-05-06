import Link from "next/link";
import Image from "next/image";
import { Star, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";

interface FeaturedBusinessCardProps {
  id: number;
  image: string;
  name: string;
  category: string;
  area: string;
  rating: number;
  price: string;
  description: string;
}

export default function FeaturedBusinessCard({
  id,
  image,
  name,
  category,
  area,
  rating,
  description,
}: FeaturedBusinessCardProps) {
  return (
    <Link href={`/business/${id}`}>
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="relative h-48 w-full">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-xl text-gray-900">{name}</h3>
            <div className="flex items-center bg-amber-50 px-2 py-1 rounded text-amber-700">
              {/* <Star className="h-4 w-4 fill-amber-500 text-amber-500 mr-1" /> */}
              {/* <span className="text-sm font-medium">{rating}</span> */}
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline" className="text-xs font-normal">
              {category}
            </Badge>
            <div className="flex items-center text-gray-500 text-xs">
              <MapPin className="h-3 w-3 mr-1" />
              {area}
            </div>
          </div>

          <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
        </div>
      </div>
    </Link>
  );
}
