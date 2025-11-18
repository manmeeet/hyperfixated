/**
 * 🤖 HYPERFOCUS AI - MULTI-AGENT COORDINATION PROTOCOL
 *
 * This file defines the type-safe communication protocol for the 10-agent ecosystem
 * that maintains code quality, design consistency, and feature coherence.
 */

// ============================================================================
// AGENT IDENTIFIERS
// ============================================================================

export type AgentName =
  | 'pixel'       // UI/UX Design System Guardian
  | 'framework'   // Code Architecture & System Design
  | 'synapse'     // AI Integration & Voice Commands
  | 'bridge'      // External API Integration
  | 'responsive'  // Mobile Experience & Performance
  | 'dopamine'    // Gamification & Engagement
  | 'quality'     // Testing & QA
  | 'insight'     // Analytics & Optimization
  | 'vault'       // Security & Privacy
  | 'ship';       // Deployment & DevOps

export type AgentStatus =
  | 'idle'
  | 'reviewing'
  | 'approved'
  | 'needs_revision'
  | 'blocked';

// ============================================================================
// FEATURE CONTEXT
// ============================================================================

export interface FeatureContext {
  /** Unique identifier for the feature */
  featureId: string;

  /** Human-readable feature name */
  name: string;

  /** Feature description and purpose */
  description: string;

  /** Type of work being done */
  type: 'new_feature' | 'enhancement' | 'bug_fix' | 'refactor' | 'optimization';

  /** Which hyperfixation domain this belongs to */
  domain?: string; // e.g., 'trading', 'writing', 'coding', 'music'

  /** Files involved in this feature */
  affectedFiles: string[];

  /** Components that will be created or modified */
  components: string[];

  /** API integrations involved */
  apiIntegrations?: string[];

  /** Design system elements used */
  designElements?: {
    colors?: string[];
    typography?: string[];
    spacing?: string[];
    components?: string[];
  };

  /** Feature flags or toggles */
  featureFlags?: string[];

  /** Target platforms */
  platforms: ('ios' | 'android' | 'web')[];

  /** Priority level */
  priority: 'critical' | 'high' | 'medium' | 'low';

  /** Estimated complexity */
  complexity: 'simple' | 'moderate' | 'complex' | 'epic';

  /** Timeline information */
  timeline: {
    estimatedHours: number;
    deadline?: string;
    startDate: string;
  };
}

// ============================================================================
// REQUIREMENTS & CONSTRAINTS
// ============================================================================

export interface Requirement {
  /** Unique requirement ID */
  id: string;

  /** Which agent raised this requirement */
  source: AgentName;

  /** Requirement type */
  type: 'functional' | 'non_functional' | 'technical' | 'design' | 'security';

  /** Requirement description */
  description: string;

  /** Must-have or nice-to-have */
  priority: 'required' | 'recommended' | 'optional';

  /** Acceptance criteria */
  acceptanceCriteria: string[];

  /** Related files or components */
  relatedTo?: string[];
}

export interface Constraint {
  /** Constraint type */
  type: 'technical' | 'design' | 'performance' | 'security' | 'timeline';

  /** Constraint description */
  description: string;

  /** Why this constraint exists */
  rationale: string;

  /** Impact if violated */
  impact: 'blocking' | 'high' | 'medium' | 'low';
}

export interface Dependency {
  /** What this depends on */
  target: string;

  /** Type of dependency */
  type: 'feature' | 'component' | 'api' | 'library' | 'agent_review';

  /** Is this a blocking dependency */
  blocking: boolean;

  /** Current status */
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
}

// ============================================================================
// AGENT REVIEW & FEEDBACK
// ============================================================================

export interface DetailedFeedback {
  /** Feedback severity */
  severity: 'critical' | 'warning' | 'info' | 'suggestion';

  /** Feedback category */
  category: string; // e.g., 'accessibility', 'performance', 'security'

  /** The feedback message */
  message: string;

  /** Specific location (file:line) */
  location?: string;

  /** Code snippet if applicable */
  codeSnippet?: string;

  /** Suggested fix */
  suggestion?: string;

  /** Reference documentation */
  references?: string[];
}

export interface ActionItem {
  /** Action description */
  description: string;

  /** Who should do this */
  assignedTo: 'developer' | AgentName;

  /** Action priority */
  priority: 'immediate' | 'high' | 'medium' | 'low';

  /** Estimated effort */
  effort: 'minutes' | 'hours' | 'days';

  /** Dependencies before this can be done */
  dependencies?: string[];
}

export interface FeatureReview {
  /** Which agent is reviewing */
  agent: AgentName;

  /** Review status */
  status: AgentStatus;

  /** Review timestamp */
  timestamp: string;

  /** Detailed feedback items */
  feedback: DetailedFeedback[];

  /** Action items for next steps */
  nextSteps: ActionItem[];

  /** Estimated time to address feedback */
  estimatedTime?: {
    value: number;
    unit: 'minutes' | 'hours' | 'days';
  };

  /** Overall score (optional) */
  score?: {
    value: number;
    max: number;
    breakdown?: Record<string, number>;
  };

  /** Additional notes */
  notes?: string;
}

// ============================================================================
// AGENT HANDOFF
// ============================================================================

export interface AgentHandoff {
  /** Handoff unique ID */
  handoffId: string;

  /** Which agent is handing off */
  from: AgentName;

  /** Which agent is receiving */
  to: AgentName;

