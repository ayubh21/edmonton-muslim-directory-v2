"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
import { authClient } from "@/lib/auth-client";
import { revalidateAll } from "@/app/actions/revalidate";
import { useEffect } from "react";

type AdminSidebarProps = {
	numOfListings: number;
};
export default function AdminSidebar({ numOfListings }: AdminSidebarProps) {

	const router = useRouter()
	const navItems = [
		{
			title: "Dashboard",
			href: "/admin",
			icon: LayoutDashboard,
		},
		{
			title: "Pending Approval",
			href: "/admin/listings/pending",
			icon: ListChecks,
		},
	];


	useEffect(() => {
		console.log("test")
	},[])
	async function handleLogout() {
		await authClient.signOut();
		revalidateAll();
		router.push("/");
	}

	return (
		<aside className="hidden md:flex  h-[calc(100vh-70px)] w-64 flex-col border-r bg-white">
			<div className="flex flex-col gap-2 p-4">
				{navItems.map((item) => {
					const Icon = item.icon;
					return (
						<Link
							key={item.href} href={item.href}>
							<Button
								variant="ghost"
								className={cn(
									"w-full justify-start gap-3",
									" text-black hover:bg-emerald-50 hover:text-emerald-700"
								)}
							>
								<Icon
									className={cn("h-4 w-4", "text-emerald-700")}
								/>
								{item.title}
								{item.title === "Pending Approval" && (
									<span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-xs font-medium text-red-600">
										{numOfListings}
									</span>
								)}
							</Button>
						</Link>
					);
				})}
			</div>

			<div className="mt-auto p-4 bottom-0">
				<Separator className="mb-4" />
				<Button
				onClick={handleLogout}
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
