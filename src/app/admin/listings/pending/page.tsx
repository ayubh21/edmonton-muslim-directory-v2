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

export default function PendingListingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Pending Approval
          </h1>
          <p className="text-gray-500">
            Review and manage business listings awaiting approval.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-col gap-1">
              <CardTitle>Pending Listings</CardTitle>
              <CardDescription>12 listings awaiting review</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-8 w-full sm:w-[240px]"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex gap-1">
                    <Filter className="h-4 w-4" />
                    Filter
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuItem>New Listings</DropdownMenuItem>
                  <DropdownMenuItem>Updated Listings</DropdownMenuItem>
                  <DropdownMenuItem>Today</DropdownMenuItem>
                  <DropdownMenuItem>This Week</DropdownMenuItem>
                  <DropdownMenuItem>This Month</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Select defaultValue="newest">
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="a-z">A-Z</SelectItem>
                  <SelectItem value="z-a">Z-A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All (12)</TabsTrigger>
              <TabsTrigger value="new">New (8)</TabsTrigger>
              <TabsTrigger value="updated">Updated (4)</TabsTrigger>
            </TabsList>

            <div className="rounded-md border">
              <div className="grid grid-cols-1 md:grid-cols-6 p-4 text-sm font-medium border-b bg-gray-50">
                <div className="md:col-span-2">Business</div>
                <div>Category</div>
                <div>Submitted By</div>
                <div>Date</div>
                <div>Actions</div>
              </div>

              {[
                {
                  id: 1,
                  name: "Barakah Cafe",
                  category: "Restaurant",
                  submitter: "Ahmed S.",
                  date: "Today, 10:45 AM",
                  status: "new",
                },
                {
                  id: 2,
                  name: "Al-Noor Grocery",
                  category: "Grocery",
                  submitter: "Mohammed A.",
                  date: "Yesterday, 3:22 PM",
                  status: "new",
                },
                {
                  id: 3,
                  name: "Shifa Medical Clinic",
                  category: "Healthcare",
                  submitter: "Fatima K.",
                  date: "Apr 26, 2025",
                  status: "updated",
                },
                {
                  id: 4,
                  name: "Amanah Law",
                  category: "Legal Services",
                  submitter: "Yusuf R.",
                  date: "Apr 25, 2025",
                  status: "new",
                },
                {
                  id: 5,
                  name: "Halal Meat Shop",
                  category: "Grocery",
                  submitter: "Ibrahim M.",
                  date: "Apr 25, 2025",
                  status: "new",
                },
                {
                  id: 6,
                  name: "Baraka Tours",
                  category: "Travel",
                  submitter: "Aisha J.",
                  date: "Apr 24, 2025",
                  status: "updated",
                },
                {
                  id: 7,
                  name: "Al-Huda Islamic School",
                  category: "Education",
                  submitter: "Omar K.",
                  date: "Apr 23, 2025",
                  status: "updated",
                },
                {
                  id: 8,
                  name: "Amana Financial",
                  category: "Financial Services",
                  submitter: "Layla N.",
                  date: "Apr 22, 2025",
                  status: "updated",
                },
                {
                  id: 9,
                  name: "Salam Pharmacy",
                  category: "Healthcare",
                  submitter: "Kareem L.",
                  date: "Apr 22, 2025",
                  status: "new",
                },
                {
                  id: 10,
                  name: "Nur Travels",
                  category: "Travel",
                  submitter: "Zainab H.",
                  date: "Apr 21, 2025",
                  status: "new",
                },
                {
                  id: 11,
                  name: "Takaful Insurance",
                  category: "Financial Services",
                  submitter: "Hassan T.",
                  date: "Apr 21, 2025",
                  status: "new",
                },
                {
                  id: 12,
                  name: "Quran Learning Centre",
                  category: "Education",
                  submitter: "Mariam S.",
                  date: "Apr 20, 2025",
                  status: "new",
                },
              ].map((business) => (
                <div
                  key={business.id}
                  className="grid grid-cols-1 md:grid-cols-6 p-4 text-sm items-center border-b last:border-0"
                >
                  <div className="md:col-span-2 font-medium flex items-center">
                    {business.name}
                    {/* {business.status === "new" ? (
                      <Badge className="ml-2 bg-blue-500">New</Badge>
                    ) : (
                      <Badge className="ml-2 bg-amber-500">Updated</Badge>
                    )} */}
                  </div>
                  <div>{business.category}</div>
                  <div>{business.submitter}</div>
                  <div>{business.date}</div>
                  <div className="flex items-center gap-2 mt-2 md:mt-0">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/admin/listings/review/${business.id}`}>
                        Review
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-500">
                Showing 12 of 12 listings
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
