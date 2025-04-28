'use client';

import { TableData } from "./types";

interface TableInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  table: TableData;
  onTableChange: (table: TableData) => void;
  onItemStatusChange: (status: string, index: number) => void;
  onDeleteItem: (itemIndex: number, tableItems: { name: string; status: string }[]) => void;
  onSave: () => void;
}

export default function TableInfoModal({
  isOpen,
  onClose,
  table,
  onTableChange,
  onItemStatusChange,
  onDeleteItem,
  onSave,
}: TableInfoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md z-40" />
      <div className="bg-gray-800 text-white rounded-xl p-6 w-full max-w-md z-50 shadow-2xl border border-gray-700 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-transparent">
          Editar Tabela: {table.title}
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-300 mb-1">
            Título da Tabela
          </label>
          <input
            type="text"
            value={table.title}
            onChange={(e) =>
              onTableChange({ ...table, title: e.target.value })
            }
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-300 mb-1">
            Descrição da Tabela
          </label>
          <textarea
            value={table.description}
            onChange={(e) =>
              onTableChange({
                ...table,
                description: e.target.value,
              })
            }
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-3 text-gray-300">Itens</h3>
          {table.items.length > 0 ? (
            table.items.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2 p-3 bg-gray-700/50 rounded-lg"
              >
                <div className="text-sm font-medium">{item.name}</div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <select
                    value={item.status}
                    onChange={(e) =>
                      onItemStatusChange(e.target.value, index)
                    }
                    className="bg-gray-700 border border-gray-600 text-sm p-2 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none flex-1 sm:flex-none"
                  >
                    <option value="não realizado">Não Realizado</option>
                    <option value="andamento">Andamento</option>
                    <option value="realizado">Realizado</option>
                  </select>
                  <button
                    onClick={() =>
                      onDeleteItem(index, table.items)
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
            onClick={onClose}
            className="cursor-pointer bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex-1 transition-all duration-300"
          >
            Cancelar
          </button>
          <button
            onClick={onSave}
            className="cursor-pointer bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white px-4 py-2 rounded-lg flex-1 transition-all duration-300 shadow-lg"
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
}