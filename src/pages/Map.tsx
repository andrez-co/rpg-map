import { useGameStore } from '../store/gameStore';
import { worldMap } from '../data/worldMap';

const Map = () => {
  const currentLocationId = useGameStore(state => state.currentLocationId);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-center text-amber-700 dark:text-amber-400">
        Mapa del Mundo
      </h1>
      
      <div className="grid gap-4">
        {worldMap.map((room) => {
          const isCurrentLocation = room.id === currentLocationId;
          
          return (
            <div
              key={room.id}
              className={`p-4 rounded-xl transition-all ${
                isCurrentLocation
                  ? 'bg-amber-600/20 border-2 border-amber-500'
                  : 'bg-stone-200 dark:bg-stone-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  {room.nombre}
                </h2>
                {isCurrentLocation && (
                  <span className="text-amber-500 font-semibold">
                    🚩 ESTÁS AQUÍ
                  </span>
                )}
              </div>
              <p className="text-stone-600 dark:text-stone-400 mt-2">
                {room.descripcion}
              </p>
              <div className="mt-3 text-sm text-stone-500 dark:text-stone-500">
                <span className="font-medium">Conexiones: </span>
                {Object.entries(room.direcciones)
                  .filter(([, target]) => target !== null)
                  .map(([dir, target]) => (
                    <span key={dir} className="mr-3">
                      {dir.charAt(0).toUpperCase() + dir.slice(1)}: {target}
                    </span>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Map;