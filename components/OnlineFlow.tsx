import React, { useState } from 'react';
import { Auth } from './Auth';
import { Lobby } from './Lobby';

interface OnlineFlowProps {
  onBack: () => void;
}

export const OnlineFlow: React.FC<OnlineFlowProps> = ({ onBack }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg animate-fade-in">
        <h2 className="text-2xl font-bold text-center mb-6">Jogo Online</h2>
        <p className="text-center text-slate-500 mb-6">Esta funcionalidade está em desenvolvimento.</p>
        {!isAuthenticated ? (
            <Auth onAuth={() => setIsAuthenticated(true)} />
        ) : (
            <Lobby />
        )}
        <button onClick={onBack} className="mt-6 text-sm text-slate-500 hover:underline w-full text-center">
           Voltar para o menu principal
        </button>
    </div>
  );
};