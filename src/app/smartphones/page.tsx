"use client";

import { useState, useMemo } from "react";
import { mockProducts } from "@/lib/mock-data";
import { ProductCard } from "@/components/product-card";
import { SidebarFilters } from "@/components/sidebar-filters";

export default function SmartphonesPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number | null>(null);

  // Derive price limits from data
  const allPrices = mockProducts.map((p) => p.price);
  const minPriceLimit = Math.floor(Math.min(...allPrices) / 1000) * 1000; // Round down to nearest 1000
  const maxPriceLimit = Math.ceil(Math.max(...allPrices) / 1000) * 1000; // Round up to nearest 1000

  const [priceRange, setPriceRange] = useState<[number, number]>([
    minPriceLimit,
    maxPriceLimit,
  ]);

  const availableBrands = useMemo(() => {
    const brands = new Set(mockProducts.map((p) => p.brand));
    return Array.from(brands).sort();
  }, []);

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      // Filter by Brand
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }

      // Filter by Price
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      // Filter by Rating
      if (minRating !== null && product.rating < minRating) {
        return false;
      }

      return true;
    });
  }, [selectedBrands, priceRange, minRating]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">Smartphones</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Showing {filteredProducts.length} results
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile Filter Toggle */}
        <button
          className="lg:hidden w-full py-2 px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>

        {/* Sidebar Wrapper */}
        <div
          className={`w-full lg:w-64 flex-shrink-0 ${
            showFilters ? "block" : "hidden lg:block"
          }`}
        >
          <SidebarFilters
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            minRating={minRating}
            setMinRating={setMinRating}
            availableBrands={availableBrands}
            minPriceLimit={minPriceLimit}
            maxPriceLimit={maxPriceLimit}
          />
        </div>

        {/* Product Grid */}
        <div className="flex-grow">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 bg-white dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
              <p className="text-xl text-gray-500 dark:text-gray-400 font-medium">
                No products found
              </p>
              <button
                onClick={() => {
                  setSelectedBrands([]);
                  setPriceRange([minPriceLimit, maxPriceLimit]);
                  setMinRating(null);
                }}
                className="mt-4 text-[#1A73E8] hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
