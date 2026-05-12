import { Menu, ShoppingCart, X, Home, Package, User, LayoutDashboard, LogIn, LogOut } from "lucide-react";
import React from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";
import { toast } from "sonner";

const Navbar = () => {
  const user = useSelector((state) => state.user?.user);
  const cart = useSelector((state) => state.product?.cart);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const accessToken = localStorage.getItem("accessToken");
  const admin = user?.role === "admin";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_URL}/api/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

    
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      dispatch(setUser(null));
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);

      
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      dispatch(setUser(null));
      navigate("/login");
    }
  };


  return (
    <header className="fixed top-0 z-50 w-full border-b border-pink-200 bg-pink-50/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/Ekart.png"
            alt="Ekart Logo"
            className="h-18 w-auto object-contain"
          />
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-4 sm:gap-8">
          <ul className="hidden md:flex items-center gap-8 text-[14px] font-semibold text-gray-700">
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => `transition-colors hover:text-pink-600 relative py-2 ${isActive ? "text-pink-600 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-pink-600 after:rounded-full" : ""}`}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/products" 
                className={({ isActive }) => `transition-colors hover:text-pink-600 relative py-2 ${isActive ? "text-pink-600 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-pink-600 after:rounded-full" : ""}`}
              >
                Products
              </NavLink>
            </li>

            {user && (
              <li>
                <NavLink
                  to={`/profile/${user._id}`}
                  className={({ isActive }) => `transition-colors hover:text-pink-600 relative py-2 ${isActive ? "text-pink-600 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-pink-600 after:rounded-full" : ""}`}
                >
                  Account
                </NavLink>
              </li>
            )}

            {admin && (
              <li>
                <NavLink
                  to="/dashboard/sales"
                  className={({ isActive }) => `transition-colors hover:text-pink-600 relative py-2 ${isActive ? "text-pink-600 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-pink-600 after:rounded-full" : ""}`}
                >
                  Dashboard
                </NavLink>
              </li>
            )}
          </ul>

          <div className="flex items-center gap-5 sm:gap-7">
            {/* Cart */}
            <Link to="/cart" className="relative group p-2 rounded-full hover:bg-pink-100 transition-colors">
              <ShoppingCart className="h-[22px] w-[22px] text-gray-700 group-hover:text-pink-600 transition-colors" />
              {cart?.items?.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-pink-600 text-[10px] font-bold text-white shadow-sm ring-2 ring-pink-50">
                  {cart.items.length}
                </span>
              )}
            </Link>

            {/* Auth Button (Desktop) */}
            <div className="hidden sm:block">
              {user ? (
                <Button
                  onClick={logoutHandler}
                  className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 shadow-md shadow-pink-100 transition-all active:scale-95"
                >
                  Logout
                </Button>
              ) : (
                <Button
                  onClick={() => navigate("/login")}
                  className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 shadow-md shadow-pink-100 transition-all active:scale-95"
                >
                  Login
                </Button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-pink-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-pink-100 bg-white/95 backdrop-blur-md animate-in slide-in-from-top duration-300">
          <div className="px-6 py-6 flex flex-col gap-6">
            <ul className="flex flex-col gap-4 text-[15px] font-semibold text-gray-700">
              <li>
                <NavLink 
                  to="/" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl transition-colors ${isActive ? "bg-pink-50 text-pink-600" : "hover:bg-gray-50"}`}
                >
                  <Home size={20} />
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/products" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl transition-colors ${isActive ? "bg-pink-50 text-pink-600" : "hover:bg-gray-50"}`}
                >
                  <Package size={20} />
                  Products
                </NavLink>
              </li>
              {user && (
                <li>
                  <NavLink 
                    to={`/profile/${user._id}`} 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl transition-colors ${isActive ? "bg-pink-50 text-pink-600" : "hover:bg-gray-50"}`}
                  >
                    <User size={20} />
                    Profile
                  </NavLink>
                </li>
              )}
              {admin && (
                <li>
                  <NavLink 
                    to="/dashboard/sales" 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl transition-colors ${isActive ? "bg-pink-50 text-pink-600" : "hover:bg-gray-50"}`}
                  >
                    <LayoutDashboard size={20} />
                    Admin Dashboard
                  </NavLink>
                </li>
              )}
            </ul>
            
            <div className="pt-4 border-t border-gray-100">
              {user ? (
                <button
                  onClick={() => {
                    logoutHandler();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-3 w-full bg-pink-100 text-pink-600 py-3.5 rounded-xl font-bold hover:bg-pink-200 transition-colors"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    navigate("/login");
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-3 w-full bg-pink-600 text-white py-3.5 rounded-xl font-bold hover:bg-pink-700 shadow-md shadow-pink-100 transition-colors"
                >
                  <LogIn size={20} />
                  Login to Account
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
