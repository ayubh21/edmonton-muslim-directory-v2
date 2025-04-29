"use server";

import Listings from "@/lib/db/models";
import { client } from "@/s3config/s3config";
import { Listing } from "@/types/listing";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { CustomFile } from "../add-listings/components/ListingImages";

export async function AddListing(listing: Listing) {
  try {
    const listingModel = new Listings({
      title: listing.title,
      tagLine: listing.tagLine,
      description: listing.description,
      images: {
        galleryImages: listing.images.galleryImages,
        logo: listing.images.logo,
        coverImage: listing.images.coverImage,
      },
      contact: {
        email: listing.contact.email,
        phoneNumber: listing.contact.phoneNumber,
        websiteUrl: listing.contact.websiteUrl,
      },
      addresses: listing.addresses,
      categories: listing.categories,
      tags: listing.tags,
      workHours: listing.workHours,
      networks: listing.networks,
    });

    const res = await listingModel.save();
    console.log("test");
    console.log(res);
  } catch (error) {
    console.error("Error creating listing:", error);
  }
}

export async function UploadToS3(file: CustomFile) {
  const arrayBuffer = await file.arrayBuffer();
  try {
    const input = new PutObjectCommand({
      Bucket: "edmv2",
      Key: file.name,
      Body: Buffer.from(arrayBuffer),
      ACL: "public-read",
      ContentType: file.type,
    });

    const res = await client.send(input);
    console.log(res);
    return res;
  } catch (e) {
    console.log(e);
  }
}
