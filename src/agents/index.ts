/**
 * 🤖 AGENT SYSTEM
 *
 * Central export for all agents
 */

import { orchestrator } from './AgentOrchestrator';
import { FrameworkAgent } from './FrameworkAgent';
import { PixelAgent } from './PixelAgent';
import { SynapseAgent } from './SynapseAgent';
import { BridgeAgent } from './BridgeAgent';
import { ResponsiveAgent } from './ResponsiveAgent';
import { QualityAgent } from './QualityAgent';
import { InsightAgent } from './InsightAgent';

// Register all agents with the orchestrator
orchestrator.registerAgent(FrameworkAgent);
orchestrator.registerAgent(PixelAgent);
orchestrator.registerAgent(SynapseAgent);
orchestrator.registerAgent(BridgeAgent);
orchestrator.registerAgent(ResponsiveAgent);
orchestrator.registerAgent(QualityAgent);
orchestrator.registerAgent(InsightAgent);

export {
  orchestrator,
  FrameworkAgent,
  PixelAgent,
  SynapseAgent,
  BridgeAgent,
  ResponsiveAgent,
  QualityAgent,
  InsightAgent,
};

export { AgentOrchestrator } from './AgentOrchestrator';
