"use client"
import Link from 'next/link';
import React, { useState } from 'react';

const SignUpPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign-up logic here
    console.log('Signing up with:', { name, email, password });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-t from-[#AFA3FF] to-white">
      <div className="bg-white p-8 rounded shadow-md max-w-lg w-full">
        <h1 className="text-2xl font-bold text-center mb-6">
          Welcome to <span className="text-purple-600">Workflo</span>!
        </h1>
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded mb-2 outline-none"
              placeholder="Name"
              required
            />
          </div>
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
            className="w-full bg-gradient-to-t from-[#4B36CC] to-[#9C93D4] text-xl text-white py-2 rounded hover:bg-purple-700 shadow shadow-gray-400"
          >
            Sign up
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{' '}
          <Link href="/sign-in" className="text-[#0054A1]">
            Log in.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
