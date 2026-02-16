import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setCart } from "@/redux/productSlice";

const ProductDesc = ({ product }) => {
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();

  const addToCart = async (productId) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/api/cart/add`,
        { productId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (res.data.success) {
        toast.success("Product added to cart");
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) return null;

  return (
    <div className="flex flex-col gap-6">
      {/* Product title */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          {product.productName}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {product.category} • {product.brand}
        </p>
      </div>

      {/* Price */}
      <h2 className="text-2xl font-semibold text-pink-600">
        ₹{Number(product.productPrice).toLocaleString("en-IN")}
      </h2>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed">
        {product.productDesc}
      </p>

      {/* Quantity */}
      <div className="flex items-center gap-4">
        <span className="font-medium text-gray-800">Quantity</span>
        <Input
          type="number"
          min="1"
          defaultValue="1"
          className="w-20"
        />
      </div>

      {/* CTA */}
      <div className="flex gap-4 mt-4">
        <Button
          onClick={() => addToCart(product._id)}
          className="bg-pink-600 hover:bg-pink-700 text-white px-8 cursor-pointer"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductDesc;
