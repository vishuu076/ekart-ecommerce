import React, { use } from "react";
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
import { Eye , EyeOff, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const SignUp = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [formData, setFormData] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => {
            return {
                ...prevData,
                [name]: value,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try{
            setLoading(true);
            const res = await axios.post("http://localhost:8000/api/auth/register", formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(res.data.success){
                navigate("/verify");
                toast.success(res.data.message)
            }
        }catch(err){
            console.log(err);
            toast.error(err.response.data.message);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-pink-100">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Create your account</CardTitle>
                    <CardDescription>
                        Enter given details to create your account
                    </CardDescription>
                </CardHeader>

                <CardContent>
                        <div className="flex flex-col gap-3">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        placeholder="John"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        placeholder="Doe"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="m@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <div className="relative">
                                    <Input id="password" 
                                    name="password" 
                                    placeholder= "Create a strong password"
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={handleChange}
                                     required />
                                     {
                                        showPassword ? <EyeOff className="w-5 h-5 text-gray-700 absolute right-5 bottom-2" onClick={() => setShowPassword(false)} /> :
                                         <Eye className="w-5 h-5 text-gray-700 absolute right-2 top-2" onClick={() => setShowPassword(true)} />
                                     }
                                </div>
                            </div>
                        </div>
                </CardContent>

                <CardFooter className="flex-col gap-2">
                    <Button  onClick={handleSubmit} className="w-full cursor-pointer bg-pink-600 hover:bg-pink-500" >
                       {loading?<><Loader2 className="h-4 w-4 animate-spin mr-2"/>Please wait...</> : "Sign Up"}
                    </Button>
                   <p className="text-gray-700 sm">
                    Already have an account? <a href="/login" className="hover:underline cursor-pointer text-pink-800">Login</a>
                   </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default SignUp;
