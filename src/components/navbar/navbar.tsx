import Link from "next/link";
import { Button } from "../ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import UserDropdown from "./user-dropdown";
import { Plus } from "lucide-react";
import MobileNavMenu from "./mobile-nav-menu";

export async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header className="top-0 z-50 border-b bg-white max-w-[1850px] mx-auto relative">
      <div className="flex h-16 items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-semibold text-emerald-700">
            <Link href="/">
              Edmonton Khair <span className="text-black">Network</span>
            </Link>
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
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
        </nav>

        {/* Desktop Auth Controls */}
        <div className="hidden md:flex items-center gap-4">
          {!session ? (
            <>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white "> <Link href="/auth/login">Login</Link>
              </Button>
              <Button className="bg-black hover:bg-emerald-700">
                <Link href="/auth/register">Register</Link>
              </Button>
            </>
          ) : (
            <>
              <UserDropdown name={session.user.name} />
              <Button className="bg-emerald-700 text-sm text-white hover:bg-emerald-900 flex rounded-md p-3 gap-2">
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
