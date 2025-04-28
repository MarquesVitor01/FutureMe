'use client';

interface DashboardHeaderProps {
  projectName: string;
  projectDescription: string;
}

export default function DashboardHeader({ 
  projectName, 
  projectDescription 
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
      <div>
        <h1 className="text-gray-900 text-4xl font-extrabold tracking-tight drop-shadow-xl">
          {projectName}
        </h1>
        <p className="text-gray-600 text-lg">
          {projectDescription}
        </p>
      </div>
    </div>
  );
}