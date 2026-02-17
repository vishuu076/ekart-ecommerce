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
import { Input } from "@/components/ui/input";

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
    // eslint-disable-next-line
  }, []);

  if (!cart?.items?.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-pink-100 p-6 rounded-full">
          <ShoppingCart className="w-16 h-16 text-pink-600" />
        </div>
        <h2 className="mt-6 text-2xl font-bold">Your cart is empty</h2>
        <p className="text-gray-500">Start adding products</p>
        <Button
          onClick={() => navigate("/products")}
          className="mt-6 bg-pink-600"
        >
          Start Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto flex gap-8">
        {/* LEFT */}
        <div className="flex-1 space-y-4">
          {cart.items.map((product) => (
            <Card key={product.productId._id}>
              <div className="flex justify-between items-center p-4">
                <div className="flex items-center gap-4">
                  <img
                    src={product.productId?.productImg?.[0]?.url || userLogo}
                    className="w-20 h-20 object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">
                      {product.productId.productName}
                    </h3>
                    <p className="text-gray-500">
                      ₹{product.productId.productPrice}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    onClick={() =>
                      handleUpdateQuantity(product.productId._id, "decrease")
                    }
                  >
                    -
                  </Button>
                  <span>{product.quantity}</span>
                  <Button
                    variant="outline"
                    onClick={() =>
                      handleUpdateQuantity(product.productId._id, "increase")
                    }
                  >
                    +
                  </Button>
                </div>

                <p
                  onClick={() => handleRemove(product.productId._id)}
                  className="flex items-center gap-1 text-red-500 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" /> Remove
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* RIGHT */}
        <Card className="w-[380px] h-fit">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
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
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <Button
              className="w-full bg-pink-600 mt-4"
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
