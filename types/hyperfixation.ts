/**
 * 🧠 UNIVERSAL HYPERFIXATION FRAMEWORK
 * Type System for Dynamic Interest Detection & Adaptation
 */

// ============================================================================
// DOMAIN CLASSIFICATION
// ============================================================================

export type DomainCategory =
  | 'creative'          // pottery, music, art, writing, design
  | 'technical'         // coding, trading, data science, engineering
  | 'physical'          // climbing, dancing, martial arts, sports
  | 'intellectual'      // languages, philosophy, history, science
  | 'social'            // community organizing, teaching, networking
  | 'entrepreneurial'   // business, investing, side projects
  | 'digital_creative'  // video editing, 3D modeling, game dev
  | 'collecting'        // cards, sneakers, vinyl, antiques
  | 'gaming'            // competitive games, speedrunning, streaming
  | 'wellness';         // fitness, nutrition, meditation, therapy

export type LifecyclePhase =
  | 'discovery'     // Information hoarding, tool research, community finding
  | 'deep_dive'     // Intensive learning, skill acquisition, practice
  | 'mastery'       // Advanced techniques, teaching, optimization
  | 'integration'   // Combining with other interests, cross-pollination
  | 'transition'    // Winding down, documentation, knowledge preservation
  | 'dormant'       // Inactive but may resurface seasonally
  | 'archived';     // Fully complete/moved on

export type DomainStatus = 'active' | 'dormant' | 'archived';

// ============================================================================
// CORE DOMAIN ENTITY
// ============================================================================

export interface HyperfixationDomain {
  id: string;
  name: string;
  category: DomainCategory;
  status: DomainStatus;

  // Intensity & Engagement
  intensityScore: number; // 0-100, calculated from activity patterns
  passionThermometer: {
    current: number;
    peak: number;
    trend: 'rising' | 'stable' | 'declining';
  };

  // Lifecycle tracking
  currentPhase: LifecyclePhase;
  discoveryDate: Date;
  lastActiveDate: Date;
  estimatedTransitionDate?: Date; // AI prediction of when interest may wane

  // Time investment
  timePatterns: {
    totalHoursInvested: number;
    averageSessionLength: number; // in minutes
    sessionsPerWeek: number;
    preferredTimeOfDay: ('morning' | 'afternoon' | 'evening' | 'night')[];
    peakProductivityHour?: number; // 0-23
  };

  // Resources
  resourceInvestment: ResourceInvestment;

  // Learning & Progress
  learningPathway: LearningPathway;
  skillsAcquired: Skill[];
  milestonesAchieved: Milestone[];

  // Community & Social
  communityConnections: CommunityConnection[];
  expertsFollowed: Expert[];
  mentoringStatus?: 'seeking' | 'learning' | 'teaching';

  // Tools & Equipment
  toolsOwned: Tool[];
  toolsWishlisted: Tool[];
  subscriptionsActive: Subscription[];

  // Connections to other domains
  relatedDomainIds: string[];
  crossPollinationOpportunities: string[];

  // AI-generated suggestions
  suggestedWorkflows: Workflow[];
  suggestedIntegrations: IntegrationSuggestion[];
  nextSteps: NextStep[];

  // Metadata
  tags: string[];
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// RESOURCE INVESTMENT
// ============================================================================

export interface ResourceInvestment {
  // Financial
  monetary: {
    totalSpent: number;
    currency: string;
    breakdown: {
      tools: number;
      courses: number;
      materials: number;
      subscriptions: number;
      events: number;
      other: number;
    };
  };

  // Time
  temporal: {
    totalHours: number;
    activeHours: number;     // Hands-on practice
    passiveHours: number;    // Watching, reading, researching
    weeklyAverage: number;
  };

  // Space
  physical?: {
    location: string;
    squareFeet?: number;
    storageUsed: string;
    organization: 'chaotic' | 'organized' | 'pristine';
  };

  digital?: {
    filesStored: number;
    storageUsedMB: number;
    bookmarksCollected: number;
    notesCreated: number;
    projectsStarted: number;
  };

  // Energy & Focus
  cognitive: {
    deepWorkHours: number;
    flowStateFrequency: number; // 0-100
    cognitiveLoadRating: 1 | 2 | 3 | 4 | 5; // 1=easy, 5=exhausting
  };
}

// ============================================================================
// LEARNING & PROGRESSION
// ============================================================================

export interface LearningPathway {
  currentLevel: 'novice' | 'beginner' | 'intermediate' | 'advanced' | 'expert';
  progressPercentage: number; // 0-100

