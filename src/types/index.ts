import { DeviceType } from '../constants/breakpoints';

export interface GridSize {
  width: 1 | 2 | 3;
  height: 1 | 2 | 3;
  minHeight?: number;
  maxHeight?: number;
}

export interface BentoCardConfig {
  id: string;
  size: {
    mobile: GridSize;
    tablet: GridSize;
    desktop: GridSize;
  };
  priority: 'critical' | 'important' | 'standard' | 'background';
  updateFrequency?: 'realtime' | 'minute' | 'hour' | 'daily';
}

export interface VoiceCommand {
  id: string;
  command: string;
  timestamp: Date;
  status: 'processing' | 'success' | 'error';
  result?: string;
}

export interface FocusSession {
  id: string;
  startTime: Date;
  endTime?: Date;
  duration: number;
  type: 'pomodoro' | 'hyperfocus' | 'custom';
  projectId?: string;
}

export interface Achievement {
  id: string;
  category: string;
  name: string;
  description: string;
  level: number;
  progress: number;
  maxProgress: number;
  unlockedAt?: Date;
}
