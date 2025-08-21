import React, { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("User Registered Successfully!");
    }, 2000);
  };

  const checkPasswordStrength = (password) => {
    if (password.length > 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
      return "Strong";
    } else if (password.length > 5) {
      return "Medium";
    } else {
      return "Weak";
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white p-4">
      {/* Header */}
      <div className="absolute top-4 left-4 text-lg font-bold">
        <a href="/" className="hover:underline">⬅ Back to Home</a>
      </div>

      {/* Signup Form Container */}
      <div className="w-full max-w-md p-8 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-white/10 border border-white/30 focus:outline-none focus:border-purple-500"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-white/10 border border-white/30 focus:outline-none focus:border-purple-500"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white/10 border border-white/30 focus:outline-none focus:border-purple-500"
            />
            <button
              type="button"
              className="absolute right-3 top-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Password Strength */}
          {formData.password && (
            <p className="text-sm mt-1">
              Strength: <span className="font-bold">{checkPasswordStrength(formData.password)}</span>
            </p>
          )}

          {/* Confirm Password */}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-white/10 border border-white/30 focus:outline-none focus:border-purple-500"
          />

          {/* Terms Checkbox */}
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              required
              className="accent-purple-500"
            />
            <span>
              I agree to the <a href="/terms" className="underline">Terms</a> and <a href="/privacy" className="underline">Privacy Policy</a>
            </span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 p-3 rounded-lg flex justify-center items-center"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Sign Up"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-white/20" />
          <span className="px-3 text-white/50">OR</span>
          <hr className="flex-grow border-white/20" />
        </div>

        {/* Social Signup */}
        <div className="flex gap-3">
          <button className="w-full bg-white/10 hover:bg-white/20 p-3 rounded-lg">Google</button>
          <button className="w-full bg-white/10 hover:bg-white/20 p-3 rounded-lg">Facebook</button>
          <button className="w-full bg-white/10 hover:bg-white/20 p-3 rounded-lg">Apple</button>
        </div>

        {/* Already have an account */}
        <p className="text-sm text-center mt-6">
          Already have an account? <a href="/login" className="underline">Login</a>
        </p>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 text-xs text-white/60">
        <a href="/terms" className="mr-4 hover:underline">Terms</a>
        <a href="/privacy" className="hover:underline">Privacy</a>
      </div>
    </div>
  );
}