  stages: LearningStage[];
  currentStageIndex: number;

  recommendedResources: Resource[];
  completedResources: Resource[];
}

export interface LearningStage {
  id: string;
  name: string;
  description: string;
  order: number;
  estimatedHours: number;

  skills: Skill[];
  milestones: Milestone[];
  resources: Resource[];

  status: 'locked' | 'available' | 'in_progress' | 'completed';
  completedAt?: Date;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  category: string;

  proficiencyLevel: number; // 0-100
  transferable: boolean; // Can this skill apply to other domains?
  relatedDomains: string[];

  acquiredDate?: Date;
  lastPracticed?: Date;
  practiceFrequency?: 'daily' | 'weekly' | 'monthly' | 'rarely';
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  type: 'learning' | 'creation' | 'achievement' | 'social' | 'financial';

  achievedAt?: Date;
  celebrationLevel: 'minor' | 'major' | 'epic';

  metadata?: Record<string, any>;
}

export interface Resource {
  id: string;
  type: 'video' | 'article' | 'course' | 'book' | 'tutorial' | 'tool' | 'community';
  title: string;
  url?: string;
  author?: string;
  cost?: number;
  estimatedTime?: number; // in minutes

  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'saved' | 'in_progress' | 'completed' | 'abandoned';

  notes?: string;
  rating?: number; // 1-5
  completedAt?: Date;
}

// ============================================================================
// COMMUNITY & EXPERTS
// ============================================================================

export interface CommunityConnection {
  id: string;
  platform: CommunityPlatform;
  name: string;
  url?: string;

  memberCount?: number;
  activityLevel: 'low' | 'medium' | 'high' | 'very_high';
  relevanceScore: number; // 0-100

  joinedAt?: Date;
  lastInteraction?: Date;
  contributionLevel: 'lurker' | 'occasional' | 'active' | 'leader';
}

export type CommunityPlatform =
  | 'discord'
  | 'reddit'
  | 'twitter'
  | 'instagram'
  | 'youtube'
  | 'facebook'
  | 'meetup'
  | 'slack'
  | 'forum'
  | 'local_group'
  | 'other';

export interface Expert {
  id: string;
  name: string;
  domain: string;
  platforms: {
    platform: CommunityPlatform;
    handle: string;
    url?: string;
  }[];

  expertise: string[];
  followedSince?: Date;
  interactionLevel: 'following' | 'engaging' | 'mentoring';

  notableWork?: string[];
  contactInfo?: string;
}

// ============================================================================
// TOOLS & EQUIPMENT
// ============================================================================

export interface Tool {
  id: string;
  name: string;
  type: 'physical' | 'software' | 'subscription' | 'service';
  category: string;

  // Ownership
  status: 'owned' | 'wishlisted' | 'considering' | 'sold';
  acquiredDate?: Date;
  purchasePrice?: number;
  currentValue?: number;

  // Usage
  usageFrequency: 'daily' | 'weekly' | 'monthly' | 'rarely' | 'never';
  lastUsed?: Date;
  hoursUsed?: number;

  // Details
  brand?: string;
  model?: string;
  location?: string;
  condition?: 'new' | 'good' | 'fair' | 'poor';
  maintenanceNeeded?: boolean;

  // Metadata
  url?: string;
  notes?: string;
  imageUrl?: string;

  // Cross-domain utility
  usedInDomains: string[]; // Can this tool be used in multiple fixations?
}

export interface Subscription {
  id: string;
  name: string;
  type: 'software' | 'membership' | 'course' | 'community' | 'other';

  cost: number;
  currency: string;
  billingCycle: 'monthly' | 'yearly' | 'lifetime';

  startDate: Date;
  nextBillingDate?: Date;
  cancelledAt?: Date;

  autoRenew: boolean;
  worthIt: boolean; // User assessment

  url?: string;
  notes?: string;
}

// ============================================================================
// UNIVERSAL COMMANDS
// ============================================================================

export interface UniversalCommand {
  id: string;
  pattern: CommandPattern;
  intent: CommandIntent;

  // Context awareness
  applicableDomains: string[]; // Which domains is this command relevant for?
  requiredPhase?: LifecyclePhase[]; // Some commands only make sense in certain phases

