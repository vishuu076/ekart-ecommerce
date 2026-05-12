import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#FDF2F7]/30 flex flex-col md:flex-row items-start pt-navbar">
      {/* Sidebar */}
      <Sidebar />

      {/* Right Content */}
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-10 min-h-[calc(100vh-80px)] overflow-x-hidden flex justify-center">
        <div className="w-full max-w-7xl py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
