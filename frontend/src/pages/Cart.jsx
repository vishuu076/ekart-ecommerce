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
    const { cart } = useSelector(store => store.product)

    const subtotal = cart?.totalPrice || 0;
    const shipping = subtotal > 299 ? 0 : 10;
    const tax = +(subtotal * 0.05).toFixed(2);
    const total = +(subtotal + shipping + tax).toFixed(2);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const API = `${import.meta.env.VITE_URL}/api/cart`
    const accessToken = localStorage.getItem("accessToken")

    const loadCart = async () => {
        try {
            const res = await axios.get(API, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (res.data.success) {
                dispatch(setCart(res.data.cart))
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdateQuantity = async (productId, type) => {
        try {
            const res = await axios.put(`${API}/update`, { productId, type }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (res.data.success) {
                dispatch(setCart(res.data.cart))
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleRemove = async (productId) => {
        try {
            const res = await axios.delete(`${API}/remove`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                data: { productId }
            });
            if (res.data.success) {
                dispatch(setCart(res.data.cart))
                toast.success('product removed from cart')
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadCart()
    }, [dispatch])


    return (
        <div className="pt-20 bg-gray-50 min-h-screen">
            {
                cart?.items?.length > 0 ? <div className="max-w-7xl mx-auto">
                    <h1 className="text-2xl font-bold text-gray-800 mb-7">Shopping Cart</h1>
                    <div className="max-w-7xl mx-auto flex gap-7">
                        <div className="flex flex-col gap-5 flex-1">
                            {cart?.items?.map((product, index) => {
                                return <Card key={index}>
                                    <div className="flex justify-between items-cener pr-7">
                                        <div className="flex items-center w-[350px]">
                                            <img src={product?.productId?.productImg?.[0]?.url || userLogo} alt="" className="w-25 h-25" />
                                            <div className="w-[280px]">
                                                <h1 className="font-semibold truncate">{product?.productId?.productName}</h1>
                                                <p><p>
                                                    ₹{Number(product?.productId?.productPrice).toLocaleString("en-IN")}
                                                </p>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-5 item-center">
                                            <Button onClick={() => handleUpdateQuantity(product.productId._id, 'decrease')} variant='outline'>-</Button>
                                            <span>{product.quantity}</span>
                                            <Button onClick={() => handleUpdateQuantity(product.productId._id, 'increase')} variant='outline'>+</Button>
                                        </div>
                                        <p>₹{Number(product?.productId?.productPrice).toLocaleString("en-IN")}</p>
                                        <p onClick={() => handleRemove(product?.productId?._id)} className="flex text-red-500 items-center gap-1 cursor-pointer"><Trash2 className="w-4 h-4" />Remove</p>
                                    </div>
                                </Card>
                            })}
                        </div>
                        <div>
                            <Card className='w-[400px]'>
                                <CardHeader>
                                    <CardTitle>Order Summary</CardTitle>
                                </CardHeader>
                                <CardContent className='space-y-4'>
                                    <div className="flex justify-between">
                                        <span>Subtotal ({cart?.items?.length} items) </span>
                                        <span>₹{cart?.totalPrice?.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span>₹{shipping.toLocaleString("en-IN")}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Tax(5%)</span>
                                        <span>₹{tax} </span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between font-bold text-lg">
                                        <span>Total</span>
                                        <span>₹{total.toLocaleString("en-IN")}</span>
                                    </div>
                                    <div className="space-y-3 pt-4">
                                        <div className="flex space-x-2">
                                            <Input placeholder="Promo Code"></Input>
                                            <Button variant='outline'>Apply</Button>
                                        </div>
                                        <Button onClick={() => navigate('/address')} className='w-full bg-pink-600 cursor-pointer'>PLACE ORDER</Button>
                                        <Button variant='outline' className='w-full bg-transprent cursor-pointer'>
                                            <Link to="/products">Continue shopping</Link>
                                        </Button>
                                    </div>
                                    <div className="text-sm text-muted-foreground pt-4">
                                        <p>* Free shipping on orders over 299</p>
                                        <p>* 30-days return policy</p>
                                        <p>* secure checkout with SSL encryption</p>

                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div> : <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
                    <div className="bg-pink-100 p-6 rounded-full">
                        <ShoppingCart className="w-16 h-16 text-pink-600" />
                    </div>
                    <h2 className="mt-6 text-2xl font-bold text-gray-800">Your cart is empty</h2>
                    <p>Looks like you haven't added anything to your cart</p>
                    <Button onClick={() => navigate('/products')} className='mt-6 cursor-pointer bg-pink-600 text-white py-3 px-6 hover:bg-pink-700'>Start Shopping</Button>
                </div>
            }
        </div>
    )
}

export default Cart