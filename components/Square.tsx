import React from 'react';
import { SquareValue } from '../types';

interface SquareProps {
  value: SquareValue;
  onClick: () => void;
  isWinning: boolean;
}

export const Square: React.FC<SquareProps> = ({ value, onClick, isWinning }) => {
  const xColor = 'text-blue-500';
  const oColor = 'text-pink-500';
  
  const textColor = value === 'X' ? xColor : oColor;
  const winningBg = isWinning ? 'bg-yellow-200' : 'bg-white';

  return (
    <button
      className={`w-24 h-24 md:w-32 md:h-32 m-1 flex items-center justify-center text-5xl md:text-6xl font-bold rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 ${winningBg}`}
      onClick={onClick}
    >
      <span className={`${textColor} ${value ? 'animate-pop-in' : ''}`}>{value}</span>
    </button>
  );
};