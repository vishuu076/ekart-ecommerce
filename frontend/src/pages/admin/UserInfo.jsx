import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userLogo from "../../assets/user.jpg";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";

const UserInfo = () => {
  const navigate = useNavigate();
  const { id: userId } = useParams();
  const dispatch = useDispatch();

  const [updateUser, setUpdateUser] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setUpdateUser({
      ...updateUser,
      profilePic: URL.createObjectURL(selectedFile),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      const formData = new FormData();

      Object.entries(updateUser).forEach(([key, value]) => {
        if (key !== "profilePic") formData.append(key, value || "");
      });

      if (file) formData.append("file", file);

      const res = await axios.put(
        `${import.meta.env.VITE_URL}/api/auth/user/update/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
      }
    } catch {
      toast.error("Failed to update profile");
    }
  };

  const getUserDetails = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/auth/get-user/${userId}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (res.data.success) setUpdateUser(res.data.user);
    } catch {
      toast.error("Failed to load user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-sm text-gray-500">
        Loading user details...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft />
        </Button>
        <h1 className="text-xl font-semibold text-gray-800">
          Update User Profile
        </h1>
      </div>

      {/* Content */}
      <div className="grid gap-6 md:grid-cols-[200px_1fr] bg-white p-6 rounded-lg border">
        {/* Profile Picture */}
        <div className="flex flex-col items-center gap-4">
          <img
            src={updateUser?.profilePic || userLogo}
            className="w-32 h-32 rounded-full object-cover border"
            alt="profile"
          />
          <Label className="cursor-pointer text-sm text-pink-600 font-medium">
            Change Photo
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </Label>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              name="firstName"
              value={updateUser.firstName}
              onChange={handleChange}
              placeholder="First Name"
            />
            <Input
              name="lastName"
              value={updateUser.lastName}
              onChange={handleChange}
              placeholder="Last Name"
            />
          </div>

          <Input value={updateUser.email} disabled />

          <Input
            name="phoneNo"
            value={updateUser.phoneNo || ""}
            onChange={handleChange}
            placeholder="Phone Number"
          />

          <Input
            name="address"
            value={updateUser.address || ""}
            onChange={handleChange}
            placeholder="Address"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              name="city"
              value={updateUser.city || ""}
              onChange={handleChange}
              placeholder="City"
            />
            <Input
              name="zipCode"
              value={updateUser.zipCode || ""}
              onChange={handleChange}
              placeholder="Zip Code"
            />
          </div>

          <div className="flex items-center gap-4">
            <Label className="text-sm">Role</Label>
            <RadioGroup
              value={updateUser.role}
              onValueChange={(value) =>
                setUpdateUser({ ...updateUser, role: value })
              }
              className="flex gap-4"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="user" />
                <Label>User</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="admin" />
                <Label>Admin</Label>
              </div>
            </RadioGroup>
          </div>

          <Button className="bg-pink-600 hover:bg-pink-700 w-full">
            Update Profile
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UserInfo;
