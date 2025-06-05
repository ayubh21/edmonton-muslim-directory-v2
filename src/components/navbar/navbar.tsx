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
			<div className="flex h-16 items-center justify-between px-4 py-4  mx-auto ">
				<div className="flex items-center gap-2  ">
					<span className="text-xl font-semibold text-emerald-700 ">
						<Link
							href="/">
							<img src={'/ymc_logo.png'} alt="logo" className="h-20 w-20 absolute bottom-4 left-0" />
							<h2 className="pl-12  font-semibold text-emerald-600 text-lg"> <span className="font-semibold text-black"> Yeg Muslim </span>Connect</h2>
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
						href="#"
						className="text-sm font-medium hover:text-emerald-700 transition-colors"
					>
						About
					</Link>
					<Link
						href="#"
						className="text-sm font-medium hover:text-emerald-700 transition-colors"
					>
						Contact
					</Link>
				</nav>

				{/* Desktop Auth Controls */}

				<div className="hidden md:flex items-center gap-4">
					{!session ? (
						<>
							<Button className=" bg-emerald-700 text-white  rounded-lg py-2.5 px-4  hover:bg-emerald-900 cursor-pointer">
								<Link href="/auth/login">Login</Link>
							</Button>
							<Button className=" hover:bg-emerald-700 py-2.5 px-4 rounded-lg border-emerald-600 hover:bg-gray-800">
								<Link href="/auth/register">Register</Link>
							</Button>
						</>
					) : (
						<>
							<UserDropdown name={session.user.name} />
							<Button className="bg-emerald-700 text-sm text-white hover:bg-emerald-900 flex rounded-md p-3 gap-2 b">
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
