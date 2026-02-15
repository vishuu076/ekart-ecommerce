import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { Tooltip, AreaChart, Area, ResponsiveContainer, XAxis, YAxis, } from "recharts";
import React, { useEffect } from "react";

const AdminSales = () => {
    const [stats, setStats] = React.useState({
        totalUsers: 0,
        totalProducts: 0,
        totalOrders: 0,
        totalSales: 0,
        salesByData: []
    })

    const fetchStats = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken")
            const res = await axios.get(`${import.meta.env.VITE_URL}/api/orders/sales`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })


            if (res.data && res.data.success) {
                setStats({
                    totalUsers: res.data.totalUsers,
                    totalProducts: res.data.totalProducts,
                    totalOrders: res.data.totalOrders,
                    totalSales: res.data.totalSales,
                    salesByData: res.data.sales   
                })
            } else {
                console.warn("Sales data missing:", res.data)
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchStats()
    }, [])

    useEffect(() => {
        console.log("FINAL CHART DATA 👉", stats.salesByData)
    }, [stats.salesByData])

    return (
        <div className="pl-[100px] bg-gray-100 py-20 pr-20 mx-auto px-4" >
            <div className="p-6 grid gap-6 lg:grid-cols-4">
                <Card className="bg-pink-500 text-white shadow">
                    <CardHeader>
                        <CardTitle>Total Users</CardTitle>
                    </CardHeader>
                    <CardContent className="text-2xl font-bold">{stats.totalUsers}</CardContent>
                </Card>
                <Card className="bg-pink-500 text-white shadow">
                    <CardHeader>
                        <CardTitle>Total Products</CardTitle>
                    </CardHeader>
                    <CardContent className="text-2xl font-bold">{stats.totalProducts}</CardContent>
                </Card>
                <Card className="bg-pink-500 text-white shadow">
                    <CardHeader>
                        <CardTitle>Total Orders</CardTitle>
                    </CardHeader>
                    <CardContent className="text-2xl font-bold">{stats.totalOrders}</CardContent>
                </Card>
                <Card className="bg-pink-500 text-white shadow">
                    <CardHeader>
                        <CardTitle>Total Sales</CardTitle>
                    </CardHeader>
                    <CardContent className="text-2xl font-bold">{stats.totalSales}</CardContent>
                </Card>
                <Card className="bg-pink-500 text-white shadow">
                    <CardHeader>
                        <CardTitle>Total Users</CardTitle>
                    </CardHeader>
                    <CardContent className="text-2xl font-bold">{stats.totalUsers}</CardContent>
                </Card>


                {/* sales chart */}
                <Card className="lg:col-span-4">
                    <CardHeader>
                        <CardTitle>Sales (Last 30 Days)</CardTitle>
                    </CardHeader>
                    <CardContent style={{ height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={stats.salesByData}>
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Area
                                    type="monotone"
                                    dataKey="amount"
                                    stroke="#47286f"
                                    fill="#47286f"
                                />
                            </AreaChart>
                        </ResponsiveContainer>

                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default AdminSales