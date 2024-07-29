"use client";
import Loading from '@/components/Loading';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface User {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User>({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null); // Reset the error message
    try {
      setLoading(true);
      const response = await axios.post("/api/users/sign-in", user);
      console.log(response.data);
      if (response.data.status === 201) {
        router.push('/');
      }
    } catch (error: any) {
      console.log("Error: ", error.message);
      if (error.response && error.response.status === 400) {
        setErrorMessage("Invalid credentials. Please try again.");
      } else {
        setErrorMessage("An error occurred. Please try again later.");
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
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="email"
              value={user.email}
              name='email'
              onChange={onChange}
              className="w-full p-2 border rounded mb-2 outline-none"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-4 relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={user.password}
              name='password'
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
              {showPassword ? (
                <span>👁️</span>
              ) : (
                <span>👁️‍🗨️</span>
              )}
            </button>
          </div>
          {errorMessage && (
            <p className="text-center text-red-500">
              {errorMessage}
            </p>
          )}
          {loading ? (
            <Loading />
          ) : (
            <button
              type="submit"
              className="w-full bg-gradient-to-t from-[#4B36CC] to-[#9C93D4] text-xl text-white py-2 rounded hover:bg-purple-700 shadow shadow-gray-400"
            >
              Sign in
            </button>
          )}
        </form>
        <p className="text-center mt-4">
          Don't have an account?{' '}
          <Link href="/sign-up" className="text-[#0054A1]">
            Create a new account.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
