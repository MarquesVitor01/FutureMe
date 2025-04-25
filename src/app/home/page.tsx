"use client";

import Sidebar from "../components/layout/Sidebar";
import { useState } from "react";
import { Plus } from "lucide-react";
import Image from "next/image";

interface BoxData {
  name: string;
  description: string;
  image?: string;
  textColor: string;
}

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(true);
  const [boxes, setBoxes] = useState<BoxData[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | undefined>(undefined);
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddBox = () => {
    if (editIndex !== null) {
      const updated = [...boxes];
      updated[editIndex] = { name, description, image, textColor };
      setBoxes(updated);
      setEditIndex(null);
    } else {
      setBoxes([...boxes, { name, description, image, textColor }]);
    }
    setModalOpen(false);
    setName("");
    setDescription("");
    setImage(undefined);
    setTextColor("#FFFFFF");
  };

  const handleDeleteBox = (index: number) => {
    const updated = boxes.filter((_, i) => i !== index);
    setBoxes(updated);
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

          <div className="relative w-full md:w-150">
            <input
              type="text"
              placeholder="Pesquisar projetos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl shadow-sm bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div
            onClick={() => setModalOpen(true)}
            className="flex flex-col items-center justify-center h-40 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 cursor-pointer transition shadow-lg border border-white/10"
          >
            <Plus size={36} className="text-white" />
            <span className="mt-3 text-white font-semibold text-sm uppercase tracking-wide">
              Adicionar
            </span>
          </div>

          {boxes.map((box, index) => (
            <div
              key={index}
              className="relative h-40 rounded-xl shadow-lg p-4 bg-cover bg-center flex flex-col justify-end overflow-hidden border border-white/10 backdrop-blur-md bg-white/10"
              style={{
                backgroundImage: box.image ? `url(${box.image})` : undefined,
                backgroundColor: box.image ? undefined : "#1F2937",
                color: box.textColor,
              }}
            >
              <div className="absolute top-2 right-2 flex gap-2 z-10">
                <button
                  onClick={() => {
                    setName(box.name);
                    setDescription(box.description);
                    setImage(box.image);
                    setTextColor(box.textColor);
                    setEditIndex(index);
                    setModalOpen(true);
                  }}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black px-2 py-1 rounded text-xs font-medium shadow cursor-pointer"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteBox(index)}
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
                    {box.description.split(" ").slice(0, 2).join(" ")}...
                  </p>
                </div>
                <a
                  href="/dashboard"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded shadow-md transition font-semibold cursor-pointer"
                >
                  Acessar
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-40" />

          <div className="bg-white text-black rounded-xl p-6 w-full max-w-md z-50 shadow-xl relative">
            <h2 className="text-2xl font-bold mb-4">Adicionar Projeto</h2>
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mb-3 p-2 border border-gray-300 rounded-lg"
            />
            <textarea
              placeholder="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mb-3 p-2 border border-gray-300 rounded-lg"
            ></textarea>

            <div className="mb-3">
              <label
                htmlFor="imageUpload"
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition"
              >
                Selecionar Imagem
              </label>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {image && (
              <div className="relative mb-3 w-full h-40 rounded-lg overflow-hidden">
                <Image
                  src={image}
                  alt="Preview"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            )}

            <div className="mb-4">
              <label className="block mb-1 font-medium">Cor do texto:</label>
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-12 h-8 cursor-pointer border rounded"
              />
              <span className="ml-2 text-sm text-gray-600">{textColor}</span>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-600 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddBox}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Concluir
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
