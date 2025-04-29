"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import LoadingScreen from "@/app/components/layout/LoadingScreen";
import ProjectNotFound from "./ProjectNotFound";
import DashboardClient from "./DashboardClient";

interface TableData {
  title: string;
  description: string;
  textColor: string;
  bgColor: string;
  items: { name: string; status: string }[];
}

interface ProjectData {
  id: string;
  name: string;
  description: string;
  image?: string;
  textColor: string;
  tables?: TableData[];
}

export default function DashboardClientWrapper({ id }: { id: string }) {
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const docRef = doc(db, "projetos", id);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const projectData = {
            id: docSnap.id,
            ...docSnap.data(),
          } as ProjectData;
          setProject(projectData);
        } else {
          setProject(null);  // Defina como null se não encontrar o projeto
        }
      } catch (error) {
        console.error("Erro ao buscar o projeto:", error);
        setProject(null);  // Lide com erro ao buscar projeto
      } finally {
        setLoading(false);
      }
    };
  
    fetchProject();
  }, [id]);
  
  if (loading) return <LoadingScreen />;
  if (!project) return <ProjectNotFound />;

  return <DashboardClient projectData={project} />;
}
