import OrderCard from "@/components/OrderCard";
import axios from "axios";
import React, { useEffect } from "react";

const MyOrders = () => {
  const [userOrder, setUserOrder] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const getUserOrders = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/orders/myorder`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.data.success) {
        setUserOrder(res.data.orders);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-5">

      {/* 🔥 FIXED CONTAINER (gap reduce) */}
      <div className="max-w-5xl mx-auto px-4 pt-4 pb-4">

        {/* ❌ REMOVE EXTRA TABS HERE (important) */}
        {/* Agar upar already Profile/Orders dikh rahe hai to yaha kuch mat daal */}

        {/* ✅ ONLY HEADING */}
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          My Orders
        </h1>

        {/* CONTENT */}
        {loading ? (
          <p className="text-center py-20 text-gray-500">
            Loading your orders...
          </p>
        ) : userOrder.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No orders found.
          </div>
        ) : (
          <div className="space-y-5">
            <OrderCard userOrder={userOrder} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;