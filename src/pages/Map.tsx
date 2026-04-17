import { useGameStore } from '../store/gameStore';
import { worldMap } from '../data/worldMap';

const Map = () => {
  const currentLocationId = useGameStore(state => state.currentLocationId);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-center text-amber-700 dark:text-amber-400 font-['Cinzel'] mb-4">
        Pergamino de Rutas
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                <h2 className="text-lg font-semibold font-['Cinzel']">
                  {room.nombre}
                </h2>
                {isCurrentLocation && (
                  <span className="text-amber-500 font-semibold mt-2 sm:mt-0 self-start sm:self-auto">
                    🚩 ESTÁS AQUÍ
                  </span>
                )}
              </div>
              <p className="text-stone-600 dark:text-stone-400 font-serif mb-3 whitespace-pre-line">
                {room.descripcion}
              </p>
              <div className="mt-3 text-sm text-stone-500 dark:text-stone-500">
                <span className="font-medium mr-2">Conexiones: </span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {Object.entries(room.direcciones)
                    .filter(([, target]) => target !== null)
                    .map(([dir, target]) => {
                      const targetName = worldMap.find(r => r.id === target)?.nombre || target;
                      return (
                        <span key={dir} className="mr-3 text-stone-600 dark:text-stone-400">
                          <span className="font-medium capitalize">{dir}:</span> {targetName}
                        </span>
                      );
                    })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Map;