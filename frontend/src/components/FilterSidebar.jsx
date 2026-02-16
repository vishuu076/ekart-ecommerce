import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FilterSidebar = ({
  search,
  setSearch,
  category,
  setCategory,
  brand,
  setBrand,
  priceRange,
  setPriceRange,
  allProducts = [],
}) => {
  const categories = ["All", ...new Set(allProducts.map((p) => p.category))];
  const brands = ["All", ...new Set(allProducts.map((p) => p.brand))];

  const maxPrice = Math.max(
    ...allProducts.map((p) => p.productPrice),
    0
  );

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setBrand("All");
    setPriceRange([0, maxPrice]);
  };

  return (
    <aside className="hidden md:block w-64 rounded-lg border bg-white p-5 shadow-sm">
      
      {/* Search */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-800">Search</h3>
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Category */}
      <div className="mt-6 space-y-3">
        <h3 className="text-sm font-semibold text-gray-800">Category</h3>
        <div className="space-y-2">
          {categories.map((item, index) => (
            <label
              key={index}
              className="flex cursor-pointer items-center gap-2 text-sm text-gray-700"
            >
              <input
                type="radio"
                checked={category === item}
                onChange={() => setCategory(item)}
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div className="mt-6 space-y-2">
        <h3 className="text-sm font-semibold text-gray-800">Brand</h3>
        <select
          className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        >
          {brands.map((item, index) => (
            <option key={index} value={item}>
              {item.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="mt-6 space-y-2">
        <h3 className="text-sm font-semibold text-gray-800">Price Range</h3>
        <p className="text-sm text-gray-600">
          ₹{priceRange[0]} – ₹{priceRange[1]}
        </p>

        <input
          type="range"
          min={0}
          max={maxPrice}
          value={priceRange[1]}
          onChange={(e) =>
            setPriceRange([priceRange[0], Number(e.target.value)])
          }
          className="w-full accent-pink-600"
        />
      </div>

      {/* Reset */}
      <Button
        onClick={resetFilters}
        className="mt-6 w-full bg-pink-600 text-white hover:bg-pink-700"
      >
        Reset Filters
      </Button>
    </aside>
  );
};

export default FilterSidebar;
