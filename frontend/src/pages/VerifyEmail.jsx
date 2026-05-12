import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const VerifyEmail = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState("verifying"); // verifying, success, error

    useEffect(() => {
        const verify = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_URL}/api/auth/verify-email/${token}`);
                if (res.data.success) {
                    setStatus("success");
                    toast.success(res.data.message);
                }
            } catch (error) {
                setStatus("error");
                toast.error(error.response?.data?.message || "Verification failed");
            }
        };

        if (token) {
            verify();
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
                {status === "verifying" && (
                    <div className="space-y-4">
                        <Loader2 className="w-16 h-16 text-pink-600 animate-spin mx-auto" />
                        <h1 className="text-2xl font-bold text-gray-800">Verifying Email...</h1>
                        <p className="text-gray-600">Please wait while we verify your email address.</p>
                    </div>
                )}

                {status === "success" && (
                    <div className="space-y-4">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                        <h1 className="text-2xl font-bold text-gray-800">Email Verified!</h1>
                        <p className="text-gray-600">Your email has been successfully verified. You can now login to your account.</p>
                        <Button 
                            onClick={() => navigate("/login")}
                            className="w-full bg-pink-600 hover:bg-pink-700 mt-4"
                        >
                            Go to Login
                        </Button>
                    </div>
                )}

                {status === "error" && (
                    <div className="space-y-4">
                        <XCircle className="w-16 h-16 text-red-500 mx-auto" />
                        <h1 className="text-2xl font-bold text-gray-800">Verification Failed</h1>
                        <p className="text-gray-600">The link might be expired or invalid. Please try registering again or contact support.</p>
                        <Button 
                            onClick={() => navigate("/signup")}
                            className="w-full bg-pink-600 hover:bg-pink-700 mt-4"
                        >
                            Back to Signup
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerifyEmail;
