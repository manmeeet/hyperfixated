/**
 * 🏰 MEMORY PALACE STATE MANAGEMENT
 *
 * Zustand slice for managing memory palaces
 */

import { create } from 'zustand';
import { MemoryPalace, Room, MemoryItem } from '../../../types/memoryPalace';

interface MemoryPalaceState {
  palaces: MemoryPalace[];
  currentPalace: MemoryPalace | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setPalaces: (palaces: MemoryPalace[]) => void;
  setCurrentPalace: (palace: MemoryPalace | null) => void;
  createPalace: (palace: Omit<MemoryPalace, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updatePalace: (id: string, updates: Partial<MemoryPalace>) => void;
  deletePalace: (id: string) => void;
  addRoom: (palaceId: string, room: Omit<Room, 'id'>) => void;
  updateRoom: (palaceId: string, roomId: string, updates: Partial<Room>) => void;
  deleteRoom: (palaceId: string, roomId: string) => void;
  addItem: (palaceId: string, roomId: string, item: Omit<MemoryItem, 'id' | 'createdAt'>) => void;
  updateItem: (palaceId: string, roomId: string, itemId: string, updates: Partial<MemoryItem>) => void;
  deleteItem: (palaceId: string, roomId: string, itemId: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useMemoryPalaceStore = create<MemoryPalaceState>((set) => ({
  palaces: [],
  currentPalace: null,
  isLoading: false,
  error: null,

  setPalaces: (palaces) => set({ palaces }),

  setCurrentPalace: (palace) => set({ currentPalace: palace }),

  createPalace: (palaceData) =>
    set((state) => {
      const newPalace: MemoryPalace = {
        ...palaceData,
        id: `palace-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return { palaces: [...state.palaces, newPalace] };
    }),

  updatePalace: (id, updates) =>
    set((state) => ({
      palaces: state.palaces.map((palace) =>
        palace.id === id
          ? { ...palace, ...updates, updatedAt: new Date() }
          : palace
      ),
      currentPalace:
        state.currentPalace?.id === id
          ? { ...state.currentPalace, ...updates, updatedAt: new Date() }
          : state.currentPalace,
    })),

  deletePalace: (id) =>
    set((state) => ({
      palaces: state.palaces.filter((palace) => palace.id !== id),
      currentPalace: state.currentPalace?.id === id ? null : state.currentPalace,
    })),

  addRoom: (palaceId, roomData) =>
    set((state) => {
      const newRoom: Room = {
        ...roomData,
        id: `room-${Date.now()}`,
      };

      return {
        palaces: state.palaces.map((palace) =>
          palace.id === palaceId
            ? {
                ...palace,
                structure: {
                  ...palace.structure,
                  rooms: [...palace.structure.rooms, newRoom],
                },
                updatedAt: new Date(),
              }
            : palace
        ),
      };
    }),

  updateRoom: (palaceId, roomId, updates) =>
    set((state) => ({
      palaces: state.palaces.map((palace) =>
        palace.id === palaceId
          ? {
              ...palace,
              structure: {
                ...palace.structure,
                rooms: palace.structure.rooms.map((room) =>
                  room.id === roomId ? { ...room, ...updates } : room
                ),
              },
              updatedAt: new Date(),
            }
          : palace
      ),
    })),

  deleteRoom: (palaceId, roomId) =>
    set((state) => ({
      palaces: state.palaces.map((palace) =>
        palace.id === palaceId
          ? {
              ...palace,
              structure: {
                ...palace.structure,
                rooms: palace.structure.rooms.filter((room) => room.id !== roomId),
                paths: palace.structure.paths.filter(
                  (path) => path.fromRoomId !== roomId && path.toRoomId !== roomId
                ),
              },
              updatedAt: new Date(),
            }
          : palace
      ),
    })),

  addItem: (palaceId, roomId, itemData) =>
    set((state) => {
      const newItem: MemoryItem = {
        ...itemData,
        id: `item-${Date.now()}`,
        createdAt: new Date(),
      };

      return {
        palaces: state.palaces.map((palace) =>
          palace.id === palaceId
            ? {
                ...palace,
                structure: {
                  ...palace.structure,
                  rooms: palace.structure.rooms.map((room) =>
                    room.id === roomId
                      ? { ...room, items: [...room.items, newItem] }
                      : room
                  ),
                },
                metadata: {
                  ...palace.metadata,
                  totalItems: palace.metadata.totalItems + 1,
                },
                updatedAt: new Date(),
              }
            : palace
        ),
      };
    }),

  updateItem: (palaceId, roomId, itemId, updates) =>
    set((state) => ({
      palaces: state.palaces.map((palace) =>
        palace.id === palaceId
          ? {
              ...palace,
              structure: {
                ...palace.structure,
                rooms: palace.structure.rooms.map((room) =>
                  room.id === roomId
                    ? {
                        ...room,
                        items: room.items.map((item) =>
                          item.id === itemId ? { ...item, ...updates } : item
                        ),
                      }
                    : room
                ),
              },
              updatedAt: new Date(),
            }
          : palace
      ),
    })),

  deleteItem: (palaceId, roomId, itemId) =>
    set((state) => ({
      palaces: state.palaces.map((palace) =>
        palace.id === palaceId
          ? {
              ...palace,
              structure: {
                ...palace.structure,
                rooms: palace.structure.rooms.map((room) =>
                  room.id === roomId
                    ? {
                        ...room,
                        items: room.items.filter((item) => item.id !== itemId),
                      }
                    : room
                ),
              },
              metadata: {
                ...palace.metadata,
                totalItems: palace.metadata.totalItems - 1,
              },
              updatedAt: new Date(),
            }
          : palace
      ),
    })),

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
