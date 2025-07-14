"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaApple } from "react-icons/fa";
import Input from "@/components/Input";
import { LockKeyhole, Mail, Send } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("test@getfleet.ai"); // Pre-filled for debug
  const [password, setPassword] = useState("test");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    console.log("dbh");
    try {
      const response = await fetch("/api/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          email,
          password,
        }),
        credentials: "include", // required to store cookies
      });

      console.log("This is the response", response);
      if (!response.ok) {
        throw new Error("Login failed, try again");
      }

      // Cookie is now set, redirect to dashboard
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#faf5ff] overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Send
          size={520}
          className="text-indigo-100 absolute top-10 left-10 rotate-12 "
          fill="currentColor"
          stroke="currentColor"
        />
        <Send
          size={90}
          className="text-indigo-100 absolute top-20 right-0 -rotate-12"
          fill="currentColor"
          stroke="currentColor"
        />
        <Send
          size={530}
          className="text-indigo-100 absolute  bottom-[-230] right-10 rotate-6"
          fill="currentColor"
          stroke="currentColor"
        />
        <Send
          size={310}
          className="text-indigo-100 absolute top-[-130] right-1/4 -rotate-3"
          fill="currentColor"
          stroke="currentColor"
        />
      </div>
      {/* Top bar - now at the very top */}
      <div className="flex justify-between items-center px-8 py-4">
        {/* Logo with Send Icon */}
        <div className="flex items-center space-x-2 text-4xl font-extrabold text-black">
          <Send
            size={32}
            fill="currentColor"
            stroke="currentColor"
            className="text-indigo-600"
          />
          <span>
            Get<span className="text-indigo-600">Fleet</span>
          </span>
        </div>

        {/* Get Started Button */}
        <button className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
          Get Started &gt;
        </button>
      </div>

      {/* Centered content */}
      <div className="flex mt-20 flex-col z-10 items-center justify-center px-4">
        {/* Welcome Message */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800">
            <span className="text-indigo-600">Get Fleet</span> Welcomes you.
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Sign in to get your fleet account to explore and utilize all the
            available Fleet services
          </p>
        </div>

        {/* Login Section with Full-height Divider */}
        <div className="relative grid grid-cols-2 max-w-xl w-full bg-transparent gap-8 mb-10">
          {/* Full height vertical divider */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-gray-500 bg-[#faf5ff] px-1 z-10">
            OR
          </div>

          {/* Left Column: Login */}
          <div className="flex flex-col justify-center space-y-2 w-full pr-8">
            <Input
              icon={<Mail size={16} />}
              placeholder="Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              icon={<LockKeyhole size={16} />}
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex items-center justify-between text-sm text-gray-600">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span>Keep me in mind</span>
              </label>
              <button className="text-indigo-600 hover:underline underline">
                Forgot Password?
              </button>
            </div>

            <button
              onClick={handleLogin}
              className="bg-indigo-600 pointer text-white py-2 rounded-md hover:bg-indigo-700 transition text-sm"
            >
              Continue
            </button>
          </div>

          {/* Right Column: Social Login */}
          <div className="flex flex-col justify-center items-center space-y-5 w-full pl-8">
            <button className="flex items-center justify-center w-full border rounded px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
              <FcGoogle className="mr-2" size={18} />
              <span className="font-bold">Continue with Google</span>
            </button>

            <button className="flex items-center justify-center w-full border rounded px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
              <FaFacebookF className="mr-2 text-blue-600" size={18} />
              <span className="font-bold">Continue with Facebook</span>
            </button>

            <button className="flex items-center justify-center w-full border rounded px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
              <FaApple className="mr-2" size={18} />
              <span className="font-bold">Continue with Apple</span>
            </button>
          </div>
        </div>

        {/* Bottom: Sign up Prompt */}
        <div >
          <p className="text-xs text-gray-500 text-center">
            By Clicking "Continue with Google/Facebook" you agree
          </p>
          <p className="text-xs text-gray-500 text-center mb-2">
            to our{" "}
            <span className="underline font-bold">Terms and Conditions</span>{" "}
            and <span className="underline font-bold">Privacy Policy</span>
          </p>
          <p className="text-xs text-gray-500 text-center">
            Don’t have an account?{" "}
            <span className="text-indigo-600 cursor-pointer hover:underline underline">
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
