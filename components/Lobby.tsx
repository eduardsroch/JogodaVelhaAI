import React from 'react';

export const Lobby: React.FC = () => {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-2 text-center">Lobby de Jogos</h3>
            <div className="mt-4 p-4 border border-dashed border-gray-400 rounded-lg text-center">
                <p className="text-slate-500">Procurando por jogos...</p>
             </div>
        </div>
    );
};