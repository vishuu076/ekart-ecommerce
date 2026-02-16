import React from "react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { setCart } from "@/redux/productSlice";
import { ShoppingCart } from "lucide-react";

const ProductCard = ({ product, loading }) => {
  const { productImg, productPrice, productName } = product;
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add to cart");
    }
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition hover:shadow-md">
      
      {/* Image */}
      <div className="aspect-square w-full overflow-hidden cursor-pointer bg-gray-100">
        {loading ? (
          <Skeleton className="h-full w-full" />
        ) : (
          <img
            onClick={() => navigate(`/products/${product._id}`)}
            src={productImg[0]?.url}
            alt={productName}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        )}
      </div>

      {/* Content */}
      {loading ? (
        <div className="space-y-2 px-4 py-3">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-9 w-full" />
        </div>
      ) : (
        <div className="flex flex-col gap-2 px-4 py-3">
          <h2 className="line-clamp-2 h-12 text-sm font-medium text-gray-800">
            {productName}
          </h2>

          <p className="text-lg font-semibold text-gray-900">
            ₹{Number(productPrice).toLocaleString("en-IN")}
          </p>

          <Button
            onClick={() => addToCart(product._id)}
            className="mt-2 flex items-center gap-2 bg-pink-600 text-white hover:bg-pink-700"
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
