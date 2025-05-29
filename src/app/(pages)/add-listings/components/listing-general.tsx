import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";

type ListingGeneralProps = {
  title: string;
  tagLine: string;
  description: string;
};

export default function ListingGeneral({
  title,
  tagLine,
  description,
}: ListingGeneralProps) {
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
          {...register(title)}
        />
      </div>
      <div className="w-full flex flex-col px-5 pt-5">
        <label className="font-semibold text-sm" htmlFor="">
          TagLine
        </label>
        <input
          type="text"
          placeholder="A brief slogan or motto for your business"
          className="placeholder:text-sm py-3.5 focus:outline-none border-b focus:border-b-emerald-600 text-sm"
          {...register(tagLine)}
        />
      </div>
      <div className="w-full flex flex-col px-5 pt-5">
        <label className="font-semibold pb-3 text-sm" htmlFor="">
          Description
        </label>
        <Textarea {...register(description)} />
      </div>
    </div>
  );
}
