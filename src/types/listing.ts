import { Listing } from "@/lib/db/schema";
import { ReactNode } from "react";

// export interface Listing {
//   id: number;
//   title: string | null;
//   status: "approved" | "rejected" | "pending";
//   tag_line: string | null;
//   description: string;
//   contact: Contact;
//   images: Images;
//   work_hours: ListingWorkDays;
//   userId: string;
//   createdAt: Date;
//   updatedAt: Date | null;
//   isVerified: boolean;
//   isFeatured: boolean;
// }

export type Listing = typeof Listing.$inferInsert;
export interface Contact {
  email: string | null;
  phone_number: string | null;
  website_url: string | null;
}

// enum Status {
//   Approved = "approved",
//   Rejected = "rejected",
//   Pending = "pending",
// }
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

export interface ListingAddress {
  address: string;
  listingId: number;
  listingAddressId: number;
}
