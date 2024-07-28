"use client"
import Link from 'next/link';
import React, { useState } from 'react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Logging in with:', { email, password });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-t from-[#AFA3FF] to-white">
      <div className="bg-white p-8 rounded shadow-md max-w-lg w-full">
        <h1 className="text-2xl font-bold text-center mb-6">
          Welcome to <span className="text-purple-600">Workflo</span>!
        </h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded mb-2 outline-none"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-4 relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          <button
            type="submit"
            className="w-full bg-gradient-to-t from-[#2F2188] to-[#4C38C2] text-xl shadow-lg shadow-gray-400 text-white py-2 rounded hover:bg-purple-700"
          >
            Login
          </button>
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
