import { useState } from "react";
import { signupTypes } from "../types/Signup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader2 } from "lucide-react";

interface OtpverifyProps {
  signupData: signupTypes;
}

const Otpverify = ({ signupData }: OtpverifyProps) => {
  const navigate = useNavigate();
  const [userOtp, setOtp] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleOtpSubmit = async () => {
    setLoading(true);
    try {
      const data = {
        email: signupData.email,
        otp: userOtp,
      };
      const res = await axios.post("/api/v1/verifyUserAtSignup", data);
      if (res.data.status === false) {
        throw new Error(res.data.msg);
      }
      navigate("/");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.msg || "An unknown error occurred";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <ToastContainer />
      <div className="w-full max-w-md shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">
          OTP Verification
        </h2>
        <p className="text-center mb-4">
          Please enter the OTP sent to your email.
        </p>

        <input
          type="text"
          value={userOtp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-3 py-2 border rounded-md mb-4 focus:ring-1 focus:ring-blue-500"
          placeholder="Enter OTP"
        />

        {/* Submit OTP Button */}
        <button
          onClick={handleOtpSubmit}
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {loading ? (
             <span className="loader flex  items-center">
             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
             Please Wait
           </span> // Add a spinner or loading text
          ) : (
            "Verify"
          )}
        </button>
      </div>
    </div>
  );
};

export default Otpverify;
