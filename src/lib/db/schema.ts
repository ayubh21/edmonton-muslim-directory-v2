import { Images, ListingWorkDays } from "@/types/listing";
import { relations } from "drizzle-orm";
import { float } from "drizzle-orm/mysql-core";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  serial,
  jsonb,
  integer,
  pgEnum,
  decimal,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  is_admin: boolean("is_admin"),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});
export const listingStatusEnum = pgEnum("listing_status", [
  "approved",
  "rejected",
  "pending",
]);

export const Listing = pgTable("listing", {
  id: serial("id").primaryKey().notNull(),
  title: text("title").notNull(),
  status: listingStatusEnum("status").default("pending").notNull(),
  tag_line: text("tag_line"),
  description: text("description").notNull(),
  email: text("email"),
  phone_number: text("phone_number"),
  website_url: text("website_url"),
  images: jsonb().$type<Images>().notNull(),
  work_hours: jsonb().$type<ListingWorkDays>().notNull(),
  // isVerified: boolean("is_verified").notNull(),
  // isFeatured: boolean("is_featured").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
  userId: text("user_id")
    .references(() => user.id)
    .notNull(),
});

export const ListingNetwork = pgTable("listing_network", {
  id: serial("listing_network_id").primaryKey().notNull(),
  type: text("type").notNull(),
  url: text("url").notNull(),
  listingId: integer("id")
    .references(() => Listing.id)
    .notNull(),
});

export const ListingCategory = pgTable("listing_category", {
  listingCategoryId: serial("listing_category_id").primaryKey().notNull(),
  category: text("category").notNull(),
  listingId: integer("id")
    .references(() => Listing.id)
    .notNull(),
});

export const ListingAddress = pgTable("listing_addresses", {
  listingAddressId: serial("listing_address_id").primaryKey().notNull(),
  lat: decimal("lat").notNull(),
  lng: decimal("lng").notNull(),
  address: text("address").notNull(),
  listingId: integer("listing_id")
    .references(() => Listing.id)
    .notNull(),
});

export const ListingTag = pgTable("listing_tag", {
  tagId: serial("tag_id").primaryKey().notNull(),
  tag: text("tag").notNull(),
  listingId: integer("id")
    .references(() => Listing.id)
    .notNull(),
});

export const listingRelations = relations(Listing, ({ many }) => ({
  networks: many(ListingNetwork),
  addresses: many(ListingAddress),
  categories: many(ListingCategory),
  tags: many(ListingTag),
}));

export const ListingNetworkRelation = relations(ListingNetwork, ({ one }) => ({
  listing: one(Listing, {
    fields: [ListingNetwork.listingId],
    references: [Listing.id],
  }),
}));

export const ListingAddressRelation = relations(ListingAddress, ({ one }) => ({
  listing: one(Listing, {
    fields: [ListingAddress.listingId],
    references: [Listing.id],
  }),
}));

export const ListingTagRelation = relations(ListingTag, ({ one }) => ({
  listing: one(Listing, {
    fields: [ListingTag.listingId],
    references: [Listing.id],
  }),
}));

export const ListingCategoryRelation = relations(
  ListingCategory,
  ({ one }) => ({
    listing: one(Listing, {
      fields: [ListingCategory.listingId],
      references: [Listing.id],
    }),
  })
);
