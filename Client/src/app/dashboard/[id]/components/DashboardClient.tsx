"use client";

import Sidebar from "@/app/components/layout/Sidebar";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
// import LoadingScreen from "@/app/components/layout/LoadingScreen";
import ProjectNotFound from "./ProjectNotFound";
import DashboardHeader from "./DashboardHeader";
import ControlsSection from "./ControlsSection";
import TablesView from "./TablesView";
import AddTableModal from "./AddTableModal";
import TableInfoModal from "./TableInfoModal";

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

interface DashboardClientProps {
  projectData: ProjectData;
}

export default function DashboardClient({ projectData }: DashboardClientProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedView, setSelectedView] = useState("vertical");
  const [searchTerm, setSearchTerm] = useState("");
  const [tables, setTables] = useState<TableData[]>(projectData.tables || []);
  const [selectedTables, setSelectedTables] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTableTitle, setNewTableTitle] = useState("");
  const [newTableDescription, setNewTableDescription] = useState("");
  const [textColor, setTextColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [errorMessage, setErrorMessage] = useState("");
  const [project,] = useState<ProjectData>(projectData);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState<TableData | null>(null);

  const handleDeleteSelectedTables = async () => {
    const updatedTables = tables.filter(
      (table) => !selectedTables.includes(table.title)
    );
    setTables(updatedTables);
    setSelectedTables([]);

    try {
      const projectRef = doc(db, "projetos", project.id);
      await updateDoc(projectRef, { tables: updatedTables });
    } catch (error) {
      console.error("Error updating project tables:", error);
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

    try {
      const projectRef = doc(db, "projetos", project.id);
      await updateDoc(projectRef, { tables: updatedTables });
    } catch (error) {
      console.error("Error adding table to project:", error);
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

      try {
        const projectRef = doc(db, "projetos", project.id);
        await updateDoc(projectRef, { tables: updatedTables });
      } catch (error) {
        console.error("Error adding item to table:", error);
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

      try {
        const projectRef = doc(db, "projetos", project.id);
        await updateDoc(projectRef, { tables: updatedTables });
      } catch (error) {
        console.error("Error updating table:", error);
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

  if (!project) {
    return <ProjectNotFound />;
  }

  return (
    <>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <main
        className={`${
          isOpen ? "pl-66" : "pl-26"
        } p-8 transition-all duration-300 bg-gray-200 text-white min-h-screen flex flex-col justify-between`}
      >
        <DashboardHeader
          projectName={project.name}
          projectDescription={project.description}
        />

        <ControlsSection
          selectedView={selectedView}
          onViewChange={setSelectedView}
          onAddTable={openAddTableModal}
          selectedTables={selectedTables}
          onDeleteSelectedTables={handleDeleteSelectedTables}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <TablesView
          tables={tables}
          searchTerm={searchTerm}
          selectedView={selectedView}
          selectedTables={selectedTables}
          onTableSelect={setSelectedTables}
          onAddItem={handleAddItem}
          onOpenInfo={openInfoModal}
        />
      </main>

      <AddTableModal
        isOpen={isModalOpen}
        onClose={closeAddTableModal}
        onSubmit={handleAddTable}
        title={newTableTitle}
        onTitleChange={setNewTableTitle}
        description={newTableDescription}
        onDescriptionChange={setNewTableDescription}
        textColor={textColor}
        onTextColorChange={setTextColor}
        bgColor={bgColor}
        onBgColorChange={setBgColor}
        errorMessage={errorMessage}
      />

      {selectedTable && (
        <TableInfoModal
          isOpen={isInfoModalOpen}
          onClose={() => setIsInfoModalOpen(false)}
          table={selectedTable}
          onTableChange={setSelectedTable}
          onItemStatusChange={handleItemStatusChange}
          onDeleteItem={handleDeleteItem}
          onSave={handleSaveTableChanges}
        />
      )}
    </>
  );
}
