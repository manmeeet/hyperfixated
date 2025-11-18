/**
 * 🤖 HYPERFOCUS AI - AGENT CAPABILITY REGISTRY
 *
 * Central registry defining all 10 specialized agents, their capabilities,
 * responsibilities, and when they should be triggered.
 */

import { AgentCapabilities, AgentName } from './agent-protocol';

// ============================================================================
// AGENT DEFINITIONS
// ============================================================================

export const PIXEL: AgentCapabilities = {
  agent: 'pixel',
  displayName: 'Pixel',
  role: 'Design System Guardian & UI/UX Consistency',

  responsibilities: [
    'Validates all new components follow bento grid principles',
    'Ensures color system compliance (solid colors, no purple wash)',
    'Maintains responsive breakpoint consistency',
    'Checks touch target sizes (56px mobile → 44px desktop)',
    'Validates typography hierarchy (sans/mono/display mixing)',
    'Reviews interaction patterns across features',
    'Ensures voice-first design principles',
    'Validates mobile-first responsive behavior',
    'Checks accessibility compliance',
    'Maintains hypermaximalist retro aesthetic',
  ],

  specializations: [
    'Complete design system specification',
    'Mobile-first responsive principles',
    'Retro-maximalist aesthetic rules',
    'Voice UI interaction patterns',
    'Accessibility standards (WCAG 2.1)',
    'Animation and micro-interaction best practices',
    'Bento grid layout systems',
    'Design token management',
  ],

  triggers: {
    filePatterns: [
      'src/components/.*\\.tsx$',
      'src/constants/(colors|typography|spacing|breakpoints)\\.ts$',
      'src/utils/responsive\\.ts$',
    ],
    keywords: ['component', 'style', 'design', 'ui', 'responsive', 'animation'],
    featureTypes: ['new_feature', 'enhancement'],
  },

  tools: [
    'Design token validator',
    'Accessibility scanner',
    'Responsive breakpoint checker',
    'Color contrast analyzer',
    'Touch target validator',
    'Animation performance profiler',
  ],

  typicalReviewTime: {
    simple: 15,
    moderate: 30,
    complex: 60,
    epic: 120,
  },
};

export const FRAMEWORK: AgentCapabilities = {
  agent: 'framework',
  displayName: 'Framework',
  role: 'Code Architecture & System Design',

  responsibilities: [
    'Reviews new feature integration patterns',
    'Ensures modular component design',
    'Validates service layer architecture',
    'Maintains clean separation of concerns',
    'Checks scalability implications',
    'TypeScript type safety validation',
    'Code style and formatting consistency',
    'Performance optimization reviews',
    'Security vulnerability scanning',
    'Documentation completeness checks',
  ],

  specializations: [
    'React Native/Expo architecture',
    'TypeScript best practices',
    'State management (Zustand/React Query)',
    'API integration patterns',
    'Performance optimization',
    'Testing strategies (Unit/Integration/E2E)',
    'Code organization patterns',
    'Dependency management',
  ],

  triggers: {
    always: true, // Framework reviews ALL changes
  },

  tools: [
    'TypeScript compiler',
    'ESLint configuration',
    'Dependency analyzer',
    'Architecture decision records',
    'Performance profiler',
    'Code complexity analyzer',
  ],

  typicalReviewTime: {
    simple: 20,
    moderate: 45,
    complex: 90,
    epic: 180,
  },
};

export const SYNAPSE: AgentCapabilities = {
  agent: 'synapse',
  displayName: 'Synapse',
  role: 'AI Feature Integration & Voice Command Evolution',

  responsibilities: [
    'Develops new voice command patterns for features',
    'Ensures natural language processing consistency',
    'Validates context-aware command interpretation',
    'Maintains voice UI feedback patterns',
    'Optimizes speech-to-action workflows',
    'Reviews Claude API integration patterns',
    'Ensures consistent AI personality (Fox mascot)',
    'Validates intelligent automation workflows',
    'Maintains context preservation across features',
    'Optimizes AI response generation',
  ],

  specializations: [
    'Claude API integration patterns',
    'Voice processing (Whisper/STT)',
    'Natural language understanding',
    'Workflow automation design',
    'Context management systems',
    'AI personality development',
    'Conversational UI patterns',
    'Intent classification systems',
  ],

  triggers: {
    filePatterns: [
      'src/components/voice/.*',
      'src/components/bento/CommandCenter\\.tsx$',
      'src/services/ai/.*',
      'src/services/voice/.*',
    ],
    keywords: ['voice', 'ai', 'claude', 'whisper', 'command', 'automation', 'nlp'],
    featureTypes: ['new_feature', 'enhancement'],
  },

  tools: [
    'OpenAI Whisper API',
    'Claude API for NLP',
    'Voice UI testing frameworks',
    'Intent classification validator',
    'Context management tools',
    'AI response quality metrics',
  ],

  typicalReviewTime: {
    simple: 25,
    moderate: 50,
    complex: 90,
    epic: 150,
  },
};

