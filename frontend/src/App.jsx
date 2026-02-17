import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";

import Home from "./pages/Home.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import VerifyOtp from "./pages/VerifyOtp.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Profile from "./pages/Profile.jsx";
import Products from "./pages/Products.jsx";
import Cart from "./pages/Cart.jsx";

import Dashboard from "./pages/Dashboard.jsx";
import AdminSales from "./pages/admin/AdminSales.jsx";
import AdminProduct from "./pages/admin/AdminProduct.jsx";
import AddProduct from "./pages/admin/AddProduct.jsx";
import AdminOrders from "./pages/admin/AdminOrders.jsx";
import AdminUsers from "./pages/admin/AdminUsers.jsx";
import UserInfo from "./pages/admin/UserInfo.jsx";
import ShowUserOrders from "./pages/admin/ShowUserOrders.jsx";

import SingleProduct from "./pages/SingleProduct.jsx";
import AddressForm from "./pages/AddressForm.jsx";
import MyOrders from "./pages/MyOrders.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";

import { Toaster } from "sonner";
import { setUser } from "./redux/userSlice";

/* ---------------- ROUTER ---------------- */

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
        <Footer />
      </>
    ),
  },
  { path: "/signup", element: <SignUp /> },
  { path: "/login", element: <Login /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/verify-otp/:email", element: <VerifyOtp /> },
  { path: "/reset-password/:email", element: <ResetPassword /> },

  {
    path: "/profile/:userId",
    element: (
      <ProtectedRoute>
        <Navbar />
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/products",
    element: (
      <>
        <Navbar />
        <Products />
      </>
    ),
  },
  {
    path: "/products/:id",
    element: (
      <>
        <Navbar />
        <SingleProduct />
      </>
    ),
  },
  {
    path: "/cart",
    element: (
      <ProtectedRoute>
        <Navbar />
        <Cart />
      </ProtectedRoute>
    ),
  },
  {
    path: "/address",
    element: (
      <ProtectedRoute>
        <AddressForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/my-orders",
    element: (
      <ProtectedRoute>
        <Navbar />
        <MyOrders />
      </ProtectedRoute>
    ),
  },
  {
    path: "/order-success",
    element: (
      <ProtectedRoute>
        <OrderSuccess />
      </ProtectedRoute>
    ),
  },

  {
    path: "/dashboard",
    element: (
      <ProtectedRoute adminOnly={true}>
        <Navbar />
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      { path: "sales", element: <AdminSales /> },
      { path: "add-product", element: <AddProduct /> },
      { path: "products", element: <AdminProduct /> },
      { path: "orders", element: <AdminOrders /> },
      { path: "users", element: <AdminUsers /> },
      { path: "users/:id", element: <UserInfo /> },
      { path: "users/orders/:userId", element: <ShowUserOrders /> },
    ],
  },
]);

/* ---------------- APP ---------------- */

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("accessToken");

    if (savedUser && token) {
      dispatch(setUser(JSON.parse(savedUser)));
    }
  }, [dispatch]);


  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
