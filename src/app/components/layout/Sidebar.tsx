"use client";

import { Dispatch, SetStateAction } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <div className="fixed left-0 top-0 h-screen z-50">
      <div
        className={`h-full transition-all duration-300 bg-gray-900 shadow-lg border-r border-gray-700 ${
          isOpen ? "w-60" : "w-20"
        }`}
      >
        {isOpen ? (
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-200 hover:text-white transition cursor-pointer"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        ) : (
          <div className="flex justify-center p-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-200 hover:text-white transition cursor-pointer"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        )}
        {isOpen && (
          <div className="flex flex-col items-center space-y-2 px-4 pb-6">
            <Image
              src="/image/logo.png"
              alt="User profile"
              width={70}
              height={70}
              className="rounded-full"
            />
          </div>
        )}

        <nav
          className={`flex flex-col space-y-4 px-4 text-sm ${
            isOpen ? "" : "mt-8"
          }`}
        >
          <Link
            href="/home"
            className="flex items-center justify-center py-3 px-6 w-full rounded-lg bg-gray-200 text-gray-900 hover:bg-gray-300 transition"
          >
            {isOpen ? "Home" : "🏠"}
          </Link>
          <Link
            href="/settings"
            className="flex items-center justify-center py-3 px-6 w-full rounded-lg bg-gray-200 text-gray-900 hover:bg-gray-300 transition"
          >
            {isOpen ? "Configurações" : "⚙️"}
          </Link>
          <Link
            href="/profile"
            className="flex items-center justify-center py-3 px-6 w-full rounded-lg bg-gray-200 text-gray-900 hover:bg-gray-300 transition"
          >
            {isOpen ? "Perfil" : "👤"}
          </Link>
        </nav>

        <hr className="my-6 mx-4 border-gray-700" />

        <div className="px-4">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center py-3 px-6 w-full rounded-lg bg-red-600 text-white hover:bg-red-700 transition cursor-pointer"
          >
            {isOpen ? "Sair" : "🚪"}
          </button>
        </div>
      </div>
    </div>
  );
}
