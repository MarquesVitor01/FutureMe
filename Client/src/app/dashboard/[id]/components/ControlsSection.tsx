'use client';

interface ControlsSectionProps {
  selectedView: string;
  onViewChange: (view: string) => void;
  onAddTable: () => void;
  selectedTables: string[];
  onDeleteSelectedTables: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export default function ControlsSection({
  selectedView,
  onViewChange,
  onAddTable,
  selectedTables,
  onDeleteSelectedTables,
  searchTerm,
  onSearchChange,
}: ControlsSectionProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2 md:gap-4">
        <select
          value={selectedView}
          onChange={(e) => onViewChange(e.target.value)}
          className="bg-white hover:bg-gray-400 text-gray-900 px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer"
        >
          <option value="vertical">Vertical</option>
          <option value="horizontal">Horizontal</option>
        </select>
        <button
          className="bg-gradient-to-r from-green-400 to-emerald-500 cursor-pointer hover:from-green-500 hover:to-emerald-600 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-emerald-500/20"
          onClick={onAddTable}
        >
          + Add Table
        </button>
        {selectedTables.length > 0 && (
          <button
            onClick={onDeleteSelectedTables}
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
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-4 py-3 rounded-xl bg-gray-900 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
        />
      </div>
    </div>
  );
}