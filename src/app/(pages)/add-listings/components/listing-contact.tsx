import { Listing } from "@/types/listing";
import React from "react";
import { useFormContext } from "react-hook-form";
import { useListingFormContext } from "./listing-form-context";

export default function ListingContact() {
	const { register, formState: { errors } } = useListingFormContext();
	return (
		<div className="">
			<div className="w-full flex flex-col  pt-5">
				<label className="font-semibold text-sm" htmlFor="">
					Email
				</label>
				<input
					type="email"
					placeholder="foo@bar.com"
					className={`placeholder:text-sm py-3.5 focus:outline-none border-b  mb-2 ${errors.contact?.email ? "border-b-red-500 " : "focus:border-b-emerald-600"}`}
					{...register("contact.email")}
				/>
			</div>
			<div className="w-full flex flex-col  pt-5">
				<label className="font-semibold text-sm" htmlFor="">
					Phone Number
				</label>
				<input
					type="text"
					placeholder="(780)-123-5678"
					className={`placeholder:text-sm py-3.5 focus:outline-none border-b  mb-2 ${errors.contact?.phoneNumber ? "border-b-red-500 " : "focus:border-b-emerald-600"}`}
					{...register("contact.phoneNumber")}
				/>
			</div>
			<div className="w-full flex flex-col pt-5">
				<label className="font-semibold text-sm" htmlFor="">
					Website <span className="text-gray-500">(optional)</span>
				</label>
				<input
					type="text"
					placeholder="www.example.com"
					className={`placeholder:text-sm py-3.5 focus:outline-none border-b  mb-2 ${errors.contact?.websiteUrl ? "border-b-red-500 " : "focus:border-b-emerald-600"}`}
					{...register("contact.websiteUrl")}
				/>
			</div>
		</div>
	);
}
