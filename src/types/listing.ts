import { ImageMetaData } from "@/app/add-listings/components/ListingImages";

export interface Listing {
  _id: string;
  title: string;
  tagLine: string;
  description: string;
  images: Images;
  imageMetaData: ImageMetaData;
  contact: Contact;
  networks: Social[];
  addresses: string[];
  categories: string[];
  tags: string[];
  workHours: ListingWorkDays;
  createdAt: Date;
  updatedAt: Date;
  status: Status;
}

export interface Contact {
  email: string;
  phoneNumber: string;
  websiteUrl: string;
}

enum Status {
  Approved = "approved",
  Rejected = "rejected",
  Pending = "pending",
}
export interface Social {
  type: string;
  url: string;
}

export interface WorkDayEntry {
  FROM: string;
  TO: string;
}

export interface Images {
  logo: string;
  coverImage: string;
  galleryImages: string[];
}

export interface WorkDay {
  hours: WorkDayEntry[];
  checkBoxType: string;
}

export interface ListingWorkDays {
  Mon: WorkDay;
  Tue: WorkDay;
  Wed: WorkDay;
  Thu: WorkDay;
  Fri: WorkDay;
  Sat: WorkDay;
  Sun: WorkDay;
}
