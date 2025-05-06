import {
  GetAddressesByListingId,
  GetCategoriesByListingId,
  GetListingById,
} from "@/app/actions/listing";
import ListingSection from "@/components/listing/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { geocode } from "@/lib/geocode";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";
import { BadgeCheck, Images, Info, MapPin, Share2 } from "lucide-react";
import Image from "next/image";

export default async function Listing({ params }: { params: { id: number } }) {
  const id = params.id;
  const listing = await GetListingById(id);
  const address = await GetAddressesByListingId(id);
  const categories = await GetCategoriesByListingId(id);
  const coordinates = await geocode.getCoordinates(
    "11403 17th ave SW",
    "T6W2J6"
  );
  console.log(coordinates);
  // TODO must enable billing for google cloud
  if (!listing) return null;

  return (
    <div className="bg-gray-100">
      <div className="mx-auto relative h-[400px] md:h-[700px] overflow-hidden mb-8 ">
        <Image
          src={listing.images.coverImage || "/placeholder.svg"}
          alt={listing.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <div className="flex items-center mb-2">
            <h1 className="text-3xl md:text-4xl font-bold mr-2">
              {listing.title}
            </h1>
            {/* TODO render only if listing is verified */}
            <BadgeCheck className="h-6 w-6 text-emerald-400" />
          </div>
          <div className="flex items-center flex-wrap gap-3">
            {categories.map((category, index) => (
              <div key={index}>
                <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white">
                  {category.category}
                </Badge>
              </div>
            ))}
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{address[0].address}</span>
              {/* <span>{listing.tag_line}</span> */}
            </div>
          </div>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full bg-white/80 hover:bg-white"
          >
            <Share2 className="h-5 w-5 text-gray-700" />
          </Button>
        </div>
      </div>
      <div className="px-6">
        <ListingSection icon={<Info />} title="About">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
            consequuntur facere, in vitae laboriosam perspiciatis quae similique
            iure maiores eaque vel quisquam. Quos officia ut, consectetur dolor
            blanditiis ipsum inventore.
          </p>
        </ListingSection>
        <ListingSection icon={<Images />} title="Gallery">
          <div className="flex gap-2">
            {listing.images.galleryImages
              .slice(1)
              .map((galleryImage, index) => (
                <Image
                  key={index}
                  className="rounded-lg w-full h-full mt-2"
                  width={100}
                  height={100}
                  src={galleryImage}
                  alt={listing.title}
                />
              ))}
          </div>
        </ListingSection>
        {/* <ListingSection icon={<Map />} title="Location">
          <div className={"h-56"}>
            {/* <APIProvider apiKey={process.env.GOOGLE_MAPS_API_KEY!}> */}
        {/* <Map
              defaultCenter={{ lat: coordinates.lat, lng: coordinates.lng }}
              defaultZoom={10}
              streetViewControl={false}
              mapTypeControl={false}
              center={coordinates}
              mapId={process.env.NEXT_PUBLIC_MAP_ID}
              zoomControl={false}
            >
              {/* <AdvancedMarker
                position={{ lat: coordinates.lat, lng: coordinates.lng }}
              >
                <Pin />
              </AdvancedMarker> */}
        {/* </Map> */}
        {/* </APIProvider> */}
        {/* </div> */}
        {/* </ListingSection> */}
      </div>
    </div>
  );
}
