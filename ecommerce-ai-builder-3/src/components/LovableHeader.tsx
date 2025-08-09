'use client';

import { Store } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "./AuthModal";

export default function LovableHeader() {
  const { user, signOut } = useAuth();

  return (
    <header className="relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <Store className="h-8 w-8 text-pink-500" />
              <span className="text-xl font-bold text-white">BuildStore</span>
            </div>

            <nav className="hidden md:flex space-x-6">
              <a href="#community" className="text-slate-300 hover:text-white transition-colors">
                Community
              </a>
              <a href="#pricing" className="text-slate-300 hover:text-white transition-colors">
                Pricing
              </a>
              <a href="#enterprise" className="text-slate-300 hover:text-white transition-colors">
                Enterprise
              </a>
              <a href="#learn" className="text-slate-300 hover:text-white transition-colors">
                Learn
              </a>
              <a href="#launched" className="text-slate-300 hover:text-white transition-colors">
                Launched
              </a>
            </nav>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-slate-300 text-sm">
                  {user.email}
                </span>
                <button
                  onClick={signOut}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Sign Out
                </button>
                <a
                  href="/dashboard"
                  className="bg-white text-slate-900 px-4 py-2 rounded-lg font-medium hover:bg-slate-100 transition-colors"
                >
                  Dashboard
                </a>
              </div>
            ) : (
              <>
                <AuthModal defaultMode="signin">
                  <button className="text-slate-300 hover:text-white transition-colors">
                    Log in
                  </button>
                </AuthModal>
                <AuthModal defaultMode="signup">
                  <button className="bg-white text-slate-900 px-4 py-2 rounded-lg font-medium hover:bg-slate-100 transition-colors">
                    Get started
                  </button>
                </AuthModal>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
