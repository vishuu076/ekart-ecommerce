import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import userLogo from "../assets/user.jpg"
import { ShoppingCart, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { setCart } from "@/redux/productSlice";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Cart = () => {
    const { cart } = useSelector(store => store.product);

    const subtotal = cart?.totalPrice || 0;
    const shipping = subtotal > 299 ? 0 : 10;
    const tax = +(subtotal * 0.05).toFixed(2);
    const total = +(subtotal + shipping + tax).toFixed(2);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const API = `${import.meta.env.VITE_URL}/api/cart`;
    const accessToken = localStorage.getItem("accessToken");

    const loadCart = async () => {
        try {
            const res = await axios.get(API, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            if (res.data.success) dispatch(setCart(res.data.cart));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        loadCart();
    }, []);

    if (!cart?.items?.length) {
        return (
            <div className="pt-24 min-h-screen flex flex-col items-center justify-center text-center bg-gray-50">
                <div className="bg-pink-100 p-6 rounded-full">
                    <ShoppingCart className="w-16 h-16 text-pink-600" />
                </div>
                <h2 className="mt-6 text-2xl font-bold">Your cart is empty</h2>
                <p className="text-gray-600 mt-2">
                    Looks like you haven’t added anything yet
                </p>
                <Button
                    onClick={() => navigate("/products")}
                    className="mt-6 bg-pink-600 hover:bg-pink-700"
                >
                    Start Shopping
                </Button>
            </div>
        );
    }

    return (
        <div className="pt-24 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* CART ITEMS */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.items.map((item, index) => (
                            <Card key={index} className="p-4">
                                <div className="flex flex-col md:flex-row md:items-center gap-4">

                                    <img
                                        src={item?.productId?.productImg?.[0]?.url || userLogo}
                                        className="w-24 h-24 object-cover rounded"
                                        alt=""
                                    />

                                    <div className="flex-1">
                                        <h3 className="font-semibold">
                                            {item?.productId?.productName}
                                        </h3>
                                        <p className="text-gray-600">
                                            ₹{item?.productId?.productPrice?.toLocaleString("en-IN")}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            onClick={() =>
                                                handleUpdateQuantity(item.productId._id, "decrease")
                                            }
                                        >
                                            −
                                        </Button>
                                        <span className="font-medium">{item.quantity}</span>
                                        <Button
                                            variant="outline"
                                            onClick={() =>
                                                handleUpdateQuantity(item.productId._id, "increase")
                                            }
                                        >
                                            +
                                        </Button>
                                    </div>

                                    <div className="flex flex-col items-end gap-2">
                                        <p className="font-semibold">
                                            ₹{item?.productId?.productPrice?.toLocaleString("en-IN")}
                                        </p>
                                        <button
                                            onClick={() => handleRemove(item.productId._id)}
                                            className="flex items-center gap-1 text-red-500 text-sm hover:underline"
                                        >
                                            <Trash2 className="w-4 h-4" /> Remove
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* ORDER SUMMARY */}
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toLocaleString("en-IN")}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>₹{shipping}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax (5%)</span>
                                    <span>₹{tax}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>₹{total.toLocaleString("en-IN")}</span>
                                </div>

                                <div className="space-y-3 pt-4">
                                    <Button
                                        onClick={() => navigate("/address")}
                                        className="w-full bg-pink-600 hover:bg-pink-700"
                                    >
                                        PLACE ORDER
                                    </Button>
                                    <Button variant="outline" className="w-full">
                                        <Link to="/products">Continue Shopping</Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Cart;
