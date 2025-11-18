/**
 * 🏰 MEMORY PALACE TYPES
 *
 * Visual spatial memory system for domain knowledge
 */

export interface Position {
  x: number;
  y: number;
}

export interface MemoryItem {
  id: string;
  content: string;
  type: 'text' | 'image' | 'link' | 'note';
  position: Position;
  associations: string[]; // IDs of related items
  color: string;
  emoji?: string;
  createdAt: Date;
  lastReviewed?: Date;
}

export interface Room {
  id: string;
  name: string;
  emoji: string;
  position: Position;
  items: MemoryItem[];
  color: string;
  description?: string;
}

export interface Path {
  id: string;
  fromRoomId: string;
  toRoomId: string;
  label?: string;
}

export interface MemoryPalace {
  id: string;
  userId: string;
  name: string;
  emoji: string;
  interestId?: string; // Link to a specific interest/hyperfixation
  structure: {
    rooms: Room[];
    paths: Path[];
  };
  metadata: {
    totalItems: number;
    lastVisited: Date;
    retentionScore: number; // 0-100
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface MemoryPalaceStats {
  palaceId: string;
  itemsMemorized: number;
  reviewStreak: number;
  retentionRate: number;
  lastReviewDate?: Date;
}
