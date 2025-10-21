import React, { useState, useEffect, useCallback } from 'react';
import { Square } from './Square';
import { GameStatus } from './GameStatus';
import { WinningLine } from './WinningLine';
import { HistoryPanel } from './HistoryPanel';
import { SquareValue, Player, MatchRecord } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { playSound } from '../utils/sounds';

const calculateWinner = (squares: SquareValue[]): { winner: 'X' | 'O' | null, line: number[] } => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a] as 'X' | 'O', line: lines[i] };
    }
  }
  return { winner: null, line: [] };
};

interface GameBoardProps {
  players: Player[];
  onChangePlayers: () => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({ players, onChangePlayers }) => {
  const [squares, setSquares] = useState<SquareValue[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useLocalStorage<MatchRecord[]>('tic-tac-toe-history', []);
  const [isAiThinking, setIsAiThinking] = useState(false);

  const { winner, line: winningLine } = calculateWinner(squares);
  const isDraw = !winner && squares.every(square => square !== null);

  const currentPlayer = players[xIsNext ? 0 : 1];
  const aiPlayer = players.find(p => p.isAI);

  const handleGameEnd = useCallback((winnerSymbol: 'X' | 'O' | 'Draw') => {
    const winnerPlayer = players.find(p => p.symbol === winnerSymbol);
    const winnerName = winnerSymbol === 'Draw' ? 'Empate' : winnerPlayer?.name || 'Desconhecido';
    
    playSound(winnerSymbol === 'Draw' ? 'draw' : 'win');

    const newRecord: MatchRecord = {
      player1: players[0].name,
      player1Avatar: players[0].avatar,
      player2: players[1].name,
      player2Avatar: players[1].avatar,
      winner: winnerName,
    };
    setHistory(prevHistory => [newRecord, ...prevHistory]);
  }, [players, setHistory]);

  useEffect(() => {
    if (winner) {
      handleGameEnd(winner);
    } else if (isDraw) {
      handleGameEnd('Draw');
    }
  }, [winner, isDraw, handleGameEnd]);
  
  const findBestMoveEasy = (currentSquares: SquareValue[]): number => {
      // 1. Check if AI can win
      for (let i = 0; i < 9; i++) {
          if (!currentSquares[i]) {
              const tempSquares = [...currentSquares];
              tempSquares[i] = aiPlayer!.symbol;
              if (calculateWinner(tempSquares).winner) {
                  return i;
              }
          }
      }
      // 2. Check if player can win and block
      const playerSymbol = aiPlayer!.symbol === 'X' ? 'O' : 'X';
      for (let i = 0; i < 9; i++) {
          if (!currentSquares[i]) {
              const tempSquares = [...currentSquares];
              tempSquares[i] = playerSymbol;
              if (calculateWinner(tempSquares).winner) {
                  return i;
              }
          }
      }
      // 3. Take center
      if (!currentSquares[4]) return 4;
      // 4. Take corners
      const corners = [0, 2, 6, 8];
      const availableCorners = corners.filter(i => !currentSquares[i]);
      if (availableCorners.length > 0) {
          return availableCorners[Math.floor(Math.random() * availableCorners.length)];
      }
      // 5. Take any available spot
      const availableSpots = currentSquares.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
      return availableSpots[Math.floor(Math.random() * availableSpots.length)] as number;
  };
  
  const findBestMoveHard = (currentSquares: SquareValue[]): number => {
    const playerSymbol = players.find(p => !p.isAI)!.symbol;
    let bestScore = -Infinity;
    let move = -1;

    for (let i = 0; i < 9; i++) {
      if (currentSquares[i] === null) {
        currentSquares[i] = aiPlayer!.symbol;
        let score = minimax(currentSquares, 0, false, playerSymbol, aiPlayer!.symbol);
        currentSquares[i] = null;
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
  };

  const minimax = (board: SquareValue[], depth: number, isMaximizing: boolean, human: 'X' | 'O', ai: 'X' | 'O'): number => {
      const result = calculateWinner(board);
      if (result.winner === ai) return 10 - depth;
      if (result.winner === human) return depth - 10;
      if (board.every(s => s !== null)) return 0;

      if (isMaximizing) {
          let bestScore = -Infinity;
          for (let i = 0; i < 9; i++) {
              if (board[i] === null) {
                  board[i] = ai;
                  let score = minimax(board, depth + 1, false, human, ai);
                  board[i] = null;
                  bestScore = Math.max(score, bestScore);
              }
          }
          return bestScore;
      } else {
          let bestScore = Infinity;
          for (let i = 0; i < 9; i++) {
              if (board[i] === null) {
                  board[i] = human;
                  let score = minimax(board, depth + 1, true, human, ai);
                  board[i] = null;
                  bestScore = Math.min(score, bestScore);
              }
          }
          return bestScore;
      }
  };


  useEffect(() => {
    if (!xIsNext && aiPlayer && !winner && !isDraw) {
      setIsAiThinking(true);
      const timer = setTimeout(() => {
        const move = aiPlayer.difficulty === 'hard' ? findBestMoveHard(squares.slice()) : findBestMoveEasy(squares);
        if(move !== -1) {
            handleClick(move);
        }
        setIsAiThinking(false);
      }, 700);
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xIsNext, aiPlayer, winner, isDraw, squares]);

  const handleClick = (i: number) => {
    if (calculateWinner(squares).winner || squares[i] || isAiThinking) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
    playSound('place');
  };
  
  const handlePlayAgain = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 animate-fade-in">
      <div className="flex flex-col items-center">
        <GameStatus winner={winner} isDraw={isDraw} currentPlayer={currentPlayer} players={players} />
        <div className="relative">
          <div className="grid grid-cols-3">
            {squares.map((value, i) => (
              <Square
                key={i}
                value={value}
                onClick={() => handleClick(i)}
                isWinning={winningLine.includes(i)}
              />
            ))}
          </div>
          {winner && <WinningLine winningLine={winningLine} />}
        </div>
        <div className="mt-8 flex items-center gap-4">
          {(winner || isDraw) && (
              <>
                <button
                  onClick={handlePlayAgain}
                  className="py-2 px-6 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200 transform hover:scale-105"
                >
                  Jogar Novamente
                </button>
                 <button
                  onClick={onChangePlayers}
                  className="py-2 px-6 bg-pink-500 text-white font-bold rounded-lg shadow-md hover:bg-pink-600 transition-all duration-200 transform hover:scale-105"
                >
                  Mudar Jogadores
                </button>
              </>
          )}
        </div>
      </div>
      <div className="w-full max-w-sm lg:w-80">
        <HistoryPanel history={history} />
      </div>
    </div>
  );
};