import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

const VerifyOtp = () => {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const { email } = useParams();
    const navigate = useNavigate();

    const handleVerify = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(
                `http://localhost:8000/api/auth/verify-otp/${email}`,
                { otp: otp.toString().trim() }
            );


            if (res.data.success) {
                toast.success(res.data.message);
                navigate(`/reset-password/${email}`);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Invalid OTP");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-pink-100">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Verify OTP</CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleVerify} className="space-y-4">
                        <Input
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />

                        <Button className="w-full bg-pink-600" disabled={loading}>
                            {loading ? "Verifying..." : "Verify OTP"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default VerifyOtp;
