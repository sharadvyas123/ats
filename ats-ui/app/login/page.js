"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { set, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { setCookie } from 'nookies';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const schema = yup.object().shape({
  username: yup.string().required("Username is required").min(3, "username must be atleast 3 character long"),
  password: yup.string().required("Password is required").min(6, "password is Too Short").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, "PASSWORD is not STRONG!!")
})

export default function page() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ resolver: yupResolver(schema) });

  const onsubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:8000/api/login/", data);

      if (res.status === 200) {
        const access_token = await res.data.access;
        setCookie(null, 'access_token', access_token, {
          maxAge: 60 * 60, // 1 hour
          path: '/',
        })
        localStorage.setItem("token", access_token);
        alert("Login successful!");
        reset(); // Reset the form after successful submission
        router.push("/");
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      alert(error);
    }
  }


  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden px-4">
      {/* Blue glow background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-800 via-black to-cyan-900 opacity-40 blur-3xl" />

      {/* Neon Card */}
      <motion.div
        initial={{ rotateY: -15, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_0_60px_rgba(0,180,255,0.3)] rounded-xl p-8 w-full max-w-sm"
        whileHover={{
          scale: 1.03,
          boxShadow: "0 0 50px rgba(0, 200, 255, 0.5)",
          transition: { duration: 0.3, ease: "easeInOut" },
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <h2 className="text-2xl font-bold text-white text-center mb-6 tracking-wide">
          🔐  Login
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit(onsubmit)}>
          <div>
            <label className="block text-white mb-1">Username</label>
            <input
              {...register("username")}
              type="text"
              placeholder="username"
              className="w-full bg-white/20 text-white placeholder-blue-200 px-4 py-2 rounded-md border border-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
          </div>

          <div>
            <label className="block text-white mb-1">Password</label>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full bg-white/20 text-white placeholder-blue-200 px-4 py-2 rounded-md border border-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-2.5 text-white/80 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full disabled:opacity-50 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 rounded-md shadow-[0_0_20px_rgba(0,180,255,0.6)] transition"
          >
            Log In
          </button>
        </form>

        <motion.div
          className="mt-6 text-center text-sm text-gray-600"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          don't have an account?{" "}
          <Link href="/signin">
            <span className="text-blue-600 hover:underline hover:underline-offset-4 transition-all duration-200 font-medium">
              Sign In
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
