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
    <div className="pt-24 pb-10 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          My Orders
        </h1>

        {loading ? (
          <p className="text-gray-500">Loading your orders...</p>
        ) : userOrder.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            You haven’t placed any orders yet.
          </div>
        ) : (
          <OrderCard userOrder={userOrder} />
        )}
      </div>
    </div>
  );
};

export default MyOrders;
