import { Input } from "@/components/ui/input";
import axios from "axios";
import { Edit, Eye, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import userLogo from "../../assets/user.jpg";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const getAllUsers = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/auth/all-users`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (res.data.success) {
        setUsers(res.data.users);
      }
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          User Management
        </h1>
        <p className="text-sm text-gray-500">
          View and manage registered users
        </p>
      </div>

      {/* Search */}
      <div className="relative w-full sm:max-w-sm">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 bg-white"
          placeholder="Search users..."
        />
      </div>

      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className="bg-white border rounded-lg p-4 flex flex-col gap-4"
          >
            <div className="flex items-center gap-3">
              <img
                src={user.profilePic || userLogo}
                className="w-14 h-14 rounded-full object-cover border"
                alt="user"
              />
              <div>
                <h2 className="font-semibold text-gray-800">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline"
                size="sm"
                className="cursor-pointer"
                onClick={() => navigate(`/dashboard/users/${user._id}`)}
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>

              <Button className="cursor-pointer" variant="outline"
                size="sm"
                onClick={() =>
                  navigate(`/dashboard/users/orders/${user._id}`)
                }
              >
                <Eye className="w-4 h-4 mr-1" />
                Orders
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;
