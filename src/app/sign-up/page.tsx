"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loading from "@/components/Loading";

interface User {
  name: string;
  email: string;
  password: string;
}

interface ServerResponse {
  message: string;
  success?: boolean;
}

const SignUpPage: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [serverResponse, setServerResponse] = useState<ServerResponse | null>(
    null
  );
  const [verifyEmailSent, setVerifyEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/sign-up", user);
      console.log("Server Response:", response.data);
      setServerResponse(response.data);

      if (response.data.success) {
        console.log("User registered successfully");
        setVerifyEmailSent(true);
        // router.push("/sign-in");
      } else {
        console.log("Error:", response.data.message);
      }
    } catch (error: any) {
      console.log("Error:", error.message);
      if (error.response) {
        console.error("Server responded with status:", error.response.status);
        setServerResponse({
          message: error.response.data.message || "An error occurred",
          success: false,
        });
      } else if (error.request) {
        console.error("Request made but no response received");
        setServerResponse({
          message: "No response from server. Please try again later.",
          success: false,
        });
      } else {
        console.error("Error setting up the request");
        setServerResponse({
          message: "An error occurred. Please try again later.",
          success: false,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-t from-[#AFA3FF] to-white">
      <div className="bg-white p-8 rounded shadow-md max-w-lg w-full mx-4">
        <h1 className="text-2xl font-bold text-center mb-6">
          Welcome to <span className="text-purple-600">Workflo</span>!
        </h1>

        {!verifyEmailSent ? (
          <form onSubmit={handleSignUp}>
            <div className="mb-4">
              <input
                type="text"
                value={user.name}
                name="name"
                onChange={onChange}
                className="w-full p-2 border rounded mb-2 outline-none"
                placeholder="Name"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                value={user.email}
                name="email"
                onChange={onChange}
                className="w-full p-2 border rounded mb-2 outline-none"
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={user.password}
                onChange={onChange}
                className="w-full p-2 border rounded outline-none"
                placeholder="Password"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <span>👁️</span> : <span>👁️‍🗨️</span>}
              </button>
            </div>
            {serverResponse && (
              <p
                className={`text-center ${
                  serverResponse.success ? "text-green-500" : "text-red-500"
                }`}
              >
                {serverResponse.message}
              </p>
            )}
            {loading ? (
              <Loading />
            ) : (
              <button
                type="submit"
                className="w-full bg-gradient-to-t from-[#4B36CC] to-[#9C93D4] text-xl text-white py-2 rounded hover:bg-purple-700 shadow shadow-gray-400"
              >
                Sign up
              </button>
            )}
          </form>
        ) : (
          <div className="h-full w-full ">
            <h3 className="text-xl">
              For testing purpose we are using mailtrap.
            </h3>
            <p className="text-lg text-green-700 font-semibold">
              We have sent you an verification email on your registered email,
              kindly verify your email. If you face any problem then you can simply login without verification.
            </p>
          </div>
        )}

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-[#0054A1]">
            Log in.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
