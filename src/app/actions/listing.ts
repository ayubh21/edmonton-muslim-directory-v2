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
  ListingTag,
} from "@/lib/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ListingForm } from "../add-listings/page";
import { eq } from "drizzle-orm";
import { revalidateAll } from "./revalidate";

export async function AddListing(business: ListingForm) {
  type NewListing = typeof Listing.$inferInsert;
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    // TODO remove wrapper and insert into db directly
    const insertListing = async (listing: NewListing) => {
      return db.insert(Listing).values(listing).returning({
        insertedId: Listing.id,
      });
    };

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
      phone_number: business.contact.phoneNumber,
      website_url: business.contact.websiteUrl,
      userId: session?.user.id!,
      work_hours: business.workHours,
      status: "pending",
    };

    const listing = await insertListing(newListing);

    for (let i = 0; i < business.addresses.length; i++) {
      const res = await db.insert(ListingAddress).values({
        listingId: listing[0].insertedId,
        address: business.addresses[i],
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

export async function GetAddressesByListingId(listingId: number) {
  const result = await db.query.ListingAddress.findMany({
    where: eq(ListingAddress.listingId, listingId),
    columns: {
      address: true,
    },
  });
  return result;
}

export async function GetCategoriesByListingId(listingId: number) {
  const result = await db.query.ListingCategory.findMany({
    where: eq(ListingCategory.listingId, listingId),
    columns: {
      category: true,
    },
  });
  return result;
}

export async function GetListings() {
  const listing = await db.select().from(Listing);
  if (!listing) {
    console.log("failed to get all listings");
  }
  return listing;
}

export async function GetListingById(listingId: number) {
  const listing = await db.query.Listing.findFirst({
    where: eq(Listing.id, listingId),
  });
  if (!listing) {
    console.log("failed to get listing");
    return;
  }
  return listing;
}
