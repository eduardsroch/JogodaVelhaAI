import React from 'react';
import { Player } from '../types';

interface GameStatusProps {
  winner: 'X' | 'O' | null;
  isDraw: boolean;
  currentPlayer: Player;
  players: Player[];
}

export const GameStatus: React.FC<GameStatusProps> = ({ winner, isDraw, currentPlayer, players }) => {
  let status;
  let statusColor = 'text-slate-500';

  if (winner) {
    const winnerPlayer = players.find(p => p.symbol === winner);
    status = `Vencedor: ${winnerPlayer?.name}!`;
    statusColor = 'text-green-500';
  } else if (isDraw) {
    status = "É um Empate!";
    statusColor = 'text-yellow-500';
  } else {
    status = `Próximo jogador: ${currentPlayer.name} (${currentPlayer.symbol})`;
  }

  return (
    <div className="mb-4 text-xl font-semibold text-center h-8">
      <p className={`${statusColor} transition-colors duration-300`}>{status}</p>
    </div>
  );
};