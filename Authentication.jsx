import React, { useState } from "react";

export default function AuthScreens() {
  const [screen, setScreen] = useState("login"); // login, signup, forgot, otp
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    otp: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitting ${screen} form: ` + JSON.stringify(formData, null, 2));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        {screen === "login" && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-2 border rounded"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-2 border rounded"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Login
              </button>
            </form>
            <div className="mt-4 text-sm flex justify-between">
              <button onClick={() => setScreen("forgot")} className="text-blue-500">
                Forgot Password?
              </button>
              <button onClick={() => setScreen("signup")} className="text-blue-500">
                Create Account
              </button>
            </div>
          </>
        )}

        {screen === "signup" && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full p-2 border rounded"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-2 border rounded"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-2 border rounded"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
              >
                Signup
              </button>
            </form>
            <div className="mt-4 text-sm text-center">
              <button onClick={() => setScreen("login")} className="text-blue-500">
                Already have an account? Login
              </button>
            </div>
          </>
        )}

        {screen === "forgot" && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full p-2 border rounded"
                value={formData.email}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600"
                onClick={() => setScreen("otp")}
              >
                Send OTP
              </button>
            </form>
            <div className="mt-4 text-sm text-center">
              <button onClick={() => setScreen("login")} className="text-blue-500">
                Back to Login
              </button>
            </div>
          </>
        )}

        {screen === "otp" && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">OTP Verification</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                className="w-full p-2 border rounded"
                value={formData.otp}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600"
              >
                Verify OTP
              </button>
            </form>
            <div className="mt-4 text-sm text-center">
              <button onClick={() => setScreen("login")} className="text-blue-500">
                Back to Login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
