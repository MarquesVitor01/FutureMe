"use client";

interface ProjectCardProps {
  box: {
    id?: string;
    name: string;
    description: string;
    image?: string | null;
    textColor: string;
  };
  onEdit: () => void;
  onDelete: () => void;
}

export default function ProjectCard({ box, onEdit, onDelete }: ProjectCardProps) {
  return (
    <div
      className="relative h-40 rounded-xl shadow-lg p-4 bg-cover bg-center flex flex-col justify-end overflow-hidden border border-white/10 backdrop-blur-md bg-white/10"
      style={{
        backgroundImage: box.image ? `url(${box.image})` : undefined,
        backgroundColor: box.image ? undefined : "#1F2937",
        color: box.textColor,
      }}
    >
      <div className="absolute top-2 right-2 flex gap-2 z-10">
        <button
          onClick={onEdit}
          className="bg-yellow-400 hover:bg-yellow-500 text-black px-2 py-1 rounded text-xs font-medium shadow cursor-pointer"
        >
          Editar
        </button>
        <button
          onClick={onDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs font-medium shadow cursor-pointer"
        >
          🗑
        </button>
      </div>

      <div className="flex items-center justify-between gap-2 z-10">
        <div>
          <h3 className="font-semibold text-lg leading-5 drop-shadow-sm">
            {box.name}
          </h3>
          <p className="text-sm text-white/90">
            {box.description?.split(" ").slice(0, 2).join(" ") ?? ""}...
          </p>
        </div>
        <a
          href={`/dashboard/${box.id}`}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded shadow-md transition font-semibold cursor-pointer"
        >
          Acessar
        </a>
      </div>
    </div>
  );
}