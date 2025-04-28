'use client';

interface AddTableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  onTitleChange: (title: string) => void;
  description: string;
  onDescriptionChange: (description: string) => void;
  textColor: string;
  onTextColorChange: (color: string) => void;
  bgColor: string;
  onBgColorChange: (color: string) => void;
  errorMessage: string;
}

export default function AddTableModal({
  isOpen,
  onClose,
  onSubmit,
  title,
  onTitleChange,
  description,
  onDescriptionChange,
  textColor,
  onTextColorChange,
  bgColor,
  onBgColorChange,
  errorMessage,
}: AddTableModalProps) {
  if (!isOpen) return null;

  return (
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
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none"
        />
        <textarea
          placeholder="Descrição da Tabela"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none"
        />
        <div className="mb-4">
          <label className="block mb-2 text-sm text-gray-300">Cor do Texto</label>
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={textColor}
              onChange={(e) => onTextColorChange(e.target.value)}
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
              onChange={(e) => onBgColorChange(e.target.value)}
              className="w-16 h-10 rounded-lg border-2 border-gray-600 cursor-pointer"
            />
            <span className="font-mono">{bgColor}</span>
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <button
            onClick={onClose}
            className="cursor-pointer bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex-1 transition-all duration-300"
          >
            Cancelar
          </button>
          <button
            onClick={onSubmit}
            className="cursor-pointer bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg flex-1 transition-all duration-300 shadow-lg"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}