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
    <div className="bg-gray-100 mt-10 p-4 rounded-md h-max hidden md:block w-64">
      {/* Search */}
      <Input
        placeholder="search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-white"
      />

      {/* Category */}
      <h1 className="mt-5 font-semibold text-xl">Category</h1>
      <div className="flex flex-col gap-2 mt-3">
        {categories.map((item, index) => (
          <label key={index} className="flex gap-2 items-center">
            <input
              type="radio"
              checked={category === item}
              onChange={() => setCategory(item)}
            />
            {item}
          </label>
        ))}
      </div>

      {/* Brand */}
      <h1 className="mt-5 font-semibold text-xl">Brands</h1>
      <select
        className="bg-white w-full p-2 border rounded-md"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      >
        {brands.map((item, index) => (
          <option key={index} value={item}>
            {item.toUpperCase()}
          </option>
        ))}
      </select>

      {/* Price Range */}
      <h1 className="mt-5 font-semibold text-xl">Price Range</h1>
      <p className="text-sm mb-2">
        ₹{priceRange[0]} - ₹{priceRange[1]}
      </p>

      <input
        type="range"
        min={0}
        max={maxPrice}
        value={priceRange[1]}
        onChange={(e) =>
          setPriceRange([priceRange[0], Number(e.target.value)])
        }
        className="w-full"
      />

      <Button
        onClick={resetFilters}
        className="bg-pink-600 text-white mt-5 w-full"
      >
        Reset Filters
      </Button>
    </div>
  );
};

export default FilterSidebar;
