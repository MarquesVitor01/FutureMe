"use client";

import { Plus } from "lucide-react";

interface AddProjectCardProps {
  onClick: () => void;
}

export default function AddProjectCard({ onClick }: AddProjectCardProps) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center justify-center h-40 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 cursor-pointer transition shadow-lg border border-white/10"
    >
      <Plus size={36} className="text-white" />
      <span className="mt-3 text-white font-semibold text-sm uppercase tracking-wide">
        Adicionar
      </span>
    </div>
  );
}