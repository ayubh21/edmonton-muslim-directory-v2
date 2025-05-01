"use server";

import Listings from "@/lib/db/models";
import { client } from "@/lib/s3/config";
import { Listing } from "@/types/listing";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { CustomFile } from "../add-listings/components/ListingImages";
import { serializeMongooseDoc } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { revalidateAll } from "./revalidate";

export async function AddListing(listing: Listing) {
  try {
    Listings.create({
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
    }).then((res) => {
      console.log(res);
    });
  } catch (error) {
    console.error("Error creating listing:", error);
  }
}

export async function UpdateListingStatus(id: string, status: string) {
  console.log(id);
  const updaetdListing = await Listings.updateOne(
    { _id: id },
    { $set: { status: status } }
  );

  revalidateAll();
  console.log(updaetdListing);
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
