"use client";
import React, { useEffect, useMemo, useState } from "react";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import { Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";

/**
 * Fully self-contained React + Tailwind login page component.
 * - Real-time validation (email/phone) with accessible status (aria-describedby + aria-live)
 * - Password show/hide + strength indicator (text + bar) with aria-describedby
 * - Remember Me with explicit token expiry metadata (7d vs 30m)
 * - Captcha after 3 failed attempts (mock)
 * - Role-based redirection (admin/user)
 * - Responsive layout (mobile stack; md+: split layout with hero)
 * - High-contrast mode support via @media (forced-colors: active)
 * - Toast notifications implemented as a React component (no direct DOM calls)
 * - No external UI libs beyond react-icons/lucide-react
 */

export default function LoginPage() {
  // form state
  const [identifier, setIdentifier] = useState(""); // email or phone
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // ux state
  const [loading, setLoading] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [captchaPassed, setCaptchaPassed] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "error" | "success" } | null>(null);

  // ===== Helpers
  const emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
  const phoneRegex = /^\+?[0-9]{7,15}$/; // basic international
  const isValidIdentifier = useMemo(
    () => emailRegex.test(identifier) || phoneRegex.test(identifier),
    [identifier]
  );

  function getPasswordStrengthValue(pw: string) {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score; // 0-4
  }

  const strengthScore = getPasswordStrengthValue(password);
  const strengthText = ["Too Weak", "Weak", "Medium", "Strong", "Very Strong"][strengthScore] || "Too Weak";
  const strengthBarWidth = ["10%", "25%", "50%", "75%", "100%"][strengthScore] || "10%";
  const strengthBarClass = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-emerald-600",
  ][strengthScore] || "bg-red-500";

  // ===== Toast auto-hide
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  // ===== Token helpers with expiry metadata
  type AuthPayload = { token: string; role: "admin" | "user"; expiresAt: number };

  function saveAuth(payload: AuthPayload, persist: boolean) {
    const storage = persist ? localStorage : sessionStorage;
    storage.setItem("auth", JSON.stringify(payload));
  }

  function loadAuth(): AuthPayload | null {
    try {
      const raw = localStorage.getItem("auth") || sessionStorage.getItem("auth");
      if (!raw) return null;
      const parsed: AuthPayload = JSON.parse(raw);
      if (Date.now() > parsed.expiresAt) {
        localStorage.removeItem("auth");
        sessionStorage.removeItem("auth");
        return null;
      }
      return parsed;
    } catch {
      return null;
    }
  }

  // Optionally check on mount to redirect if already logged in and not expired
  useEffect(() => {
    const auth = loadAuth();
    if (auth) {
      window.location.href = auth.role === "admin" ? "/admin-dashboard" : "/user-dashboard";
    }
  }, []);

  // ===== Mock API with role + expiry
  async function mockLoginAPI(id: string, pw: string, persist: boolean): Promise<AuthPayload | null> {
    await new Promise((r) => setTimeout(r, 900));
    const okAdmin = id === "admin@example.com" && pw === "Password@123";
    const okUser = id === "user@example.com" && pw === "Password@123";
    if (!okAdmin && !okUser) return null;
    const role = okAdmin ? "admin" : "user";
    const expiresAt = persist ? Date.now() + 7 * 24 * 60 * 60 * 1000 : Date.now() + 30 * 60 * 1000; // 7d vs 30m
    return { token: "mock-jwt-token", role, expiresAt };
  }

  // ===== Submit
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidIdentifier) {
      setToast({ message: "Enter a valid email or phone number.", type: "error" });
      return;
    }
    if (password.length < 6) {
      setToast({ message: "Password must be at least 6 characters.", type: "error" });
      return;
    }
    if (failedAttempts >= 3 && !captchaPassed) {
      setToast({ message: "Complete the captcha to continue.", type: "error" });
      return;
    }

    setLoading(true);
    const auth = await mockLoginAPI(identifier, password, rememberMe);
    setLoading(false);

    if (!auth) {
      setFailedAttempts((n) => n + 1);
      setToast({ message: "Invalid credentials.", type: "error" });
      return;
    }

    saveAuth(auth, rememberMe);
    setToast({ message: "Login successful! Redirecting…", type: "success" });
    setTimeout(() => {
      window.location.href = auth.role === "admin" ? "/admin-dashboard" : "/user-dashboard";
    }, 800);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 flex items-center justify-center">
      {/* High-contrast helpers */}
      <style>{`
        @media (forced-colors: active) {
          .hc-border { border: 1px solid CanvasText !important; }
          .hc-text { color: CanvasText !important; }
          .hc-bg { background: Canvas !important; }
          .hc-focus:focus { outline: 2px solid Highlight !important; }
          .hc-sep { border-color: CanvasText !important; }
        }
      `}</style>

      {/* Header */}
      <header className="absolute top-6 left-6 flex items-center gap-4 text-white hc-text">
        <img src="/logo.png" alt="Company Logo" className="h-10 w-10 rounded-full hc-border" />
        <a href="/" className="underline text-sm hc-focus">Back to Home</a>
      </header>

      {/* Toast */}
      {toast && (
        <div
          role="alert"
          aria-live="assertive"
          className={`fixed bottom-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg text-white ${
            toast.type === "error" ? "bg-red-600" : "bg-green-600"
          } hc-border hc-text hc-bg`}
        >
          {toast.message}
        </div>
      )}

      {/* Shell: split layout on md+ */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-0 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden hc-border hc-bg">
        {/* Left hero (md+) */}
        <aside
          className="hidden md:flex items-center justify-center bg-cover bg-center p-8"
          style={{ backgroundImage: "url('/hero.jpg')" }}
          aria-hidden="true"
        >
          <h2 className="text-3xl font-bold text-white drop-shadow hc-text">Welcome Back!</h2>
        </aside>

        {/* Right: form */}
        <main className="p-6 sm:p-8 text-white hc-text">
          <h1 className="text-2xl font-bold text-center mb-6">Login to Your Account</h1>

          <form onSubmit={onSubmit} role="form" className="space-y-4" noValidate>
            {/* Email/Phone */}
            <div className="relative">
              <label htmlFor="identifier" className="block mb-1 text-sm font-medium">
                Email or Phone <span className="text-red-300" aria-hidden="true">*</span>
              </label>
              <input
                id="identifier"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                aria-required="true"
                aria-invalid={identifier ? (!isValidIdentifier).toString() : "false"}
                aria-describedby="identifier-help identifier-status"
                className="w-full px-4 py-2 rounded-lg border border-white/30 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 hc-border hc-bg hc-text hc-focus"
                placeholder="you@example.com or +11234567890"
              />
              {/* Validation icon + live region text */}
              {identifier && (
                <span className="absolute right-3 top-9" aria-hidden="true">
                  {isValidIdentifier ? (
                    <CheckCircle className="text-green-400" size={20} />
                  ) : (
                    <XCircle className="text-red-400" size={20} />
                  )}
                </span>
              )}
              <p id="identifier-help" className="sr-only">
                Enter a valid email address or international phone number.
              </p>
              <p id="identifier-status" className="sr-only" aria-live="polite" aria-atomic="true">
                {identifier ? (isValidIdentifier ? "Identifier looks valid." : "Identifier is invalid.") : ""}
              </p>
            </div>

            {/* Password */}
            <div className="relative">
              <label htmlFor="password" className="block mb-1 text-sm font-medium">
                Password <span className="text-red-300" aria-hidden="true">*</span>
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-required="true"
                aria-describedby="password-help password-strength"
                className="w-full px-4 py-2 rounded-lg border border-white/30 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 pr-10 hc-border hc-bg hc-text hc-focus"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-800 focus:outline-none hc-focus"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>

              {/* Strength indicator (text + bar) */}
              <div className="mt-2" id="password-strength" aria-live="polite" aria-atomic="true">
                <div className="h-1.5 w-full bg-white/30 rounded-full overflow-hidden hc-border">
                  <div
                    className={`h-full ${strengthBarClass} transition-all duration-300`}
                    style={{ width: strengthBarWidth }}
                  />
                </div>
                <p className="mt-1 text-sm">Strength: {strengthText}</p>
              </div>
              <p id="password-help" className="sr-only">
                Use at least 8 characters with a mix of uppercase letters, numbers, and symbols for a stronger password.
              </p>
            </div>

            {/* Remember / Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-indigo-500 hc-border"
                />
                Remember Me
              </label>
              <a href="/forgot-password" className="underline hc-focus">Forgot Password?</a>
            </div>

            {/* Captcha (mock after 3 fails) */}
            {failedAttempts >= 3 && (
              <div className="bg-black/20 p-3 rounded-lg text-sm hc-border hc-bg">
                <p className="mb-2">Please complete the captcha to continue.</p>
                <button
                  type="button"
                  onClick={() => setCaptchaPassed(true)}
                  className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 font-medium hc-focus"
                >
                  I'm not a robot ✅
                </button>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-lg font-semibold bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-indigo-300 hc-focus"
            >
              {loading ? "Logging in…" : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-white/40 hc-sep" />
            <span className="px-3 text-sm">OR</span>
            <div className="flex-1 border-t border-white/40 hc-sep" />
          </div>

          {/* Social logins (placeholders) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button className="flex items-center justify-center gap-2 bg-white text-gray-900 py-2 rounded-lg hover:bg-gray-100 hc-border hc-bg hc-text">
              <FaGoogle aria-hidden /> Google
            </button>
            <button className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 hc-border">
              <FaFacebook aria-hidden /> Facebook
            </button>
            <button className="flex items-center justify-center gap-2 bg-black text-white py-2 rounded-lg hover:bg-gray-900 hc-border">
              <FaApple aria-hidden /> Apple
            </button>
          </div>

          {/* Signup */}
          <p className="text-center text-sm mt-6">
            Don’t have an account? <a href="/signup" className="underline font-medium hc-focus">Sign Up</a>
          </p>
        </main>
      </div>

      {/* Footer */}
      <footer className="mt-8 text-white text-sm text-center hc-text">
        <a href="/terms" className="underline mr-4 hc-focus">Terms and Conditions</a>
        <a href="/privacy" className="underline hc-focus">Privacy Policy</a>
      </footer>
    </div>
  );
}
