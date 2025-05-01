"use client";

import React, { useEffect } from "react";
import ListingGeneral from "./components/ListingGeneral";
import { FormProvider, useForm } from "react-hook-form";
import Link from "next/link";
import {
  ChevronLeft,
  Contact2Icon,
  Image,
  Map,
  Pencil,
  Share,
  Workflow,
} from "lucide-react";
import FormSection from "./components/ListingSection";
import ListingImages, { ImageMetaData } from "./components/ListingImages";
import ListingContact from "./components/ListingContact";
import ListingSocials from "./components/ListingSocials";
import ListingWorkHours from "./components/ListingWorkHours";
import ListingLocation from "./components/ListingLocation";
import { APIProvider } from "@vis.gl/react-google-maps";
import { MdCategory } from "react-icons/md";
import ListingDetails from "./components/ListingDetails";
import { Button } from "@/components/ui/button";
import { Listing } from "@/types/listing";
import { AddListing, UploadToS3 } from "../actions/listing";

export default function page() {
  const methods = useForm<Listing>({
    defaultValues: {},
  });

  const Upload = async (images: ImageMetaData) => {
    try {
      if (images.logo) {
        const logoResult = await UploadToS3(images.logo);
        if (!logoResult?.$metadata) {
          console.log(logoResult?.$metadata);
          throw new Error("Failed to upload logo to S3");
        }
      }

      if (images.coverImage) {
        const coverResult = await UploadToS3(images.coverImage);
        console.log(coverResult);
        if (!coverResult?.$metadata) {
          throw new Error("Failed to upload cover image to S3");
        }
      }
      if (images.galleryImages) {
        const galleryImagesPromises = images.galleryImages.map(
          async (galleryImage) => {
            return new Promise(async (resolve) => {
              const galleryResult = await UploadToS3(galleryImage);
              if (!galleryResult?.$metadata) {
                throw new Error("Failed to upload gallery image to S3");
              }
              resolve(galleryResult);
            });
          }
        );
        const galleryImages = await Promise.allSettled(galleryImagesPromises);
        console.log(galleryImages);
      }

      return { success: true };
    } catch (error) {
      console.error("Error uploading images:", error);
      throw error;
    }
  };

  const onSubmit = async (data: Listing) => {
    console.log(data.imageMetaData);
    await AddListing(data);
    const result = await Upload(data.imageMetaData);
    console.log(result);
  };

  return (
    <FormProvider {...methods}>
      <div className="px-6 max-w-3xl mx-auto">
        <div className="container pt-8 ">
          <div className="flex items-center mb-6">
            <Link
              href="/"
              className="text-emerald-600 hover:text-emerald-700 mr-4"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-semibold">Add Your Listing</h1>
          </div>
        </div>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormSection
            icon={<Pencil size={18} />}
            title="General"
            description="Basic information about your business"
          >
            <ListingGeneral
              title="title"
              description="description"
              tagLine="tagLine"
            />
          </FormSection>
          <FormSection
            icon={<Image size={18} />}
            title="Images"
            description="upload images of your business"
          >
            <ListingImages />
          </FormSection>
          <FormSection
            icon={<Contact2Icon size={18} />}
            title="Contact"
            description="How customers can reach you "
          >
            <ListingContact />
          </FormSection>
          <FormSection
            title="Social Networks"
            description="connect your social media accounts"
            icon={<Share size={18} />}
          >
            <ListingSocials />
          </FormSection>
          <FormSection
            title="Work Hours"
            description="When your business is open"
            icon={<Workflow size={18} />}
          >
            <ListingWorkHours />
          </FormSection>
          <FormSection
            title="Location"
            description="Where your business is"
            icon={<Map size={18} />}
          >
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API!}>
              <ListingLocation />
            </APIProvider>
          </FormSection>
          <FormSection
            title="Details"
            description="Details about your business"
            icon={<MdCategory size={18} />}
          >
            <ListingDetails />
          </FormSection>
          <Button
            className="bg-emerald-600 text-white w-full mb-4 text-center hover:bg-emerald-700 py-6"
            type="submit"
          >
            Submit Listing
          </Button>
        </form>
      </div>
    </FormProvider>
  );
}
