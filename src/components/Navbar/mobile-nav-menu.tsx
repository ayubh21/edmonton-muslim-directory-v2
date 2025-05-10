"use client";

import { useState } from "react";
import { Menu, X, Plus } from "lucide-react";
import Link from "next/link";
import { Session } from "../../lib/auth";

interface MobileNavMenuProps {
  session: Session; // You can type this better with your auth type
}

export default function MobileNavMenu({ session }: MobileNavMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden relative">
      <button onClick={() => setOpen(!open)} className="text-gray-800">
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {open && (
        <div className="absolute right-0 top-12 bg-white border shadow-md rounded-md w-56 py-4 px-6 z-50">
          <nav className="flex flex-col gap-4">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="text-sm hover:text-emerald-700"
            >
              Home
            </Link>
            <Link
              href="/explore"
              onClick={() => setOpen(false)}
              className="text-sm hover:text-emerald-700"
            >
              Explore
            </Link>
            <Link
              href="#"
              onClick={() => setOpen(false)}
              className="text-sm hover:text-emerald-700"
            >
              Categories
            </Link>
            <Link
              href="#"
              onClick={() => setOpen(false)}
              className="text-sm hover:text-emerald-700"
            >
              About
            </Link>

            {!session ? (
              <>
                <Link
                  href="/auth/login"
                  onClick={() => setOpen(false)}
                  className="text-sm hover:text-emerald-700"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setOpen(false)}
                  className="text-sm hover:text-emerald-700"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/add-listings"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 text-sm hover:text-emerald-700"
                >
                  <span>Add Listing</span>
                  <Plus size={16} />
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}