  /** Feature context */
  context: FeatureContext;

  /** Requirements from previous agent */
  requirements: Requirement[];

  /** Constraints to be aware of */
  constraints: Constraint[];

  /** Dependencies to track */
  dependencies: Dependency[];

  /** Previous agent's review */
  previousReview?: FeatureReview;

  /** Handoff timestamp */
  timestamp: string;

  /** Priority for receiving agent */
  priority: 'urgent' | 'high' | 'normal' | 'low';

  /** Any specific instructions */
  instructions?: string;
}

// ============================================================================
// WORKFLOW COORDINATION
// ============================================================================

export interface WorkflowStage {
  /** Stage name */
  name: string;

  /** Agents involved in this stage */
  agents: AgentName[];

  /** Can agents work in parallel */
  parallel: boolean;

  /** Stage dependencies */
  dependsOn?: string[];

  /** Stage status */
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
}

export interface FeatureWorkflow {
  /** Workflow ID */
  workflowId: string;

  /** Feature being worked on */
  feature: FeatureContext;

  /** Workflow stages */
  stages: WorkflowStage[];

  /** Current stage */
  currentStage: string;

  /** All handoffs in this workflow */
  handoffs: AgentHandoff[];

  /** All reviews collected */
  reviews: FeatureReview[];

  /** Overall workflow status */
  status: 'planning' | 'in_progress' | 'review' | 'completed' | 'blocked';

  /** Started timestamp */
  startedAt: string;

  /** Completed timestamp */
  completedAt?: string;

  /** Blocking issues */
  blockers?: {
    agent: AgentName;
    issue: string;
    severity: 'critical' | 'high' | 'medium';
  }[];
}

// ============================================================================
// AGENT CAPABILITIES
// ============================================================================

export interface AgentCapabilities {
  /** Agent identifier */
  agent: AgentName;

  /** Agent display name */
  displayName: string;

  /** Agent role description */
  role: string;

  /** Primary responsibilities */
  responsibilities: string[];

  /** Specialized knowledge areas */
  specializations: string[];

  /** Review triggers */
  triggers: {
    filePatterns?: string[];
    keywords?: string[];
    featureTypes?: FeatureContext['type'][];
    always?: boolean;
  };

  /** Tools and integrations */
  tools: string[];

  /** Typical review time */
  typicalReviewTime: {
    simple: number;   // minutes
    moderate: number;
    complex: number;
    epic: number;
  };
}

// ============================================================================
// CHECKLIST TEMPLATES
// ============================================================================

export interface ChecklistItem {
  /** Item ID */
  id: string;

  /** Item description */
  description: string;

  /** Is this required or optional */
  required: boolean;

  /** Item category */
  category: string;

  /** Completion status */
  completed: boolean;

  /** Who verified this */
  verifiedBy?: AgentName;

  /** Related files or components */
  relatedTo?: string[];

  /** Documentation links */
  references?: string[];
}

export interface AgentChecklist {
  /** Which agent this checklist is for */
  agent: AgentName;

  /** Checklist name */
  name: string;

  /** When to use this checklist */
  applicableFor: FeatureContext['type'][];

  /** Checklist items */
  items: ChecklistItem[];

  /** Overall completion percentage */
  completionPercentage: number;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Create a new feature context
 */
export function createFeatureContext(
  name: string,
  description: string,
  type: FeatureContext['type']
): FeatureContext {
  return {
    featureId: `feat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    name,
    description,
    type,
    affectedFiles: [],
    components: [],
    platforms: ['ios', 'android', 'web'],
    priority: 'medium',
    complexity: 'moderate',
    timeline: {
      estimatedHours: 8,
      startDate: new Date().toISOString(),
    },
  };
}

/**
 * Create a new agent handoff
 */
export function createHandoff(
  from: AgentName,
  to: AgentName,
  context: FeatureContext,
  requirements: Requirement[] = [],
  constraints: Constraint[] = []
): AgentHandoff {
  return {
    handoffId: `handoff-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    from,
    to,
    context,
    requirements,
    constraints,
    dependencies: [],
    timestamp: new Date().toISOString(),
    priority: 'normal',
  };
}

/**
 * Check if an agent should be triggered for a feature
 */
export function shouldTriggerAgent(
  agent: AgentCapabilities,
  feature: FeatureContext
): boolean {
  if (agent.triggers.always) return true;

  if (agent.triggers.featureTypes?.includes(feature.type)) return true;

  if (agent.triggers.filePatterns) {
    return feature.affectedFiles.some(file =>
      agent.triggers.filePatterns!.some(pattern =>
        new RegExp(pattern).test(file)
      )
    );
  }

  return false;
}

/**
 * Calculate workflow estimated completion time
 */
export function calculateWorkflowTime(
  workflow: FeatureWorkflow,
  agentCapabilities: AgentCapabilities[]
): number {
  const complexity = workflow.feature.complexity;

  return workflow.stages.reduce((total, stage) => {
    const stageTime = stage.agents.reduce((stageTotal, agentName) => {
      const agent = agentCapabilities.find(a => a.agent === agentName);
      if (!agent) return stageTotal;

      const reviewTime = agent.typicalReviewTime[complexity];
      return stage.parallel
        ? Math.max(stageTotal, reviewTime)
        : stageTotal + reviewTime;
    }, 0);

    return total + stageTime;
  }, 0);
}
