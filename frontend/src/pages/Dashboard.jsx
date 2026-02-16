import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Content Area */}
      <div className="md:ml-[300px] pt-20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
