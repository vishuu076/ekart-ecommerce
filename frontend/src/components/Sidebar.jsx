import { LayoutDashboard, Menu, PackagePlus, PackageSearch, Users, X } from "lucide-react";
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-4 top-24 z-20 rounded-md border bg-white p-2 shadow-sm md:hidden"
      >
        <Menu className="h-5 w-5 text-gray-700" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
        fixed left-0 top-0 z-40 h-screen w-[280px] border-r border-pink-100 bg-pink-50 transition-transform duration-300 ease-in-out 
        md:sticky md:top-0 md:h-[calc(100vh-80px)] md:block md:w-[300px] md:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex h-full flex-col px-4 pt-10 md:pt-8 space-y-1 relative overflow-y-auto scrollbar-hide">
          {/* Close button for mobile */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-20 p-2 text-gray-500 md:hidden"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="px-4 mb-4">
            <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-[2px]">
              Admin Panel
            </h2>
          </div>

          <SidebarLink to="/dashboard/sales" onClick={() => setIsOpen(false)} icon={<LayoutDashboard size={20} />} label="Overview" />
          
          <div className="pt-4 px-4 mb-2">
            <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-[2px]">
              Inventory
            </h2>
          </div>
          <SidebarLink to="/dashboard/add-product" onClick={() => setIsOpen(false)} icon={<PackagePlus size={20} />} label="Add Product" />
          <SidebarLink to="/dashboard/products" onClick={() => setIsOpen(false)} icon={<PackageSearch size={20} />} label="All Products" />
          
          <div className="pt-4 px-4 mb-2">
            <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-[2px]">
              Users & Orders
            </h2>
          </div>
          <SidebarLink to="/dashboard/users" onClick={() => setIsOpen(false)} icon={<Users size={20} />} label="Manage Users" />
          <SidebarLink to="/dashboard/orders" onClick={() => setIsOpen(false)} icon={<FaRegEdit size={18} />} label="Manage Orders" />
        </div>
      </aside>
    </>
  );
};

const SidebarLink = ({ to, icon, label, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center gap-3 rounded-lg px-4 py-3 text-[14px] font-semibold transition-all duration-200
       ${
         isActive
           ? "bg-pink-600 text-white shadow-md shadow-pink-200"
           : "text-gray-600 hover:bg-white hover:shadow-sm hover:text-pink-600"
       }`
    }
  >
    <span className="">{icon}</span>
    <span>{label}</span>
  </NavLink>
);

export default Sidebar;
