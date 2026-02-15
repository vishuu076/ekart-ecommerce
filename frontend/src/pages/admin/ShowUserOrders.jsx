import OrderCard from "@/components/OrderCard";
import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const ShowUserOrders = () => {
    const params = useParams()
    const [userOrder, setUserOrder] = React.useState(null)

    const getUserOrders = async () => {
        const accessToken = localStorage.getItem("accessToken")
        const res = await axios.get(`${import.meta.env.VITE_URL}/api/orders/user-order/${params.userId}`, {
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
        <div className="pl-[100px] py-20">
            <OrderCard userOrder={userOrder} />
        </div>
    )
}

export default ShowUserOrders