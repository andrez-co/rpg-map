import { useGameStore } from '../store/gameStore';
import { getRoomById } from '../data/worldMap';

type Direction = 'norte' | 'sur' | 'este' | 'oeste';

const directionLabels: Record<Direction, string> = {
  norte: 'Norte',
  sur: 'Sur',
  este: 'Este',
  oeste: 'Oeste',
};

const Game = () => {
  const playerName = useGameStore(state => state.playerName);
  const currentLocationId = useGameStore(state => state.currentLocationId);
  const move = useGameStore(state => state.move);
  
  const currentRoom = getRoomById(currentLocationId);
  
  if (!currentRoom) {
    return <div>Error: Sala no encontrada</div>;
  }

  const directions: Direction[] = ['norte', 'sur', 'este', 'oeste'];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-amber-700 dark:text-amber-400">
          {currentRoom.nombre}
        </h1>
        <p className="text-lg text-stone-600 dark:text-stone-400">
          {playerName} se encuentra aquí
        </p>
      </div>
      
      <div className="bg-stone-200 dark:bg-stone-800 p-6 rounded-xl">
        <p className="text-lg leading-relaxed">
          {currentRoom.descripcion}
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        {directions.map((dir) => {
          const targetRoomId = currentRoom.direcciones[dir];
          const isAvailable = targetRoomId !== null;
          
          return (
            <button
              key={dir}
              onClick={() => isAvailable && move(dir)}
              disabled={!isAvailable}
              className={`py-4 px-6 rounded-lg font-semibold transition-colors ${
                isAvailable
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'bg-stone-300 dark:bg-stone-700 text-stone-500 dark:text-stone-500 cursor-not-allowed'
              }`}
            >
              {directionLabels[dir]}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Game;