import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import { ListingForm, useListingFormContext } from "./listing-form-context";
import { GetListings } from "@/app/actions/listing";

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
	const { register, formState: { errors } } = useListingFormContext();

	return (
		<div className="">
			<div className="w-full flex flex-col px-5 pt-5">
				<label className="font-semibold text-sm" htmlFor="">
					Title
				</label>
				<input
					type="text"
					placeholder="Enter business name"
					className={`placeholder:text-sm py-3.5 focus:outline-none border-b  mb-2 ${errors.title ? "border-b-red-500 " : "focus:border-b-emerald-600"}`}
					{...register("title")}
				/>

				{errors.title && (
					<p className="text-red-500 font-semibold">
						{errors.title.message}
					</p>
				)}
			</div>
			<div className="w-full flex flex-col px-5 pt-5">
				<label className="font-semibold text-sm" htmlFor="">
					TagLine
				</label>
				<input
					type="text"
					placeholder="A brief slogan or motto for your business"
					className={`placeholder:text-sm py-3.5 focus:outline-none border-b  mb-2 ${errors.title ? "border-b-red-500 " : "focus:border-b-emerald-600"}`}
					{...register("tagLine")}
				/>
				{errors.tagLine && (
					<p className="text-red-500 font-semibold">
						{errors.tagLine.message}
					</p>
				)}
			</div>
			<div className="w-full flex flex-col px-5 pt-5">
				<label className="font-semibold pb-3 text-sm" htmlFor="">
					Description
				</label>
				<Textarea
					className={`mb-2 ${errors.description ? "border-red-500" : null}`}
					{...register("description")} maxLength={500} />
				{errors.description && (
					<p className="text-red-500 font-semibold">
						{errors.description.message}
					</p>
				)}
			</div>
		</div>
	);
}
