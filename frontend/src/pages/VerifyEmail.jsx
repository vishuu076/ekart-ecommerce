import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const VerifyEmail = () => {
  const { token } = useParams();
  const [status, setStatus] = useState("verifying"); // 'verifying', 'success', 'error'
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_URL}/api/auth/verify-email/${token}`
        );

        if (res.data.success) {
          setStatus("success");
          setTimeout(() => navigate("/login"), 3000);
        } else {
          setStatus("error");
        }
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    };

    if (token) verify();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-sm w-full">
        {status === "verifying" && (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-pink-600" />
            <h2 className="text-xl font-semibold text-gray-700">Verifying your email...</h2>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl">✓</div>
            <h2 className="text-xl font-bold text-gray-800">Email Verified!</h2>
            <p className="text-gray-600">Redirecting you to login page...</p>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-2xl">✕</div>
            <h2 className="text-xl font-bold text-gray-800">Verification Failed</h2>
            <p className="text-gray-600">The link might be expired or invalid.</p>
            <button 
              onClick={() => navigate("/signup")}
              className="mt-2 text-pink-600 font-medium hover:underline"
            >
              Try signing up again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;