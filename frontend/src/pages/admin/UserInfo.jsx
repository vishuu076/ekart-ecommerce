import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userLogo from '../../assets/user.jpg'
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast} from "sonner";
import { setUser } from "@/redux/userSlice";


const UserInfo = () => {
    const navigate = useNavigate()
    const [updateUser, setUpdateUser] = React.useState(null)

    const [file, setFile] = React.useState(null)
   // const { user } = useSelector(store => store.user);
    const dispatch = useDispatch()
    const params = useParams();
    const userId = params.id;

    const handleChange = (e) => {
        setUpdateUser({ ...updateUser, [e.target.name]: e.target.value })
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]
        setFile(selectedFile)
        setUpdateUser({ ...updateUser, profilePic: URL.createObjectURL(selectedFile) }) //preview only)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const accessToken = localStorage.getItem("accessToken")
        try {
            //use Formdata for text+file
            const formData = new FormData()
            formData.append("firstName", updateUser.firstName)
            formData.append("lastName", updateUser.lastName)
            formData.append("email", updateUser.email)
            formData.append("phoneNo", updateUser.phoneNo)
            formData.append("address", updateUser.address)
            formData.append("city", updateUser.city)
            formData.append("zipCode", updateUser.zipCode)
            formData.append("role", updateUser.role)

            if (file) {
                formData.append("file", file)// img file for backend multer
            }

            const res = await axios.put(`http://localhost:8000/api/auth/user/update/${userId}`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "content-Type": "multipart/form-data"
                }
            })
            if (res.data.success) {
                toast.success(res.data.message)
                dispatch(setUser(res.data.user))
            }

        } catch (error) {
            console.log(error)
            toast.error("Failed to update profile")

        }
    }

    const getUserDetails = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken")
            const res = await axios.get(`http://localhost:8000/api/auth/get-user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })
            if (res.data.success) {
                setUpdateUser(res.data.user)
            }

        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        getUserDetails()
    }, [])


    return (
        <div className="pt-5 min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col  justify-center items-center min-h-screen bg-gray-100">
                    <div className="flex jusify-between gap-10">
                        <Button onClick={() => navigate(-1)}><ArrowLeft /></Button>
                        <h1 className="font-bold mb-7 text-2xl text-gray-800">Update Profile</h1>
                    </div>
                    <div className="w-full flex gsp-10 justify-between items-start px-7 max-w-2xl">
                        {/* Profile picture */}
                        <div className="flex flex-col items-center mr-4">
                            <img src={updateUser?.profilePic || userLogo} alt="profile" className="w-50 h-50 rounded-full object-cover border-4 border-pink-800" />
                            <Label className="mt-4 cursor-pointer bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700">Change Picture
                                <Input type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </Label>
                        </div>
                        {/* Profile details form */}
                        <form onSubmit={handleSubmit} className="space-y-4 shadow-lg p-5 rounded-lg bg-white">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="block text-sm font-medium">First Name</Label>
                                    <Input type="text"
                                        placeholder="First Name"
                                        value={updateUser?.firstName}
                                        onChange={handleChange}
                                        name="firstName"
                                        className="w-full border rounded-lg px-3 py-2 mt-1" />
                                </div>
                                <div>
                                    <Label className="block text-sm font-medium">Last Name</Label>
                                    <Input type="text"
                                        placeholder="Last Name"
                                        value={updateUser?.lastName}
                                        onChange={handleChange}
                                        name="lastName"
                                        className="w-full border rounded-lg px-3 py-2 mt-1"
                                    />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <Label className="block text-sm font-medium">Email</Label>
                                    <Input type="email"
                                        placeholder="Email" name="email"
                                        disabled
                                        value={updateUser?.email}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-3 py-2 mt-1 bg-gray-100 cursor-not-allowed" />
                                </div>
                            </div>
                            <div>
                                <Label className="block text-sm font-medium">Phone Number</Label>
                                <Input type="phonenumber"
                                    placeholder="Enter your Contact No "
                                    name="phoneNo"
                                    value={updateUser?.phoneNo}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-3 py-2 mt-1" />
                            </div>
                            <div>
                                <Label className="block text-sm font-medium">Address</Label>
                                <Input type="text"
                                    placeholder="Enter your Address"
                                    name="address"
                                    value={updateUser?.address}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-3 py-2 mt-1" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="block text-sm font-medium">City</Label>
                                    <Input type="text"
                                        placeholder="Enter your city"
                                        name="city"
                                        value={updateUser?.city}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-3 py-2 mt-1" />
                                </div>
                                <div>
                                    <Label className="block text-sm font-medium">Zip Code</Label>
                                    <Input type="text"
                                        placeholder="Enter your ZipCode"
                                        name="zipCode"
                                        value={updateUser?.zipCode}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-3 py-2 mt-1" />
                                </div>
                            </div>
                            <div className="flex gap-3 items-center">
                                <Label className='block text-sm font-medium'>Role</Label>
                                <RadioGroup
                                 value={updateUser?.role}
                                 onValueChange={(value) => setUpdateUser({ ...updateUser, role: value })}
                                  className='flex items-center'>
                                    <div className="flex items-center spwace-x-2">
                                        <RadioGroupItem value="user" id="user" />
                                        <Label htmlFor="user">User</Label>
                                    </div>
                                    <div className="flex items-center spwace-x-2">
                                        <RadioGroupItem value="admin" id="admin" />
                                        <Label htmlFor="user">Admin</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <Button type="submit" className="w-full mt-4 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-lg cursor-pointer">Update Profile</Button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInfo