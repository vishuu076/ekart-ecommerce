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
            const res = await axios.post('http://localhost:8000/api/cart/add', { productId }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (res.data.success) {
                toast.success('product added to cart')
                dispatch(setCart(res.data.cart))
            }
        } catch (eror) {
            console.log(errro);
        }
    }
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold text-gray-800">{product.productName}</h1>
            <p className="text-gray-600">{product.category} | {product.brand}</p>
            <h2 className="text-2xl font-bold text-pink-500">₹{product.productPrice}</h2>
            <p className="line-clamp-12 text-muted-foreground">{product.productDesc}</p>
            <div className="flex gap-2 items-center w-[300px]">
                <p className="text-gray-800 font-semibold">Quantity :</p>
                <Input type="number" min="1" defaultValue="1" className="w-14" />
            </div>
            <Button onClick={()=>addToCart(product._id)} className="bg-pink-500 hover:bg-pink-600 w-max text-white cursor-pointer">Add to Cart</Button>
        </div>
    )
}

export default ProductDesc