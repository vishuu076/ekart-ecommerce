import { ShoppingCart } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";
import { toast } from "sonner";

const Navbar = () => {
  const user = useSelector((state) => state.user?.user);
  const cart = useSelector((state) => state.product?.cart);

  const accessToken = localStorage.getItem("accessToken");
  const admin = user?.role === "admin";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/api/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.data.success) {
        dispatch(setUser(null));
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="fixed top-0 z-20 w-full border-b border-pink-200 bg-pink-50/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/Ekart.png"
            alt="Ekart Logo"
            className="h-12 w-auto object-contain"
          />
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <ul className="flex items-center gap-6 text-[15px] font-medium text-gray-800">
            <Link to="/" className="hover:text-pink-600">Home</Link>
            <Link to="/products" className="hover:text-pink-600">Products</Link>

            {user && (
              <Link
                to={`/profile/${user._id}`}
                className="hover:text-pink-600"
              >
                Hello, {user.firstName}
              </Link>
            )}

            {admin && (
              <Link
                to="/dashboard/sales"
                className="hover:text-pink-600"
              >
                Dashboard
              </Link>
            )}
          </ul>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <ShoppingCart className="h-5 w-5 text-gray-800" />
            <span className="absolute -right-3 -top-2 rounded-full bg-pink-600 px-2 text-xs text-white">
              {cart?.items?.length || 0}
            </span>
          </Link>

          {/* Auth Button */}
          {user ? (
            <Button
              onClick={logoutHandler}
              className="bg-pink-600 px-5 text-white hover:bg-pink-700"
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              className="bg-pink-600 px-5 text-white hover:bg-pink-700"
            >
              Login
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
