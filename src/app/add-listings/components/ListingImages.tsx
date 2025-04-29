"use client";

import { useCallback, useEffect, useState } from "react";
import { produce } from "immer";
import FileUploader from "./FileUploader.tsx";
import { useFormContext } from "react-hook-form";
import { UploadToS3 } from "@/app/actions/listing";
import { S3_OBJECT_URI } from "@/lib/constants";
import { Images } from "lucide-react";

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
  const { setValue, register } = useFormContext();
  const [imageType, setImageType] = useState<keyof ImageMetaData>();
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
    []
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
  }, [setValue, imageUrls]);

  useEffect(() => {
    handleCreateDBUrl(imageType!);
  }, [imageType]);

  const Upload = async (e) => {
    e.preventDefault();
    try {
      if (images.logo) {
        const logoResult = await UploadToS3(images.logo);
        if (!logoResult?.$metadata) {
          console.log(logoResult);
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

  return (
    <div className="pl-4 space-y-4">
      <input type="hidden" {...register("images")} />
      <div className="flex flex-col font-semibold gap-2">
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
        />
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
        />
      </div>

      <div className="flex flex-col font-semibold gap-2">
        <div className="flex justify-between w-full">
          <label className="pl-4" htmlFor="gallery">
            Gallery <span className="text-gray-500">(optional)</span>
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
        />
      </div>
      <button type="button" onClick={(e) => Upload(e)}>
        test
      </button>
    </div>
  );
}
