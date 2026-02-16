import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      {/* RIGHT CONTENT */}
      <div className="md:ml-[300px] pt-24 px-8 min-h-screen overflow-x-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
