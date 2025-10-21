export type SquareValue = 'X' | 'O' | null;

export interface Player {
  name: string;
  symbol: 'X' | 'O';
  avatar: string;
  isAI?: boolean;
  difficulty?: 'easy' | 'hard';
}

export interface MatchRecord {
  player1: string;
  player1Avatar: string;
  player2: string;
  player2Avatar: string;
  winner: string; // Winner's name
}

export type GameMode = 'none' | 'local' | 'online';