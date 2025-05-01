"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { Separator } from "@radix-ui/react-separator";
import { ChevronDown, Search } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col ">
      <section className="relative bg-gradient-to-r from-emerald-50 to-teal-50 py-16 md:py-24 overflow-hidden">
        <div className="container relative z-10 px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Discover Edmonton's{" "}
              <span className="text-emerald-600">Muslim-Owned</span> Businesses
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Supporting our local community through business connections across
              Edmonton, Alberta
            </p>

            <div className="bg-white p-4 rounded-xl shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search for businesses..."
                    className="pl-10 h-12 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
                <Separator
                  orientation="vertical"
                  className="hidden md:block h-8"
                />
                <div className="relative">
                  <div className="flex h-12 w-full md:w-[180px] items-center justify-between rounded-md border-0 bg-white px-3 py-2 text-sm">
                    <span className="text-gray-500">All Categories</span>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </div>
                </div>
                <Separator
                  orientation="vertical"
                  className="hidden md:block h-8"
                />
                <div className="relative">
                  <div className="flex h-12 w-full md:w-[180px] items-center justify-between rounded-md border-0 bg-white px-3 py-2 text-sm">
                    <span className="text-gray-500">All Areas</span>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </div>
                </div>
                <Button className="h-12 bg-emerald-600 hover:bg-emerald-700">
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute right-0 top-0 h-full w-1/3 hidden lg:block">
          <div className="relative h-full w-full">
            <img
              src="https://picsum.photos/600/500"
              alt="Edmonton skyline"
              className="object-cover rotate-12"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
