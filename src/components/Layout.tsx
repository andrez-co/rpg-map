import { Link, Outlet } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useGameStore } from '../store/gameStore';

const Layout = () => {
  const { theme, toggleTheme } = useTheme();
  const playerName = useGameStore(state => state.playerName);

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-900 text-stone-800 dark:text-stone-100 transition-colors">
      <nav className="bg-stone-200 dark:bg-stone-800 border-b border-stone-300 dark:border-stone-700 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="text-lg font-semibold hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              Inicio
            </Link>
            {playerName && (
              <>
                <Link 
                  to="/game" 
                  className="text-lg hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  Explorar
                </Link>
                <Link 
                  to="/map" 
                  className="text-lg hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  Mapa
                </Link>
              </>
            )}
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </nav>
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;