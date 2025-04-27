"use server";

import { ListingModel } from "@/lib/db/models";
import mongoConnection from "@/lib/mongo";

export async function CreateListing(formData: FormData) {
  const dbConn = await mongoConnection();
  console.log(dbConn);
  // server side validation

  try {
    // Extract basic fields
    const title = (formData.get("title") as string) || "";
    const tagLine = (formData.get("tagLine") as string) || "";
    const description = (formData.get("description") as string) || "";

    const imagesData = (formData.get("images") as string) || "{}";
    const images = JSON.parse(JSON.stringify(imagesData));

    const email = (formData.get("email") as string) || "";
    const phoneNumber = (formData.get("phoneNumber") as string) || "";
    const websiteUrl = (formData.get("websiteUrl") as string) || "";

    const workHoursData = (formData.get("workDays") as string) || "{}";
    const workDays = JSON.parse(JSON.stringify(workHoursData));
    const addressesData = (formData.get("addresses") as string) || "[]";
    const addresses = addressesData.toString();

    const networksData = (formData.get("networks") as string) || "[]";
    const networks = JSON.parse(JSON.stringify(networksData));

    const categoriesData = (formData.get("categories") as string) || "[]";
    const categories = categoriesData.toString();

    const tagsData = (formData.get("categories") as string) || "[]";
    const tags = tagsData.toString();

    // Create the listing document
    const listing = new ListingModel({
      title,
      tagLine,
      description,
      images: {
        galleryImages: images.galleryImages,
        logo: images.logo,
        coverImage: images.coverImage,
      },
      contact: {
        email,
        phoneNumber,
        websiteUrl,
      },
      addresses,
      networks: {
        type: networks.type,
        url: networks.url,
      },
      workHours: {
        monday: workDays.monday,
        tuesday: workDays.tuesday,
        wednesday: workDays.wednesday,
        thursday: workDays.thursday,
        friday: workDays.friday,
        saturday: workDays.saturday,
        sunday: workDays.sunday,
      },
      categories: categories,
      tags: tags,
    });
    console.log(formData);
    await listing.save();
  } catch (error) {
    console.error("Error creating listing:", error);
  }
}
