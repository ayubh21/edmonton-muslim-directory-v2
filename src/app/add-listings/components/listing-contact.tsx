import { Contact, Listing } from "@/types/listing";
import React from "react";
import { useFormContext } from "react-hook-form";

export default function ListingContact() {
  const { register } = useFormContext<Listing>();
  return (
    <div className="">
      <div className="w-full flex flex-col  pt-5">
        <label className="font-semibold text-sm" htmlFor="">
          Email
        </label>
        <input
          type="email"
          placeholder="foo@bar.com"
          className="placeholder:text-sm py-3.5 focus:outline-none border-b focus:border-b-emerald-600"
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
          className="placeholder:text-sm py-3.5 focus:outline-none border-b focus:border-b-emerald-600 text-sm"
          {...register("contact.phoneNumber")}
        />
      </div>
      <div className="w-full flex flex-col pt-5">
        <label className="font-semibold text-sm" htmlFor="">
          Website
        </label>
        <input
          type="text"
          placeholder="www.example.com"
          className="placeholder:text-sm py-3.5 focus:outline-none border-b focus:border-b-emerald-600 text-sm"
          {...register("contact.websiteUrl")}
        />
      </div>
    </div>
  );
}
