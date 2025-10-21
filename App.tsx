import React, { useState } from 'react';
import { Logo } from './components/Logo';
import { GameMode } from './types';
import { GameModeSelector } from './components/GameModeSelector';
import { LocalGame } from './components/LocalGame';
import { OnlineFlow } from './components/OnlineFlow';

function App() {
  const [gameMode, setGameMode] = useState<GameMode>('none');

  const renderContent = () => {
    switch (gameMode) {
      case 'local':
        return <LocalGame onBack={() => setGameMode('none')} />;
      case 'online':
        return <OnlineFlow onBack={() => setGameMode('none')} />;
      case 'none':
      default:
        return <GameModeSelector onSelectMode={setGameMode} />;
    }
  };

  return (
    <div className="bg-gray-100 text-slate-800 min-h-screen font-sans flex flex-col items-center p-4 selection:bg-blue-500 selection:text-white">
      <header className="w-full max-w-5xl flex flex-col items-center mb-8">
        <Logo className="w-16 h-16 mb-2" />
        <h1 className="text-4xl font-bold">Jogo da Velha AI</h1>
      </header>
      <main className="flex-grow w-full flex flex-col items-center justify-center">
        {renderContent()}
      </main>
      <footer className="w-full text-center p-4 text-slate-500">
        <p>Desenvolvido por Eduardo Soares Rocha | Contato: eduardsroch@gmail.com</p>
      </footer>
    </div>
  );
}

export default App;