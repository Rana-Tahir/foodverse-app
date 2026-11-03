'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/features/auth/use-auth';
import { Search, MapPin, ArrowRight, ShieldCheck, Clock, Utensils, Sparkles, Menu, X } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { user, isAuthenticated, signOut } = useAuth();
  const [area, setArea] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleFindFood = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(area.trim() ? `/?search=${encodeURIComponent(area)}` : '/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/" className="text-2xl font-black bg-gradient-to-r from-[#421869] to-[#721CB8] bg-clip-text text-transparent">
              Foodverse
            </Link>
            <span className="text-xs bg-[#96D74C]/20 text-[#509724] px-2.5 py-0.5 rounded-full font-bold">
              Pakistan
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-slate-600 font-medium">
                  {user?.email}
                </span>
                <Link
                  href="/restaurant/dashboard"
                  className="text-sm text-[#421869] hover:text-[#721CB8] font-bold"
                >
                  Dashboards
                </Link>
                <button
                  onClick={() => signOut()}
                  className="bg-purple-50 hover:bg-purple-100 text-[#421869] px-4 py-2 rounded-lg text-sm font-bold transition cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/auth/login"
                  className="text-slate-700 hover:text-[#421869] px-3 py-2 rounded-lg text-sm font-bold transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-gradient-to-r from-[#509724] to-[#96D74C] hover:from-[#3e761c] hover:to-[#83c638] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition shadow-md shadow-green-200"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-lg">
            {isAuthenticated ? (
              <div className="space-y-3 pt-2">
                <div className="text-sm text-slate-600 font-medium px-2 truncate">
                  {user?.email}
                </div>
                <Link
                  href="/restaurant/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm font-bold text-[#421869] hover:bg-purple-50"
                >
                  Dashboards
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-bold text-red-600 hover:bg-red-50"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="space-y-2 pt-2">
                <Link
                  href="/auth/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 border border-slate-200 hover:bg-slate-50"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#509724] to-[#96D74C] shadow-md"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#421869] via-[#721CB8] to-[#995BD5] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(150,215,76,0.15),transparent_50%)]"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center space-x-2 bg-white/10 text-[#96D74C] px-4 py-1.5 rounded-full text-xs font-bold mb-6 border border-white/20 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Now delivering across Karachi, Lahore & Islamabad</span>
          </div>
          <h1 className="text-3xl sm:text-6xl font-black tracking-tight mb-6 leading-tight">
            Gourmet food, delivered <span className="text-[#96D74C]">lightning fast</span>.
          </h1>
          <p className="text-base sm:text-xl text-purple-100 mb-8 sm:mb-10 max-w-2xl mx-auto font-medium">
            Discover top-rated local kitchens, artisanal bakeries, and authentic local cuisines at your doorstep.
          </p>

          <form onSubmit={handleFindFood} className="bg-white p-2 rounded-2xl shadow-2xl shadow-purple-950/40 max-w-2xl mx-auto flex flex-col sm:flex-row items-center border border-purple-100 gap-2 sm:gap-0">
            <div className="flex items-center pl-3 text-slate-400 w-full sm:w-auto">
              <MapPin className="w-5 h-5 text-[#721CB8] hidden sm:block" />
              <input
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="Enter delivery area (e.g. Gulshan, DHA)..."
                className="w-full px-3 py-3 text-slate-800 placeholder-slate-400 focus:outline-none text-sm font-medium bg-transparent"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto bg-gradient-to-r from-[#509724] to-[#96D74C] hover:from-[#3e761c] hover:to-[#83c638] text-white px-8 py-3.5 rounded-xl font-bold text-sm transition shadow-lg shadow-green-600/30 flex items-center justify-center space-x-2 whitespace-nowrap cursor-pointer"
            >
              <span>Find Food</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </section>

      {/* Main Content / Features */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-lg shadow-slate-100 text-center hover:border-purple-200 transition">
            <div className="w-14 h-14 bg-purple-50 text-[#721CB8] rounded-2xl flex items-center justify-center mx-auto mb-6 font-black text-2xl shadow-inner border border-purple-100">
              <Utensils className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-xl text-slate-900 mb-3">Choose Restaurant</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Browse approved local restaurants offering authentic Pakistani and continental cuisines with live ratings.
            </p>
          </div>
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-lg shadow-slate-100 text-center hover:border-purple-200 transition">
            <div className="w-14 h-14 bg-green-50 text-[#509724] rounded-2xl flex items-center justify-center mx-auto mb-6 font-black text-2xl shadow-inner border border-green-100">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-xl text-slate-900 mb-3">Select Your Meal</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Explore rich menus with transparent PKR pricing, customized add-ons, and instant cart updates.
            </p>
          </div>
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-lg shadow-slate-100 text-center hover:border-purple-200 transition">
            <div className="w-14 h-14 bg-purple-50 text-[#721CB8] rounded-2xl flex items-center justify-center mx-auto mb-6 font-black text-2xl shadow-inner border border-purple-100">
              <Clock className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-xl text-slate-900 mb-3">Fast Delivery</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Track your rider in real-time until your hot, freshly prepared meal arrives at your doorstep.
            </p>
          </div>
        </div>

        {isAuthenticated && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-lg shadow-slate-100">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6">Quick Links & Dashboards</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <Link
                href="/restaurant/dashboard"
                className="p-6 border border-purple-100 rounded-xl hover:border-[#721CB8] hover:shadow-lg transition text-center bg-purple-50/30 group"
              >
                <h4 className="font-bold text-slate-900 group-hover:text-[#721CB8] transition">Restaurant Owner</h4>
                <p className="text-xs text-slate-500 mt-1">Manage menu & orders</p>
              </Link>
              <Link
                href="/rider/dashboard"
                className="p-6 border border-green-100 rounded-xl hover:border-[#509724] hover:shadow-lg transition text-center bg-green-50/30 group"
              >
                <h4 className="font-bold text-slate-900 group-hover:text-[#509724] transition">Delivery Rider</h4>
                <p className="text-xs text-slate-500 mt-1">View assigned deliveries</p>
              </Link>
              <Link
                href="/admin/dashboard"
                className="p-6 border border-purple-100 rounded-xl hover:border-[#721CB8] hover:shadow-lg transition text-center bg-purple-50/30 group"
              >
                <h4 className="font-bold text-slate-900 group-hover:text-[#721CB8] transition">Admin Control</h4>
                <p className="text-xs text-slate-500 mt-1">Platform management & RLS</p>
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 sm:py-10 text-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} Foodverse Pakistan. All rights reserved.</p>
      </footer>
    </div>
  );
}
