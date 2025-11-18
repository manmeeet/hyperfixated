/**
 * 🎨 DYNAMIC CARD GENERATION SYSTEM
 * Cards that reconfigure based on current domain and lifecycle phase
 */

import type {
  DynamicCard,
  CardArchetype,
  CardConfiguration,
  CardAction,
  CardMetric,
  HyperfixationDomain,
  LifecyclePhase,
  DomainCategory,
} from '../types/hyperfixation';
import { generateExamplesForDomain } from './universalCommands';

// ============================================================================
// CARD ARCHETYPE DEFINITIONS
// ============================================================================

export interface CardArchetypeDefinition {
  archetype: CardArchetype;
  baseTitle: string;
  relevantInPhases: LifecyclePhase[];
  priorityByPhase: Record<LifecyclePhase, number>;
  generator: (domain: HyperfixationDomain) => CardConfiguration;
}

/**
 * All available card archetypes
 */
export const CARD_ARCHETYPES: CardArchetypeDefinition[] = [
  // ============================================================================
  // OBSESSION COMMAND CENTER
  // ============================================================================
  {
    archetype: 'obsession_command_center',
    baseTitle: 'Command Center',
    relevantInPhases: ['discovery', 'deep_dive', 'mastery', 'integration'],
    priorityByPhase: {
      discovery: 100,
      deep_dive: 100,
      mastery: 90,
      integration: 80,
      transition: 60,
      dormant: 20,
      archived: 10,
    },
    generator: (domain) => {
      const emoji = getDomainEmoji(domain.category);
      const phaseVerb = getPhaseVerb(domain.currentPhase);

      return {
        title: `${emoji} ${domain.name} ${phaseVerb}`,
        subtitle: `${domain.currentPhase.charAt(0).toUpperCase() + domain.currentPhase.slice(1)} Phase`,
        icon: emoji,
        primaryActions: generatePrimaryActions(domain),
        secondaryActions: generateSecondaryActions(domain),
        metrics: [
          {
            id: 'intensity',
            label: 'Intensity',
            value: domain.intensityScore,
            unit: '%',
            trend: domain.passionThermometer.trend === 'rising' ? 'up' : domain.passionThermometer.trend === 'declining' ? 'down' : 'stable',
            visualization: 'progress',
          },
          {
            id: 'hours',
            label: 'Hours This Week',
            value: domain.timePatterns.totalHoursInvested || 0,
            unit: 'hrs',
            visualization: 'number',
          },
          {
            id: 'streak',
            label: 'Active Days',
            value: calculateActiveStreak(domain),
            unit: 'days',
            visualization: 'number',
          },
        ],
        visualElements: [
          {
            type: 'list',
            data: generateExamplesForDomain(domain).slice(0, 3),
            config: { title: 'Try saying...' },
          },
        ],
        style: {
          colorScheme: getDomainColorScheme(domain.category),
          emphasis: 'hero',
          layout: 'expanded',
        },
      };
    },
  },

  // ============================================================================
  // KNOWLEDGE HUB
  // ============================================================================
  {
    archetype: 'knowledge_hub',
    baseTitle: 'Knowledge Hub',
    relevantInPhases: ['discovery', 'deep_dive', 'mastery'],
    priorityByPhase: {
      discovery: 95,
      deep_dive: 85,
      mastery: 60,
      integration: 40,
      transition: 50,
      dormant: 20,
      archived: 10,
    },
    generator: (domain) => ({
      title: `📚 ${domain.name} Learning`,
      subtitle: 'Resources & Progress',
      icon: '📚',
      primaryActions: [
        {
          id: 'add_resource',
          label: 'Add Resource',
          icon: '➕',
          action: () => console.log('Add resource'),
          priority: 1,
          enabled: true,
        },
        {
          id: 'continue_learning',
          label: 'Continue Learning',
          icon: '▶️',
          action: () => console.log('Continue'),
          priority: 2,
          enabled: true,
        },
      ],
      secondaryActions: [],
      metrics: [
        {
          id: 'resources_completed',
          label: 'Completed',
          value: 0, // TODO: Get from DB
          unit: 'resources',
          visualization: 'number',
        },
        {
          id: 'learning_hours',
          label: 'Learning Hours',
          value: domain.resourceInvestment?.temporal?.passiveHours || 0,
          unit: 'hrs',
          visualization: 'number',
        },
      ],
      visualElements: [
        {
          type: 'list',
          data: [], // TODO: Get resources from DB
          config: { showProgress: true },
        },
      ],
      style: {
        colorScheme: 'blue',
        emphasis: 'normal',
        layout: 'standard',
      },
    }),
  },

  // ============================================================================
  // PRACTICE TRACKER
  // ============================================================================
  {
    archetype: 'practice_tracker',
    baseTitle: 'Practice Tracker',
    relevantInPhases: ['deep_dive', 'mastery'],
    priorityByPhase: {
      discovery: 40,
      deep_dive: 95,
      mastery: 90,
      integration: 70,
      transition: 50,
      dormant: 20,
      archived: 10,
    },
    generator: (domain) => ({
      title: `🔬 ${domain.name} Practice`,
      subtitle: 'Experiments & Progress',
      icon: '🔬',
      primaryActions: [
        {
          id: 'log_session',
          label: 'Log Session',
          icon: '📝',
          action: () => console.log('Log session'),
          priority: 1,
          enabled: true,
        },
        {
          id: 'track_experiment',
          label: 'Track Experiment',
          icon: '🧪',
          action: () => console.log('Track experiment'),
          priority: 2,
          enabled: true,
        },
      ],
      secondaryActions: [],
      metrics: [
        {
          id: 'practice_hours',
          label: 'Practice Hours',
          value: domain.resourceInvestment?.temporal?.activeHours || 0,
          unit: 'hrs',
          visualization: 'number',
        },
        {
          id: 'sessions',
          label: 'Sessions',
          value: Math.floor((domain.timePatterns.totalHoursInvested || 0) / (domain.timePatterns.averageSessionLength / 60)),
          unit: 'total',
          visualization: 'number',
        },
        {
          id: 'skills_learned',
          label: 'Skills',
          value: domain.skillsAcquired?.length || 0,
          unit: 'mastered',
          visualization: 'number',
        },
      ],
      visualElements: [
        {
          type: 'timeline',
          data: [], // TODO: Get practice sessions from DB
          config: { showDuration: true },
        },
      ],
      style: {
        colorScheme: 'purple',
        emphasis: 'normal',
        layout: 'standard',
      },
    }),
  },

  // ============================================================================
  // RESOURCE MANAGER
  // ============================================================================
  {
    archetype: 'resource_manager',
    baseTitle: 'Resource Manager',
    relevantInPhases: ['discovery', 'deep_dive', 'mastery'],
    priorityByPhase: {
      discovery: 75,
      deep_dive: 80,
      mastery: 60,
      integration: 50,
      transition: 40,
      dormant: 30,
      archived: 20,
    },
    generator: (domain) => ({
      title: `💰 ${domain.name} Resources`,
      subtitle: 'Tools, Budget & Equipment',
      icon: '💰',
      primaryActions: [
        {
          id: 'add_tool',
          label: 'Add Tool',
          icon: '🛠️',
          action: () => console.log('Add tool'),
          priority: 1,
          enabled: true,
        },
        {
          id: 'track_spending',
          label: 'Track Spending',
          icon: '💵',
          action: () => console.log('Track spending'),
          priority: 2,
          enabled: true,
        },
      ],
      secondaryActions: [],
      metrics: [
        {
          id: 'total_invested',
          label: 'Total Invested',
          value: domain.resourceInvestment?.monetary?.totalSpent || 0,
          unit: '$',
          visualization: 'number',
        },
        {
          id: 'tools_owned',
          label: 'Tools Owned',
          value: domain.toolsOwned?.length || 0,
          unit: 'items',
          visualization: 'number',
        },
        {
          id: 'wishlisted',
          label: 'Wishlist',
          value: domain.toolsWishlisted?.length || 0,
          unit: 'items',
          visualization: 'number',
        },
      ],
      visualElements: [
        {
          type: 'grid',
          data: [], // TODO: Get tools from DB
          config: { columns: 2, showImages: true },
        },
      ],
      style: {
        colorScheme: 'green',
        emphasis: 'normal',
        layout: 'standard',
      },
    }),
  },

  // ============================================================================
  // COMMUNITY FINDER
  // ============================================================================
  {
    archetype: 'community_finder',
    baseTitle: 'Community',
    relevantInPhases: ['discovery', 'deep_dive', 'mastery'],
    priorityByPhase: {
      discovery: 70,
      deep_dive: 85,
      mastery: 90,
      integration: 80,
      transition: 40,
      dormant: 20,
      archived: 10,
    },
    generator: (domain) => ({
      title: `👥 ${domain.name} Community`,
      subtitle: 'Experts, Groups & Events',
      icon: '👥',
      primaryActions: [
        {
          id: 'find_experts',
          label: 'Find Experts',
          icon: '🔍',
          action: () => console.log('Find experts'),
          priority: 1,
          enabled: true,
        },
        {
          id: 'join_community',
          label: 'Join Community',
          icon: '➕',
          action: () => console.log('Join community'),
          priority: 2,
          enabled: true,
        },
      ],
      secondaryActions: [],
      metrics: [
        {
          id: 'communities_joined',
          label: 'Communities',
          value: domain.communityConnections?.length || 0,
          unit: 'joined',
          visualization: 'number',
        },
        {
          id: 'experts_following',
          label: 'Experts',
          value: domain.expertsFollowed?.length || 0,
          unit: 'following',
          visualization: 'number',
        },
      ],
      visualElements: [
        {
          type: 'list',
          data: [], // TODO: Get communities from DB
          config: { showPlatform: true, showActivity: true },
        },
      ],
      style: {
        colorScheme: 'orange',
        emphasis: 'normal',
        layout: 'standard',
      },
    }),
  },

  // ============================================================================
  // PROGRESS VISUALIZER
  // ============================================================================
  {
    archetype: 'progress_visualizer',
    baseTitle: 'Progress',
    relevantInPhases: ['deep_dive', 'mastery', 'integration'],
    priorityByPhase: {
      discovery: 30,
      deep_dive: 75,
      mastery: 85,
      integration: 80,
      transition: 70,
      dormant: 40,
      archived: 30,
    },
    generator: (domain) => ({
      title: `📊 ${domain.name} Progress`,
      subtitle: 'Stats & Achievements',
      icon: '📊',
      primaryActions: [],
      secondaryActions: [],
      metrics: [
        {
          id: 'milestones',
          label: 'Milestones',
          value: domain.milestonesAchieved?.length || 0,
          unit: 'achieved',
          visualization: 'number',
        },
        {
          id: 'total_hours',
          label: 'Total Hours',
          value: domain.timePatterns.totalHoursInvested || 0,
          unit: 'hrs',
          visualization: 'number',
        },
        {
          id: 'weekly_avg',
          label: 'Weekly Average',
          value: domain.resourceInvestment?.temporal?.weeklyAverage || 0,
          unit: 'hrs',
          visualization: 'number',
        },
      ],
      visualElements: [
        {
          type: 'chart',
          data: [], // TODO: Get time series data
          config: { type: 'line', showTrend: true },
        },
      ],
      style: {
        colorScheme: 'cyan',
        emphasis: 'normal',
        layout: 'standard',
      },
    }),
  },

  // ============================================================================
  // CROSS POLLINATION
  // ============================================================================
  {
    archetype: 'cross_pollination',
    baseTitle: 'Cross-Pollination',
    relevantInPhases: ['mastery', 'integration'],
    priorityByPhase: {
      discovery: 10,
      deep_dive: 30,
      mastery: 70,
      integration: 90,
      transition: 60,
      dormant: 20,
      archived: 10,
    },
    generator: (domain) => ({
      title: `🔗 ${domain.name} Connections`,
      subtitle: 'Links to Other Interests',
      icon: '🔗',
      primaryActions: [
        {
          id: 'find_connections',
          label: 'Find Connections',
          icon: '🔍',
          action: () => console.log('Find connections'),
          priority: 1,
          enabled: true,
        },
      ],
      secondaryActions: [],
      metrics: [
        {
          id: 'related_domains',
          label: 'Related Interests',
          value: domain.relatedDomainIds?.length || 0,
          unit: 'found',
          visualization: 'number',
        },
        {
          id: 'opportunities',
          label: 'Opportunities',
          value: domain.crossPollinationOpportunities?.length || 0,
          unit: 'ideas',
          visualization: 'number',
        },
      ],
      visualElements: [
        {
          type: 'graph',
          data: [], // TODO: Build knowledge graph
          config: { showConnections: true },
        },
      ],
      style: {
        colorScheme: 'pink',
        emphasis: 'subtle',
        layout: 'compact',
      },
    }),
  },

  // ============================================================================
  // MEMORY PALACE
  // ============================================================================
  {
    archetype: 'memory_palace',
    baseTitle: 'Memory Palace',
    relevantInPhases: ['transition', 'dormant', 'archived'],
    priorityByPhase: {
      discovery: 10,
      deep_dive: 20,
      mastery: 40,
      integration: 50,
      transition: 90,
      dormant: 80,
      archived: 85,
    },
    generator: (domain) => ({
      title: `🏛️ ${domain.name} Archive`,
      subtitle: 'Preserved Knowledge',
      icon: '🏛️',
      primaryActions: [
        {
          id: 'view_archive',
          label: 'View Archive',
          icon: '📖',
          action: () => console.log('View archive'),
          priority: 1,
          enabled: true,
        },
        {
          id: 'reactivate',
          label: 'Reactivate',
          icon: '🔄',
          action: () => console.log('Reactivate'),
          priority: 2,
          enabled: true,
        },
      ],
      secondaryActions: [],
      metrics: [
        {
          id: 'preserved_notes',
          label: 'Notes',
          value: domain.resourceInvestment?.digital?.notesCreated || 0,
          unit: 'saved',
          visualization: 'number',
        },
        {
          id: 'projects_completed',
          label: 'Projects',
          value: domain.resourceInvestment?.digital?.projectsStarted || 0,
          unit: 'done',
          visualization: 'number',
        },
      ],
      visualElements: [],
      style: {
        colorScheme: 'gray',
        emphasis: 'subtle',
        layout: 'compact',
      },
    }),
  },
];

