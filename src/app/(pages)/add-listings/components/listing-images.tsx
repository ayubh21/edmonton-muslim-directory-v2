"use client";

import { useCallback, useEffect, useState } from "react";
import { produce } from "immer";
import { useFormContext } from "react-hook-form";
import { S3_OBJECT_URI } from "@/lib/constants";
import FileUploader from "./file-uploader";
import { useListingFormContext } from "./listing-form-context";

export interface CustomFile extends File {
	preview?: string;
	url: string;
}

export interface ImageMetaData {
	logo: CustomFile | null;
	coverImage: CustomFile | null;
	galleryImages: CustomFile[];
}
interface ImageUrls {
	logo: string;
	coverImage: string;
	galleryImages: string[];
}

export default function ListingImages() {
	const { setValue, register, formState: { errors }, clearErrors, watch, trigger } = useListingFormContext();
	const [imageType, setImageType] = useState<keyof ImageMetaData>();
	// const formData = watch();
	const [imageUrls, setImageUrls] = useState<ImageUrls>({

		logo: "",
		coverImage: "",
		galleryImages: [],
	});
	const [images, setImages] = useState<ImageMetaData>({
		logo: null,
		coverImage: null,
		galleryImages: [],
	});

	const [isUploading, setIsUploading] = useState({
		logo: false,
		coverImage: false,
		galleryImages: false,
	});

	const handleCreateS3Url = useCallback((file: CustomFile | null) => {
		if (!file) return "";
		return `${S3_OBJECT_URI}/${file.name}`;
	}, []);


	// useEffect(() => {
	// 	console.log(formData)
	// }, [formData])

	const handleCreateDBUrl = useCallback(
		(imageType: keyof ImageMetaData | undefined) => {
			if (!imageType) return;
			setImageUrls(
				produce((draft) => {
					switch (imageType) {
						case "logo":
							draft.logo = handleCreateS3Url(images.logo);
							break;

						case "coverImage":
							draft.coverImage = handleCreateS3Url(images.coverImage);
							break;

						case "galleryImages":
							draft.galleryImages = [];
							images.galleryImages.forEach((galleryImage) => {
								const url = handleCreateS3Url(galleryImage);
								if (url) draft.galleryImages.push(url);
							});
							break;
					}
				})
			);
		},
		[images, handleCreateS3Url]
	);

	const handleImageUpload = useCallback(
		(files: File[], imageType: keyof ImageMetaData) => {
			if (files.length > 0) {
				setIsUploading(
					produce((draft) => {
						draft[imageType] = true;
					})
				);

				try {
					setImages(
						produce((draft) => {
							if (imageType === "galleryImages") {
								setImageType(imageType);
								files.forEach((file) => {
									const customFile = file as CustomFile;
									Object.assign(customFile, {
										preview: URL.createObjectURL(file),
									});
									customFile.url = handleCreateS3Url(customFile);
									draft.galleryImages.push(customFile);
									handleCreateDBUrl(imageType);
								});
							} else {
								setImageType(imageType);
								const file = files[0];
								const customFile = file as CustomFile;
								Object.assign(customFile, {
									preview: URL.createObjectURL(file),
								});
								draft[imageType] = customFile;
								handleCreateDBUrl(imageType);
							}
						})
					);
				} finally {
					setIsUploading(
						produce((draft) => {
							draft[imageType] = false;
						})
					);
				}
			}
		},
		[handleCreateDBUrl, handleCreateS3Url]
	);

	const handleRemoveImage = useCallback(
		(imageType: keyof ImageMetaData, index?: number) => {
			setImages(
				produce((draft) => {
					if (imageType === "galleryImages") {
						draft.galleryImages.splice(index as number, 1);
					} else {
						draft[imageType] = null;
					}
				})
			);
		},
		[]
	);

	useEffect(() => {
		setValue("images", imageUrls);
		if (imageUrls.logo !== "") {
			clearErrors("images.logo")
		}
		if (imageUrls.coverImage !== "") {
			clearErrors("images.coverImage")
		}
		if (imageUrls.coverImage.length > 0) {
			clearErrors("images.galleryImages")
		}

	}, [setValue, imageUrls, clearErrors]);

	useEffect(() => {
		setValue("imageMetaData", images);
	}, [setValue, images]);

	useEffect(() => {
		handleCreateDBUrl(imageType!);
	}, [imageType, handleCreateDBUrl]);





	return (
		<div className=" space-y-4">
			<div
				className={`flex flex-col font-semibold gap-2 relative`}>
				<label className="pl-4" htmlFor="logo">
					Logo
				</label>
				<FileUploader
					imageType="logo"
					maxFiles={1}
					title="logo"
					files={images.logo ? [images.logo] : []}
					onUpload={(files) => handleImageUpload(files, "logo")}
					onRemove={() => handleRemoveImage("logo")}
					isUploading={isUploading.logo}
					formError={errors.images?.logo}
				/>
				{errors.images?.logo && (
					<p className="text-red-500 font-semibold pl-4">
						{errors.images?.logo.message}
					</p>
				)}
			</div>

			<div className="flex flex-col font-semibold gap-2">
				<label className="pl-4" htmlFor="cover">
					Cover Image
				</label>
				<FileUploader
					imageType="coverImage"
					maxFiles={1}
					title="cover image"
					files={images.coverImage ? [images.coverImage] : []}
					onUpload={(files) => handleImageUpload(files, "coverImage")}
					onRemove={() => handleRemoveImage("coverImage")}
					isUploading={isUploading.coverImage}
					formError={errors.images?.coverImage}
				/>
				{errors.images?.coverImage && (
					<p className="text-red-500 font-semibold pl-4">
						{errors.images?.coverImage.message}
					</p>
				)}
			</div>

			<div className="flex flex-col font-semibold gap-2">
				<div className="flex justify-between w-full">
					<label className="pl-4" htmlFor="gallery">
						Gallery
					</label>
				</div>
				<FileUploader
					imageType="galleryImages"
					maxFiles={10}
					title="gallery"
					files={images.galleryImages}
					onUpload={(files) => handleImageUpload(files, "galleryImages")}
					onRemove={(index) => handleRemoveImage("galleryImages", index)}
					isUploading={isUploading.galleryImages}
					formError={errors.images?.galleryImages}
				/>
				{errors.images?.galleryImages && (
					<p className="text-red-500 font-semibold pl-4">
						{errors.images?.galleryImages.message}
					</p>
				)}
			</div>
		</div>
	);
}
