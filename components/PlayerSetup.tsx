import React, { useState } from 'react';
import { PREDEFINED_AVATARS, generateAvatar } from '../utils/avatars';
import { Avatar } from './Avatar';

const WandIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 3.732z" />
    </svg>
);

interface PlayerSetupProps {
  onGameStart: (player1: {name: string, avatar: string}, player2: {name: string, avatar: string, difficulty?: 'easy' | 'hard' }) => void;
}

export const PlayerSetup: React.FC<PlayerSetupProps> = ({ onGameStart }) => {
  const [gameMode, setGameMode] = useState<'pvp' | 'pvc'>('pvp');
  const [aiDifficulty, setAiDifficulty] = useState<'easy' | 'hard'>('easy');
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [player1Avatar, setPlayer1Avatar] = useState('cat');
  const [player2Avatar, setPlayer2Avatar] = useState('rocket');
  const [error, setError] = useState('');

  const avatarChoices = Object.keys(PREDEFINED_AVATARS).filter(key => key !== 'robot');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const p1 = player1Name.trim();
    const p2 = gameMode === 'pvp' ? player2Name.trim() : 'Computador';
    const p2Av = gameMode === 'pvp' ? player2Avatar : 'robot';

    if (!p1) {
      setError('O Jogador 1 precisa de um nome!');
      return;
    }
    if (gameMode === 'pvp' && !p2) {
      setError('O Jogador 2 precisa de um nome!');
      return;
    }
    if (gameMode === 'pvp' && p1.toLowerCase() === p2.toLowerCase()) {
      setError('Os nomes dos jogadores devem ser únicos.');
      return;
    }

    setError('');
    const player2Data = gameMode === 'pvc' 
      ? { name: p2, avatar: p2Av, difficulty: aiDifficulty }
      : { name: p2, avatar: p2Av };
    onGameStart({ name: p1, avatar: player1Avatar }, player2Data);
  };
  
  const handleGenerateAvatar = (player: 1 | 2) => {
    const name = player === 1 ? player1Name : player2Name;
    if (!name) return; // Only generate if name is present
    const generated = generateAvatar(name);
    if (player === 1) setPlayer1Avatar(generated);
    else setPlayer2Avatar(generated);
  }

  const AvatarSelector = ({ selectedAvatar, onSelect, onGenerate, disabled }: { selectedAvatar: string, onSelect: (avatar: string) => void, onGenerate: () => void, disabled?: boolean }) => (
    <div className="mt-2 flex items-center gap-3">
        <Avatar avatar={selectedAvatar} className="w-16 h-16 rounded-full p-1 bg-gray-100 shadow-inner" />
        <div className="flex-1 grid grid-cols-4 gap-2">
            {avatarChoices.map(av => (
                <button type="button" key={av} onClick={() => onSelect(av)} className={`w-10 h-10 rounded-full transition-transform transform hover:scale-110 p-1 ${selectedAvatar === av ? 'ring-2 ring-blue-500' : ''}`}>
                    <Avatar avatar={av} className="w-full h-full rounded-full bg-white" />
                </button>
            ))}
            <button type="button" onClick={onGenerate} disabled={disabled} className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 transition-transform transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed" title="Gerar avatar com base no nome">
                <WandIcon className="w-5 h-5" />
            </button>
        </div>
    </div>
  );

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold text-center mb-6">Configuração do Jogo</h2>
      
      <div className="flex justify-center gap-4 mb-6">
        <button 
          onClick={() => setGameMode('pvp')}
          className={`px-4 py-2 w-1/2 rounded-lg font-semibold transition-colors ${gameMode === 'pvp' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Jogador vs Jogador
        </button>
        <button 
          onClick={() => setGameMode('pvc')}
          className={`px-4 py-2 w-1/2 rounded-lg font-semibold transition-colors ${gameMode === 'pvc' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Jogador vs IA
        </button>
      </div>

      {gameMode === 'pvc' && (
        <div className="mb-6">
            <h3 className="text-center text-sm font-medium text-slate-500 mb-2">Nível de Dificuldade da IA</h3>
            <div className="flex justify-center gap-4">
                 <button 
                    onClick={() => setAiDifficulty('easy')}
                    className={`px-4 py-2 w-1/2 rounded-lg font-semibold transition-colors ${aiDifficulty === 'easy' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                    >
                    Fácil
                </button>
                <button 
                    onClick={() => setAiDifficulty('hard')}
                    className={`px-4 py-2 w-1/2 rounded-lg font-semibold transition-colors ${aiDifficulty === 'hard' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
                    >
                    Difícil
                </button>
            </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="player1" className="block text-sm font-medium text-slate-500">
            {gameMode === 'pvp' ? 'Jogador 1 (X)' : 'Seu Nome (X)'}
          </label>
          <input
            id="player1"
            type="text"
            value={player1Name}
            onChange={(e) => setPlayer1Name(e.target.value)}
            placeholder="Digite seu nome"
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <AvatarSelector selectedAvatar={player1Avatar} onSelect={setPlayer1Avatar} onGenerate={() => handleGenerateAvatar(1)} disabled={!player1Name} />
        </div>
        
        {gameMode === 'pvp' && (
          <div>
            <label htmlFor="player2" className="block text-sm font-medium text-slate-500">
              Jogador 2 (O)
            </label>
            <input
              id="player2"
              type="text"
              value={player2Name}
              onChange={(e) => setPlayer2Name(e.target.value)}
              placeholder="Digite o nome do jogador 2"
              className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <AvatarSelector selectedAvatar={player2Avatar} onSelect={setPlayer2Avatar} onGenerate={() => handleGenerateAvatar(2)} disabled={!player2Name} />
          </div>
        )}

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200 transform hover:scale-105"
        >
          Começar Jogo
        </button>
      </form>
    </div>
  );
};