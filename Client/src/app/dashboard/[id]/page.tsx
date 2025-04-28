"use client";

import Sidebar from "@/app/components/layout/Sidebar";
import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Interfaces
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

export default function DashboardPage({ params }: { params: { id: string } }) {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedView, setSelectedView] = useState("vertical");
  const [searchTerm, setSearchTerm] = useState("");
  const [tables, setTables] = useState<TableData[]>([]);
  const [selectedTables, setSelectedTables] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTableTitle, setNewTableTitle] = useState("");
  const [newTableDescription, setNewTableDescription] = useState("");
  const [textColor, setTextColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [errorMessage, setErrorMessage] = useState("");
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState<TableData | null>(null);

  // Fetch project data from Firestore
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const docRef = doc(db, "projetos", params.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const projectData = {
            id: docSnap.id,
            ...docSnap.data(),
          } as ProjectData;
          setProject(projectData);
          setTables(projectData.tables || []);
        } else {
          console.log("No such project!");
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [params.id]);

  const handleDeleteSelectedTables = async () => {
    const updatedTables = tables.filter(
      (table) => !selectedTables.includes(table.title)
    );
    setTables(updatedTables);
    setSelectedTables([]);

    if (project) {
      try {
        const projectRef = doc(db, "projetos", project.id);
        await updateDoc(projectRef, { tables: updatedTables });
      } catch (error) {
        console.error("Error updating project tables:", error);
      }
    }
  };

  const handleAddTable = async () => {
    if (!newTableTitle || !newTableDescription) {
      setErrorMessage("Por favor, preencha todos os campos!");
      return;
    }

    const newTable: TableData = {
      title: newTableTitle,
      description: newTableDescription,
      textColor,
      bgColor,
      items: [],
    };

    const updatedTables = [...tables, newTable];
    setTables(updatedTables);

    if (project) {
      try {
        const projectRef = doc(db, "projetos", project.id);
        await updateDoc(projectRef, { tables: updatedTables });
      } catch (error) {
        console.error("Error adding table to project:", error);
      }
    }

    setIsModalOpen(false);
    setNewTableTitle("");
    setNewTableDescription("");
    setTextColor("#000000");
    setBgColor("#FFFFFF");
    setErrorMessage("");
  };

  const handleAddItem = async (tableIndex: number) => {
    const newItem = prompt("Digite o nome do novo item:");
    if (newItem) {
      const updatedTables = [...tables];
      updatedTables[tableIndex].items.push({
        name: newItem,
        status: "não realizado",
      });
      setTables(updatedTables);

      if (project) {
        try {
          const projectRef = doc(db, "projetos", project.id);
          await updateDoc(projectRef, { tables: updatedTables });
        } catch (error) {
          console.error("Error adding item to table:", error);
        }
      }
    }
  };

  const handleDeleteItem = async (
    itemIndex: number,
    tableItems: { name: string; status: string }[]
  ) => {
    if (!selectedTable) return;

    const updatedItems = [...tableItems];
    updatedItems.splice(itemIndex, 1);

    setSelectedTable({
      ...selectedTable,
      items: updatedItems,
    });

    if (project) {
      try {
        const projectRef = doc(db, "projetos", project.id);
        await updateDoc(projectRef, {
          tables: tables.map((table) =>
            table.title === selectedTable.title
              ? { ...selectedTable, items: updatedItems }
              : table
          ),
        });
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  const openAddTableModal = () => setIsModalOpen(true);
  const closeAddTableModal = () => setIsModalOpen(false);

  const openInfoModal = (table: TableData) => {
    setSelectedTable({ ...table });
    setIsInfoModalOpen(true);
  };

  const handleSaveTableChanges = async () => {
    if (selectedTable) {
      const updatedTables = tables.map((table) =>
        table.title === selectedTable.title ? selectedTable : table
      );
      setTables(updatedTables);

      if (project) {
        try {
          const projectRef = doc(db, "projetos", project.id);
          await updateDoc(projectRef, { tables: updatedTables });
        } catch (error) {
          console.error("Error updating table:", error);
        }
      }
    }

    setIsInfoModalOpen(false);
  };

  const handleItemStatusChange = (status: string, index: number) => {
    if (!selectedTable) return;

    const updatedItems = [...selectedTable.items];
    updatedItems[index].status = status;
    setSelectedTable({
      ...selectedTable,
      items: updatedItems,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <p className="text-xl text-white">Projeto não encontrado</p>
      </div>
    );
  }

  return (
    <>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <main
        className={`${
          isOpen ? "pl-66" : "pl-26"
        } p-8 transition-all duration-300 bg-gray-200 text-white min-h-screen flex flex-col justify-between`}
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-gray-900 text-4xl font-extrabold tracking-tight drop-shadow-xl">
              {project.name}
            </h1>
            <p className="text-gray-600 text-lg">
              {project.description}
            </p>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-2 md:gap-4">
            <select
              value={selectedView}
              onChange={(e) => setSelectedView(e.target.value)}
              className="bg-white hover:bg-gray-400 text-gray-900 px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer"
            >
              <option value="vertical">Vertical</option>
              <option value="horizontal">Horizontal</option>
            </select>
            <button
              className="bg-gradient-to-r from-green-400 to-emerald-500 cursor-pointer hover:from-green-500 hover:to-emerald-600 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-emerald-500/20"
              onClick={openAddTableModal}
            >
              + Add Table
            </button>
            {selectedTables.length > 0 && (
              <button
                onClick={handleDeleteSelectedTables}
                className="cursor-pointer bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-pink-500/20"
              >
                Excluir Selecionadas
              </button>
            )}
          </div>

          <div className="mt-4">
            <input
              type="text"
              placeholder="Pesquisar tabelas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 py-3 rounded-xl bg-gray-900 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
            />
          </div>
        </div>

        {/* Tabelas */}
        <div
          className={`${
            selectedView === "horizontal" ? "overflow-x-auto pb-4" : ""
          }`}
        >
          <div
            className={`${
              selectedView === "horizontal" ? "flex flex-nowrap gap-6" : "grid grid-cols-1 gap-4"
            }`}
          >
            {tables
              .filter((table) =>
                table.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((table, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl shadow-lg ${
                    selectedView === "horizontal" ? "min-w-[300px]" : "w-full"
                  } flex flex-col justify-between transition-all duration-300`}
                  style={{
                    color: table.textColor,
                    backgroundColor: table.bgColor,
                    minHeight: selectedView === "horizontal" ? "350px" : "200px",
                  }}
                >
                  <div className="flex justify-between items-start">
                    <h2
                      className="text-xl font-bold"
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
                        checked={selectedTables.includes(table.title)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedTables([...selectedTables, table.title]);
                          } else {
                            setSelectedTables(
                              selectedTables.filter((t) => t !== table.title)
                            );
                          }
                        }}
                        className="h-5 w-5 rounded border-gray-300 text-cyan-500 focus:ring-cyan-400"
                      />
                    </div>
                  </div>

                  <div
                    className="overflow-y-auto mt-4"
                    style={{
                      maxHeight: "200px",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px",
                    }}
                  >
                    {table.items.length > 0 ? (
                      table.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium"
                          style={{
                            whiteSpace: "normal",
                            wordWrap: "break-word",
                            minWidth: "100px",
                            maxWidth: "calc(33% - 8px)",
                            color: "#000000",
                            backgroundColor:
                              item.status === "não realizado"
                                ? "#ef4444"
                                : item.status === "andamento"
                                ? "#f59e0b"
                                : "#10b981",
                          }}
                        >
                          {item.name}
                        </div>
                      ))
                    ) : (
                      <p className="text-sm opacity-80" style={{ color: table.textColor }}>
                        Nenhum item adicionado.
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleAddItem(index)}
                      className="cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-3 py-1.5 rounded-lg text-sm transition-all duration-300 shadow-md"
                    >
                      + Add Item
                    </button>
                    <button
                      onClick={() => openInfoModal(table)}
                      className="cursor-pointer bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white px-3 py-1.5 rounded-lg text-sm transition-all duration-300 shadow-md"
                    >
                      Ver Info
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </main>

      {/* Add Table Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md z-40" />
          <div className="bg-gray-800 text-white rounded-xl p-6 w-full max-w-md z-50 shadow-2xl border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Adicionar Tabela
            </h2>
            {errorMessage && (
              <p className="text-red-400 mb-4 p-2 bg-red-900/30 rounded-lg">{errorMessage}</p>
            )}
            <input
              type="text"
              placeholder="Título da Tabela"
              value={newTableTitle}
              onChange={(e) => setNewTableTitle(e.target.value)}
              className="w-full p-3 mb-4 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none"
            />
            <textarea
              placeholder="Descrição da Tabela"
              value={newTableDescription}
              onChange={(e) => setNewTableDescription(e.target.value)}
              className="w-full p-3 mb-4 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none"
            />
            <div className="mb-4">
              <label className="block mb-2 text-sm text-gray-300">Cor do Texto</label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-16 h-10 rounded-lg border-2 border-gray-600 cursor-pointer"
                />
                <span className="font-mono">{textColor}</span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm text-gray-300">Cor de Fundo</label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-16 h-10 rounded-lg border-2 border-gray-600 cursor-pointer"
                />
                <span className="font-mono">{bgColor}</span>
              </div>
            </div>

            <div className="flex justify-between gap-4">
              <button
                onClick={closeAddTableModal}
                className="cursor-pointer bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex-1 transition-all duration-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddTable}
                className="cursor-pointer bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg flex-1 transition-all duration-300 shadow-lg"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Info Modal */}
      {isInfoModalOpen && selectedTable && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md z-40" />
          <div className="bg-gray-800 text-white rounded-xl p-6 w-full max-w-md z-50 shadow-2xl border border-gray-700 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-transparent">
              Editar Tabela: {selectedTable.title}
            </h2>

            {/* Título da Tabela */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-300 mb-1">
                Título da Tabela
              </label>
              <input
                type="text"
                value={selectedTable.title}
                onChange={(e) =>
                  setSelectedTable({ ...selectedTable, title: e.target.value })
                }
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
              />
            </div>

            {/* Descrição da Tabela */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-300 mb-1">
                Descrição da Tabela
              </label>
              <textarea
                value={selectedTable.description}
                onChange={(e) =>
                  setSelectedTable({
                    ...selectedTable,
                    description: e.target.value,
                  })
                }
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
              />
            </div>

            {/* Editar Status de Itens */}
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3 text-gray-300">Itens</h3>
              {selectedTable.items.length > 0 ? (
                selectedTable.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2 p-3 bg-gray-700/50 rounded-lg"
                  >
                    <div className="text-sm font-medium">{item.name}</div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <select
                        value={item.status}
                        onChange={(e) =>
                          handleItemStatusChange(e.target.value, index)
                        }
                        className="bg-gray-700 border border-gray-600 text-sm p-2 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none flex-1 sm:flex-none"
                      >
                        <option value="não realizado">Não Realizado</option>
                        <option value="andamento">Andamento</option>
                        <option value="realizado">Realizado</option>
                      </select>
                      <button
                        onClick={() =>
                          handleDeleteItem(index, selectedTable.items)
                        }
                        className="cursor-pointer bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-sm transition-colors duration-300"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-sm">Nenhum item adicionado.</p>
              )}
            </div>

            <div className="flex justify-between gap-4 pt-4">
              <button
                onClick={() => setIsInfoModalOpen(false)}
                className="cursor-pointer bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex-1 transition-all duration-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveTableChanges}
                className="cursor-pointer bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white px-4 py-2 rounded-lg flex-1 transition-all duration-300 shadow-lg"
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}