import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';

const Home = () => {
  const [name, setName] = useState('');
  const setPlayerName = useGameStore(state => state.setPlayerName);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setPlayerName(name.trim());
      navigate('/game');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="bg-stone-200 dark:bg-stone-800 p-8 rounded-xl shadow-lg max-w-md w-full">
        
        <h1 className="text-3xl font-bold text-center mb-2 text-amber-700 dark:text-amber-400 font-['Cinzel']">
          Viaje en el tiempo
        </h1>
        <p className="text-center mb-8 text-stone-600 dark:text-stone-400">
          Ingresa a la nave y forja tu propio destino
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="playerName" 
              className="block text-sm font-medium mb-2"
            >
              Nombre del Héroe
            </label>
            <input
              type="text"
              id="playerName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ingresa tu nombre..."
              className="w-full px-4 py-3 rounded-lg bg-stone-100 dark:bg-stone-700 border border-stone-300 dark:border-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-3 px-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors"
          >
            Comenzar Aventura
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;