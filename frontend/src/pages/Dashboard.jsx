import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="md:ml-[300px] pt-20 px-6 pb-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
