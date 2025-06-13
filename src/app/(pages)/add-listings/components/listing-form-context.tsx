"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFormContext } from "react-hook-form"
import { z } from "zod"
import { CustomFile } from "./listing-images"
import { ListingWorkDays, Social } from "@/types/listing"


const ListingImageMetaDataSchema = z.object({
	logo: z.custom<CustomFile | null>(),
	coverImage: z.custom<CustomFile | null>(),
	galleryImages: z.custom<CustomFile[]>(),
})

const ListingImagesSchema = z.object({
	logo: z.string().min(1, "Please upload a logo"),
	coverImage: z.string().min(1, "Please upload a cover image"),
	galleryImages: z.array(
		z.string()
	).min(1, "please upload at least one gallery image")
})

const ListingContactSchema = z.object({
	email: z.string().email().min(1, "please provide a valid email address"),
	websiteUrl: z.string().url().optional().or(z.literal('')),
	phoneNumber: z.string().min(1, "please provide a valid phone number")
})

const ListingLocationSchema = z.array(
	z.string().min(1)
).refine((arr) => arr.length > 0, "location is required")

const ListingCategoriesSchema = z.array(
	z.string().min(1)
).refine((arr) => arr.length > 0, "category is required")

const ListingTagsSchema = z.array(
	z.string().min(1)
)
const ListingSchema = z.object({
	title: z.string().min(1, "title is definitely required"),
	tagLine: z.string().min(1, "tagLine is required"),
	description: z.string().min(1, "description is required"),
	images: ListingImagesSchema,
	imageMetaData: ListingImageMetaDataSchema,
	contact: ListingContactSchema,
	// addresses: ListingLocationSchema,
	categories: ListingCategoriesSchema,
	tags: ListingTagsSchema,
	workHours: z.custom<ListingWorkDays>(),
	networks: z.custom<Social[]>(),
	slug: z.string().optional()
})


export type ListingForm = z.infer<typeof ListingSchema>

export const useFormListing = () => {
	return useForm<ListingForm>({
		resolver: zodResolver(ListingSchema)
	})
}


export const useListingFormContext = () => useFormContext<ListingForm>()
