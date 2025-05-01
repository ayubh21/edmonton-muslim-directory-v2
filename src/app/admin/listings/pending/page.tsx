import Link from "next/link";
import { Search, Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/admin/data-table";
import { columns } from "@/components/admin/pending-columns";
import { getPendingListings } from "@/lib/utils";
import { GetListings } from "@/app/actions/admin";

export default async function PendingListingsPage() {
  const data = await GetListings();
  const filteredListings = getPendingListings(data);
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Pending Approval
          </h1>
          <p className="text-gray-500">
            Review and manage business listings awaiting approval.
          </p>
        </div>
      </div>
      <DataTable columns={columns} data={filteredListings} />
    </div>
  );
}
