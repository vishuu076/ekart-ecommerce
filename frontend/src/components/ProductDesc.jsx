import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setCart } from "@/redux/productSlice";

const ProductDesc = ({ product }) => {
    const accessToken = localStorage.getItem("accessToken")
    const dispatch = useDispatch()
    const addToCart = async (productId) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_URL}/api/cart/add`, { productId }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (res.data.success) {
                toast.success('product added to cart')
                dispatch(setCart(res.data.cart))
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 tracking-tight">{product.productName}</h1>
            <p className="text-sm sm:text-base text-gray-600 font-medium">{product.category} | {product.brand}</p>
            <h2 className="text-xl sm:text-2xl font-bold text-pink-500">₹{product.productPrice}</h2>
            <p className="line-clamp-6 sm:line-clamp-12 text-sm sm:text-base text-muted-foreground leading-relaxed">{product.productDesc}</p>
            <div className="flex gap-4 items-center max-w-[300px]">
                <p className="text-gray-800 font-semibold whitespace-nowrap">Quantity:</p>
                <Input type="number" min="1" defaultValue="1" className="w-16" />
            </div>
            <Button onClick={()=>addToCart(product._id)} className="bg-pink-500 hover:bg-pink-600 sm:w-max text-white cursor-pointer px-8 py-6 text-lg font-semibold shadow-lg transition-transform active:scale-95">Add to Cart</Button>
        </div>
    )
}

export default ProductDesc