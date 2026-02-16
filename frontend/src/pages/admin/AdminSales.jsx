import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import {
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import React, { useEffect, useState } from "react";

const AdminSales = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalSales: 0,
    salesByData: [],
  });

  const fetchStats = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/orders/sales`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (res.data?.success) {
        setStats({
          totalUsers: res.data.totalUsers,
          totalProducts: res.data.totalProducts,
          totalOrders: res.data.totalOrders,
          totalSales: res.data.totalSales,
          salesByData: res.data.sales,
        });
      }
    } catch (error) {
      console.error("Failed to fetch sales stats", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* Top Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Users" value={stats.totalUsers} />
        <StatCard title="Total Products" value={stats.totalProducts} />
        <StatCard title="Total Orders" value={stats.totalOrders} />
        <StatCard
          title="Total Sales"
          value={`₹${stats.totalSales.toLocaleString("en-IN")}`}
        />
      </div>

      {/* Sales Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Sales (Last 30 Days)</CardTitle>
        </CardHeader>
        <CardContent className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stats.salesByData}>
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                stroke="#6b7280"
              />
              <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#db2777"
                fill="#fbcfe8"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSales;

/* ---------- Small reusable stat card ---------- */
const StatCard = ({ title, value }) => (
  <Card className="border bg-white">
    <CardHeader className="pb-2">
      <CardTitle className="text-sm text-gray-500 font-medium">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="text-2xl font-bold text-gray-900">
      {value}
    </CardContent>
  </Card>
);
