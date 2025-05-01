"use client";

import { Listing } from "@/types/listing";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const columns: ColumnDef<Listing>[] = [
  {
    accessorKey: "title",
    header: "Submitted By",
  },

  {
    header: "Date",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const date = row.original.createdAt;
      const formattedDate = moment(date).startOf("seconds").fromNow();
      return formattedDate;
    },
  },
  {
    accessorKey: "categories",
    header: "Category",
  },

  {
    accessorKey: "contact.email",
    header: "Email",
  },

  {
    accessorKey: "contact.phoneNumber",
    header: "Phone Number",
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const router = useRouter();
      const id = row.original._id;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => router.push(`/admin/listings/review/${id}`)}
            >
              Review
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
