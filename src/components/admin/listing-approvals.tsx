import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import Link from "next/link";
import { Listing } from "@/types/listing";
import { DataTable } from "./data-table";
import { columns } from "./pending-columns";

type ListingApprovalsProps = {
  data: Listing[];
};
export default function ListingApprovals({ data }: ListingApprovalsProps) {
  //   const [listing, setListing] = useState<Listing[]>(data);

  //   useEffect(() => {
  //     console.log(listing);
  //   }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Pending Approval</h2>
      <div>
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
}