export const BRIDGE: AgentCapabilities = {
  agent: 'bridge',
  displayName: 'Bridge',
  role: 'External API Integration & Data Flow Management',

  responsibilities: [
    'Reviews new external API integrations',
    'Ensures consistent authentication patterns',
    'Validates data transformation pipelines',
    'Maintains API rate limiting compliance',
    'Optimizes external service orchestration',
    'Validates data consistency across integrations',
    'Ensures proper error handling for external services',
    'Maintains data privacy and security standards',
    'Optimizes sync frequency and performance',
    'Reviews offline/online state management',
  ],

  specializations: [
    'REST/GraphQL API integration',
    'OAuth2/API authentication',
    'Data synchronization patterns',
    'Rate limiting and caching strategies',
    'Error handling and retry logic',
    'Privacy and security compliance',
    'API client architecture',
    'Data mapping and transformation',
  ],

  triggers: {
    filePatterns: [
      'src/services/api/.*',
      'src/services/integrations/.*',
      'src/hooks/useApi.*',
    ],
    keywords: ['api', 'integration', 'sync', 'webhook', 'oauth', 'fetch'],
    featureTypes: ['new_feature', 'enhancement'],
  },

  tools: [
    'API client generators',
    'OAuth flow validators',
    'Rate limit calculators',
    'API documentation generators',
    'Network request interceptors',
    'Sync conflict resolvers',
  ],

  typicalReviewTime: {
    simple: 20,
    moderate: 40,
    complex: 75,
    epic: 120,
  },
};

export const RESPONSIVE: AgentCapabilities = {
  agent: 'responsive',
  displayName: 'Responsive',
  role: 'Mobile Experience & Performance Optimization',

  responsibilities: [
    'Reviews mobile performance implications',
    'Ensures touch-friendly interaction design',
    'Validates offline capability implementation',
    'Maintains battery usage optimization',
    'Checks mobile-specific feature integration',
    'Tests layouts across all device sizes',
    'Validates touch target accessibility',
    'Ensures readable typography on small screens',
    'Maintains navigation usability',
    'Reviews gesture interaction patterns',
  ],

  specializations: [
    'React Native performance optimization',
    'Mobile UX patterns and conventions',
    'Touch interaction design',
    'Offline-first architecture',
    'Mobile device capabilities',
    'App store optimization',
    'Gesture handling',
    'Mobile accessibility',
  ],

  triggers: {
    filePatterns: [
      'src/components/.*',
      'src/utils/responsive\\.ts$',
      'App\\.tsx$',
    ],
    keywords: ['responsive', 'mobile', 'touch', 'gesture', 'offline', 'performance'],
    featureTypes: ['new_feature', 'enhancement', 'optimization'],
  },

  tools: [
    'React Native performance profiler',
    'Mobile device simulators',
    'Touch target validators',
    'Offline storage analyzers',
    'Battery usage monitors',
    'App size analyzers',
  ],

  typicalReviewTime: {
    simple: 15,
    moderate: 35,
    complex: 60,
    epic: 100,
  },
};

