"use client";

import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1A73E8]">
              <span className="text-xl font-bold text-white">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900 sm:text-2xl">
              ShopSmart
            </span>
          </Link>

          <div className="hidden flex-1 max-w-2xl md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products, brands and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-gray-300 py-2.5 pl-5 pr-12 text-sm focus:border-[#1A73E8] focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20"
              />
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-[#1A73E8] px-4 py-1.5 text-sm font-medium text-white transition hover:bg-[#1557B0]"
                aria-label="Search"
              >
                🔍
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/login"
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 sm:gap-2 sm:px-4"
            >
              <span className="text-lg">👤</span>
              <span className="hidden sm:inline">Login</span>
            </Link>
            <button className="relative rounded-lg px-3 py-2 text-gray-700 transition hover:bg-gray-100 sm:px-4">
              <span className="text-2xl">🛒</span>
              <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#F8B400] text-xs font-bold text-gray-900">
                0
              </span>
            </button>
          </div>
        </div>

        <div className="mt-3 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-gray-300 py-2 pl-4 pr-10 text-sm focus:border-[#1A73E8] focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20"
            />
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 text-lg"
              aria-label="Search"
            >
              🔍
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
