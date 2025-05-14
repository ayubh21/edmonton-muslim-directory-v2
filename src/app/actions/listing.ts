"use server";

import { v4 as uuidv4 } from "uuid";
import { client } from "@/lib/s3/client";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { CustomFile } from "../add-listings/components/listing-images";
import { db } from "@/lib/db/db";
import {
  Listing,
  ListingAddress,
  ListingCategory,
  ListingNetwork,
  ListingTag,
} from "@/lib/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ListingForm } from "../add-listings/page";
import { eq } from "drizzle-orm";
import { revalidateAll } from "./revalidate";
import { geocode } from "@/lib/geocode";

export async function AddListing(business: ListingForm) {
  type NewListing = typeof Listing.$inferInsert;
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
      throw "session not found";
    }

    // TODO remove wrapper and insert into db directly
    const insertListing = async (listing: NewListing) => {
      return db.insert(Listing).values(listing).returning({
        insertedId: Listing.id,
      });
    };

    console.log(business.images.galleryImages, "galleryImages");
    const newListing: NewListing = {
      title: business.title,
      tag_line: business.tagLine,
      description: business.description,
      images: {
        logo: business.images.logo,
        coverImage: business.images.coverImage,
        galleryImages: business.images.galleryImages,
      },
      email: business.contact.email,
      phone_number: business.contact.phone_number,
      website_url: business.contact.website_url,
      userId: session.user.id,
      work_hours: business.workHours,
      // TODO remove checkbox type from being inserted in db
      status: "pending",
    };

    const listing = await insertListing(newListing);
    // TODO do this later
    for (let i = 0; i < business.addresses.length; i++) {
      const coordinates = await geocode.getCoordinates(business.addresses[i]);
      const res = await db.insert(ListingAddress).values({
        listingId: listing[0].insertedId,
        address: business.addresses[i],
        lat: coordinates.lat,
        lng: coordinates.lng,
      });

      if (!res) {
        console.log("failed to insert address");
      }
    }

    for (let i = 0; i < business.categories.length; i++) {
      const res = await db.insert(ListingCategory).values({
        listingId: listing[0].insertedId,
        category: business.categories[i],
      });

      if (!res) {
        console.log("failed to insert category");
      }
    }

    for (let i = 0; i < business.networks.length; i++) {
      const res = await db.insert(ListingNetwork).values({
        listingId: listing[0].insertedId,
        type: business.networks[i].type,
        url: business.networks[i].url,
      });

      if (!res) {
        console.log("failed to insert tag");
      }
    }

    for (let i = 0; i < business.tags.length; i++) {
      const res = await db.insert(ListingTag).values({
        listingId: listing[0].insertedId,
        tag: business.tags[i],
      });

      if (!res) {
        console.log("failed to insert tag");
      }
    }
  } catch (error) {
    console.error("Error creating listing:", error);
  }
}

export async function UpdateListingStatus(
  listingId: number,
  status: "approved" | "rejected"
) {
  await db
    .update(Listing)
    .set({
      status: status,
      updatedAt: new Date(),
    })
    .where(eq(Listing.id, listingId));
  revalidateAll();
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

export async function GetListings() {
  const listing = await db.query.Listing.findMany({
    with: {
      categories: true,
      networks: true,
      addresses: true,
      tags: true,
    },
  });
  if (!listing) {
    console.log("failed to get all listings");
  }
  return listing;
}

export async function GetApprovedListings() {
  const listing = await db.query.Listing.findMany({
    with: {
      categories: true,
      networks: true,
      addresses: true,
      tags: true,
    },
    where: eq(Listing.status, "approved"),
  });
  if (!listing) {
    console.log("failed to get all listings");
  }
  return listing;
}

export async function GetListingById(listingId: number) {
  const listing = await db.query.Listing.findFirst({
    with: {
      networks: true,
      addresses: true,
      tags: true,
      categories: true,
    },
    where: eq(Listing.id, listingId),
  });
  return listing;
}
