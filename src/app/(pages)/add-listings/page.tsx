"use client";

import ListingGeneral from "./components/listing-general";
import { FormProvider } from "react-hook-form";
import Link from "next/link";
import {
	ArrowRight,
	CheckCircle,
	ChevronLeft,
	Contact2Icon,
	Image as ImageIcon,
	Loader2,
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
import { APIProvider } from "@vis.gl/react-google-maps";
import { MdCategory } from "react-icons/md";
import ListingDetails from "./components/listing-details";
import { Button } from "@/components/ui/button";
import { AddListing, SendListingEmailConfirmation, UploadToS3 } from "@/app/actions/listing";
import { ListingForm, useFormListing } from "./components/listing-form-context";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";
import ListingLocation from "./components/listing-location";


export default function Page() {
	const methods = useFormListing();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const isAuthenticated = async () => {
			const { data } = await authClient.getSession()
			if (!data) {
				redirect('/auth/login')
			}
		}
		isAuthenticated()
	}, [])

	useEffect(() => {
		console.log(isLoading)
	}, [isLoading])
	const [isSubmitted, setIsSubmitted] = useState(false);
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
			setIsSubmitted(true);
			return { success: true };
		} catch (error) {
			console.error("Error uploading images:", error);
			throw error;
		}
	};

	const onSubmit = async (listingData: ListingForm) => {
		setIsLoading(true)
		await AddListing(listingData);
		const result = await Upload(listingData.imageMetaData);
		if (!result) {
			console.log(result)
		}
		const { data, error } = await authClient.getSession()
		if (error) {
			setIsSubmitted(false);
			redirect('/')
		}
		await SendListingEmailConfirmation(listingData.contact.email, data.user.name)
		setIsSubmitted(true)
		setIsLoading(false);
		setTimeout(() => {
			redirect('/')
		}, 5000)
	};

	if (isSubmitted) {
		return (
			<div className="h-screen flex justify-center items-center bg-gray-50">
				<Card className="w-[450px] shadow-lg">
					<CardHeader className="text-center">
						<div className="mx-auto mb-4 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
							<CheckCircle className="h-6 w-6 text-green-600" />
						</div>
						<CardTitle className="text-2xl">Listing Successful!</CardTitle>
						<CardDescription>
							Thank you for submitting a listing with ymc. Your listing has been created successfully and is under review, if approved an email confirmation will be sent out.
						</CardDescription>
					</CardHeader>
				</Card>
			</div >
		);
	}

	return (
		<FormProvider {...methods}>
			<div className="bg-[#f4f4f4]">
				<div className=" max-w-3xl mx-auto px-4 ">
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
							isWorkHours={true}
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
						>
							<ListingDetails />
						</FormSection>
						<Button
							disabled={isLoading}
							type="submit"
							className="w-full hover:bg-emerald-700 py-6 bg-gradient-to-r from-emerald-600 to-emerald-700">
							{isLoading ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								</>
							) : (
								"Submit Listing"
							)}
						</Button>
					</form>
				</div>
			</div>
		</FormProvider >
	);
}
