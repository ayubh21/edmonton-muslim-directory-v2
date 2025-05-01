"use client";

import {
  CheckCircle,
  ChevronLeft,
  Clock,
  Globe,
  Mail,
  MapPin,
  Phone,
  XCircle,
} from "lucide-react";
import { ParamValue } from "next/dist/server/request/params";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Listing } from "@/types/listing";
import { Badge } from "../ui/badge";
import moment from "moment";
import { fromAddress, setKey } from "react-geocode";
import { useEffect, useState } from "react";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";

type ReviewListingProps = {
  listing: Listing;
};

export default function ReviewListing({ ...props }: ReviewListingProps) {
  console.log(props.listing);
  // TODO address is an arr[string], in case business want to put down multiple branches
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API!);
    setKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!);
    handleGetCoordinatesFromAddress();
  }, []);

  const handleGetCoordinatesFromAddress = async () => {
    if (props.listing.addresses[0]) {
      const results = await fromAddress(props.listing.addresses[0]);
      if (results) {
        const location = results.results[0].geometry.location;
        setLat(location.lat);
        setLng(location.lng);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Link
            href="/admin/listings/pending"
            className="text-emerald-600 hover:text-emerald-700"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-semibold">Review Listing</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <XCircle className="h-4 w-4" />
            Reject
          </Button>
          <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700">
            <CheckCircle className="h-4 w-4" />
            Approve
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">
                    {props.listing.title}
                  </CardTitle>
                  <CardDescription>
                    Submitted by {props.listing.contact.email} on
                    {typeof props.listing.createdAt}
                  </CardDescription>
                </div>
                <Badge className="bg-blue-500">New Listing</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="details">
                <TabsList className="mb-4 flex flex-row gap-2">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="images">Images</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Business Description</h3>
                    <div className="bg-gray-50 p-4 rounded-md text-sm">
                      {props.listing.description}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium mb-2">Contact Information</h3>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <Phone className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
                          <span className="text-sm">
                            {props.listing.contact.phoneNumber}
                          </span>
                        </div>
                        <div className="flex items-start">
                          <Mail className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
                          <span className="text-sm">
                            {props.listing.contact.email}
                          </span>
                        </div>
                        <div className="flex items-start">
                          <Globe className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
                          <span className="text-sm">
                            {props.listing.contact.websiteUrl}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Business Hours</h3>
                      <div className="flex items-start">
                        <Clock className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
                        {/* <span className="text-sm">{business.hours}</span> */}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="images">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Cover Image</h3>
                      <div className="relative aspect-video rounded-lg overflow-hidden">
                        <Image
                          src={
                            props.listing.images.coverImage ||
                            "/placeholder.svg"
                          }
                          alt={`${props.listing.title} cover image`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Logo</h3>
                      <div className="relative h-24 w-24 rounded-lg overflow-hidden">
                        <Image
                          src={props.listing.images.logo}
                          alt={`${props.listing.title} logo`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Gallery Images</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {props.listing.images.galleryImages.map(
                          (galleryImage, index) => (
                            <div
                              key={index}
                              className="relative aspect-video rounded-lg overflow-hidden"
                            >
                              <Image
                                src={galleryImage}
                                alt={`${props.listing.title} gallery image ${
                                  index + 1
                                }`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="location">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Address</h3>
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
                        <span className="text-sm">
                          {props.listing.addresses}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Map Location</h3>
                      <div className="relative h-[300px] bg-gray-100 rounded-lg">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <APIProvider
                            apiKey={
                              process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!
                            }
                          >
                            <Map
                              defaultCenter={{ lat: lat, lng: lng }}
                              defaultZoom={10}
                              streetViewControl={false}
                              mapTypeControl={false}
                              mapId={process.env.NEXT_PUBLIC_MAP_ID}
                              zoomControl={false}
                            >
                              <AdvancedMarker position={{ lat: lat, lng: lng }}>
                                <Pin />
                              </AdvancedMarker>
                            </Map>
                          </APIProvider>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="features">
                  <div>
                    <h3 className="font-medium mb-2">Business Features</h3>
                    <div className="flex flex-wrap gap-2">
                      {props.listing.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-gray-50"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* <Alert
            variant="warning"
            className="bg-amber-50 text-amber-800 border-amber-200"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Verification Required</AlertTitle>
            <AlertDescription>
              Please verify all business information before approving this
              listing. Check for accuracy, appropriate content, and ensure it
              meets our community guidelines.
            </AlertDescription>
          </Alert> */}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Review Decision</CardTitle>
              <CardDescription>
                Approve or reject this business listing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="approve" className="space-y-4">
                <div className="flex items-start space-x-2">
                  <RadioGroupItem
                    value="approve"
                    id="approve"
                    className="mt-1"
                  />
                  <div className="grid gap-1.5">
                    <Label htmlFor="approve" className="font-medium">
                      Approve Listing
                    </Label>
                    <p className="text-sm text-gray-500">
                      The listing will be published and visible to all users.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="reject" id="reject" className="mt-1" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="reject" className="font-medium">
                      Reject Listing
                    </Label>
                    <p className="text-sm text-gray-500">
                      The listing will be rejected and the submitter will be
                      notified.
                    </p>
                  </div>
                </div>
              </RadioGroup>

              <Separator className="my-4" />

              <div className="space-y-4">
                <div>
                  <Label htmlFor="feedback" className="font-medium">
                    Feedback to Submitter
                  </Label>
                  <Textarea
                    id="feedback"
                    placeholder="Provide feedback about this listing..."
                    className="mt-1.5 min-h-[100px]"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This message will be sent to the submitter along with your
                    decision.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="notify" />
                  <Label htmlFor="notify">Send email notification</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="featured" />
                  <Label htmlFor="featured">Mark as featured listing</Label>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve Listing
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject Listing
                </Button>
              </div>
            </CardContent>
          </Card>
          {/* TODO ensure submitter info comes from user and not listing */}
          <Card>
            <CardHeader>
              <CardTitle>Submitter Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium">Name</p>
                  <p className="text-sm text-gray-500">{props.listing.title}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-gray-500">
                    {props.listing.contact.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Submission Date</p>
                  <p className="text-sm text-gray-500">
                    {moment(props.listing.createdAt).format("MMM Do, YY")}
                  </p>
                </div>
              </div>

              <Separator className="my-4" />

              <Button variant="outline" className="w-full">
                Contact Submitter
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
