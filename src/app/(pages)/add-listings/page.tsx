"use client";

import ListingGeneral from "./components/listing-general";
import { FormProvider } from "react-hook-form";
import Link from "next/link";
import {
	ChevronLeft,
	Contact2Icon,
	Image as ImageIcon,
	Map,
	Pencil,
	Share,
	Workflow,
} from "lucide-react";
import FormSection from "./components/listing-section";
import ListingImages, { ImageMetaData } from "./components/listing-images";
import ListingContact from "./components/listing-contact";
import ListingSocials from "./components/listing-socials";
import ListingWorkHours from "./components/listing-work-hours";
import ListingLocation from "./components/listing-location";
import { APIProvider } from "@vis.gl/react-google-maps";
import { MdCategory } from "react-icons/md";
import ListingDetails from "./components/listing-details";
import { Button } from "@/components/ui/button";
import { AddListing, SendListingEmailConfirmation, UploadToS3 } from "@/app/actions/listing";
import { ListingForm, useFormListing } from "./components/listing-form-context";
import { useState } from "react";
import LoadingComponent from "@/components/loading-indicator";
import SendListingConfirmation from "@/app/emails/listing-confirmation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";


export default function Page() {
	const methods = useFormListing()

	const [isLoading, setIsLoading] = useState(false);
	const Upload = async (images: ImageMetaData) => {
		try {
			if (images.logo) {
				const logoResult = await UploadToS3(images.logo);
				if (!logoResult?.$metadata) {
					console.log(logoResult?.$metadata);
					throw new Error("Failed to upload logo to S3");
				}
			}

			if (images.coverImage) {
				const coverResult = await UploadToS3(images.coverImage);
				console.log(coverResult);
				if (!coverResult?.$metadata) {
					throw new Error("Failed to upload cover image to S3");
				}
			}
			if (images.galleryImages) {
				const galleryImagesPromises = images.galleryImages.map(
					async (galleryImage) => {
						return new Promise(async (resolve) => {
							const galleryResult = await UploadToS3(galleryImage);
							if (!galleryResult?.$metadata) {
								throw new Error("Failed to upload gallery image to S3");
							}
							resolve(galleryResult);
						});
					}
				);
				const galleryImages = await Promise.allSettled(galleryImagesPromises);
				console.log(galleryImages);
			}

			return { success: true };
		} catch (error) {
			console.error("Error uploading images:", error);
			throw error;
		}
	};

	const onSubmit = async (listingData: ListingForm) => {
		await AddListing(listingData);
		const result = await Upload(listingData.imageMetaData);
		if (!result) {
			console.log(result)
		}
		const { data, error } = await authClient.getSession()
		if (error) {
			return
		}
		toast("listing successfully submitted")
		await SendListingEmailConfirmation(listingData.contact.email, data.user.name)
	};


	return (
		<FormProvider {...methods}>
			<div className="bg-[#f4f4f4]">
				<div className=" max-w-3xl mx-auto  px-4">
					{!isLoading &&
						<LoadingComponent isLoading={isLoading} setIsLoading={setIsLoading} />
					}
					<div className=" pt-8 ">
						<div className="flex items-center mb-6 ">
							<Link
								href="/"
								className="text-emerald-600 hover:text-emerald-700 mr-4"
							>
								<ChevronLeft className="h-5 w-5" />
							</Link>
							<h1 className="text-2xl font-semibold">Add Your Listing</h1>
						</div>
					</div>
					<form className=" flex flex-col gap-4 " onSubmit={methods.handleSubmit(onSubmit)}>
						<FormSection
							icon={<Pencil size={18} />}
							title="General"
							description="Basic information about your business"
						>
							<ListingGeneral
								title="title"
								description="description"
								tagLine="tagLine"
							/>
						</FormSection>

						<FormSection
							icon={<ImageIcon size={18} />}
							title="Images"
							description="upload images of your business"
						>
							<ListingImages />
						</FormSection>
						<FormSection
							icon={<Contact2Icon size={18} />}
							title="Contact"
							description="How customers can reach you "
						>
							<ListingContact />
						</FormSection>
						<div className="">
							<FormSection
								title="Social Networks"
								description="connect your social media accounts"
								optional="(optional)"
								icon={<Share size={18} />}
							>
								<ListingSocials />
							</FormSection>
						</div>
						<FormSection
							title="Work Hours"
							description="When your business is open"
							icon={<Workflow size={18} />}
							optional="(optional)"
						>
							<ListingWorkHours />
						</FormSection>
						<FormSection
							title="Location"
							description="Where your business is"
							icon={<Map size={18} />}
						>
							<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API!}>
								<ListingLocation />
							</APIProvider>
						</FormSection>
						<FormSection
							title="Details"
							description="Details about your business"
							icon={<MdCategory size={18} />}
							optional="(optional)"
						>
							<ListingDetails />
						</FormSection>
						<Button
							className="bg-emerald-600 text-white w-full mb-4 text-center hover:bg-emerald-700 py-6"
							type="submit"
						>
							Submit Listing
						</Button>
					</form>
				</div>
			</div>
		</FormProvider>
	);
}
