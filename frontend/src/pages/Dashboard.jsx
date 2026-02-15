import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 md:ml-[300px] ">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