  // Natural language examples
  examplePhrases: string[];
  aliases: string[];

  // Execution
  actionType: CommandActionType;
  parameters: CommandParameter[];

  // History
  executionCount: number;
  lastExecuted?: Date;
  successRate: number; // 0-100
}

export type CommandPattern =
  // Research & Learning
  | 'research'          // "Research [topic] for [duration]"
  | 'learn'             // "Learn [skill] using [resource]"
  | 'study'             // "Study [subject] every [frequency]"
  | 'explore'           // "Explore [new_area] in [domain]"

  // Practice & Creation
  | 'practice'          // "Block practice time for [skill]"
  | 'create'            // "Start [project type] project"
  | 'experiment'        // "Set up experiment with [materials]"
  | 'iterate'           // "Iterate on [project] based on [feedback]"

  // Tracking & Documentation
  | 'track'             // "Track progress on [technique]"
  | 'document'          // "Document today's [activity] session"
  | 'measure'           // "Measure improvement in [skill]"
  | 'reflect'           // "Reflect on [timeframe] of [activity]"

  // Scheduling & Planning
  | 'schedule'          // "Schedule [activity] for [time]"
  | 'block'             // "Block [duration] for [activity]"
  | 'plan'              // "Plan next [timeframe] for [domain]"
  | 'optimize'          // "Optimize my [workflow] for [goal]"

  // Social & Community
  | 'connect'           // "Find experts in [domain]"
  | 'share'             // "Share progress on [platform]"
  | 'collaborate'       // "Find collaborators for [project]"
  | 'teach'             // "Create tutorial for [skill]"

  // Resource Management
  | 'compare'           // "Compare [tool A] vs [tool B]"
  | 'budget'            // "Budget for [expense category]"
  | 'organize'          // "Organize my [tool category]"
  | 'acquire'           // "Research acquiring [tool]"

  // Transitions & Connections
  | 'transition'        // "Archive [old domain] and start [new domain]"
  | 'bridge'            // "Find connections between [domain A] and [domain B]"
  | 'combine'           // "Combine [skill A] and [skill B]"
  | 'archive'           // "Archive and preserve [domain] knowledge"

  // Analysis & Insights
  | 'analyze'           // "Analyze my progress in [domain]"
  | 'predict'           // "When will I reach [milestone]?"
  | 'recommend'         // "Recommend next steps for [domain]"
  | 'discover';         // "Discover patterns in my [activity]"

export type CommandIntent =
  | 'time_blocking'
  | 'resource_research'
  | 'progress_tracking'
  | 'skill_acquisition'
  | 'community_building'
  | 'knowledge_capture'
  | 'tool_management'
  | 'workflow_optimization'
  | 'cross_domain_connection'
  | 'transition_management';

export type CommandActionType =
  | 'calendar_event'
  | 'notion_update'
  | 'research_task'
  | 'data_log'
  | 'web_search'
  | 'integration_trigger'
  | 'ai_analysis'
  | 'notification'
  | 'workflow_start';

export interface CommandParameter {
  name: string;
  type: 'string' | 'number' | 'date' | 'time' | 'duration' | 'domain' | 'skill' | 'resource';
  required: boolean;
  defaultValue?: any;
  validationRule?: string;
}

export interface CommandExecution {
  id: string;
  commandId: string;
  executedAt: Date;
  rawInput: string;
  parsedParameters: Record<string, any>;
  result: 'success' | 'partial' | 'failed';
  error?: string;
  durationMs: number;
}

// ============================================================================
// DYNAMIC CARDS
// ============================================================================

export interface DynamicCard {
  id: string;
  archetype: CardArchetype;

  // Current configuration (adapts to active domain)
  currentConfig: CardConfiguration;

  // Lifecycle awareness
  relevantInPhases: LifecyclePhase[];
  priorityByPhase: Record<LifecyclePhase, number>;

  // Data source
  dataSource: DataSource;
  updateFrequency: 'realtime' | 'minute' | 'hour' | 'daily';

