import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useState } from "react";
import axios from "axios";
import { Loader2 } from 'lucide-react';
import { signupResolver, signupTypes } from "../types/Signup";
import Otpverify from "./Otpverify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [renderOtpPage, setRenderOtpPage] = useState(false);
  const [signUpdata, setSignupdata] = useState<signupTypes>();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signupTypes>({
    resolver: signupResolver,
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  if (renderOtpPage) {
    return <Otpverify signupData={signUpdata!} />;
  }

  const handleSignup = async (data: signupTypes) => {
    setLoading(true);
    setSignupdata(data);
    try {
      const savedUser = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/sign-up`, data);
      console.log(savedUser);
      setRenderOtpPage(true);
    } catch (error: any) {
      console.log(error);
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
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="shadow-2xl rounded-lg px-8 py-6 space-y-4 dark:shadow-gray-700">
          <h2 className="text-2xl font-bold text-center">Sign Up</h2>
          <p className="text-center ">Create your account</p>
          <form onSubmit={handleSubmit(handleSignup)} className="space-y-4">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                type="text"
                {...register("name")}
                className="mt-1 block w-full px-3 py-2  border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400  focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className="mt-1 block w-full px-3 py-2  border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400  focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
                <div
                  className="absolute right-3 top-3.5 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </div>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? (
                <span className="loader flex  items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please Wait
                </span> // Add a spinner or loading text
              ) : (
                "Submit"
              )}
            </button>
          </form>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Log in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
