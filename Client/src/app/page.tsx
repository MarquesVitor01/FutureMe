"use client";

import { useEffect, useState } from "react";
import LoginWrapper from "./login/components/LoginWrapper";
import LoginImageSection from "./login/components/LoginImageSection";
import LoginLogoHeader from "./login/components/LoginLogoHeader";
import LoginForm from "./login/components/LoginForm";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (isAnimating) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const timer = setTimeout(() => setIsAnimating(false), 800);
    return () => clearTimeout(timer);
  }, [isAnimating]);

  return (
    <LoginWrapper>
      <LoginImageSection />

      <motion.div
        className="flex items-center justify-center px-6 py-12"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <LoginLogoHeader />
          <LoginForm />
        </motion.div>
      </motion.div>
    </LoginWrapper>
  );
}