export const DOPAMINE: AgentCapabilities = {
  agent: 'dopamine',
  displayName: 'Dopamine',
  role: 'Engagement Systems & Achievement Design',

  responsibilities: [
    'Creates meaningful achievement patterns',
    'Ensures balanced reward distribution',
    'Validates progression system fairness',
    'Maintains engagement without addiction',
    'Reviews achievement accessibility',
    'Develops Fox mascot personality traits',
    'Ensures contextually appropriate reactions',
    'Validates emotional intelligence responses',
    'Maintains consistent character voice',
    'Reviews behavioral pattern diversity',
  ],

  specializations: [
    'ADHD motivation psychology',
    'Achievement system design',
    'Character development principles',
    'Behavioral psychology patterns',
    'Sustainable engagement practices',
    'Animation and feedback design',
    'Gamification ethics',
    'Reward timing strategies',
  ],

  triggers: {
    filePatterns: [
      'src/components/bento/AchievementsCard\\.tsx$',
      'src/components/bento/StatsCard\\.tsx$',
      'src/services/gamification/.*',
      'src/services/achievements/.*',
    ],
    keywords: ['achievement', 'reward', 'mascot', 'gamification', 'streak', 'level'],
    featureTypes: ['new_feature', 'enhancement'],
  },

  tools: [
    'Analytics for engagement tracking',
    'A/B testing frameworks',
    'Animation libraries (Lottie)',
    'Behavioral analysis tools',
    'Achievement balancing calculators',
  ],

  typicalReviewTime: {
    simple: 20,
    moderate: 40,
    complex: 70,
    epic: 120,
  },
};

export const QUALITY: AgentCapabilities = {
  agent: 'quality',
  displayName: 'Quality',
  role: 'Automated Testing & Quality Assurance',

  responsibilities: [
    'Ensures comprehensive test coverage',
    'Validates testing strategy consistency',
    'Reviews test quality and effectiveness',
    'Maintains automated testing pipelines',
    'Checks integration test completeness',
    'Reviews code quality metrics',
    'Validates accessibility compliance',
    'Ensures cross-platform compatibility',
    'Maintains performance benchmarks',
    'Reviews security vulnerability scanning',
  ],

  specializations: [
    'Jest/React Native Testing Library',
    'E2E testing frameworks (Detox/Appium)',
    'Accessibility testing tools',
    'Performance testing methodologies',
    'Security testing practices',
    'CI/CD pipeline optimization',
    'Test-driven development',
    'Quality metrics analysis',
  ],

  triggers: {
    always: true, // Quality reviews ALL code changes
  },

  tools: [
    'Jest testing framework',
    'React Native Testing Library',
    'Detox E2E testing',
    'Accessibility scanners',
    'Performance monitors',
    'CI/CD platforms',
  ],

  typicalReviewTime: {
    simple: 25,
    moderate: 50,
    complex: 90,
    epic: 150,
  },
};

export const INSIGHT: AgentCapabilities = {
  agent: 'insight',
  displayName: 'Insight',
  role: 'User Behavior Analysis & Feature Optimization',

  responsibilities: [
    'Tracks feature usage patterns',
    'Analyzes hyperfixation transitions',
    'Identifies engagement optimization opportunities',
    'Validates feature effectiveness metrics',
    'Reviews user journey completeness',
    'Monitors app performance metrics',
    'Tracks feature adoption rates',
    'Analyzes user retention patterns',
    'Validates conversion funnel efficiency',
    'Reviews technical performance data',
  ],

  specializations: [
    'User analytics platforms',
    'Behavioral data analysis',
    'A/B testing methodologies',
    'Performance metrics interpretation',
    'User experience research',
    'Product optimization strategies',
    'Data visualization',
    'Predictive analytics',
  ],

  triggers: {
    filePatterns: [
      'src/services/analytics/.*',
      'src/components/bento/StatsCard\\.tsx$',
    ],
    keywords: ['analytics', 'metrics', 'tracking', 'telemetry', 'stats'],
    featureTypes: ['new_feature', 'enhancement', 'optimization'],
  },

  tools: [
    'Analytics platforms',
    'A/B testing frameworks',
    'Performance monitoring',
    'User feedback systems',
    'Data visualization tools',
  ],

  typicalReviewTime: {
    simple: 15,
    moderate: 30,
    complex: 60,
    epic: 90,
  },
};

