import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { newPasswordResolver, newPasswordTypes } from "../types/NewPassword";
import { toast, ToastContainer } from "react-toastify";
import { Loader2 } from "lucide-react";
import axios from "axios";
import Login from "./Login";

const NewPasswordComp = ({ email }: { email: string }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [renderLoginMainPage, setRenderMainLoginPage] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<newPasswordTypes>({
    resolver: newPasswordResolver,
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const handleSetNewPassword = async (data: newPasswordTypes) => {
    if(data.password !== data.confirmPassword){
        toast.error("Password are not similar");
        return;
    }
    setLoading(true);
    try {
        const userData = {
            password: data.password,
            confirmPassword: data.confirmPassword,
            email: email
        }
        const res = await axios.put("/api/v1/ChangePasswordAtLogin", userData);
        if(res.data.status === false){
            throw new Error(res.data.msg)
        }
        setRenderMainLoginPage(true);
        toast.success(res.data.msg);
    } catch (error: any) {
        const errorMessage = error?.response?.data?.msg || "An unknown error occured";
        toast.error(errorMessage)
    }finally{
        setLoading(false);
    }
  };

  if(renderLoginMainPage){
    return <Login/>
  }
  return (
    <div className="flex items-center justify-center min-h-screen">
        <ToastContainer/>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-lg px-8 py-6 space-y-4 dark:shadow-gray-700">
          <h2 className="text-2xl font-bold text-center">Change Password</h2>
          <p className="text-center ">
            Enter new Password to access your account
          </p>
          <form
            onSubmit={handleSubmit(handleSetNewPassword)}
            className="space-y-4"
          >
            <div>
              <label htmlFor="email" className="block text-sm font-medium ">
                Password
              </label>
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
                  className="absolute right-3 top-3.5"
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

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium "
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  className="mt-1 block w-full px-3 py-2  bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 text-black
                    focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Confirm password"
                />
                <div
                  className="absolute right-3 top-3.5"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </div>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword.message}
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
              "Change"
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
};

export default NewPasswordComp;
