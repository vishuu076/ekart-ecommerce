const Dashboard = () => {
  return (
    <div className="bg-gray-50 min-h-screen overflow-hidden">
      <Sidebar />

      {/* RIGHT CONTENT */}
      <div className="md:ml-[300px] pt-24 px-6 min-h-screen overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
