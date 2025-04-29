"use client";

import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import Link from "next/link";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: LoginFormData) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      router.push("/home");
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message.includes("user-not-found")) {
          setError("Usuário não encontrado.");
        } else if (err.message.includes("wrong-password")) {
          setError("Senha incorreta.");
        } else {
          setError("Erro desconhecido.");
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
          className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">Email é obrigatório</span>
        )}
      </div>

      <div>
        <input
          type="password"
          placeholder="Senha"
          {...register("password", { required: true })}
          className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        {errors.password && (
          <span className="text-red-500 text-sm">Senha é obrigatória</span>
        )}
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg shadow-md transition transform hover:scale-[1.02]"
      >
        Entrar
      </button>

      {/* <div className="text-right text-sm mt-2">
        <Link href="/forgot-password" className="text-blue-600 hover:underline">
          Esqueceu a senha?
        </Link>
      </div> */}

      {/* <div className="text-center text-sm text-gray-600 mt-6">
        Ainda não tem uma conta?{" "}
        <Link href="/signup" className="text-blue-600 hover:underline">
          Cadastre-se
        </Link>
      </div> */}
    </form>
  );
}
