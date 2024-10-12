import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader2 } from "lucide-react";
import Login from "./Login";

const VerifyEmailAtLogin = () => {
  const [email, setEmail] = useState("");
  const [userOtp, setOtp] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [sendOtpLoading, setSendOtpLoading] = useState(false);
  const [rnederLoginMainPage, setRenderMainLoginPage] = useState(false);

  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Please fill the required field");
      return;
    }
    setSendOtpLoading(true);
    try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/sendEmailAtLogin`, {email});
        if(res.data.status === false){
            throw new Error(res.data.msg);
        }

        toast.success(res.data.msg);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.msg || "An unknown error occurred";
         toast.error(errorMessage);
    }
    finally{
        setSendOtpLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    setLoading(true);
    try {
      const data = {
        email: email,
        otp: userOtp,
      };
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/verifyUserAtSignup`, data);
      if (res.data.status === false) {
        throw new Error(res.data.msg);
      }
      setRenderMainLoginPage(true);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.msg || "An unknown error occurred";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if(rnederLoginMainPage){
    return <Login/>
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <ToastContainer />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-lg px-8 py-6 space-y-4 dark:shadow-gray-700">
          <h2 className="text-2xl font-bold text-center mb-4 ">
            Email Verification
          </h2>
          <p className="text-center mb-4">
            Please enter the OTP sent to your email.
          </p>

          <div className="flex w-full gap-x-3 mb-4">
            <div className="w-full">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your Email"
              />
            </div>

            {/* Send OTP Button */}
            <button
              onClick={handleSendOtp} // Ensure to implement handleSendOtp function
              className="flex-shrink-0 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {sendOtpLoading ? (
              <span className="loader flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              </span>
            ) : (
              "Send Otp"
            )}
            </button>
          </div>

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
              <span className="loader flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </span>
            ) : (
              "Verify"
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyEmailAtLogin;
