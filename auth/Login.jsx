import React, { useState, useEffect } from "react";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import { Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [captchaPassed, setCaptchaPassed] = useState(false);

  const router = useRouter();

  const validateEmail = (value) => /\S+@\S+\.\S+/.test(value);
  const validatePhone = (value) => /^\+?[0-9]{7,15}$/.test(value);

  const isValidEmailOrPhone = validateEmail(emailOrPhone) || validatePhone(emailOrPhone);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!isValidEmailOrPhone) {
      setError("Please enter a valid email or phone number.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    // Captcha check if failed attempts >= 3
    if (failedAttempts >= 3 && !captchaPassed) {
      setError("Please complete captcha to continue.");
      setLoading(false);
      return;
    }

    // Mock API call simulation
    setTimeout(() => {
      if (emailOrPhone === "user@test.com" && password === "password") {
        if (rememberMe) {
          localStorage.setItem("authToken", "mockToken123");
        } else {
          sessionStorage.setItem("authToken", "mockToken123");
        }
        router.push("/dashboard");
      } else {
        setFailedAttempts((prev) => prev + 1);
        setError("Invalid credentials. Please try again.");
      }
      setLoading(false);
    }, 1200);
  };

  useEffect(() => {
    if (error) {
      const toast = document.createElement("div");
      toast.className = "fixed bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded shadow-lg animate-bounce";
      toast.innerText = error;
      toast.setAttribute("role", "alert");
      toast.setAttribute("aria-live", "assertive");
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 text-white">
      {/* Header */}
      <header className="absolute top-6 left-6 flex items-center gap-4">
        <img src="/logo.png" alt="Company Logo" className="h-10" />
        <a href="/" className="underline text-sm">Back to Home</a>
      </header>

      {/* Responsive Layout */}
      <div className="flex w-full max-w-5xl bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden">
        {/* Left Hero Section for Desktop */}
        <div className="hidden md:flex flex-1 items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/hero.jpg')" }}>
          <h2 className="text-3xl font-bold">Welcome Back!</h2>
        </div>

        {/* Login Container */}
        <div className="flex-1 p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h2>

          {/* Login Form */}
          <form onSubmit={handleLogin} role="form" className="space-y-4">
            {/* Email/Phone */}
            <div className="relative">
              <label htmlFor="emailOrPhone" className="block mb-1 text-sm font-medium">Email or Phone <span className="text-red-400">*</span></label>
              <input
                id="emailOrPhone"
                aria-label="Email or Phone"
                type="text"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
                required
              />
              {emailOrPhone && (
                isValidEmailOrPhone ? (
                  <CheckCircle className="absolute right-3 top-9 text-green-500" size={20} />
                ) : (
                  <XCircle className="absolute right-3 top-9 text-red-500" size={20} />
                )
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <label htmlFor="password" className="block mb-1 text-sm font-medium">Password <span className="text-red-400">*</span></label>
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

            {/* Captcha Simulation */}
            {failedAttempts >= 3 && (
              <div className="bg-gray-800 p-3 rounded-lg text-center">
                <p className="mb-2">Please complete captcha to continue.</p>
                <button
                  type="button"
                  onClick={() => setCaptchaPassed(true)}
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
                >
                  I'm not a robot ✅
                </button>
              </div>
            )}

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
      </div>

      {/* Footer */}
      <footer className="mt-8 text-sm text-center">
        <a href="/terms" className="underline mr-4">Terms and Conditions</a>
        <a href="/privacy" className="underline">Privacy Policy</a>
      </footer>
    </div>
  );
}
