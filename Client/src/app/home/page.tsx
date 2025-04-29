"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import ProjectModal from "./components/ProjectModal";
import ProjectsGrid from "./components/ProjectsGrid";
import ProjectSearch from "./components/ProjectSearch";
import { useRouter } from "next/navigation";

import { useAuth } from "../context/AuthContext";
import LoadingScreen from "../components/layout/LoadingScreen";

interface BoxData {
  id?: string;
  name: string;
  description: string;
  image?: string | null;
  textColor: string;
}

export default function ProjectsPage() {
  const [, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(true);
  const [boxes, setBoxes] = useState<BoxData[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null | undefined>(undefined);
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [, setSyncLoading] = useState<boolean>(false);
  const { user, loading } = useAuth(); // Aqui pegamos o estado do auth
  const router = useRouter();
  useEffect(() => {
    if (!loading && !user) {
      router.push("/"); // Se não estiver logado, manda pra login
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projetos"));
        const projects: BoxData[] = [];
        querySnapshot.forEach((doc) => {
          projects.push({ id: doc.id, ...(doc.data() as BoxData) });
        });
        setBoxes(projects);
      } catch (error) {
        console.error("Erro ao buscar projetos:", error);
      }
    };

    if (user) {
      // Só carrega projetos se tiver usuário
      fetchProjects();
    }
  }, [user]);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projetos"));
        const projects: BoxData[] = [];
        querySnapshot.forEach((doc) => {
          projects.push({ id: doc.id, ...(doc.data() as BoxData) });
        });
        setBoxes(projects);
      } catch (error) {
        console.error("Erro ao buscar projetos:", error);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return null; // ou uma tela de loading mínima
  }

  const handleAddBox = async () => {
    if (!name || !description) {
      setError("Nome e descrição são obrigatórios.");
      return;
    }

    const newBox: BoxData = {
      name,
      description,
      textColor,
      image: image ?? "",
    };

    try {
      const docRef = await addDoc(collection(db, "projetos"), {
        name: newBox.name,
        description: newBox.description,
        textColor: newBox.textColor,
        image: newBox.image,
      });
      console.log("Projeto adicionado com ID: ", docRef.id);

      setBoxes([...boxes, { ...newBox, id: docRef.id }]);
      resetModal();
    } catch (error) {
      console.error("Erro ao adicionar projeto:", error);
      setError("Erro ao salvar projeto.");
    }
  };

  const handleDeleteBox = async (id: string) => {
    try {
      const boxDoc = doc(db, "projetos", id);
      await deleteDoc(boxDoc);
      setBoxes(boxes.filter((box) => box.id !== id));
    } catch (error) {
      console.error("Erro ao excluir projeto:", error);
      setError("Erro ao excluir projeto.");
    }
  };

  const handleEditBox = async () => {
    if (!name || !description || editIndex === null) {
      setError("Nome e descrição são obrigatórios.");
      return;
    }

    const updatedBox: BoxData = {
      id: boxes[editIndex].id,
      name,
      description,
      textColor,
      image: image === undefined ? undefined : image,
    };

    if (!updatedBox.id) {
      setError("ID do projeto não encontrado.");
      return;
    }

    try {
      const boxDoc = doc(db, "projetos", updatedBox.id);

      const updateData: Partial<BoxData> = {
        name: updatedBox.name,
        description: updatedBox.description,
        textColor: updatedBox.textColor,
      };

      if (updatedBox.image !== undefined) {
        updateData.image = updatedBox.image;
      }

      await updateDoc(boxDoc, updateData);

      setBoxes(
        boxes.map((box, index) => (index === editIndex ? updatedBox : box))
      );
      resetModal();
    } catch (error) {
      console.error("Erro ao editar projeto:", error);
      setError("Erro ao editar projeto.");
    }
  };

  const resetModal = () => {
    setModalOpen(false);
    setName("");
    setDescription("");
    setImage(undefined);
    setTextColor("#FFFFFF");
    setEditIndex(null);
    setError(null);
  };

  const filteredBoxes = boxes.filter((box) =>
    box.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSyncClients = async () => {
    setSyncLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Especifica que o conteúdo é JSON
        },
        body: JSON.stringify({
          data: boxes.map((box) => ({
            id: box.id,
            name: box.name,
            description: box.description,
            textColor: box.textColor,
          })),
        }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Sincronização concluída!");
      } else {
        console.error("Erro na sincronização:", result.error);
      }
    } catch (error) {
      console.error("Erro ao sincronizar clientes:", error);
    } finally {
      setSyncLoading(false);
    }
  };

  return (
    <>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <main
        className={`${
          isOpen ? "pl-66" : "pl-26"
        } p-8 transition-all duration-300 bg-gray-200 text-white min-h-screen`}
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-gray-900 text-4xl font-extrabold tracking-tight drop-shadow-xl">
              Olá, Vitor
            </h1>
            <p className="text-gray-600 text-lg">Aqui estão seus projetos</p>
          </div>

          <ProjectSearch
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <button
            onClick={handleSyncClients}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-200"
          >
            Sincronizar
          </button>
        </div>

        <ProjectsGrid
          boxes={filteredBoxes}
          onAddClick={() => setModalOpen(true)}
          onEditClick={(index) => {
            const box = boxes[index];
            setName(box.name);
            setDescription(box.description);
            setImage(box.image);
            setTextColor(box.textColor);
            setEditIndex(index);
            setModalOpen(true);
          }}
          onDeleteClick={handleDeleteBox}
        />
      </main>

      <ProjectModal
        isOpen={modalOpen}
        onClose={resetModal}
        onSubmit={editIndex !== null ? handleEditBox : handleAddBox}
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        image={image}
        setImage={setImage}
        textColor={textColor}
        setTextColor={setTextColor}
        isEditing={editIndex !== null}
      />
    </>
  );
}
