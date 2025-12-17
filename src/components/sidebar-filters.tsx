"use client";

import { useState, useEffect } from "react";

interface SidebarFiltersProps {
  selectedBrands: string[];
  setSelectedBrands: (brands: string[]) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  minRating: number | null;
  setMinRating: (rating: number | null) => void;
  availableBrands: string[];
  minPriceLimit: number;
  maxPriceLimit: number;
}

export function SidebarFilters({
  selectedBrands,
  setSelectedBrands,
  priceRange,
  setPriceRange,
  minRating,
  setMinRating,
  availableBrands,
  minPriceLimit,
  maxPriceLimit,
}: SidebarFiltersProps) {
  // Local state for slider to avoid excessive re-renders/filtering while dragging
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);

  useEffect(() => {
    setLocalPriceRange(priceRange);
  }, [priceRange]);

  const handleBrandChange = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const handlePriceChange = (index: 0 | 1, value: number) => {
    const newRange = [...localPriceRange] as [number, number];
    newRange[index] = value;
    setLocalPriceRange(newRange);
  };

  const handlePriceCommit = () => {
    // Ensure min <= max
    let [min, max] = localPriceRange;
    if (min > max) {
        // swap if inverted
        const temp = min;
        min = max;
        max = temp;
    }
    // Clamp to limits
    min = Math.max(minPriceLimit, min);
    max = Math.min(maxPriceLimit, max);

    setLocalPriceRange([min, max]);
    setPriceRange([min, max]);
  };

  return (
    <aside className="w-full lg:w-64 space-y-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm h-fit">
      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">Price Range</h3>
        <div className="space-y-4">
           <div className="flex flex-col space-y-2">
             <label className="text-xs text-gray-600 dark:text-gray-400">Min Price</label>
             <input
               type="range"
               min={minPriceLimit}
               max={maxPriceLimit}
               value={localPriceRange[0]}
               onChange={(e) => handlePriceChange(0, Number(e.target.value))}
               onMouseUp={handlePriceCommit}
               onTouchEnd={handlePriceCommit}
               className="w-full accent-[#1A73E8] cursor-pointer"
             />
             <label className="text-xs text-gray-600 dark:text-gray-400">Max Price</label>
             <input
               type="range"
               min={minPriceLimit}
               max={maxPriceLimit}
               value={localPriceRange[1]}
               onChange={(e) => handlePriceChange(1, Number(e.target.value))}
               onMouseUp={handlePriceCommit}
               onTouchEnd={handlePriceCommit}
               className="w-full accent-[#1A73E8] cursor-pointer"
             />
           </div>
           <div className="flex items-center space-x-2">
             <input
               type="number"
               value={localPriceRange[0]}
               onChange={(e) => handlePriceChange(0, Number(e.target.value))}
               onBlur={handlePriceCommit}
               className="w-full border rounded px-2 py-1 text-sm bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
             />
             <span className="text-gray-500">-</span>
             <input
               type="number"
               value={localPriceRange[1]}
               onChange={(e) => handlePriceChange(1, Number(e.target.value))}
               onBlur={handlePriceCommit}
               className="w-full border rounded px-2 py-1 text-sm bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
             />
           </div>
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">Brand</h3>
        <div className="space-y-2">
          {availableBrands.map((brand) => (
            <label key={brand} className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
                className="rounded border-gray-300 text-[#1A73E8] focus:ring-[#1A73E8] w-4 h-4"
              />
              <span className="text-gray-700 dark:text-gray-300 group-hover:text-[#1A73E8] transition-colors">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Ratings */}
      <div>
        <h3 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">Ratings</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="radio"
                name="rating"
                checked={minRating === rating}
                onChange={() => setMinRating(rating)}
                className="text-[#1A73E8] focus:ring-[#1A73E8] w-4 h-4"
              />
              <span className="text-gray-700 dark:text-gray-300 flex items-center group-hover:text-[#1A73E8] transition-colors">
                {rating}
                <span className="text-[#F8B400] mx-1">★</span> & above
              </span>
            </label>
          ))}
          {minRating !== null && (
             <button
                onClick={() => setMinRating(null)}
                className="text-sm text-[#1A73E8] hover:underline mt-2 font-medium"
             >
                Clear Rating Filter
             </button>
          )}
        </div>
      </div>
    </aside>
  );
}
