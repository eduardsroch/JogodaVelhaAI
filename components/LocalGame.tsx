import React, { useState } from 'react';
import { PlayerSetup } from './PlayerSetup';
import { GameBoard } from './GameBoard';
import { Player } from '../types';

interface LocalGameProps {
  onBack: () => void;
}

export const LocalGame: React.FC<LocalGameProps> = ({ onBack }) => {
  const [players, setPlayers] = useState<Player[] | null>(null);

  const handleGameStart = (p1: {name: string, avatar: string}, p2: {name: string, avatar: string, difficulty?: 'easy' | 'hard' }) => {
    setPlayers([
      { name: p1.name, symbol: 'X', avatar: p1.avatar },
      { name: p2.name, symbol: 'O', avatar: p2.avatar, isAI: p2.name === 'Computador', difficulty: p2.difficulty },
    ]);
  };

  const handleChangePlayers = () => {
    setPlayers(null);
  }

  return (
    <div className="w-full flex flex-col items-center">
      {!players ? (
        <>
          <PlayerSetup onGameStart={handleGameStart} />
           <button onClick={onBack} className="mt-4 text-sm text-slate-500 hover:underline">
              Voltar para o menu principal
            </button>
        </>
      ) : (
        <GameBoard players={players} onChangePlayers={handleChangePlayers} />
      )}
    </div>
  );
};