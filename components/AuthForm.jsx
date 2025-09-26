"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useLoginUserMutation,
  useSignupUserMutation,
} from "@/redux/services";
import { setUserDetails } from "@/redux/slices/authSlice";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

const AuthForm = ({ type = "login" }) => {
  // console.log("inside authform")
  const isLogin = type === "login";
  const query = useSearchParams();
  const router = useRouter();
  const redirectedPath = query.get("path");
  const [showPassword,setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Mutations
  const [loginUser, { isLoading: isLoginLoading, error: loginError }] =
    useLoginUserMutation();
  const [signupUser, { isLoading: isSignupLoading, error: signupError }] =
    useSignupUserMutation();
  
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const result = await loginUser(formData, { forceRefetch: true }).unwrap();
        //console.log("Login success:", result);
         const user = {
          id:result.data._id,
          email:result.data.email,
          name:result.data.name,
         }
         
        dispatch(setUserDetails({isAuthenticated : true,user}))
        router.push(redirectedPath || "/dashboard");
      } else {
        const result = await signupUser(formData).unwrap();
        // console.log("Signup success:", result);

        
        router.push(`/sign-in`);
      }
    } catch (err) {
      console.log("error in logging in",err)
    }
  };

  const error = isLogin ? loginError : signupError;
  if(error)
    console.log("error :",error)
  return (
    <Card className="w-full max-w-sm shadow-xl rounded-2xl max-h-fit">
      <CardHeader>
        <CardTitle className="text-center text-xl font-semibold">
          {isLogin ? "Login to Your Account" : "Create a New Account"}
        </CardTitle>
        <CardDescription className="text-center">
          {isLogin
            ? "Enter your email and password to access your account."
            : "Fill in your details to create a new account."}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {!isLogin && (
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="myemail@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {isLogin && (
                <a href="#" className="text-sm text-green-700 hover:underline">
                  Forgot password?
                </a>
              )}
            </div>
               <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                />
                
                
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

          </div>

          <Button
            type="submit"
            className="bg-green-600 hover:bg-green-700 w-full"
            aria-label={isLogin ? "Login" : "Register"}
            disabled={isLoginLoading || isSignupLoading}
          >
            {isLogin
              ? isLoginLoading
                ? "Logging in..."
                : "Login"
              : isSignupLoading
              ? "Registering..."
              : "Register"}
          </Button>

          {error && (
            <p className="text-red-600 text-center text-sm">
              {error?.data?.message || "Something went wrong"}
            </p>
          )}
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-2">
        {isLogin ? (
          <p className="text-sm text-center">
            Don’t have an account?{" "}
            <Link href="/sign-up" className="text-green-700 hover:underline">
              Sign Up
            </Link>
          </p>
        ) : (
          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-green-700 hover:underline">
              Sign In
            </Link>
          </p>
        )}
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
