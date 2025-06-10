import { type ReactNode, Suspense } from "react";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AdminSidebar from "@/components/admin/admin-sidebar";
import { GetListings } from "../actions/listing";
import { getListingCountByStatus } from "@/lib/utils";
import "@/app/globals.css"
import Link from "next/link";
export default async function AdminLayout({
	children,
}: {
	children: ReactNode;
}) {
	const data = await GetListings();

	return (
		<html>
			<body>
				<div className="min-h-screen bg-gray-50">
					<header className="sticky top-0 z-50 w-full border-b bg-white">
						<div className="flex h-16 items-center px-4 md:px-6">
							<div className="flex items-center gap-2 md:hidden">
								<div className="flex items-center gap-2">
									<span className=" font-semibold text-emerald-700">
										<Link href="/">
											Yeg Muslim <span className="text-black">Connect</span>
										</Link>
									</span>
								</div>
							</div>

							<div className="hidden md:flex md:items-center md:gap-2">
								<div className="flex items-center gap-2">
									<span className=" font-semibold text-emerald-700 text-2xl">
										<Link href="/">
											Yeg Muslim <span className="text-black">Connect</span>
										</Link>
									</span>
								</div>
								<span className="ml-2 rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
									Admin
								</span>
							</div>

						</div>
					</header>
					<div className="flex">
						<AdminSidebar
							numOfListings={getListingCountByStatus(data, "pending").length}
						/>
						<main className="flex-1 overflow-auto p-4 md:p-6">
							<Suspense>{children}</Suspense>
						</main>
					</div>
				</div>
			</body>

		</html>
	);
}