// ============================================================================
// CARD GENERATION
// ============================================================================

/**
 * Generate all relevant cards for current domain and phase
 */
export function generateCardsForDomain(domain: HyperfixationDomain): DynamicCard[] {
  const cards: DynamicCard[] = [];

  for (const archetypeDef of CARD_ARCHETYPES) {
    // Check if card is relevant for current phase
    if (!archetypeDef.relevantInPhases.includes(domain.currentPhase)) {
      continue;
    }

    // Check if priority is high enough (>40)
    const priority = archetypeDef.priorityByPhase[domain.currentPhase];
    if (priority < 40) {
      continue;
    }

    // Generate card configuration
    const config = archetypeDef.generator(domain);

    cards.push({
      id: `${domain.id}_${archetypeDef.archetype}`,
      archetype: archetypeDef.archetype,
      currentConfig: config,
      relevantInPhases: archetypeDef.relevantInPhases,
      priorityByPhase: archetypeDef.priorityByPhase,
      dataSource: 'domain_analytics',
      updateFrequency: 'hour',
      visualizationType: 'grid',
      interactionPatterns: ['tap', 'voice_command'],
    });
  }

  // Sort by priority (descending)
  cards.sort((a, b) => {
    const priorityA = a.priorityByPhase[domain.currentPhase] || 0;
    const priorityB = b.priorityByPhase[domain.currentPhase] || 0;
    return priorityB - priorityA;
  });

  return cards;
}