  // UI configuration
  visualizationType: VisualizationType;
  interactionPatterns: InteractionPattern[];
}

export type CardArchetype =
  | 'obsession_command_center'  // Main hero card, dynamically titled
  | 'knowledge_hub'              // Learning resources for current fixation
  | 'practice_tracker'           // Experimentation & skill building
  | 'resource_manager'           // Tools, equipment, budget tracking
  | 'community_finder'           // Experts, meetups, platforms for current domain
  | 'progress_visualizer'        // Stats, milestones, achievements
  | 'cross_pollination'          // Connections to other interests
  | 'memory_palace'              // Archive & retrieve past fixations
  | 'workflow_hub'               // Automation & integration center
  | 'passion_thermometer';       // Intensity tracking across all domains

export interface CardConfiguration {
  title: string; // Dynamically generated: "Pottery Studio Command Center"
  subtitle?: string;
  icon: string;

  primaryActions: CardAction[];
  secondaryActions: CardAction[];

  metrics: CardMetric[];
  visualElements: VisualElement[];

  style: {
    colorScheme: string;
    emphasis: 'subtle' | 'normal' | 'bold' | 'hero';
    layout: 'compact' | 'standard' | 'expanded';
  };
}

export interface CardAction {
  id: string;
  label: string;
  icon?: string;
  commandPattern?: CommandPattern;
  action: () => void;
  priority: number;
  enabled: boolean;
}

export interface CardMetric {
  id: string;
  label: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: number;
  visualization?: 'number' | 'progress' | 'chart' | 'sparkline';
}

export interface VisualElement {
  type: 'chart' | 'list' | 'grid' | 'timeline' | 'graph' | 'image';
  data: any;
  config: Record<string, any>;
}

export type DataSource =
  | 'domain_analytics'
  | 'time_tracking'
  | 'resource_inventory'
  | 'community_activity'
  | 'learning_progress'
  | 'cross_domain_graph'
  | 'external_api'
  | 'user_input';

export type VisualizationType =
  | 'stat_number'
  | 'progress_bar'
  | 'circular_progress'
  | 'line_chart'
  | 'bar_chart'
  | 'timeline'
  | 'network_graph'
  | 'heatmap'
  | 'list'
  | 'grid'
  | 'kanban';

export type InteractionPattern =
  | 'tap'
  | 'long_press'
  | 'swipe'
  | 'drag'
  | 'voice_command'
  | 'text_input';

// ============================================================================
// KNOWLEDGE GRAPH
// ============================================================================

export interface KnowledgeConnection {
  id: string;
  domainAId: string;
  domainBId: string;

  connectionType: ConnectionType;
  strength: number; // 0-100, how strong is this connection?

  // Insights
  insights: string[];
  transferableSkills: string[];
  combinationOpportunities: string[];
  synergies: string[];

  // Discovery
  discoveredAt: Date;
  discoveryMethod: 'user_identified' | 'ai_suggested' | 'pattern_detected';
  lastReinforcedAt?: Date;
  reinforcementCount: number;

  // Career implications
  careerOpportunities?: string[];
  marketDifferentiation?: string;
}

export type ConnectionType =
  | 'skill_transfer'      // Direct skill from A applies to B
  | 'conceptual_overlap'  // Similar mental models/patterns
  | 'tool_sharing'        // Same tools/software used
  | 'community_overlap'   // Same people/platforms/culture
  | 'creative_fusion'     // Could combine into new thing
  | 'career_synergy'      // Professional opportunities
  | 'methodology_match'   // Similar problem-solving approaches
  | 'aesthetic_harmony';  // Similar design/artistic sensibilities

// ============================================================================
// WORKFLOWS & AUTOMATION
// ============================================================================

export interface Workflow {
  id: string;
  name: string;
  description: string;

  applicableDomains: string[];
  applicablePhases: LifecyclePhase[];

  trigger: WorkflowTrigger;
  steps: WorkflowStep[];

  enabled: boolean;
  executionCount: number;
  averageDuration: number; // in seconds
  successRate: number; // 0-100
}

export interface WorkflowTrigger {
  type: 'voice_command' | 'schedule' | 'event' | 'condition' | 'manual';
  config: Record<string, any>;
}

export interface WorkflowStep {
  id: string;
  order: number;
  action: WorkflowAction;
  parameters: Record<string, any>;
  conditionalLogic?: {
    condition: string;
    truePath?: string; // next step ID
    falsePath?: string; // next step ID
  };
}

export type WorkflowAction =
  | 'create_calendar_event'
  | 'update_notion_page'
  | 'send_notification'
  | 'log_data'
  | 'trigger_integration'
  | 'run_ai_analysis'
  | 'wait_for_input'
  | 'branch_conditional';

// ============================================================================
// INTEGRATIONS
// ============================================================================

export interface IntegrationSuggestion {
  id: string;
  name: string;
  type: 'api' | 'webhook' | 'oauth' | 'zapier' | 'native';

