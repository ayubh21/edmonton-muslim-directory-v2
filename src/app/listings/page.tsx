"use client";

import React from "react";
import ListingGeneral from "./components/ListingGeneral";
import { FormProvider, useForm } from "react-hook-form";
import Link from "next/link";
import {
  ChevronLeft,
  Contact2Icon,
  Image,
  Pencil,
  Share,
  Workflow,
} from "lucide-react";
import FormSection from "./components/ListingSection";
import ListingImages from "./components/ListingImages";
import ListingContact from "./components/ListingContact";
import ListingSocials from "./components/ListingSocials";
import ListingWorkHours from "./components/ListingWorkHours";

type ListingForm = {
  title: string;
};

export default function page() {
  const methods = useForm<ListingForm>();
  return (
    <FormProvider {...methods}>
      <div className="px-6">
        <div className="container pt-8 ">
          <div className="flex items-center mb-6">
            <Link
              href="/"
              className="text-emerald-600 hover:text-emerald-700 mr-4"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-semibold">Add Your Listing</h1>
          </div>
        </div>
        <form action="">
          <FormSection
            icon={<Pencil size={18} />}
            title="General"
            description="Basic information about your business"
          >
            <ListingGeneral />
          </FormSection>
          <FormSection
            icon={<Image size={18} />}
            title="Images"
            description="upload images of your business"
          >
            <ListingImages />
          </FormSection>
          <FormSection
            icon={<Contact2Icon />}
            title="Contact"
            description="How customers can reach you "
          >
            <ListingContact />
          </FormSection>
          <FormSection
            title="Social Networks"
            description="connect your social media accounts"
            icon={<Share />}
          >
            <ListingSocials />
          </FormSection>
          <FormSection
            title="Work Hours"
            description="When your business is open"
            icon={<Workflow />}
          >
            <ListingWorkHours />
          </FormSection>
        </form>
      </div>
    </FormProvider>
  );
}
