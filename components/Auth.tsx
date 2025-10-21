import React from 'react';

export const Auth: React.FC<{ onAuth: () => void }> = ({ onAuth }) => {
    // Placeholder for authentication logic
    return (
        <div>
            <h3 className="text-lg font-semibold mb-2 text-center">Autenticação</h3>
            <p className="mb-4 text-center text-sm text-slate-500">
                Você precisará fazer login para jogar online.
            </p>
            <button
                onClick={onAuth}
                className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 transition-colors disabled:opacity-50"
                disabled
            >
                Entrar (Desabilitado)
            </button>
        </div>
    );
};