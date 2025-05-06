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
};

export default function UserDropdown({ name }: UserDropdownProps) {
  const router = useRouter();

  async function handleLogout() {
    await authClient.signOut();
    revalidateAll();
    router.push("/");
  }

  function getFirstLetterOfName(name: string) {
    const firstLetter = name.charAt(0);
    return firstLetter;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="hidden md:flex items-center gap-2">
          <div className="h-8 w-8 rounded-full  overflow-hidden pt-0.5 bg-gray-200">
            <span className="text-white">{getFirstLetterOfName(name)}</span>
          </div>
          <span className="text-sm font-medium">{name}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>View Listings</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLogout()}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
