import React from "react";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ userOrder }) => {
  const navigate = useNavigate();

  if (!userOrder || userOrder.length === 0) {
    return (
      <p className="text-center py-20 text-gray-500">
        No orders found
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {userOrder.map((order) => (
        <div
          key={order._id}
          className="bg-white border rounded-xl shadow-sm p-5"
        >
          {/* TOP */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-medium text-gray-800 break-all">
                {order._id}
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-500">Amount</p>
              <p className="font-semibold">
                {order.currency} {order.amount.toFixed(2)}
              </p>
              <span
                className={`inline-block mt-2 text-xs px-2 py-1 rounded-md text-white ${
                  order.status === "Paid"
                    ? "bg-green-500"
                    : order.status === "Failed"
                    ? "bg-red-500"
                    : "bg-orange-400"
                }`}
              >
                {order.status}
              </span>
            </div>
          </div>

          {/* USER */}
          <div className="mb-4 text-sm text-gray-600">
            <p>
              <span className="font-medium text-gray-800">User:</span>{" "}
              {order.user?.firstName} {order.user?.lastName}
            </p>
            <p>Email: {order.user?.email}</p>
          </div>

          {/* PRODUCTS */}
          <div className="border-t pt-4">
            <p className="font-medium mb-3 text-gray-800">Products</p>

            <div className="space-y-3">
              {order.products.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4"
                >
                  {/* IMAGE */}
                  <img
                    onClick={() =>
                      navigate(`/products/${product?.productId?._id}`)
                    }
                    src={product?.productId?.productImg[0]?.url}
                    className="w-14 h-14 object-cover rounded-md cursor-pointer border"
                    alt=""
                  />

                  {/* DETAILS */}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 line-clamp-2">
                      {product.productId?.productName}
                    </p>
                    <p className="text-xs text-gray-500">
                      Qty: {product.quantity}
                    </p>
                  </div>

                  {/* PRICE */}
                  <div className="text-sm font-semibold">
                    ₹{product.productId?.productPrice}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderCard;