"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { revalidateAll } from "@/app/actions/revalidate";

type UserDropdownProps = {
  name: string;
  image: string;
};

export default function UserDropdown({ name, image }: UserDropdownProps) {
  const router = useRouter();

  async function handleLogout() {
    await authClient.signOut();
    revalidateAll();
    router.push("/");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="hidden md:flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
            <img src={image} alt="user" width={32} height={32} />
          </div>
          <span className="text-sm font-medium">{name}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>View Listings</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLogout()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
