"use client";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { UploadCloud, BrainCircuit, Sparkles } from "lucide-react";

export default function Home() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -150]);

  const whyUsQ = [
    {
      title: "Smart Scoring",
      desc: "ML algorithm and NLP based tailored to job roles.",
      icon: "BrainCircuit",
    },
    {
      title: "Keyword Insights",
      desc: "LangChain + LLM powered keyword analysis.",
      icon: "SearchCheck",
    },
    {
      title: "Instant Suggestions",
      desc: "Real-time, actionable resume feedback.",
      icon: "Sparkles",
    },
    {
      title: "Custom Parser",
      desc: "Built-from-scratch parser for precision.",
      icon: "Settings2",
    },
  ]

  return (
    <div>
      <main className="text-gray-800 bg-transparent">

        {/* Hero Section */}
        {/* <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-900"
          >
            AI-Powered Resume Scoring & Feedback
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-blue-700 text-lg max-w-xl mb-6"
          >
            Upload your resume and get instant feedback with our intelligent ATS — designed to help you stand out.
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link href="/upload" className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg shadow-lg hover:bg-blue-700 transition-all">
              Upload Your Resume
            </Link>
          </motion.div>
        </section> */}
        <section ref={ref} className="relative min-h-[100vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
          {/* ✅ Parallax Background Image */}

          <motion.div
            style={{ y }}
            className="absolute inset-0 -z-10 bg-blue-950"
          >
            <img
              src="/hero-bg.png"
              alt="Hero Background"
              className="w-full h-full object-cover brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 via-blue-800/20 to-white/20 mix-blend-multiply" />
          </motion.div>

          {/* Animated Content */}
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-extrabold mb-4 text-white drop-shadow-lg"
          >
            AI-Powered Resume Scoring & Feedback
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-white text-lg max-w-xl mb-6 drop-shadow-sm"
          >
            Upload your resume and get instant feedback with our intelligent ATS — designed to help you stand out.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              href="/upload"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg shadow-lg hover:bg-blue-700 transition-all"
            >
              Upload Your Resume
            </Link>
          </motion.div>
        </section>
        {/* How It Works */}
        <section className="py-20 px-6 bg-white">

          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-3xl font-bold text-center mb-12 text-blue-800"
          >
            How It Works
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <motion.div
              whileHover={{ y: -5 }}
              className="p- bg-blue-50 rounded-2xl shadow-md"
            >
              <UploadCloud size={40} className="mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">1. Upload Resume</h3>
              <p className="text-blue-700">Just drag & drop your PDF resume — we handle the rest.</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="p-6 bg-blue-50 rounded-2xl shadow-md"
            >
              <BrainCircuit size={40} className="mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">2. AI Scoring</h3>
              <p className="text-blue-700">Our ML engine scores your resume based on job relevance and formatting.</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="p-6 bg-blue-50 rounded-2xl shadow-md"
            >
              <Sparkles size={40} className="mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">3. Get Suggestions</h3>
              <p className="text-blue-700">Receive actionable insights to improve your resume instantly.</p>
            </motion.div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-gradient-to-r from-blue-100 to-blue-50 py-20 px-6">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-semibold text-center mb-12 text-blue-900"
          >
            Why Choose Us
          </motion.h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {whyUsQ.map((feature, i) => {
              const Icon = require("lucide-react")[feature.icon];
              return (
                <motion.div
                  key={feature.title}
                  whileHover={{
                    scale: 1.05,
                    rotateX: 5,
                    rotateY: -5,
                    boxShadow: "0 0 30px rgba(59,130,246,0.4)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-white rounded-2xl p-6 text-center shadow-md border border-blue-100 hover:border-blue-300 transition-all duration-300 transform perspective-1000"
                >
                  <Icon className="mx-auto mb-4 text-blue-600" size={36} />
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">{feature.title}</h3>
                  <p className="text-blue-700 text-sm">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </section>



        {/* Final CTA */}
        <section className="bg-blue-100 py-14 text-center">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-semibold mb-6 text-blue-800"
          >
            Ready to Optimize Your Resume?
          </motion.h3>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link href="/upload" className="inline-block bg-blue-700 text-white px-6 py-3 rounded-xl text-lg shadow-md hover:bg-blue-800 transition-all">
              Get Your ATS Score Now
            </Link>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="bg-blue-950 text-blue-100 py-6 text-center text-sm">
          Built by [Sharad] · Powered by Django, LangChain & Next.js
        </footer>
      </main>
    </div>
  );
}
