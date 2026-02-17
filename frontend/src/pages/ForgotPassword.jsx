import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import React from "react";

const ForgotPassword = () => {
  const [email, setEmail] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ DEMO MODE MESSAGE
    toast.info("Password reset via email coming soon");

    // optional: clear input
    setEmail("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-center">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700"
          >
            Send Reset Link
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
