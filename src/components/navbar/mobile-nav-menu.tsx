"use client";

import { useState } from "react";
import { Menu, X, Plus } from "lucide-react";
import Link from "next/link";
import { Session } from "../../lib/auth";
import { authClient } from "@/lib/auth-client";
import { revalidateAll } from "@/app/actions/revalidate";
import { useRouter } from "next/navigation";

interface MobileNavMenuProps {
	isLoggedIn: boolean;
}

export default function MobileNavMenu({ isLoggedIn }: MobileNavMenuProps) {
	const [open, setOpen] = useState(false);
	const router = useRouter()
	async function handleLogout() {
		await authClient.signOut();
		revalidateAll();
		router.push("/");
	}
	return (

		<div className="md:hidden ">
			<button onClick={() => setOpen(!open)} className="text-gray-800">
				{open ? (
					<X size={24} className="cursor-pointer" />
				) : (
					<Menu size={24} className="cursor-pointer" />
				)}
			</button>

			{open && (
				<div className="    ">
					<nav className="flex flex-col gap-4 w-full absolute top-16 bg-white border shadow-md rounded-md  right-0 p-6 h-screen">
						<Link
							href="/"
							onClick={() => setOpen(false)}
							className=" hover:text-emerald-700"
						>
							Home
						</Link>
						<Link
							href="/explore"
							onClick={() => setOpen(false)}
							className=" hover:text-emerald-700"
						>
							Explore
						</Link>
						<Link
							href="/contact"
							onClick={() => setOpen(false)}
							className="hover:text-emerald-700"
						>
							Contact
						</Link>

						{!isLoggedIn ? (
							<>
								<Link
									href="/auth/login"
									onClick={() => setOpen(false)}
									className=" hover:text-emerald-700"
								>
									Login
								</Link>
								<Link
									href="/auth/register"
									onClick={() => setOpen(false)}
									className=" hover:text-emerald-700"
								>
									Register
								</Link>
							</>
						) : (
							<>
								<Link
									className=" hover:text-emerald-700"
									href={'/'}
									onClick={() => handleLogout()}
								>
									Logout
								</Link>
								<Link
									href="/add-listings"
									onClick={() => setOpen(false)}
									className="flex items-center gap-2   bg-emerald-600 text-white py-4 rounded-md hover:bg-emerald-900 bg-gradient-to-r from-emerald-600 to-emerald-700"
								>
									<span className="text-center w-full flex items-center justify-center gap-2">
										Add Listing
										<Plus size={16} />
									</span>
								</Link>
							</>
						)}
					</nav>
				</div>
			)}
		</div>
	);
}
