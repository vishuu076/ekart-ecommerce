import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    const verify = async () => {
      try {
        // Console log check karne ke liye ki token mil raha hai ya nahi
        console.log("Token from URL:", token);
        
        const res = await axios.get(
          `${import.meta.env.VITE_URL}/api/auth/verify-email/${token}`
        );

        if (res.data.success) {
          setMessage("Email Verified! Redirecting to login...");
          setTimeout(() => navigate("/login"), 3000);
        }
      } catch (err) {
        console.error("Verification Error:", err);
        setMessage(err.response?.data?.message || "Verification failed. Link might be expired.");
      }
    };

    if (token) {
      verify();
    } else {
      setMessage("No token found in URL.");
    }
  }, [token, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">{message}</h2>
        {message.includes("Verifying") && <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600 mx-auto"></div>}
      </div>
    </div>
  );
};

export default VerifyEmail;