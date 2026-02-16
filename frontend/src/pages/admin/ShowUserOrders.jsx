import OrderCard from "@/components/OrderCard";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ShowUserOrders = () => {
  const { userId } = useParams();
  const [userOrder, setUserOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserOrders = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/orders/user-order/${userId}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (res.data.success) {
        setUserOrder(res.data.orders);
      }
    } catch (error) {
      console.error("Failed to fetch user orders", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserOrders();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-sm text-gray-500">
        Loading user orders...
      </div>
    );
  }

  if (!userOrder || userOrder.length === 0) {
    return (
      <div className="py-20 text-center text-sm text-gray-500">
        No orders found for this user.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold text-gray-800">
        User Orders
      </h1>

      <OrderCard userOrder={userOrder} />
    </div>
  );
};

export default ShowUserOrders;
