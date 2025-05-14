import { GetListingById } from "@/app/actions/listing";
import ContactBusiness from "@/components/listing/contact-business";
import GoogleMapComponent from "@/components/listing/map";
import ListingSection from "@/components/listing/section";
import WorkHoursWrapper from "@/components/listing/work-hours-wrapper";
import { Button } from "@/components/ui/button";
import { geocode } from "@/lib/geocode";
import {
  BadgeCheck,
  Images,
  Info,
  Share2,
  Map,
  Clock2,
  Mail,
} from "lucide-react";
import Image from "next/image";
import { MdPermMedia } from "react-icons/md";
export default async function Listing({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listingId = parseInt(id);
  const listing = await GetListingById(listingId);
  if (!listing) return null;
  const coordinates = await geocode.getCoordinates(
    listing.addresses[0].address
  );

  return (
    <div className="bg-gray-100">
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
          <div className="flex items-center mb-2">
            <h1 className="text-3xl md:text-4xl font-bold mr-2">
              {listing.title}
            </h1>
            {/* TODO render only if listing is verified */}
            <BadgeCheck className="h-6 w-6 text-emerald-400" />
          </div>
          <div className="flex items-center  */}flex-wrap gap-3">
            {/* {categories.map((category, index) => (
              <div key={index}>
                <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white">
                  {category.category}
                </Badge>
              </div>
            ))} */}
            <div className="flex items-center">
              {/* <MapPin className="h-4 w-4 mr-1" />
              <span>{address[0].address}</span> */}
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
      <div className="px-6 max-w-[1375px] mx-auto md:grid grid-cols-2 gap-2">
        <ListingSection icon={<Info />} title="About">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
            consequuntur facere, in vitae laboriosam perspiciatis quae similique
            iure maiores eaque vel quisquam. Quos officia ut, consectetur dolor
            blanditiis ipsum inventore.
          </p>
        </ListingSection>
        <ListingSection icon={<Clock2 />} title="Work Hours">
          <div className="relative">
            <WorkHoursWrapper workHours={listing.work_hours} />
          </div>
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
        <section>
          <div className="bg-white p-4 shadow-sm mb-4">
            <div>
              <div className="flex gap-2 mb-4">
                <div
                  className={` rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden`}
                >
                  <span className="font-bold text-emerald-600">{<Map />}</span>
                </div>
                <span className="font-semibold">Location</span>
              </div>
              <GoogleMapComponent lat={coordinates.lat} lng={coordinates.lng} />
            </div>
            <div className="flex justify-between  items-center">
              {/* TODO redirect to google maps  */}
              {/* <span>{address[0].address}</span> */}
              <Button className="bg-faintGrey hover:bg-[#f2f3f2] text-black  text-center  h-full my-2 shadow-none font-normal  ">
                Get Directions
              </Button>
            </div>
          </div>
        </section>
        <ListingSection title="Features and Amenities">
          <div className="flex flex-row gap-2 mt-2">
            {/* {listingtags.map((tag, index) => (
              <Badge variant="outline" className=" bg-white " key={index}>
                {tag.tag}
              </Badge>
            ))} */}
          </div>
        </ListingSection>
        <ListingSection icon={<Mail />} title={`Contact ${listing.title}`}>
          <div className="relative">
            <ContactBusiness title={listing.title} />
          </div>
        </ListingSection>
        <ListingSection title="Business Owner ?">
          <div className="pl-2 my-2">
            <span className="text-gray-600 mb-2">
              Is this your business? Claim this listing to update information,
              respond to reviews, and more.
            </span>
            <Button className="w-full pl-2 mt-2">Claim this business</Button>
          </div>
        </ListingSection>
        <ListingSection title="Follow us on" icon={<MdPermMedia />}>
          <div>
            {listing.networks.map((network, index) => (
              <div className="flex justify-between" key={index}>
                <a href={`https://${network.type}`}>{network.type}</a>
                <a href={`https://${network.url}`}>{network.url}</a>
              </div>
            ))}
          </div>
        </ListingSection>
      </div>
    </div>
  );
}
