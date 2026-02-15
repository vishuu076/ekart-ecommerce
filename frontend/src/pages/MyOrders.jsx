import OrderCard from "@/components/OrderCard";
import axios from "axios";
import React, { useEffect } from "react";

const MyOrders = () => {
    const [userOrder, setUserOrder] = React.useState([])


    const getUserOrders = async () => {
        const accessToken = localStorage.getItem("accessToken")
        const res = await axios.get(`${import.meta.env.VITE_URL}/api/orders/myorder`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (res.data.success) {
            setUserOrder(res.data.orders)
        }
    }

    useEffect(() => {
        getUserOrders()
    }, [])
    return (
        <>
            <OrderCard userOrder={userOrder}/>
        </>
    )
}

export default MyOrders