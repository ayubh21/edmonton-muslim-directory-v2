import Link from "next/link";
import { Button } from "../ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import UserDropdown from "./user-dropdown";
import { Plus } from "lucide-react";
import { redirect } from "next/navigation";

export async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header className="top-0 z-50   border-b bg-white max-w-[1850px] mx-auto">
      <div className="flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-emerald-600 flex items-center justify-center">
            <span className="text-white font-bold">E</span>
          </div>
          <span className="text-xl font-bold text-emerald-700">
            EdmontonHalal
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className=" font-medium hover:text-emerald-700 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/"
            className="text-sm font-medium hover:text-emerald-700 transition-colors"
          >
            Explore
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:text-emerald-700 transition-colors"
          >
            Categories
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:text-emerald-700 transition-colors"
          >
            About
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          {!session && (
            <div className="hidden md:flex items-center gap-2">
              <button className="bg-emerald-600 hover:bg-emerald-700 py-2">
                <a href="/auth/login">Login</a>
              </button>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <a href="/auth/register">Register</a>
              </Button>
            </div>
          )}

          {session && (
            <>
              <UserDropdown
                name={session.user.name}
                // image={session.user.image ?? ""}
              />
              <Button className="bg-emerald-700 text-white py-6 hover:bg-emerald-900">
                Add Listing <Plus className="text-white" />
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
