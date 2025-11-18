/**
 * ⚡ ENERGY LEVEL TYPES
 */

export interface EnergyLog {
  id: string;
  userId: string;
  timestamp: Date;
  energyLevel: number; // 1-100
  context: {
    activity?: string;
    location?: string;
    weather?: string;
    sleepHours?: number;
  };
  predictedByAI: boolean;
}

export interface EnergyPrediction {
  timestamp: Date;
  predictedLevel: number;
  confidence: number;
  factors: Array<{
    name: string;
    impact: 'positive' | 'negative' | 'neutral';
    weight: number;
  }>;
}

export interface CircadianPattern {
  userId: string;
  peakHours: number[]; // Hours of day (0-23)
  lowHours: number[];
  averageByHour: Record<number, number>;
}
