"use client";

import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { LayoutDashboard, User } from "lucide-react";
import Link from "next/link";
import { BarLoader } from "react-spinners";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { clearAuth } from "@/redux/slices/authSlice";
import { useLogoutUserMutation } from "@/redux/services";


export default function Header() {
  const path = usePathname();
  const router = useRouter()
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);
  const [logout] = useLogoutUserMutation()
const handleLogout = async () => {
    await logout().unwrap();
    dispatch(clearAuth());
};
 
  return (
    <header className="fixed top-0 w-full border-b bg-white/95 backdrop-blur z-50 supports-[backdrop-filter]:bg-white/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={"/logos/logo.png"}
            alt="Splitr Logo"
            width={200}
            height={60}
            className="h-11 w-auto object-contain"
          />
        </Link>

        {/* Navigation for home page */}
        {path === "/" && (
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-green-600 transition"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium hover:text-green-600 transition"
            >
              How It Works
            </Link>
          </div>
        )}

        {/* Right section */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              {/* Dashboard button */}
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  className="hidden md:inline-flex items-center gap-2 hover:text-green-600 hover:border-green-600 transition"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Button>
                <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                  <LayoutDashboard className="h-4 w-4" />
                </Button>
              </Link>
              {/* User menu */}
              <div className="relative group">
                <Button variant="ghost" className="w-10 h-10 p-0 rounded-full">
                  <User className="h-5 w-5" />
                </Button>
                <div className="absolute right-0 mt-0.5 w-40 bg-white border shadow-lg rounded-lg hidden group-hover:block">
                  <div className="px-4 py-2 border-b text-sm font-medium">
                    {user?.name || "User"}
                  </div>
                  <button
                    onClick={()=>{handleLogout()}}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link href="/sign-in">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/dashboard">
                <Button className="bg-green-600 hover:bg-green-700 border-none">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
      </nav>

      {isLoading && <BarLoader width={"100%"} color="#36d7b7" />}
    </header>
  );
}
