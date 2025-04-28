"use client";

import { motion } from "framer-motion";
// import Image from "next/image";

export default function LoginImageSection() {
  return (
    <motion.div
      className="relative hidden lg:block"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* <Image
        src="/image/login.avif"
        alt="Login Illustration"
        layout="fill"
        objectFit="cover"
        className="rounded-r-3xl shadow-lg"
      /> */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 flex flex-col items-center justify-center text-white px-8">
        <motion.h1
          className="text-4xl font-extrabold mb-4 text-center drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Bem-vindo ao nosso app
        </motion.h1>
        <motion.p
          className="text-lg text-center drop-shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Acesse seu painel e aproveite os recursos exclusivos.
        </motion.p>
      </div>
    </motion.div>
  );
}
