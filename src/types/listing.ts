import type {
  BuildQueryResult,
  DBQueryConfig,
  ExtractTablesWithRelations,
} from "drizzle-orm";
import * as schema from "@/lib/db/schema";

type Schema = typeof schema;
type TSchema = ExtractTablesWithRelations<Schema>;

export type IncludeRelation<TableName extends keyof TSchema> = DBQueryConfig<
  "one" | "many",
  boolean,
  TSchema,
  TSchema[TableName]
>["with"];

export type InferResultType<
  TableName extends keyof TSchema,
  With extends IncludeRelation<TableName> | undefined = undefined
> = BuildQueryResult<
  TSchema,
  TSchema[TableName],
  {
    with: With;
  }
>;

import { Listing, ListingCategory, ListingNetwork } from "@/lib/db/schema";
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

// export type Listing = typeof Listing.$inferInsert;
export type Listing = InferResultType<"Listing", { categories: true }>;
// export type Listing = {
//   [Listing._.name]: typeof Listing;
//   [ListingCategory._.name]: typeof ListingCategory.$inferSelect;
// };

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

export interface Latlng {
  lat: number;
  lng: number;
}
