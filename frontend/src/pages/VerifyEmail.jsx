import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner"; // Agar aap sonner use kar rahe hain

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUserEmail = async () => {
      try {
        // Backend URL check karein (VITE_URL ke saath /api/auth zaroori hai)
        const response = await axios.get(
          `${import.meta.env.VITE_URL}/api/auth/verify-email/${token}`
        );

        if (response.data.success) {
          toast.success("Email Verified Successfully!");
          setTimeout(() => navigate("/login"), 3000);
        }
      } catch (error) {
        console.error("Verification Error:", error);
        toast.error(error.response?.data?.message || "Verification failed");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      verifyUserEmail();
    }
  }, [token, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="p-10 bg-white shadow-xl rounded-2xl text-center">
        <h1 className="text-2xl font-bold text-pink-600 mb-4">
          {loading ? "Verifying your email..." : "Verification Processed"}
        </h1>
        <p className="text-gray-600">
          Token: <span className="font-mono bg-gray-100 p-1">{token}</span>
        </p>
        {loading && (
          <div className="mt-4 animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600 mx-auto"></div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;