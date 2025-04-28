"use client";

import AddProjectCard from "./AddProjectCard";
import ProjectCard from "./ProjectCard";

interface ProjectsGridProps {
  boxes: Array<{
    id?: string;
    name: string;
    description: string;
    image?: string | null;
    textColor: string;
  }>;
  onAddClick: () => void;
  onEditClick: (index: number) => void;
  onDeleteClick: (id: string) => void;
}

export default function ProjectsGrid({
  boxes,
  onAddClick,
  onEditClick,
  onDeleteClick,
}: ProjectsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      <AddProjectCard onClick={onAddClick} />

      {boxes.map((box, index) => (
        <ProjectCard
          key={box.id || index}
          box={box}
          onEdit={() => onEditClick(index)}
          onDelete={() => box.id && onDeleteClick(box.id)}
        />
      ))}
    </div>
  );
}