  applicableDomains: string[];
  useCase: string;
  benefits: string[];

  priority: number; // 0-100
  setupComplexity: 'easy' | 'moderate' | 'complex';
  estimatedSetupTime: number; // in minutes

  requiresSubscription: boolean;
  cost?: {
    amount: number;
    currency: string;
    billingCycle: string;
  };

  status: 'suggested' | 'exploring' | 'connected' | 'paused' | 'disconnected';
  connectedAt?: Date;
}

export interface Integration {
  id: string;
  suggestionId: string;
  name: string;
  type: string;

  credentials: Record<string, any>; // Encrypted
  config: Record<string, any>;

  connected: boolean;
  lastSynced?: Date;
  syncFrequency?: string;

  usageStats: {
    apiCallsThisMonth: number;
    dataPointsSynced: number;
    errors: number;
  };
}

// ============================================================================
// NEXT STEPS & RECOMMENDATIONS
// ============================================================================

export interface NextStep {
  id: string;
  domainId: string;

  type: 'learning' | 'practice' | 'creation' | 'social' | 'administrative';
  title: string;
  description: string;

  priority: 'critical' | 'high' | 'medium' | 'low';
  estimatedTime: number; // in minutes
  estimatedCost?: number;

  reasoning: string; // Why is the AI suggesting this?
  expectedBenefit: string;

  status: 'suggested' | 'accepted' | 'in_progress' | 'completed' | 'dismissed';
  dismissedReason?: string;

  createdAt: Date;
  completedAt?: Date;
}

// ============================================================================
// DOMAIN DETECTION & ONBOARDING
// ============================================================================

export interface DomainDetectionSignal {
  type: DetectionSignalType;
  content: string;
  confidence: number; // 0-100
  detectedAt: Date;
  source: string;
}

export type DetectionSignalType =
  | 'explicit_statement'     // "I'm obsessed with pottery"
  | 'calendar_pattern'       // New recurring activities
  | 'research_pattern'       // Deep dive into unfamiliar topic
  | 'purchase_history'       // Buying tools/courses
  | 'community_joining'      // Following experts, joining groups
  | 'time_allocation'        // Spending unusual amounts of time
  | 'voice_command_theme'    // Repeated commands about same topic
  | 'project_creation';      // Starting projects in new domain

export interface OnboardingSession {
  id: string;
  domainId: string;
  startedAt: Date;
  completedAt?: Date;

  stage: 'detection' | 'classification' | 'assessment' | 'setup' | 'completed';

  responses: OnboardingResponse[];
  confidence: number; // 0-100, how confident are we in the setup?
}

export interface OnboardingResponse {
  question: string;
  answer: string;
  metadata?: Record<string, any>;
}

// ============================================================================
// USER PROFILE & PREFERENCES
// ============================================================================

export interface UserProfile {
  id: string;

  // Personal
  name?: string;
  timezone: string;
  locale: string;

  // Patterns
  cognitiveProfile: {
    attentionSpan: 'short' | 'medium' | 'long' | 'variable';
    energyPattern: 'morning_person' | 'night_owl' | 'afternoon_peak' | 'variable';
    learningStyle: ('visual' | 'auditory' | 'kinesthetic' | 'reading')[];
    focusMode: 'pomodoro' | 'hyperfocus' | 'flexible';
  };

  // Preferences
  preferences: {
    voiceCommandsEnabled: boolean;
    notificationsEnabled: boolean;
    celebrationStyle: 'minimal' | 'moderate' | 'maximal';
    privacyLevel: 'open' | 'selective' | 'private';
    gamificationEnabled: boolean;
  };

  // All domains
  domains: HyperfixationDomain[];
  activeDomainIds: string[];
  archivedDomainIds: string[];

  // Stats
  stats: {
    totalDomainsExplored: number;
    totalHoursTracked: number;
    longestStreakDays: number;
    currentStreakDays: number;
  };
}

// ============================================================================
// EXPORT ALL
// ============================================================================

export type {
  // Re-export existing types from index.ts
  VoiceCommand,
  FocusSession,
  Achievement,
} from './index';
