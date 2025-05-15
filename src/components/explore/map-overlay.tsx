import { Listing } from "@/types/listing";
import { phoneNumber } from "better-auth/plugins/phone-number";
import { Phone } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useState } from "react";

interface MapOverlayProps {
  coverImage?: string;
  id: number;
  title?: string;
  address: string;
  verified?: boolean;
  phone_number?: string;
  isOverlayOpen: boolean;
  setIsOverlayOpen: Dispatch<SetStateAction<boolean>>;
}

export default function MapOverlay({
  coverImage = "/business-cover.jpg",
  id,
  title,
  address,
  verified,
  phone_number,
  isOverlayOpen,
  setIsOverlayOpen,
}: MapOverlayProps) {
  const router = useRouter();
  return (
    <div className="absolute z-50 left-0 bottom-12 transform transition-all duration-300">
      {isOverlayOpen && (
        <div
          onClick={() => router.push(`listing/${id}`)}
          className="w-80 h-56 rounded-lg overflow-hidden cursor-pointer relative shadow-lg transition-opacity duration-300 opacity-90 hover:opacity-100"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 z-20"></div>

          {/* Cover image */}
          <div className="absolute inset-0">
            <Image
              src={coverImage}
              alt="business-cover"
              fill
              className="object-cover"
            />
          </div>

          <div className="absolute inset-0 flex flex-col justify-between p-4 z-20">
            <div className="mt-6"></div>

            <div>
              <div className="flex items-center gap-2 mt-2">
                <h4 className="text-white font-medium text-lg">{title}</h4>
                {verified && (
                  <div className="bg-blue-500 rounded-full p-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>

              <div className="flex flex-col  mt-2 gap-2">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>

                  <span className="text-white  text-sm">{address}</span>
                </div>
                <div className="flex gap-2">
                  <Phone className="text-white" size={16} />
                  <span className="text-white text-sm">{phone_number}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
