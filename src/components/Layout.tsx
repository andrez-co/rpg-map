import { Link, NavLink, Outlet } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useGameStore } from '../store/gameStore';

const Layout = () => {
  const { theme, toggleTheme } = useTheme();
  const playerName = useGameStore(state => state.playerName);

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-900 text-stone-800 dark:text-stone-100 transition-colors">
      <nav className="bg-stone-200 dark:bg-stone-800 border-b border-stone-300 dark:border-stone-700 px-4 py-3">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center sm:gap-8">
            <Link 
              to="/" 
              className="text-lg font-semibold font-['Cinzel'] hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              Aventura RPG
            </Link>
            {playerName && (
              <div className="flex gap-6 mt-2 sm:mt-0">
                <NavLink 
                  to="/game" 
                  className={({ isActive }) => 
                    `text-md font-medium transition-colors ${isActive ? 'text-amber-600 dark:text-amber-400 font-bold border-b-2 border-amber-600 dark:border-amber-400' : 'text-stone-600 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400'}`
                  }
                >
                  Explorar
                </NavLink>
                <NavLink 
                  to="/map" 
                  className={({ isActive }) => 
                    `text-md font-medium transition-colors ${isActive ? 'text-amber-600 dark:text-amber-400 font-bold border-b-2 border-amber-600 dark:border-amber-400' : 'text-stone-600 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400'}`
                  }
                >
                  Mapa
                </NavLink>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            {playerName && (
              <span className="text-md font-bold text-amber-800 dark:text-amber-400">
                Héroe: {playerName}
              </span>
            )}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors text-xl"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </nav>
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;