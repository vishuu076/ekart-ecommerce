import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useParams } from "react-router-dom";
import userLogo from "../assets/user.jpg";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/userSlice";
import MyOrder from "./MyOrders";

const Profile = () => {
  const { user } = useSelector((store) => store.user);
  const { userId } = useParams();

  const [updateUser, setUpdateUser] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    phoneNo: user?.phoneNo,
    address: user?.address,
    city: user?.city,
    zipCode: user?.zipCode,
    profilePic: user?.profilePic,
  });

  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setUpdateUser({
      ...updateUser,
      profilePic: URL.createObjectURL(selectedFile),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");

    try {
      const formData = new FormData();
      formData.append("firstName", updateUser.firstName || "");
      formData.append("lastName", updateUser.lastName || "");
      formData.append("email", updateUser.email || "");
      formData.append("phoneNo", updateUser.phoneNo || "");
      formData.append("address", updateUser.address || "");
      formData.append("city", updateUser.city || "");
      formData.append("zipCode", updateUser.zipCode || "");

      // 🚫 ROLE NOT SENT (VERY IMPORTANT)

      if (file) {
        formData.append("file", file);
      }

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
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-100">
      <Tabs defaultValue="profile" className="max-w-7xl mx-auto">
        <TabsList>
          <TabsTrigger className="cursor-pointer" value="profile">
            Profile
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="orders">
            Orders
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="flex flex-col items-center">
            <h1 className="font-bold mb-7 text-2xl text-gray-800">
              Update Profile
            </h1>

            <div className="w-full flex gap-10 justify-between items-start px-7 max-w-2xl">
              {/* Profile picture */}
              <div className="flex flex-col items-center">
                <img
                  src={updateUser?.profilePic || userLogo}
                  alt="profile"
                  className="w-40 h-40 rounded-full object-cover border-4 border-pink-800"
                />
                <Label className="mt-4 cursor-pointer bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700">
                  Change Picture
                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </Label>
              </div>

              {/* Profile form */}
              <form
                onSubmit={handleSubmit}
                className="space-y-4 shadow-lg p-5 rounded-lg bg-white"
              >
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    name="firstName"
                    value={updateUser.firstName || ""}
                    onChange={handleChange}
                    placeholder="First Name"
                  />
                  <Input
                    name="lastName"
                    value={updateUser.lastName || ""}
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

                {/* 🔒 ROLE SECTION COMPLETELY REMOVED */}

                <Button className="w-full mt-4 bg-pink-600 hover:bg-pink-700 cursor-pointer">
                  Update Profile
                </Button>
              </form>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="orders">
          <MyOrder />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
