import { Separator } from "@radix-ui/react-select";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Footer() {
	return (
		<footer className="bg-[#fafafa] py-12 border-t">
			<div className="">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div className="pl-4">
						<div className="flex items-center gap-2 mb-4 relative">
							<div>
								<img src={'/ymc_logo.png'} alt="logo" className="h-20 w-20 absolute bottom-0 -left-4" />
							</div>
							<span className="text-lg font-semibold text-black pl-10">Yeg Muslim <span className="text-emerald-600">Connect</span> </span>
						</div>
						<p className="text-sm text-[#52525B]  mb-4 text-left">
							The premier directory for Muslim-owned businesses in Edmonton, Alberta.
						</p>
						<Button className="bg-emerald-600 hover:bg-emerald-900">
							<Link href="/add-listings">
								List your business
							</Link>
						</Button>
					</div>

					<div className="pl-4">
						<h3 className="text-lg font-semibold text-[#1B1B1B] mb-4">Quick Links</h3>
						<ul className="space-y-2">
							<li>
								<Link href="#" className="text-[#52525B] hover:text-black transition-colors">
									Home
								</Link>
							</li>
							<li>
								<Link href="#" className="text-[#52525B] hover:text-black transition-colors">
									Explore
								</Link>
							</li>
							<li>
								<Link href="#" className="text-[#52525B] hover:text-black transition-colors">
									About
								</Link>
							</li>
						</ul>
					</div>


					<div className="pl-4">
						<h3 className="text-lg font-semibold text-[#1B1B1B] mb-4">Contact</h3>
						<ul className="space-y-2">
							<li className="text-[#52525B]">Email: info@edmontonhalal.ca</li>
							<li className="text-[#52525B]">Phone: (780) 123-4567</li>
							<li className="text-[#52525B]">Edmonton, Alberta, Canada</li>
						</ul>
					</div>
					<div className="pl-4">
						<h3 className="text-lg font-semibold text-[#1B1B1B] mb-4">Follow us on </h3>
						<div className="flex space-x-4">
							<Link href="#" className="text-gray-400 hover:text-black">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="h-5 w-5"
								>
									<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
								</svg>
							</Link>
							<Link href="#" className="text-gray-400 hover:text-black">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="h-5 w-5"
								>
									<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
								</svg>
							</Link>
							<Link href="#" className="text-gray-400 hover:text-black">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="h-5 w-5"
								>
									<rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
									<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
									<line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
								</svg>
							</Link>
						</div>
					</div>
				</div>


				<hr className="my-8 bg-gray-800 w-full" />

				<div className="text-center text-sm  text-[#52525B] ">
					© {new Date().getFullYear()} Yeg Muslim Connect. All rights reserved.
				</div>
			</div>
		</footer>
	)
}

