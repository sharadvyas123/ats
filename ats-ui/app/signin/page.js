"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import axios from "axios";
import { setCookie } from "nookies";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
    username: yup.string().required("Username is required").min(3, "Username must be at least 3 characters long"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required").min(6, "password is Too Short").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, "PASSWORD is not STRONG!!"),
    password2: yup.string().required("Please Re enter the password")
        .oneOf([yup.ref('password'), null], 'Passwords must match')
});

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);

    const router = useRouter();

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ resolver: yupResolver(schema) });

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
        }),
    };

    const onsubmit = async (data) => {
        try {
            const res = await axios.post("localhost:8000/api/auth/register/", data);
            if (res.status === 200) {
                // haji sign up time par token nathi maltu etle user ne account banavi ne login karvu pade 
                router.replace("/login"); // aapne replace("/") pan kari shakie pan tena pachhi middleware ma jay ane check thay tena karta sidhu ready 
                reset();
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="relative flex justify-center items-center min-h-screen overflow-hidden bg-gradient-to-br from-indigo-950 via-blue-900 to-sky-900 px-4">
            {/* Background blobs */}
            <motion.div
                className="absolute w-[400px] h-[400px] bg-purple-500 rounded-full blur-3xl opacity-25"
                animate={{ x: [0, 50, -30], y: [0, -60, 30] }}
                transition={{ duration: 20, repeat: Infinity, repeatType: "mirror" }}
                style={{ top: "-120px", left: "-120px" }}
            />
            <motion.div
                className="absolute w-[500px] h-[500px] bg-sky-500 rounded-full blur-3xl opacity-25"
                animate={{ x: [0, -40, 60], y: [0, 40, -20] }}
                transition={{ duration: 22, repeat: Infinity, repeatType: "mirror" }}
                style={{ bottom: "-160px", right: "-140px" }}
            />

            <motion.div
                className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md z-10 hover:shadow-blue-500/40 transition duration-300"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >

                <motion.h2
                    className="text-3xl font-bold text-center text-blue-800 mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    Sign Up
                </motion.h2>
                <form onSubmit={handleSubmit(onsubmit)}>
                    {/* Username */}
                    <motion.div className="my-4 relative" variants={fadeIn} initial="hidden" animate="visible" custom={0}>
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            {...register("username")}
                            type="text"
                            name="username"
                            placeholder="Username"
                            className="w-full pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </motion.div>
                        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}

                    {/* Email */}
                    <motion.div className="my-4 relative" variants={fadeIn} initial="hidden" animate="visible" custom={1}>
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            {...register("email")}
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="w-full pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </motion.div>
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}

                    {/* Password */}
                    <motion.div className="my-4 relative" variants={fadeIn} initial="hidden" animate="visible" custom={2}>
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            {...register("password")}
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            className="w-full pl-10 pr-10 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </motion.div>
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p> }

                    {/* Re-enter Password */}
                    <motion.div className="my-4 relative" variants={fadeIn} initial="hidden" animate="visible" custom={3}>
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            {...register("password2")}
                            type={showRePassword ? "text" : "password"}
                            name="repassword"
                            placeholder="Re-enter Password"
                            className="w-full pl-10 pr-10 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            onClick={() => setShowRePassword((prev) => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                        >
                            {showRePassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </motion.div>
                        {errors.password2 && <p className="text-red-500 text-sm mt-1">{errors.password2.message}</p>}

                    {/* Submit */}
                    <motion.button
                        whileHover={{ scale: 1.02, boxShadow: "0px 0px 20px rgba(59, 130, 246, 0.4)" }}
                        whileTap={{ scale: 0.96 }}
                        type="submit"
                        className="mt-2 w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-xl font-semibold shadow-md transition-all"
                    >
                        Create Account
                    </motion.button>
                </form>
                {/* Login link */}
                <motion.div
                    className="mt-6 text-center text-sm text-gray-600"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    Already have an account?{" "}
                    <Link href="/login">
                        <span className="text-blue-600 hover:underline hover:underline-offset-4 transition-all duration-200 font-medium">
                            Login
                        </span>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}
