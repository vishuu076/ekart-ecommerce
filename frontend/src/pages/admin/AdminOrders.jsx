import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_URL}/api/orders/all`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        if (data.success) setOrders(data.orders);
      } catch (error) {
        console.error("❌ Failed to fetch admin orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [accessToken]);

  if (loading) {
    return (
      <div className="py-20 text-center text-sm text-gray-500">
        Loading all orders...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-gray-800">
        All Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-sm text-gray-500">No orders found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs font-semibold uppercase text-gray-600">
              <tr>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Products</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-xs text-gray-600">
                    {order._id}
                  </td>

                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-800">
                      {order.user?.name || "User"}
                    </div>
                    <div className="text-xs text-gray-500">
                      {order.user?.email}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    {order.products.map((p, idx) => (
                      <div key={idx} className="text-xs text-gray-700">
                        {p.productName} × {p.quantity}
                      </div>
                    ))}
                  </td>

                  <td className="px-4 py-3 font-semibold text-gray-900">
                    ₹{order.amount.toLocaleString("en-IN")}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                        order.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-xs text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
