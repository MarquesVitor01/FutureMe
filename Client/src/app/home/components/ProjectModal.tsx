"use client";

import Image from "next/image";
import { ChangeEvent } from "react";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  name: string;
  setName: (name: string) => void;
  description: string;
  setDescription: (description: string) => void;
  image: string | null | undefined;
  setImage: (image: string | null | undefined) => void;
  textColor: string;
  setTextColor: (color: string) => void;
  isEditing: boolean;
}

export default function ProjectModal({
  isOpen,
  onClose,
  onSubmit,
  name,
  setName,
  description,
  setDescription,
  image,
  setImage,
  textColor,
  setTextColor,
  isEditing,
}: ProjectModalProps) {
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-40" />

      <div className="bg-white text-black rounded-xl p-6 w-full max-w-md z-50 shadow-xl relative">
        <h2 className="text-2xl font-bold mb-4">
          {isEditing ? "Editar Projeto" : "Adicionar Projeto"}
        </h2>
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
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-600 transition"
          >
            Cancelar
          </button>
          <button
            onClick={onSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Concluir
          </button>
        </div>
      </div>
    </div>
  );
}