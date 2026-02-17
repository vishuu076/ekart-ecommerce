import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setCart } from "@/redux/productSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");
  const [adding, setAdding] = useState(false);

  const addToCart = async () => {
    if (adding) return; // 🚫 double click block
    setAdding(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/api/cart/add`,
        { productId: product._id },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (res.data.success) {
        dispatch(setCart(res.data.cart));
        toast.success("Added to cart");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to add product");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="border rounded-lg p-3 hover:shadow">
      <img
        src={product.productImg[0].url}
        className="w-full h-40 object-cover"
      />
      <h3 className="font-semibold mt-2 truncate">{product.productName}</h3>
      <p className="text-pink-600 font-bold">₹{product.productPrice}</p>

      <Button
        onClick={addToCart}
        disabled={adding}
        className="w-full mt-2 bg-pink-600"
      >
        {adding ? "Adding..." : "Add to Cart"}
      </Button>
    </div>
  );
};

export default ProductCard;
