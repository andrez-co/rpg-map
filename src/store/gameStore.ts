import { create } from 'zustand';
import { worldMap, getRoomById } from '../data/worldMap';

interface GameState {
  playerName: string;
  currentLocationId: string;
  setPlayerName: (name: string) => void;
  move: (direction: 'norte' | 'sur' | 'este' | 'oeste') => boolean;
}

export const useGameStore = create<GameState>((set, get) => ({
  playerName: '',
  currentLocationId: 'entrada',
  
  setPlayerName: (name: string) => {
    set({ playerName: name });
  },
  
  move: (direction: 'norte' | 'sur' | 'este' | 'oeste') => {
    const { currentLocationId } = get();
    const currentRoom = getRoomById(currentLocationId);
    
    if (!currentRoom) return false;
    
    const nextRoomId = currentRoom.direcciones[direction];
    
    if (!nextRoomId) return false;
    
    set({ currentLocationId: nextRoomId });
    return true;
  },
}));