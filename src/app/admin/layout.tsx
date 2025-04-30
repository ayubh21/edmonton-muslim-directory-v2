import { type ReactNode, Suspense } from "react";
import { Bell, Search, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AdminSidebar from "@/components/admin/admin-sidebar";
import { GetPendingListings } from "../actions/admin";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const data = await GetPendingListings();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      {/* <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="flex h-16 items-center px-4 md:px-6">
          <div className="flex items-center gap-2 md:hidden">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-emerald-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">E</span>
              </div>
              <span className="font-bold text-emerald-700">Admin</span>
            </div>
          </div>

          <div className="hidden md:flex md:items-center md:gap-2">
            <div className="h-8 w-8 rounded-full bg-emerald-600 flex items-center justify-center">
              <span className="text-white font-bold">E</span>
            </div>
            <span className="text-xl font-bold text-emerald-700">
              EdmontonHalal
            </span>
            <span className="ml-2 rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
              Admin
            </span>
          </div>

          <div className="ml-auto flex items-center gap-4">
            <form className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-64 bg-gray-50 pl-8 focus-visible:ring-emerald-500"
                />
              </div>
            </form>
            <Button variant="outline" size="icon" className="relative h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
              <span className="sr-only">Notifications</span>
            </Button>
            <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
              <img
                src="/placeholder.svg?height=32&width=32"
                alt="Admin"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </header> */}

      <div className="flex">
        {/* Admin Sidebar */}
        <AdminSidebar numOfListings={data.length} />
        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Suspense>{children}</Suspense>
        </main>
      </div>
    </div>
  );
}
