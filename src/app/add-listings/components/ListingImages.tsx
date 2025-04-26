import { Plus } from "lucide-react";
import FileUploader from "./FileUploader.tsx";

export default function ListingImages() {
  return (
    <div className="pl-4 space-y-4">
      <div className="flex flex-col font-semibold gap-2">
        <label className="pl-4" htmlFor="logo">
          Logo
        </label>
        <FileUploader maxFiles={1} title="logo" />
      </div>
      <div className="flex flex-col font-semibold gap-2">
        <label className="pl-4" htmlFor="cover">
          Cover Image
        </label>
        <FileUploader maxFiles={1} title="cover image" />
      </div>
      <div className="flex flex-col font-semibold gap-2">
        <div className="flex justify-between w-full">
          <label className="pl-4" htmlFor="gallery">
            Gallery <span className="text-gray-500">(optional)</span>
          </label>
        </div>
        <FileUploader maxFiles={10} title="gallery" />
      </div>
    </div>
  );
}
