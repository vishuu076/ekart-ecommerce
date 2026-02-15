import { ShoppingCart } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";
import { toast } from "sonner";

const Navbar = () => {
  const user = useSelector(state => state.user?.user);
  const cart = useSelector(state => state.product?.cart);

  const accessToken = localStorage.getItem("accessToken");
  const admin = user?.role === "admin";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/logout",
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
    <header className="bg-pink-50/90 backdrop-blur fixed w-full z-20 border-b border-pink-200 h-20">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 h-full">
        <div className="h-20 w-[160px] overflow-hidden flex items-center">
          <img
            src="/Ekart.png"
            alt="Ekart Logo"
            className="h-full w-full object-cover"
          />
        </div>

        <nav className="flex gap-10 justify-between items-center">
          <ul className="flex gap-7 items-center text-lg font-semibold">
            <Link to="/"><li>Home</li></Link>
            <Link to="/products"><li>Products</li></Link>

            {user && (
              <Link to={`/profile/${user._id}`}>
                <li>Hello, {user.firstName}</li>
              </Link>
            )}

            {admin && (
              <Link to="/dashboard/sales">
                <li>Dashboard</li>
              </Link>
            )}
          </ul>

          <Link to="/cart" className="relative">
            <ShoppingCart />
            <span className="bg-pink-500 rounded-full absolute text-white -top-3 -right-5 px-2">
              {cart?.items?.length || 0}
            </span>
          </Link>

          {user ? (
            <Button
              onClick={logoutHandler}
              className="bg-pink-600 text-white cursor-pointer"
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              className="bg-gradient-to-tl from-blue-600 to-purple-600 text-white cursor-pointer"
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
