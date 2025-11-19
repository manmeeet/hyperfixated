/**
 * 🤖 AGENT SYSTEM TYPES
 *
 * Defines the agent system architecture for HyperFocus AI
 */

export type AgentType =
  | 'pixel'        // Visual Design & UI
  | 'framework'    // Data Architecture
  | 'synapse'      // Voice & Input
  | 'bridge'       // External Integrations
  | 'responsive'   // Cross-Platform Optimization
  | 'quality'      // Testing & Validation
  | 'insight';     // Analytics & Learning

export type AgentStatus = 'idle' | 'analyzing' | 'processing' | 'complete' | 'error';

export interface AgentTask {
  id: string;
  type: AgentType;
  featureName: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  dependencies: string[]; // IDs of tasks that must complete first
  status: AgentStatus;
  result?: any;
  error?: string;
  startedAt?: Date;
  completedAt?: Date;
}

export interface AgentCapabilities {
  canHandleFeature: (featureName: string) => boolean;
  estimateEffort: (task: AgentTask) => 'low' | 'medium' | 'high';
  validateDependencies: (task: AgentTask) => boolean;
}

export interface AgentResult {
  success: boolean;
  data?: any;
  error?: string;
  recommendations?: string[];
  nextSteps?: AgentTask[];
}

export interface Agent {
  type: AgentType;
  name: string;
  emoji: string;
  description: string;
  capabilities: AgentCapabilities;
  execute: (task: AgentTask) => Promise<AgentResult>;
}

export interface FeatureRequest {
  id: string;
  featureName: string;
  category: 'cognitive' | 'creative' | 'knowledge' | 'energy' | 'integration' | 'gamification' | 'analytics' | 'life' | 'neurodivergent';
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  requiredAgents: AgentType[];
  metadata?: Record<string, any>;
}

export interface AgentOrchestrationPlan {
  featureRequest: FeatureRequest;
  tasks: AgentTask[];
  estimatedDuration: number; // in minutes
  complexity: 'low' | 'medium' | 'high';
}
