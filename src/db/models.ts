import { Listing } from "@/types/listing";
import { Schema } from "mongoose";

import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    email: { type: String },
    phoneNumber: { type: String },
    websiteUrl: { type: String },
  },
  { _id: false }
);

const SocialSchema = new mongoose.Schema(
  {
    type: { type: String },
    url: { type: String },
  },
  { _id: false }
);

const WorkDayEntrySchema = new mongoose.Schema(
  {
    FROM: { type: String },
    TO: { type: String },
  },
  { _id: false }
);

const WorkHoursSchema = new mongoose.Schema(
  {
    monday: WorkDayEntrySchema,
    tuesday: WorkDayEntrySchema,
    wednesday: WorkDayEntrySchema,
    thursday: WorkDayEntrySchema,
    friday: WorkDayEntrySchema,
    saturday: WorkDayEntrySchema,
    sunday: WorkDayEntrySchema,
  },
  { _id: false }
);

const ListingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tagLine: { type: String },
  Description: { type: String },
  logo: { type: String },
  coverImage: { type: String },
  galleryImages: [{ type: String }],
  contact: ContactSchema,
  networks: SocialSchema,
  address: [{ type: String }],
  categories: [{ type: String }],
  tags: [{ type: String }],
  workHours: WorkHoursSchema,
});

export const ListingModel = mongoose.model("Listing", ListingSchema);
