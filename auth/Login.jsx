import React, { useState } from "react";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (value) => {
    return /\S+@\S+\.\S+/.test(value);
  };

  const validatePhone = (value) => {
    return /^\+?[0-9]{7,15}$/.test(value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!(validateEmail(emailOrPhone) || validatePhone(emailOrPhone))) {
      setError("Please enter a valid email or phone number.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    // Mock API call simulation
    setTimeout(() => {
      if (emailOrPhone === "user@test.com" && password === "password") {
        alert("Login successful ✅ Redirecting...");
        // Redirect logic (e.g., router.push('/dashboard'))
      } else {
        setError("Invalid credentials. Please try again.");
      }
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      {/* Header */}
      <header className="absolute top-6 left-6 text-white flex items-center gap-4">
        <img src="/logo.png" alt="Company Logo" className="h-10" />
        <a href="/" className="underline text-sm">Back to Home</a>
      </header>

      {/* Login Container */}
      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h2>

        {error && (
          <div className="bg-red-500 text-white px-3 py-2 rounded-md mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} role="form" className="space-y-4">
          {/* Email/Phone */}
          <div>
            <label htmlFor="emailOrPhone" className="block mb-1 text-sm font-medium">Email or Phone</label>
            <input
              id="emailOrPhone"
              aria-label="Email or Phone"
              type="text"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className="block mb-1 text-sm font-medium">Password</label>
            <input
              id="password"
              aria-label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="accent-indigo-500"
              />
              Remember Me
            </label>
            <a href="/forgot-password" className="underline">Forgot Password?</a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded-lg font-semibold transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-400"></div>
          <span className="px-3 text-sm">OR</span>
          <div className="flex-1 border-t border-gray-400"></div>
        </div>

        {/* Social Logins */}
        <div className="flex gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 bg-white text-black py-2 rounded-lg hover:bg-gray-200 transition">
            <FaGoogle /> Google
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            <FaFacebook /> Facebook
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition">
            <FaApple /> Apple
          </button>
        </div>

        {/* Signup Link */}
        <p className="text-center text-sm mt-6">
          Don’t have an account? <a href="/signup" className="underline font-medium">Sign Up</a>
        </p>
      </div>

      {/* Footer */}
      <footer className="mt-8 text-white text-sm text-center">
        <a href="/terms" className="underline mr-4">Terms and Conditions</a>
        <a href="/privacy" className="underline">Privacy Policy</a>
      </footer>
    </div>
  );
}
