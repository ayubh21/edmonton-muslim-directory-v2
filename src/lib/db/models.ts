import mongoose from "mongoose";

const ImagesSchema = new mongoose.Schema({
  logo: { type: String },
  coverImage: { type: String },
  galleryImages: [{ type: String }],
});

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

const WorkDaySchema = new mongoose.Schema(
  {
    hours: [WorkDayEntrySchema],
  },
  { _id: false }
);

const WorkHoursSchema = new mongoose.Schema(
  {
    Mon: WorkDaySchema,
    Tue: WorkDaySchema,
    Wed: WorkDaySchema,
    Thu: WorkDaySchema,
    Fri: WorkDaySchema,
    Sat: WorkDaySchema,
    Sun: WorkDaySchema,
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
});

const ListingSchema = new mongoose.Schema({
  // listingId: { type: String, required: true },
  title: { type: String, required: true },
  tagLine: { type: String },
  description: { type: String },
  contact: ContactSchema,
  networks: [SocialSchema],
  addresses: [{ type: String }],
  images: ImagesSchema,
  categories: [{ type: String }],
  tags: [{ type: String }],
  isApproved: { type: Boolean, default: false },
  isFeatured: { type: Boolean },
  workHours: WorkHoursSchema,
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export default mongoose.models.Listings1 ||
  mongoose.model("Listings1", ListingSchema);
