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

export interface ScheduleBlock {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  color: string;
  type: 'focus' | 'meeting' | 'break' | 'task';
}

export type VoiceButtonState = 'idle' | 'listening' | 'processing' | 'success';
export type TimerMode = 'pomodoro' | 'hyperfocus' | 'custom';
export type TimerState = 'idle' | 'active' | 'break' | 'overtime';