/**
 * Update card configuration based on domain changes
 */
export function updateCardForDomain(
  card: DynamicCard,
  domain: HyperfixationDomain
): DynamicCard {
  const archetypeDef = CARD_ARCHETYPES.find((a) => a.archetype === card.archetype);
  if (!archetypeDef) return card;

  const newConfig = archetypeDef.generator(domain);

  return {
    ...card,
    currentConfig: newConfig,
  };
}

// ============================================================================
// HELPERS
// ============================================================================

function getDomainEmoji(category: DomainCategory): string {
  const emojiMap: Record<DomainCategory, string> = {
    creative: '🎨',
    technical: '💻',
    physical: '⚡',
    intellectual: '🧠',
    social: '👥',
    entrepreneurial: '🚀',
    digital_creative: '✨',
    collecting: '🎯',
    gaming: '🎮',
    wellness: '🌱',
  };
  return emojiMap[category] || '⭐';
}

function getPhaseVerb(phase: LifecyclePhase): string {
  const verbMap: Record<LifecyclePhase, string> = {
    discovery: 'Discovery',
    deep_dive: 'Deep Dive',
    mastery: 'Mastery',
    integration: 'Integration',
    transition: 'Transition',
    dormant: 'Archive',
    archived: 'Archive',
  };
  return verbMap[phase] || 'Hub';
}

