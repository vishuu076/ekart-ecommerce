import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar (fixed) */}
      <Sidebar />

      {/* Main Content */}
      <div className="md:ml-[300px] pt-20 p-6 overflow-y-auto min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
