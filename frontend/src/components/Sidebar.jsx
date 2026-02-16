import { LayoutDashboard, PackagePlus, PackageSearch, Users } from "lucide-react";
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-[300px] border-r border-pink-200 bg-pink-50 md:block">
      <div className="flex h-full flex-col px-6 pt-24 space-y-2">

        <SidebarLink to="/dashboard/sales" icon={<LayoutDashboard />} label="Dashboard" />
        <SidebarLink to="/dashboard/add-product" icon={<PackagePlus />} label="Add Product" />
        <SidebarLink to="/dashboard/products" icon={<PackageSearch />} label="Products" />
        <SidebarLink to="/dashboard/users" icon={<Users />} label="Users" />
        <SidebarLink to="/dashboard/orders" icon={<FaRegEdit />} label="Orders" />

      </div>
    </aside>
  );
};

const SidebarLink = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition
       ${
         isActive
           ? "bg-pink-600 text-white"
           : "text-gray-700 hover:bg-pink-100"
       }`
    }
  >
    <span className="text-lg">{icon}</span>
    <span>{label}</span>
  </NavLink>
);

export default Sidebar;
