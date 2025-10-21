import React from 'react';

interface WinningLineProps {
  winningLine: number[];
}

// Percentages are based on the center of the squares
const lineCoordinates: { [key:string]: { x1: string, y1: string, x2: string, y2: string } } = {
    // Horizontal
    '[0,1,2]': { x1: '10%', y1: '16.67%', x2: '90%', y2: '16.67%' },
    '[3,4,5]': { x1: '10%', y1: '50%',     x2: '90%', y2: '50%' },
    '[6,7,8]': { x1: '10%', y1: '83.33%', x2: '90%', y2: '83.33%' },
    // Vertical
    '[0,3,6]': { x1: '16.67%', y1: '10%', x2: '16.67%', y2: '90%' },
    '[1,4,7]': { x1: '50%',     y1: '10%', x2: '50%',     y2: '90%' },
    '[2,5,8]': { x1: '83.33%', y1: '10%', x2: '83.33%', y2: '90%' },
    // Diagonal
    '[0,4,8]': { x1: '15%', y1: '15%', x2: '85%', y2: '85%' },
    '[2,4,6]': { x1: '85%', y1: '15%', x2: '15%', y2: '85%' },
};

export const WinningLine: React.FC<WinningLineProps> = ({ winningLine }) => {
  const lineKey = JSON.stringify(winningLine.sort((a,b) => a - b));
  const coords = lineCoordinates[lineKey];

  if (!coords) {
    return null;
  }

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
       {/* The outer SVG has a fade-in animation */}
      <svg width="100%" height="100%" className="opacity-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
         {/* The line inside has a draw animation */}
        <line
          {...coords}
          className="stroke-red-500 animate-draw-line"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};