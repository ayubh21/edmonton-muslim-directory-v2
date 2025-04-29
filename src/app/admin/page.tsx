import Link from "next/link";
import {
  ArrowUpRight,
  ArrowDown,
  ArrowUp,
  Store,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardChart } from "@/components/admin/dashboard-chart";
import { RecentActivityTable } from "@/components/admin/recent-activity";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-gray-500">
            Welcome back, Admin! Here's what's happening with your directory.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link href="/admin/listings/pending">
              <Clock className="mr-2 h-4 w-4" />
              Pending Approvals
              {/* <Badge variant="destructive" className="ml-2">
                12
              </Badge> */}
            </Link>
          </Button>
          <Button asChild>
            <Link href="/admin/listings">
              View All Listings
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Listings
            </CardTitle>
            <Store className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">248</div>
            <p className="text-xs text-gray-500">
              <span className="text-green-500 inline-flex items-center">
                <ArrowUp className="mr-1 h-3 w-3" />
                12%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">215</div>
            <p className="text-xs text-gray-500">
              <span className="text-green-500 inline-flex items-center">
                <ArrowUp className="mr-1 h-3 w-3" />
                8%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-gray-500">
              <span className="text-amber-500 inline-flex items-center">
                <ArrowUp className="mr-1 h-3 w-3" />4
              </span>{" "}
              new today
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">21</div>
            <p className="text-xs text-gray-500">
              <span className="text-red-500 inline-flex items-center">
                <ArrowDown className="mr-1 h-3 w-3" />
                3%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Listings Overview</CardTitle>
            <CardDescription>
              Listing submissions and approvals over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DashboardChart />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivityTable />
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Pending Approval</h2>
        <Tabs defaultValue="all">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="all">All (12)</TabsTrigger>
              <TabsTrigger value="new">New (8)</TabsTrigger>
              <TabsTrigger value="updated">Updated (4)</TabsTrigger>
            </TabsList>
            <Button asChild variant="outline" size="sm">
              <Link href="/admin/listings/pending">View All Pending</Link>
            </Button>
          </div>
          <TabsContent value="all" className="space-y-0">
            <div className="rounded-md border">
              <div className="grid grid-cols-1 md:grid-cols-5 p-4 text-sm font-medium border-b bg-gray-50">
                <div className="md:col-span-2">Business</div>
                <div>Category</div>
                <div>Submitted</div>
                <div>Actions</div>
              </div>
              {[
                {
                  id: 1,
                  name: "Barakah Cafe",
                  category: "Restaurant",
                  date: "Today",
                  status: "new",
                },
                {
                  id: 2,
                  name: "Al-Noor Grocery",
                  category: "Grocery",
                  date: "Yesterday",
                  status: "new",
                },
                {
                  id: 3,
                  name: "Shifa Medical Clinic",
                  category: "Healthcare",
                  date: "2 days ago",
                  status: "updated",
                },
                {
                  id: 4,
                  name: "Amanah Law",
                  category: "Legal Services",
                  date: "3 days ago",
                  status: "new",
                },
                {
                  id: 5,
                  name: "Halal Meat Shop",
                  category: "Grocery",
                  date: "3 days ago",
                  status: "new",
                },
              ].map((business) => (
                <div
                  key={business.id}
                  className="grid grid-cols-1 md:grid-cols-5 p-4 text-sm items-center border-b last:border-0"
                >
                  <div className="md:col-span-2 font-medium flex items-center">
                    {business.name}
                    {/* {business.status === "new" ? (
                    //   <Badge className="ml-2 bg-blue-500">New</Badge>
                    // ) : (
                    //   <Badge className="ml-2 bg-amber-500">Updated</Badge>
                    )} */}
                  </div>
                  <div>{business.category}</div>
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
          </TabsContent>
          <TabsContent value="new">
            {/* Similar content for new listings */}
            <div className="rounded-md border">
              <div className="grid grid-cols-1 md:grid-cols-5 p-4 text-sm font-medium border-b bg-gray-50">
                <div className="md:col-span-2">Business</div>
                <div>Category</div>
                <div>Submitted</div>
                <div>Actions</div>
              </div>
              {[
                {
                  id: 1,
                  name: "Barakah Cafe",
                  category: "Restaurant",
                  date: "Today",
                },
                {
                  id: 2,
                  name: "Al-Noor Grocery",
                  category: "Grocery",
                  date: "Yesterday",
                },
                {
                  id: 4,
                  name: "Amanah Law",
                  category: "Legal Services",
                  date: "3 days ago",
                },
                {
                  id: 5,
                  name: "Halal Meat Shop",
                  category: "Grocery",
                  date: "3 days ago",
                },
              ].map((business) => (
                <div
                  key={business.id}
                  className="grid grid-cols-1 md:grid-cols-5 p-4 text-sm items-center border-b last:border-0"
                >
                  <div className="md:col-span-2 font-medium flex items-center">
                    {business.name}
                    {/* <Badge className="ml-2 bg-blue-500">New</Badge> */}
                  </div>
                  <div>{business.category}</div>
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
          </TabsContent>
          <TabsContent value="updated">
            {/* Similar content for updated listings */}
            <div className="rounded-md border">
              <div className="grid grid-cols-1 md:grid-cols-5 p-4 text-sm font-medium border-b bg-gray-50">
                <div className="md:col-span-2">Business</div>
                <div>Category</div>
                <div>Submitted</div>
                <div>Actions</div>
              </div>
              {[
                {
                  id: 3,
                  name: "Shifa Medical Clinic",
                  category: "Healthcare",
                  date: "2 days ago",
                },
                {
                  id: 6,
                  name: "Baraka Tours",
                  category: "Travel",
                  date: "4 days ago",
                },
                {
                  id: 7,
                  name: "Al-Huda Islamic School",
                  category: "Education",
                  date: "5 days ago",
                },
                {
                  id: 8,
                  name: "Amana Financial",
                  category: "Financial Services",
                  date: "6 days ago",
                },
              ].map((business) => (
                <div
                  key={business.id}
                  className="grid grid-cols-1 md:grid-cols-5 p-4 text-sm items-center border-b last:border-0"
                >
                  <div className="md:col-span-2 font-medium flex items-center">
                    {business.name}
                    {/* <Badge className="ml-2 bg-amber-500">Updated</Badge> */}
                  </div>
                  <div>{business.category}</div>
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
