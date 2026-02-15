import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const { token } = useParams();
  const [status, setStatus] = useState("Verifying...");
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_URL}/api/auth/verify-email/${token}`
        );

        if (res.data.success) {
          setStatus("✅ Email verified successfully! Redirecting to login...");
          setTimeout(() => navigate("/login"), 2500);
        } else {
          setStatus("❌ Verification failed");
        }
      } catch (err) {
        setStatus("❌ Invalid or expired verification link");
      }
    };

    if (token) verify();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100">
      <div className="bg-white p-6 rounded-2xl shadow-md text-center max-w-md">
        <h2 className="text-xl font-semibold">{status}</h2>
      </div>
    </div>
  );
};

export default VerifyEmail;
