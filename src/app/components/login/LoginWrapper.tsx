"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface LoginWrapperProps {
  children: ReactNode;
}

export default function LoginWrapper({ children }: LoginWrapperProps) {
  return (
    <motion.div
      className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-br from-blue-100 to-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}
