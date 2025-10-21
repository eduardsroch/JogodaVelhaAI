import React from 'react';
// Fix: Import GameMode from the central types file instead of App.tsx.
import { GameMode } from '../types';

interface GameModeSelectorProps {
  onSelectMode: (mode: Exclude<GameMode, 'none'>) => void;
}

export const GameModeSelector: React.FC<GameModeSelectorProps> = ({ onSelectMode }) => {
  return (
    <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg animate-fade-in text-center">
      <h2 className="text-2xl font-bold mb-6">Escolha o Modo de Jogo</h2>
      <div className="space-y-4">
        <button
          onClick={() => onSelectMode('local')}
          className="w-full py-3 px-4 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200 transform hover:scale-105"
        >
          Jogo Local
        </button>
        <button
          onClick={() => onSelectMode('online')}
          className="w-full py-3 px-4 bg-pink-500 text-white font-bold rounded-lg shadow-md transition-all duration-200 transform disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
          disabled // Online mode is not fully implemented
        >
          Jogo Online (Em breve)
        </button>
      </div>
    </div>
  );
};