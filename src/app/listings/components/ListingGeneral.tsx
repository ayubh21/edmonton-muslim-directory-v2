import RichTextEditor from "@/components/rich-text-editor";
import { Pencil } from "lucide-react";
import { useFormContext } from "react-hook-form";

export default function ListingGeneral() {
  const { register } = useFormContext();
  return (
    <div className="">
      <div className="w-full flex flex-col px-5 pt-5">
        <label className="font-semibold text-sm" htmlFor="">
          Title
        </label>
        <input
          type="text"
          placeholder="Enter business name"
          className="placeholder:text-sm py-3.5 focus:outline-none border-b focus:border-b-emerald-600"
        />
      </div>
      <div className="w-full flex flex-col px-5 pt-5">
        <label className="font-semibold" htmlFor="">
          TagLine
        </label>
        <input
          type="text"
          placeholder="A brief slogan or motto for your business"
          className="placeholder:text-sm py-3.5 focus:outline-none border-b focus:border-b-emerald-600 text-sm"
        />
      </div>
      <div className="w-full flex flex-col px-5 pt-5">
        <label className="font-semibold pb-3" htmlFor="">
          Description
        </label>
        <RichTextEditor />
      </div>
    </div>
  );
}
