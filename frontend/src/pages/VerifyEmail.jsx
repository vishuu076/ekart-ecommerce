import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const VerifyEmail = () => {
  const { token } = useParams();

  useEffect(() => {
    // Console check karein ki token mil raha hai ya nahi
    console.log("URL se milne wala token:", token);
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="p-10 bg-white shadow-xl rounded-2xl text-center">
        <h1 className="text-2xl font-bold text-pink-600 mb-4">Verification Page</h1>
        <p className="text-gray-600">Token value: <span className="font-mono bg-gray-100 p-1">{token}</span></p>
        <p className="mt-4 text-sm text-gray-400">Agar ye page dikh raha hai, toh frontend routing sahi hai.</p>
      </div>
    </div>
  );
};

export default VerifyEmail;