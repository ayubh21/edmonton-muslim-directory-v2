"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ListChecks,
  Users,
  Settings,
  LogOut,
  Store,
  FileText,
  MessageSquare,
  AlertCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Listings",
      href: "/admin/listings",
      icon: Store,
    },
    {
      title: "Pending Approval",
      href: "/admin/listings/pending",
      icon: ListChecks,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: Users,
    },
    {
      title: "Reports",
      href: "/admin/reports",
      icon: AlertCircle,
    },
    {
      title: "Reviews",
      href: "/admin/reviews",
      icon: MessageSquare,
    },
    {
      title: "Content",
      href: "/admin/content",
      icon: FileText,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="hidden md:flex h-[calc(100vh-4rem)] w-64 flex-col border-r bg-white">
      <div className="flex flex-col gap-2 p-4">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3",
                  isActive &&
                    "bg-emerald-50 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-700"
                )}
              >
                <Icon
                  className={cn("h-4 w-4", isActive && "text-emerald-700")}
                />
                {item.title}
                {item.title === "Pending Approval" && (
                  <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-xs font-medium text-red-600">
                    12
                  </span>
                )}
              </Button>
            </Link>
          );
        })}
      </div>

      <div className="mt-auto p-4">
        <Separator className="mb-4" />
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
