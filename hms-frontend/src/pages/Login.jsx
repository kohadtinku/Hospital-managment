import React, { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role === "admin") nav("/");
      else if (data.user.role === "doctor") nav("/todaypatients");
      else nav("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Login to Your Account
        </h2>

        {/* Email Field */}
        <div className="mb-4">
          <label className="font-medium text-gray-700 mb-1 block">Email</label>
          <div className="flex items-center border rounded-lg p-2 shadow-sm bg-gray-50">
            <Mail className="w-5 h-5 text-gray-500 mr-2" />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              className="w-full outline-none bg-transparent"
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label className="font-medium text-gray-700 mb-1 block">
            Password
          </label>
          <div className="flex items-center border rounded-lg p-2 shadow-sm bg-gray-50">
            <Lock className="w-5 h-5 text-gray-500 mr-2" />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              className="w-full outline-none bg-transparent"
              required
            />
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all shadow-lg"
        >
          Login
        </button>

        {/* Footer */}
        <p className="text-center text-gray-600 mt-4 text-sm">
          Don't have an account?{" "}
          <span className="text-blue-600 font-semibold cursor-pointer hover:underline">
            Contact Admin
          </span>
        </p>
      </form>
    </div>
  );
}
