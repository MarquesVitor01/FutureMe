"use client";

import Image from "next/image";

export default function LoginLogoHeader() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <Image src="/image/logo.png" alt="Logo" width={70} height={70} />
      </div>
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
        Entrar
      </h2>
      <p className="text-sm text-center text-gray-500 mb-6">
        Acesse com seu email e senha registrados.
      </p>
    </>
  );
}
