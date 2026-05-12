import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import userLogo from "../assets/user.jpg";
import { ShoppingCart, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { setCart } from "@/redux/productSlice";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const Cart = () => {
  const { cart } = useSelector((store) => store.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subtotal = cart?.totalPrice || 0;
  const shipping = subtotal > 299 ? 0 : 10;
  const tax = +(subtotal * 0.05).toFixed(2);
  const total = +(subtotal + shipping + tax).toFixed(2);

  const API = `${import.meta.env.VITE_URL}/api/cart`;
  const accessToken = localStorage.getItem("accessToken");

  const loadCart = async () => {
    try {
      const res = await axios.get(API, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.data.success) {
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateQuantity = async (productId, type) => {
    try {
      const res = await axios.put(
        `${API}/update`,
        { productId, type },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (res.data.success) {
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const res = await axios.delete(`${API}/remove`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        data: { productId },
      });
      if (res.data.success) {
        dispatch(setCart(res.data.cart));
        toast.success("Product removed from cart");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  // 🔥 EMPTY STATE (CENTER PERFECT)
  if (!cart?.items?.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
        <div className="bg-pink-100 p-6 rounded-full shadow-sm">
          <ShoppingCart className="w-14 h-14 text-pink-600" />
        </div>

        <h2 className="mt-6 text-2xl font-bold text-gray-800">
          Your cart is empty
        </h2>

        <p className="text-gray-500 mt-2">
          Start adding products to your cart
        </p>

        <Button
          onClick={() => navigate("/products")}
          className="mt-6 bg-pink-600 hover:bg-pink-700 shadow-md"
        >
          Start Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="pt-navbar min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 flex flex-col lg:flex-row gap-8">

        {/* LEFT SIDE */}
        <div className="flex-1 space-y-4">
          {cart.items.map((product) => (
            <Card
              key={product.productId._id}
              className="shadow-sm hover:shadow-md transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4">

                {/* PRODUCT INFO */}
                <div className="flex items-center gap-4">
                  <img
                    src={product.productId?.productImg?.[0]?.url || userLogo}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />

                  <div>
                    <h3 className="font-semibold text-sm sm:text-base text-gray-800 line-clamp-2">
                      {product.productId.productName}
                    </h3>

                    <p className="text-pink-600 font-semibold text-sm mt-1">
                      ₹{product.productId.productPrice}
                    </p>
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex items-center justify-between sm:justify-end gap-4">

                  {/* QUANTITY */}
                  <div className="flex items-center gap-2 border rounded-lg px-2 py-1">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(product.productId._id, "decrease")
                      }
                      className="px-2 text-lg"
                    >
                      -
                    </button>

                    <span className="min-w-[20px] text-center font-medium">
                      {product.quantity}
                    </span>

                    <button
                      onClick={() =>
                        handleUpdateQuantity(product.productId._id, "increase")
                      }
                      className="px-2 text-lg"
                    >
                      +
                    </button>
                  </div>

                  {/* REMOVE */}
                  <button
                    onClick={() => handleRemove(product.productId._id)}
                    className="flex items-center gap-1 text-red-500 text-sm hover:underline"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* RIGHT SIDE SUMMARY */}
        <Card className="w-full lg:w-[380px] h-fit sticky top-20 shadow-sm">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹{shipping}</span>
            </div>

            <div className="flex justify-between">
              <span>Tax</span>
              <span>₹{tax}</span>
            </div>

            <Separator />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <Button
              className="w-full bg-pink-600 hover:bg-pink-700 mt-4 shadow"
              onClick={() => navigate("/address")}
            >
              PLACE ORDER
            </Button>

            <Button variant="outline" className="w-full">
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Cart;