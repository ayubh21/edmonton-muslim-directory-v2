"use client";

import { Listing } from "@/types/listing";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";

import { useRouter } from "next/navigation";

export const columns: ColumnDef<Listing>[] = [
  {
    accessorKey: "id",
    header: "ListingId",
  },
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
    accessorKey: "email",
    header: "Email",
  },

  {
    accessorKey: "phone_number",
    header: "Phone Number",
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id;
      return <ActionsCell id={id!} />;
    },
  },
];

const ActionsCell = ({ id }: { id: number }) => {
  const router = useRouter();

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
};
