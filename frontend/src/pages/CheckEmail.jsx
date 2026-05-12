import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const CheckEmail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || "your email";

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-6">
                <div className="bg-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                    <Mail className="w-10 h-10 text-pink-600" />
                </div>

                <h1 className="text-3xl font-bold text-gray-800">Check your email</h1>
                
                <p className="text-gray-600">
                    We've sent a verification link to <br/>
                    <span className="font-semibold text-gray-800">{email}</span>
                </p>

                <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg text-sm text-blue-800">
                    Please click on the link in the email to verify your account. If you don't see it, check your <b>spam folder</b>.
                </div>

                <Button 
                    onClick={() => navigate("/login")}
                    className="w-full bg-pink-600 hover:bg-pink-700 h-12 text-lg"
                >
                    Back to Login
                </Button>

                <button 
                    onClick={() => navigate("/signup")}
                    className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-pink-600 transition-colors mx-auto"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Use another email
                </button>
            </div>
        </div>
    );
};

export default CheckEmail;
