import FilterSidebar from "@/components/FilterSidebar";
import React, { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ProductCard from "@/components/ProductCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/redux/productSlice";
import { toast } from "sonner";

const Products = () => {
  const { products = [] } = useSelector((store) => store.product);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [sortOrder, setSortOrder] = useState("");

  const dispatch = useDispatch();

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/product/getallproducts`
      );

      if (res.data.success) {
        const fetchedProducts = res.data.products || [];
        setAllProducts(fetchedProducts);
        dispatch(setProducts(fetchedProducts));

        const maxPrice = Math.max(
          ...fetchedProducts.map((p) => p.productPrice),
          0
        );
        setPriceRange([0, maxPrice]);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    if (!allProducts.length) return;

    let filtered = [...allProducts];

    if (search.trim()) {
      filtered = filtered.filter((p) =>
        p.productName?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (brand !== "All") {
      filtered = filtered.filter((p) => p.brand === brand);
    }

    filtered = filtered.filter(
      (p) =>
        p.productPrice >= priceRange[0] &&
        p.productPrice <= priceRange[1]
    );

    if (sortOrder === "lowToHigh") {
      filtered.sort((a, b) => a.productPrice - b.productPrice);
    } else if (sortOrder === "highToLow") {
      filtered.sort((a, b) => b.productPrice - a.productPrice);
    }

    dispatch(setProducts(filtered));
  }, [search, category, brand, priceRange, sortOrder, allProducts, dispatch]);

  return (
    <div className="pt-24 pb-12 bg-gray-50">
      <div className="max-w-7xl mx-auto flex gap-8 px-4">

        {/* SIDEBAR */}
        <FilterSidebar
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          brand={brand}
          setBrand={setBrand}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          allProducts={allProducts}
        />

        {/* PRODUCTS SECTION */}
        <div className="flex-1 flex flex-col gap-6">

          {/* TOP BAR */}
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800">
              Showing Products
            </h1>

            <Select onValueChange={(value) => setSortOrder(value)}>
              <SelectTrigger className="w-[200px] bg-white shadow-sm">
                <SelectValue placeholder="Sort by price" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="lowToHigh">
                    Price: Low to High
                  </SelectItem>
                  <SelectItem value="highToLow">
                    Price: High to Low
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

        
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.length === 0 ? (
              <p className="text-gray-500 col-span-full text-center">
                No products found
              </p>
            ) : (
              products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  loading={loading}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
