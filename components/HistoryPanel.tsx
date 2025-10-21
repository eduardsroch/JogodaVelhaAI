import React from 'react';
import { MatchRecord } from '../types';
import { Avatar } from './Avatar';

interface HistoryPanelProps {
  history: MatchRecord[];
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ history }) => {
  return (
    <aside className="w-full bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold mb-4 border-b border-gray-200 pb-2">Histórico de Partidas</h3>
      {history.length === 0 ? (
        <p className="text-slate-500">Nenhum jogo disputado ainda.</p>
      ) : (
        <ul className="space-y-3 max-h-96 overflow-y-auto">
          {history.map((record, index) => (
            <li key={index} className="p-3 bg-gray-100 rounded-lg">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                    <Avatar avatar={record.player1Avatar} className="w-8 h-8 rounded-full bg-white" />
                    <span className="font-semibold">{record.player1}</span>
                </div>
                <span className="text-slate-500">vs</span>
                <div className="flex items-center gap-2">
                    <span className="font-semibold">{record.player2}</span>
                    <Avatar avatar={record.player2Avatar} className="w-8 h-8 rounded-full bg-white" />
                </div>
              </div>
              <div className="text-blue-500 mt-2 text-center text-sm">
                Vencedor: <span className="font-bold">{record.winner}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};