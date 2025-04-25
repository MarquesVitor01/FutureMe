"use client";

import Sidebar from "../components/layout/Sidebar";
import { useState } from "react";

export default function DashboardPage() {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedView, setSelectedView] = useState("vertical"); // Padrão 'vertical'
  const [searchTerm, setSearchTerm] = useState("");
  const [tables, setTables] = useState<
    {
      title: string;
      description: string;
      textColor: string;
      bgColor: string;
      items: string[]; // Aqui é o tipo que define que 'items' é um array de strings
    }[]
  >([
    {
      title: "Tabela 1",
      description: "Descrição da Tabela 1",
      textColor: "#000000",
      bgColor: "#FFFFFF",
      items: [], // Inicializa como um array de strings
    },
    {
      title: "Tabela 2",
      description: "Descrição da Tabela 2",
      textColor: "#000000",
      bgColor: "#FFFFFF",
      items: [], // Inicializa como um array de strings
    },
  ]);

  const [selectedTables, setSelectedTables] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTableTitle, setNewTableTitle] = useState("");
  const [newTableDescription, setNewTableDescription] = useState("");
  const [textColor, setTextColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [errorMessage, setErrorMessage] = useState("");

  const handleDeleteSelectedTables = () => {
    setTables(tables.filter((table) => !selectedTables.includes(table.title)));
    setSelectedTables([]);
  };

  const handleAddTable = () => {
    if (!newTableTitle || !newTableDescription) {
      setErrorMessage("Por favor, preencha todos os campos!");
      return;
    }

    const newTable = {
      title: `${newTableTitle}`,
      description: newTableDescription,
      textColor,
      bgColor,
      items: [],
    };

    setTables([...tables, newTable]);
    setIsModalOpen(false);
    setNewTableTitle("");
    setNewTableDescription("");
    setTextColor("#000000");
    setBgColor("#FFFFFF");
    setErrorMessage("");
  };

  const handleAddItem = (tableIndex: number) => {
    const newItem = prompt("Digite o nome do novo item:");
    if (newItem) {
      const updatedTables = [...tables];
      updatedTables[tableIndex].items.push(newItem); // Não gera mais erro
      setTables(updatedTables);
    }
  };

  return (
    <>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <main
        className={`${
          isOpen ? "pl-66" : "pl-26"
        } p-8 transition-all duration-300 bg-gray-200 text-white min-h-screen flex flex-col justify-between`}
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-gray-900 text-4xl font-extrabold tracking-tight drop-shadow-xl">
              Dashboard de Atividades
            </h1>
            <p className="text-gray-600 text-lg">
              Adicione e manuseie suas tarefas aqui
            </p>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex gap-4">
            <select
              value={selectedView}
              onChange={(e) => setSelectedView(e.target.value)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300"
            >
              <option value="vertical">Vertical</option>
              <option value="horizontal">Horizontal</option>
            </select>

            <button
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              onClick={() => setIsModalOpen(true)}
            >
              Add Table
            </button>

            <button
              onClick={handleDeleteSelectedTables}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            >
              Excluir Selecionadas
            </button>
          </div>

          <div className="flex gap-4 mt-4">
            <input
              type="text"
              placeholder="Pesquisar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 py-3 rounded-xl shadow-sm bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Tabelas */}
        <div
          className={`${
            selectedView === "horizontal" ? "overflow-y-auto" : ""
          } flex ${
            selectedView === "horizontal" ? "flex-wrap gap-8" : "flex-col gap-4"
          } pb-4`}
        >
          {tables
            .filter((table) =>
              table.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((table, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg shadow-md ${
                  selectedView === "horizontal" ? "w-[320px]" : "w-full"
                } flex flex-col justify-between hover:scale-101 transition-all`}
                style={{
                  color: table.textColor,
                  backgroundColor: table.bgColor,
                  height: selectedView === "horizontal" ? "350px" : "200px", // Menor altura para a versão horizontal
                }}
              >
                <div className="flex justify-between items-start">
                  <h2
                    className="text-xl font-semibold"
                    style={{
                      maxWidth: "100%",
                      whiteSpace: "normal",
                      wordWrap: "break-word",
                    }}
                  >
                    {table.title}
                  </h2>
                  <div className="relative ml-auto">
                    <input
                      type="checkbox"
                      className="text-blue-600 focus:ring-blue-500"
                      onChange={(e) =>
                        console.log("Checkbox status:", e.target.checked)
                      }
                    />
                  </div>
                </div>

                <div
                  className="overflow-y-auto mt-4"
                  style={{
                    maxHeight: "200px",
                    display: "flex",
                    flexWrap: "wrap", // Permite que os itens quebrem linha
                    gap: "8px", // Espaçamento entre os itens
                  }}
                >
                  {table.items.length > 0 ? (
                    table.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-100 p-2 rounded-lg"
                        style={{
                          whiteSpace: "normal", // Permite quebra de linha nos itens
                          wordWrap: "break-word", // Quebra palavras longas
                          minWidth: "120px", // Largura mínima para os itens
                          maxWidth: "calc(33% - 8px)", // Cada item pode ocupar até 33% da largura da tabela, ajustando conforme o espaço disponível
                        }}
                      >
                        {item}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">
                      Nenhum item adicionado.
                    </p>
                  )}
                </div>

                <div className="flex gap-4 mt-4">
                  <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg">
                    Ver Detalhes
                  </button>

                  <button
                    onClick={() => handleAddItem(index)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                  >
                    <span>+</span> Add Item
                  </button>
                </div>
              </div>
            ))}
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-40" />
          <div className="bg-white text-black rounded-xl p-6 w-full max-w-md z-50 shadow-xl relative">
            <h2 className="text-2xl font-semibold mb-4">Adicionar Tabela</h2>

            {errorMessage && (
              <p className="text-red-600 mb-4">{errorMessage}</p>
            )}

            <input
              type="text"
              placeholder="Título da Tabela"
              value={newTableTitle}
              onChange={(e) => setNewTableTitle(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            />
            <textarea
              placeholder="Descrição da Tabela"
              value={newTableDescription}
              onChange={(e) => setNewTableDescription(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            />

            <div className="mb-4">
              <label className="block mb-2 text-sm">Cor do Texto</label>
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm">Cor de Fundo</label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg"
              />
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddTable}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
