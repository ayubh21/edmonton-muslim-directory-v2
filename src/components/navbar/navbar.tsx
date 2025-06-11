import Link from "next/link";
import { Button } from "../ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import UserDropdown from "./user-dropdown";
import { Plus } from "lucide-react";
import MobileNavMenu from "./mobile-nav-menu";
import Image from "next/image";

export async function Navbar() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	return (
		<header className="top-0 z-50 border-b bg-white  relative ">
			<div className="flex h-16 items-center justify-between px-4 py-4 mx-auto max-w-[1850px]">
				<div className="flex items-center gap-2  ">
					<span className="text-xl font-semibold text-emerald-700 ">
						<Link
							href="/">
							<h2 className="  font-semibold text-emerald-600 text-lg"> <span className="font-semibold text-black"> Yeg Muslim </span>Connect</h2>
						</Link>
					</span>
				</div>

				{/* Desktop Nav */}
				<nav className="hidden md:flex justify-center items-center  gap-6">

					<Link
						href="/"
						className="font-medium hover:text-emerald-700 transition-colors"
					>
						Home
					</Link>
					<Link
						href="/explore"
						className="text-sm font-medium hover:text-emerald-700 transition-colors"
					>
						Explore
					</Link>
					<Link
						href="/contact"
						className="text-sm font-medium hover:text-emerald-700 transition-colors"
					>
						Contact
					</Link>
				</nav>

				{/* Desktop Auth Controls */}

				<div className="hidden md:flex items-center gap-4">
					{!session ? (
						<>
							<button className="py-2.5 px-4 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-700  hover:bg-gray-800  text-white">
								<Link href="/auth/login">Login</Link>
							</button>
							<button className="py-2.5 px-4 rounded-lg border-emerald-600 hover:bg-gray-800 bg-black text-white">
								<Link href="/auth/register">Register</Link>
							</button>
						</>
					) : (
						<>
							<UserDropdown name={session.user.name} />
							<Button className=" text-sm text-white hover:bg-emerald-900 flex rounded-md p-3 gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700">
								<Link href="/add-listings">Add Listing</Link>
								<Plus className="text-white" height={20} />
							</Button>
						</>
					)}
				</div>

				{/* Mobile Menu Toggle & Drawer */}
				<MobileNavMenu isLoggedIn={session ? true : false} />
			</div>
		</header>
	);
}
