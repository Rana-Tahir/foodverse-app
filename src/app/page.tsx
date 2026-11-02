'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/features/auth/use-auth';
import { Search, MapPin, ArrowRight, ShieldCheck, Clock, Utensils } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { user, isAuthenticated, signOut } = useAuth();
  const [area, setArea] = useState('');

  const handleFindFood = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(area.trim() ? `/?search=${encodeURIComponent(area)}` : '/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/" className="text-2xl font-black bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent">
              Foodverse
            </Link>
            <span className="text-xs bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-full font-semibold">
              Pakistan
            </span>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-slate-600 hidden sm:inline font-medium">
                  {user?.email}
                </span>
                <Link
                  href="/restaurant/dashboard"
                  className="text-sm text-purple-700 hover:text-purple-900 font-semibold"
                >
                  Dashboards
                </Link>
                <button
                  onClick={() => signOut()}
                  className="bg-purple-50 hover:bg-purple-100 text-purple-700 px-4 py-2 rounded-lg text-sm font-semibold transition"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/auth/login"
                  className="text-slate-700 hover:text-purple-700 px-3 py-2 rounded-lg text-sm font-semibold transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition shadow-md shadow-purple-200"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.15),transparent_50%)]"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center space-x-2 bg-purple-500/20 text-purple-300 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 border border-purple-500/30">
            <span>✨ Now delivering across Karachi, Lahore & Islamabad</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-6 leading-tight">
            Gourmet food, delivered <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">lightning fast</span>.
          </h1>
          <p className="text-lg sm:text-xl text-purple-200/80 mb-10 max-w-2xl mx-auto font-medium">
            Discover top-rated local kitchens, artisanal bakeries, and authentic local cuisines at your doorstep.
          </p>

          <form onSubmit={handleFindFood} className="bg-white p-2.5 rounded-2xl shadow-2xl shadow-purple-950/50 max-w-2xl mx-auto flex items-center border border-purple-100">
            <div className="flex items-center pl-3 text-slate-400">
              <MapPin className="w-5 h-5 text-purple-600" />
            </div>
            <input
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="Enter your delivery area (e.g. Gulshan, DHA, Clifton)..."
              className="w-full px-3 py-3 text-slate-800 placeholder-slate-400 focus:outline-none text-sm font-medium bg-transparent"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3.5 rounded-xl font-bold text-sm transition shadow-lg shadow-purple-600/30 flex items-center space-x-2 whitespace-nowrap cursor-pointer"
            >
              <span>Find Food</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </section>

      {/* Main Content / Features */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl border border-purple-100 shadow-xl shadow-purple-50/50 text-center hover:border-purple-200 transition">
            <div className="w-14 h-14 bg-purple-100 text-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-6 font-black text-2xl shadow-inner">
              <Utensils className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-xl text-slate-900 mb-3">Choose Restaurant</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Browse approved local restaurants offering authentic Pakistani and continental cuisines with live ratings.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-purple-100 shadow-xl shadow-purple-50/50 text-center hover:border-purple-200 transition">
            <div className="w-14 h-14 bg-purple-100 text-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-6 font-black text-2xl shadow-inner">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-xl text-slate-900 mb-3">Select Your Meal</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Explore rich menus with transparent PKR pricing, customized add-ons, and instant cart updates.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-purple-100 shadow-xl shadow-purple-50/50 text-center hover:border-purple-200 transition">
            <div className="w-14 h-14 bg-purple-100 text-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-6 font-black text-2xl shadow-inner">
              <Clock className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-xl text-slate-900 mb-3">Fast Delivery</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Track your rider in real-time until your hot, freshly prepared meal arrives at your doorstep.
            </p>
          </div>
        </div>

        {isAuthenticated && (
          <div className="bg-white border border-purple-100 rounded-2xl p-8 shadow-xl shadow-purple-50/50">
            <h2 className="text-2xl font-black text-slate-900 mb-6">Quick Links & Dashboards</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Link
                href="/restaurant/dashboard"
                className="p-6 border border-purple-100 rounded-xl hover:border-purple-500 hover:shadow-lg transition text-center bg-purple-50/30 group"
              >
                <h4 className="font-bold text-slate-900 group-hover:text-purple-700 transition">Restaurant Owner</h4>
                <p className="text-xs text-slate-500 mt-1">Manage menu & orders</p>
              </Link>
              <Link
                href="/rider/dashboard"
                className="p-6 border border-purple-100 rounded-xl hover:border-purple-500 hover:shadow-lg transition text-center bg-purple-50/30 group"
              >
                <h4 className="font-bold text-slate-900 group-hover:text-purple-700 transition">Delivery Rider</h4>
                <p className="text-xs text-slate-500 mt-1">View assigned deliveries</p>
              </Link>
              <Link
                href="/admin/dashboard"
                className="p-6 border border-purple-100 rounded-xl hover:border-purple-500 hover:shadow-lg transition text-center bg-purple-50/30 group"
              >
                <h4 className="font-bold text-slate-900 group-hover:text-purple-700 transition">Admin Control</h4>
                <p className="text-xs text-slate-500 mt-1">Platform management & RLS</p>
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-purple-100 py-10 text-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} Foodverse Pakistan. All rights reserved.</p>
      </footer>
    </div>
  );
}
