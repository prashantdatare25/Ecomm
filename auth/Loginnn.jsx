"use client";
import React, { useEffect, useMemo, useState } from "react";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import { Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import axios from "axios";
import Image from "next/image";
import { motion } from "framer-motion";

export default function LoginPage() {
    // ...state hooks remain unchanged

    // NextAuth session
    const { data: session, status } = useSession();

    // Redirect if already logged in
    useEffect(() => {
        if (session?.user) {
            // Example: role-based redirect (assume session.user.role exists)
            window.location.href = session.user.role === "admin" ? "/admin-dashboard" : "/user-dashboard";
        }
    }, [session]);

    // Submit handler using NextAuth.js
    async function onSubmit(e) {
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
        // Example: call NextAuth.js credentials provider
        const res = await signIn("credentials", {
            redirect: false,
            identifier,
            password,
        });
        setLoading(false);

        if (res?.error) {
            setFailedAttempts((n) => n + 1);
            setToast({ message: "Invalid credentials.", type: "error" });
            return;
        }

        setToast({ message: "Login successful! Redirecting…", type: "success" });
        // NextAuth will handle session and redirect
    }

    // Social login handlers
    const handleSocialLogin = (provider) => signIn(provider);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 flex items-center justify-center"
        >
            {/* Header */}
            <header className="absolute top-6 left-6 flex items-center gap-4 text-white hc-text">
                <Image src="/logo.png" alt="Company Logo" width={40} height={40} className="rounded-full hc-border" />
                <a href="/" className="underline text-sm hc-focus">Back to Home</a>
            </header>
            {/* ...rest of your component unchanged, except: */}
            {/* Social logins */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button onClick={() => handleSocialLogin("google")} className="flex items-center justify-center gap-2 bg-white text-gray-900 py-2 rounded-lg hover:bg-gray-100 hc-border hc-bg hc-text">
                    <FaGoogle aria-hidden /> Google
                </button>
                <button onClick={() => handleSocialLogin("facebook")} className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 hc-border">
                    <FaFacebook aria-hidden /> Facebook
                </button>
                <button onClick={() => handleSocialLogin("apple")} className="flex items-center justify-center gap-2 bg-black text-white py-2 rounded-lg hover:bg-gray-900 hc-border">
                    <FaApple aria-hidden /> Apple
                </button>
            </div>
            {/* ...rest unchanged */}
        </motion.div>
    );
}
