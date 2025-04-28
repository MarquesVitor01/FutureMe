"use client";

interface ProjectSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function ProjectSearch({
  searchTerm,
  setSearchTerm,
}: ProjectSearchProps) {
  return (
    <div className="relative w-full md:w-150">
      <input
        type="text"
        placeholder="Pesquisar projetos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-7 pr-4 py-3 rounded-xl shadow-sm bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}