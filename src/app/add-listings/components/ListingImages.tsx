import { useCallback, useEffect, useState } from "react";
import { produce } from "immer";
import FileUploader from "./FileUploader.tsx";
import { useFormContext } from "react-hook-form";

export interface CustomFile extends File {
  preview?: string;
}

export interface ImageMetaData {
  logo: CustomFile | null;
  coverImage: CustomFile | null;
  galleryImages: CustomFile[];
}

export default function ListingImages() {
  const { setValue, register } = useFormContext();
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
                files.forEach((file) => {
                  const customFile = file as CustomFile;
                  Object.assign(customFile, {
                    preview: URL.createObjectURL(file),
                  });
                  draft.galleryImages.push(customFile);
                });
              } else {
                const file = files[0];
                const customFile = file as CustomFile;
                Object.assign(customFile, {
                  preview: URL.createObjectURL(file),
                });
                draft[imageType] = customFile;
                imageType == "logo"
                  ? (draft[imageType] = customFile)
                  : (draft[imageType] = customFile);
                if (imageType == "logo") {
                } else {
                }
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
    setValue("images", images);
  }, [setValue, images]);

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
    </div>
  );
}
