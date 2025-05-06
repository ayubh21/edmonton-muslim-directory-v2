import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import Link from "next/link";
import { Listing } from "@/types/listing";
import { DataTable } from "./data-table";
import { columns } from "./pending-columns";
import { getListingCountByStatus } from "@/lib/utils";

type ListingApprovalsProps = {
  data: Listing[];
};
export default function ListingApprovals({ data }: ListingApprovalsProps) {
  const pendingListings = getListingCountByStatus(data, "pending");
  return (
    <div>
      <h2 className="text-xl font-semibold">Pending Approval</h2>
      <div>
        <div className=" py-4">
          <DataTable columns={columns} data={pendingListings} />
        </div>
      </div>
    </div>
  );
}
