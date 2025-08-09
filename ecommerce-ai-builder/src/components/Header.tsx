'use client';

import Link from "next/link";
import { ShoppingBag, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "./AuthModal";

export default function Header() {
  const { user, signOut } = useAuth();

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <ShoppingBag className="h-8 w-8 text-navy-700" />
            <span className="ml-2 text-xl font-bold text-gray-900">BuildStore</span>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a href="#examples" className="text-gray-600 hover:text-gray-900 font-medium">Examples</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium">Pricing</a>
            <a href="#help" className="text-gray-600 hover:text-gray-900 font-medium">Help</a>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="text-sm text-gray-700">{user.email}</span>
                </div>
                <button
                  onClick={signOut}
                  className="text-gray-600 hover:text-gray-900 font-medium"
                >
                  Sign Out
                </button>
                <Link href="/dashboard" className="btn-primary">Dashboard</Link>
              </div>
            ) : (
              <>
                <AuthModal defaultMode="signin">
                  <button className="text-gray-600 hover:text-gray-900 font-medium">
                    Sign In
                  </button>
                </AuthModal>
                <AuthModal defaultMode="signup">
                  <button className="btn-primary">Get Started</button>
                </AuthModal>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