export const VAULT: AgentCapabilities = {
  agent: 'vault',
  displayName: 'Vault',
  role: 'Privacy, Security & Data Protection',

  responsibilities: [
    'Reviews API security implementations',
    'Validates data encryption standards',
    'Ensures authentication security',
    'Maintains privacy compliance',
    'Reviews vulnerability assessments',
    'Validates personal data handling',
    'Ensures GDPR compliance measures',
    'Reviews data retention policies',
    'Maintains secure storage practices',
    'Validates data transmission security',
  ],

  specializations: [
    'Mobile app security best practices',
    'GDPR and privacy regulations',
    'API security patterns',
    'Data encryption standards',
    'Authentication security',
    'Vulnerability assessment',
    'Secure coding practices',
    'Privacy by design',
  ],

  triggers: {
    filePatterns: [
      'src/services/auth/.*',
      'src/services/api/.*',
      'src/services/storage/.*',
      '\\.env.*',
    ],
    keywords: ['auth', 'security', 'encryption', 'privacy', 'token', 'credential'],
    featureTypes: ['new_feature', 'enhancement', 'bug_fix'],
  },

  tools: [
    'Security scanning tools',
    'Encryption libraries',
    'Privacy compliance checkers',
    'Vulnerability databases',
    'OWASP guidelines',
  ],

  typicalReviewTime: {
    simple: 20,
    moderate: 40,
    complex: 75,
    epic: 120,
  },
};

export const SHIP: AgentCapabilities = {
  agent: 'ship',
  displayName: 'Ship',
  role: 'Release Management & DevOps',

  responsibilities: [
    'Manages deployment pipeline automation',
    'Validates release readiness criteria',
    'Ensures rollback capability maintenance',
    'Reviews feature flag implementations',
    'Maintains deployment documentation',
    'Validates development environment consistency',
    'Ensures staging environment accuracy',
    'Maintains production environment stability',
    'Reviews infrastructure scaling needs',
    'Validates backup and recovery systems',
  ],

  specializations: [
    'Expo/EAS deployment systems',
    'CI/CD pipeline optimization',
    'Environment configuration management',
    'App store deployment processes',
    'Infrastructure as code',
    'Monitoring and alerting systems',
    'Release management',
    'DevOps best practices',
  ],

  triggers: {
    filePatterns: [
      'app\\.json$',
      'eas\\.json$',
      '\\.github/workflows/.*',
      'package\\.json$',
    ],
    keywords: ['deploy', 'release', 'build', 'ci', 'cd', 'pipeline'],
    featureTypes: ['new_feature', 'enhancement', 'bug_fix', 'optimization'],
  },

  tools: [
    'Expo Application Services (EAS)',
    'GitHub Actions',
    'App store deployment tools',
    'Monitoring platforms',
    'Infrastructure tools',
  ],

  typicalReviewTime: {
    simple: 15,
    moderate: 30,
    complex: 60,
    epic: 90,
  },
};

// ============================================================================
// AGENT REGISTRY
// ============================================================================

export const AGENT_REGISTRY: Record<AgentName, AgentCapabilities> = {
  pixel: PIXEL,
  framework: FRAMEWORK,
  synapse: SYNAPSE,
  bridge: BRIDGE,
  responsive: RESPONSIVE,
  dopamine: DOPAMINE,
  quality: QUALITY,
  insight: INSIGHT,
  vault: VAULT,
  ship: SHIP,
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get all agents that should review a specific feature
 */
export function getTriggeredAgents(
  featureContext: import('./agent-protocol').FeatureContext
): AgentCapabilities[] {
  return Object.values(AGENT_REGISTRY).filter(agent =>
    import('./agent-protocol').shouldTriggerAgent(agent, featureContext)
  );
}

/**
 * Get agent by name
 */
export function getAgent(name: AgentName): AgentCapabilities {
  return AGENT_REGISTRY[name];
}

/**
 * Get all agent names
 */
export function getAllAgentNames(): AgentName[] {
  return Object.keys(AGENT_REGISTRY) as AgentName[];
}

/**
 * Get agents by phase
 */
export function getAgentsByPhase(phase: 1 | 2 | 3 | 4): AgentCapabilities[] {
  const phaseMapping: Record<number, AgentName[]> = {
    1: ['pixel', 'framework', 'quality'],
    2: ['synapse', 'bridge', 'responsive'],
    3: ['dopamine', 'vault', 'insight'],
    4: ['ship'],
  };

  return phaseMapping[phase].map(name => AGENT_REGISTRY[name]);
}