function getDomainColorScheme(category: DomainCategory): string {
  const colorMap: Record<DomainCategory, string> = {
    creative: 'purple',
    technical: 'blue',
    physical: 'red',
    intellectual: 'cyan',
    social: 'orange',
    entrepreneurial: 'green',
    digital_creative: 'pink',
    collecting: 'yellow',
    gaming: 'indigo',
    wellness: 'teal',
  };
  return colorMap[category] || 'purple';
}

function generatePrimaryActions(domain: HyperfixationDomain): CardAction[] {
  const actions: CardAction[] = [];

  // Phase-specific actions
  switch (domain.currentPhase) {
    case 'discovery':
      actions.push(
        {
          id: 'research',
          label: `Research ${domain.name}`,
          icon: '🔍',
          commandPattern: 'research',
          action: () => console.log('Research'),
          priority: 1,
          enabled: true,
        },
        {
          id: 'find_resources',
          label: 'Find Resources',
          icon: '📚',
          commandPattern: 'learn',
          action: () => console.log('Find resources'),
          priority: 2,
          enabled: true,
        }
      );
      break;

    case 'deep_dive':
      actions.push(
        {
          id: 'practice',
          label: 'Practice Session',
          icon: '🎯',
          commandPattern: 'practice',
          action: () => console.log('Practice'),
          priority: 1,
          enabled: true,
        },
        {
          id: 'track_progress',
          label: 'Track Progress',
          icon: '📊',
          commandPattern: 'track',
          action: () => console.log('Track'),
          priority: 2,
          enabled: true,
        }
      );
      break;

    case 'mastery':
      actions.push(
        {
          id: 'create_project',
          label: 'Start Project',
          icon: '🚀',
          commandPattern: 'create',
          action: () => console.log('Create'),
          priority: 1,
          enabled: true,
        },
        {
          id: 'share_knowledge',
          label: 'Share Knowledge',
          icon: '💡',
          commandPattern: 'share',
          action: () => console.log('Share'),
          priority: 2,
          enabled: true,
        }
      );
      break;

    default:
      actions.push({
        id: 'explore',
        label: 'Explore',
        icon: '✨',
        action: () => console.log('Explore'),
        priority: 1,
        enabled: true,
      });
  }

  return actions;
}

function generateSecondaryActions(domain: HyperfixationDomain): CardAction[] {
  return [
    {
      id: 'view_stats',
      label: 'View Stats',
      icon: '📈',
      action: () => console.log('View stats'),
      priority: 3,
      enabled: true,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: '⚙️',
      action: () => console.log('Settings'),
      priority: 4,
      enabled: true,
    },
  ];
}

function calculateActiveStreak(domain: HyperfixationDomain): number {
  // TODO: Calculate from actual session data
  const daysSinceDiscovery = Math.floor(
    (Date.now() - domain.discoveryDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  return Math.min(daysSinceDiscovery, 30); // Placeholder
}
