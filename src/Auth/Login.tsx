import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { loginResolver, LoginTypes } from "../types/Login";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useState } from "react";
import VerifyEmailAtLogin from "./VerifyEmailAtLogin";
import ForgotPassword from "./ForgotPassword";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { Loader2 } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyEmailAtLogin, setShowVerifyEmailAtLogin] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginTypes>({
    resolver: loginResolver,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data: LoginTypes) => {
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/LoginUser`, data);
      if (res.data.status === false) {
        throw new Error(res.data.msg);
      }

      navigate("/");
    } catch (error: any) {
      const errorMessage = error.response.data.msg || "An unknown error occured";
      toast.error(errorMessage);
    }finally{
      setLoading(false)
    }
  };

  if (showVerifyEmailAtLogin) {
    return <VerifyEmailAtLogin />;
  }

  if (showForgotPassword) {
    return <ForgotPassword />;
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
        <div className="shadow-2xl rounded-lg px-8 py-6 space-y-4 dark:shadow-gray-700">
          <h2 className="text-2xl font-bold text-center">Login</h2>
          <p className="text-center ">
            Enter your credentials to access your account
          </p>
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
            <div>
              <div className="flex justify-between">
                <label htmlFor="email" className="block text-sm font-medium ">
                  Email
                </label>
                <span
                  onClick={() => setShowVerifyEmailAtLogin(true)}
                  className="hover:cursor-pointer font-semibold text-blue-500 hover:text-blue-600"
                >
                  Verify Email
                </span>
              </div>
              <input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 text-black
                      focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <div className="flex justify-between">
                <label htmlFor="email" className="block text-sm font-medium ">
                  Password
                </label>
                <span
                  onClick={() => setShowForgotPassword(true)}
                  className="hover:cursor-pointer font-semibold text-blue-500 hover:text-blue-600"
                >
                  Forgot Password
                </span>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className="mt-1 block w-full px-3 py-2  bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 text-black
                      focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
                <div
                  className="absolute right-3 top-3.5 text-black"
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
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
             {loading ? (
              <span className="loader flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </span>
            ) : (
              "Login"
            )}
            </button>
          </form>
          <p className="text-center text-sm ">
            Don't have an account?{" "}
            <Link
              to="/sign-up"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
