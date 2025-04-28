'use client';

import { TableData } from "./types";

interface TablesViewProps {
  tables: TableData[];
  searchTerm: string;
  selectedView: string;
  selectedTables: string[];
  onTableSelect: (tables: string[]) => void;
  onAddItem: (tableIndex: number) => void;
  onOpenInfo: (table: TableData) => void;
}

export default function TablesView({
  tables,
  searchTerm,
  selectedView,
  selectedTables,
  onTableSelect,
  onAddItem,
  onOpenInfo,
}: TablesViewProps) {
  return (
    <div className={`${
      selectedView === "horizontal" ? "overflow-x-auto pb-4" : ""
    }`}>
      <div className={`${
        selectedView === "horizontal" ? "flex flex-nowrap gap-6" : "grid grid-cols-1 gap-4"
      }`}>
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
                        onTableSelect([...selectedTables, table.title]);
                      } else {
                        onTableSelect(
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
                  onClick={() => onAddItem(index)}
                  className="cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-3 py-1.5 rounded-lg text-sm transition-all duration-300 shadow-md"
                >
                  + Add Item
                </button>
                <button
                  onClick={() => onOpenInfo(table)}
                  className="cursor-pointer bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white px-3 py-1.5 rounded-lg text-sm transition-all duration-300 shadow-md"
                >
                  Ver Info
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}