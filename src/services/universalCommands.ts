/**
 * 🎤 UNIVERSAL COMMAND PATTERN SYSTEM
 * Voice commands that adapt to ANY domain dynamically
 */

import type {
  UniversalCommand,
  CommandPattern,
  CommandIntent,
  CommandActionType,
  CommandParameter,
  CommandExecution,
  HyperfixationDomain,
  LifecyclePhase,
} from '../../types/hyperfixation';

// ============================================================================
// COMMAND PATTERN DEFINITIONS
// ============================================================================

export interface CommandPatternDefinition {
  pattern: CommandPattern;
  intent: CommandIntent;
  actionType: CommandActionType;
  parameters: CommandParameter[];
  regex: RegExp[];
  examples: (domainName: string) => string[];
  applicablePhases?: LifecyclePhase[];
}

/**
 * Universal command patterns that adapt to current domain context
 */
export const COMMAND_PATTERNS: CommandPatternDefinition[] = [
  // ============================================================================
  // RESEARCH & LEARNING COMMANDS
  // ============================================================================
  {
    pattern: 'research',
    intent: 'resource_research',
    actionType: 'research_task',
    parameters: [
      { name: 'topic', type: 'string', required: true },
      { name: 'duration', type: 'duration', required: false, defaultValue: '1 hour' },
    ],
    regex: [
      /research\s+(.+?)\s+for\s+(\d+\s+(?:hour|minute)s?)/i,
      /research\s+(.+)/i,
      /look into\s+(.+)/i,
      /study\s+(.+)/i,
    ],
    examples: (domain) => [
      `Research ${domain} techniques for 2 hours`,
      `Research best tools for ${domain}`,
      `Look into ${domain} communities`,
    ],
    applicablePhases: ['discovery', 'deep_dive', 'mastery'],
  },

  {
    pattern: 'learn',
    intent: 'skill_acquisition',
    actionType: 'research_task',
    parameters: [
      { name: 'skill', type: 'string', required: true },
      { name: 'resource', type: 'string', required: false },
    ],
    regex: [
      /learn\s+(.+?)\s+using\s+(.+)/i,
      /learn\s+(.+)/i,
      /how to\s+(.+)/i,
    ],
    examples: (domain) => [
      `Learn ${domain} basics`,
      `Learn advanced ${domain} techniques using YouTube`,
      `How to get started with ${domain}`,
    ],
    applicablePhases: ['discovery', 'deep_dive'],
  },

  // ============================================================================
  // PRACTICE & CREATION COMMANDS
  // ============================================================================
  {
    pattern: 'practice',
    intent: 'skill_acquisition',
    actionType: 'calendar_event',
    parameters: [
      { name: 'skill', type: 'string', required: true },
      { name: 'duration', type: 'duration', required: false, defaultValue: '1 hour' },
      { name: 'when', type: 'time', required: false, defaultValue: 'tomorrow' },
    ],
    regex: [
      /(?:block|schedule)\s+(?:practice\s+)?time\s+for\s+(.+)/i,
      /practice\s+(.+?)\s+for\s+(\d+\s+(?:hour|minute)s?)/i,
      /practice\s+(.+)/i,
    ],
    examples: (domain) => [
      `Block practice time for ${domain}`,
      `Practice ${domain} for 2 hours tomorrow`,
      `Schedule ${domain} session`,
    ],
    applicablePhases: ['deep_dive', 'mastery'],
  },

  {
    pattern: 'create',
    intent: 'workflow_optimization',
    actionType: 'workflow_start',
    parameters: [
      { name: 'projectType', type: 'string', required: true },
      { name: 'details', type: 'string', required: false },
    ],
    regex: [
      /start\s+(?:new\s+)?(.+?)\s+project/i,
      /create\s+(?:new\s+)?(.+)/i,
      /begin\s+(.+)/i,
    ],
    examples: (domain) => [
      `Start new ${domain} project`,
      `Create ${domain} piece`,
      `Begin ${domain} experiment`,
    ],
    applicablePhases: ['deep_dive', 'mastery', 'integration'],
  },

  {
    pattern: 'experiment',
    intent: 'skill_acquisition',
    actionType: 'data_log',
    parameters: [
      { name: 'what', type: 'string', required: true },
      { name: 'materials', type: 'string', required: false },
    ],
    regex: [
      /experiment with\s+(.+)/i,
      /try\s+(.+)/i,
      /test\s+(.+)/i,
    ],
    examples: (domain) => [
      `Experiment with new ${domain} techniques`,
      `Try different ${domain} approaches`,
      `Test ${domain} variations`,
    ],
    applicablePhases: ['deep_dive', 'mastery'],
  },

  // ============================================================================
  // TRACKING & DOCUMENTATION COMMANDS
  // ============================================================================
  {
    pattern: 'track',
    intent: 'progress_tracking',
    actionType: 'data_log',
    parameters: [
      { name: 'what', type: 'string', required: true },
      { name: 'metric', type: 'string', required: false },
    ],
    regex: [
      /track\s+(?:progress on\s+)?(.+)/i,
      /log\s+(.+)/i,
      /record\s+(.+)/i,
    ],
    examples: (domain) => [
      `Track progress on ${domain} skills`,
      `Log today's ${domain} session`,
      `Record ${domain} improvements`,
    ],
    applicablePhases: ['deep_dive', 'mastery'],
  },

  {
    pattern: 'document',
    intent: 'knowledge_capture',
    actionType: 'notion_update',
    parameters: [
      { name: 'activity', type: 'string', required: true },
      { name: 'details', type: 'string', required: false },
    ],
    regex: [
      /document\s+(?:today's\s+)?(.+?)\s+session/i,
      /document\s+(.+)/i,
      /write about\s+(.+)/i,
    ],
    examples: (domain) => [
      `Document today's ${domain} session`,
      `Document ${domain} learnings`,
      `Write about ${domain} progress`,
    ],
    applicablePhases: ['deep_dive', 'mastery', 'transition'],
  },

  {
    pattern: 'reflect',
    intent: 'knowledge_capture',
    actionType: 'ai_analysis',
    parameters: [
      { name: 'timeframe', type: 'string', required: false, defaultValue: 'this week' },
      { name: 'aspect', type: 'string', required: false },
    ],
    regex: [
      /reflect on\s+(.+)/i,
      /review\s+(?:my\s+)?(.+)/i,
      /analyze\s+(?:my\s+)?(.+)/i,
    ],
    examples: (domain) => [
      `Reflect on my ${domain} progress this week`,
      `Review ${domain} journey`,
      `Analyze ${domain} improvements`,
    ],
    applicablePhases: ['mastery', 'transition'],
  },

  // ============================================================================
  // SCHEDULING & PLANNING COMMANDS
  // ============================================================================
  {
    pattern: 'schedule',
    intent: 'time_blocking',
    actionType: 'calendar_event',
    parameters: [
      { name: 'activity', type: 'string', required: true },
      { name: 'when', type: 'time', required: true },
      { name: 'duration', type: 'duration', required: false, defaultValue: '1 hour' },
    ],
    regex: [
      /schedule\s+(.+?)\s+(?:for|at)\s+(.+)/i,
      /schedule\s+(.+)/i,
    ],
    examples: (domain) => [
      `Schedule ${domain} session for tomorrow at 3pm`,
      `Schedule ${domain} practice`,
    ],
    applicablePhases: ['deep_dive', 'mastery'],
  },

  {
    pattern: 'block',
    intent: 'time_blocking',
    actionType: 'calendar_event',
    parameters: [
      { name: 'duration', type: 'duration', required: true },
      { name: 'activity', type: 'string', required: true },
      { name: 'when', type: 'time', required: false, defaultValue: 'today' },
    ],
    regex: [
      /block\s+(\d+\s+(?:hour|minute)s?)\s+(?:for\s+)?(.+)/i,
    ],
    examples: (domain) => [
      `Block 3 hours for ${domain}`,
      `Block 2 hours for ${domain} tomorrow`,
    ],
    applicablePhases: ['deep_dive', 'mastery'],
  },

  {
    pattern: 'plan',
    intent: 'workflow_optimization',
    actionType: 'ai_analysis',
    parameters: [
      { name: 'timeframe', type: 'string', required: true },
      { name: 'focus', type: 'string', required: false },
    ],
    regex: [
      /plan\s+(?:next\s+)?(.+?)\s+for\s+(.+)/i,
      /plan\s+(?:my\s+)?(.+)/i,
    ],
    examples: (domain) => [
      `Plan next week for ${domain}`,
      `Plan my ${domain} learning path`,
    ],
    applicablePhases: ['deep_dive', 'mastery'],
  },

  // ============================================================================
  // SOCIAL & COMMUNITY COMMANDS
  // ============================================================================
  {
    pattern: 'connect',
    intent: 'community_building',
    actionType: 'research_task',
    parameters: [
      { name: 'who', type: 'string', required: true },
      { name: 'where', type: 'string', required: false },
    ],
    regex: [
      /(?:find|connect with|discover)\s+(?:experts in|people doing)\s+(.+)/i,
      /find\s+(.+?)\s+(?:community|communities)/i,
    ],
    examples: (domain) => [
      `Find experts in ${domain}`,
      `Connect with ${domain} community`,
      `Discover ${domain} mentors`,
    ],
    applicablePhases: ['discovery', 'deep_dive', 'mastery'],
  },

  {
    pattern: 'share',
    intent: 'knowledge_capture',
    actionType: 'integration_trigger',
    parameters: [
      { name: 'what', type: 'string', required: true },
      { name: 'platform', type: 'string', required: false },
    ],
    regex: [
      /share\s+(.+?)\s+on\s+(.+)/i,
      /share\s+(.+)/i,
      /post\s+(?:about\s+)?(.+)/i,
    ],
    examples: (domain) => [
      `Share ${domain} progress on Instagram`,
      `Share ${domain} learnings`,
      `Post about ${domain} project`,
    ],
    applicablePhases: ['mastery', 'integration'],
  },

  {
    pattern: 'teach',
    intent: 'knowledge_capture',
    actionType: 'workflow_start',
    parameters: [
      { name: 'skill', type: 'string', required: true },
      { name: 'format', type: 'string', required: false },
    ],
    regex: [
      /(?:teach|create tutorial for)\s+(.+)/i,
      /explain\s+(.+)/i,
    ],
    examples: (domain) => [
      `Create tutorial for ${domain} basics`,
      `Teach ${domain} to beginners`,
    ],
    applicablePhases: ['mastery'],
  },

  // ============================================================================
  // RESOURCE MANAGEMENT COMMANDS
  // ============================================================================
  {
    pattern: 'compare',
    intent: 'resource_research',
    actionType: 'research_task',
    parameters: [
      { name: 'itemA', type: 'string', required: true },
      { name: 'itemB', type: 'string', required: true },
      { name: 'criteria', type: 'string', required: false },
    ],
    regex: [
      /compare\s+(.+?)\s+(?:vs|versus|and)\s+(.+)/i,
    ],
    examples: (domain) => [
      `Compare ${domain} tool A vs tool B`,
      `Compare ${domain} courses`,
    ],
    applicablePhases: ['discovery', 'deep_dive'],
  },

  {
    pattern: 'budget',
    intent: 'tool_management',
    actionType: 'data_log',
    parameters: [
      { name: 'category', type: 'string', required: true },
      { name: 'amount', type: 'number', required: false },
    ],
    regex: [
      /budget\s+(?:for\s+)?(.+)/i,
      /track spending on\s+(.+)/i,
    ],
    examples: (domain) => [
      `Budget for ${domain} equipment`,
      `Track spending on ${domain}`,
    ],
    applicablePhases: ['discovery', 'deep_dive'],
  },

  // ============================================================================
  // TRANSITION & CONNECTION COMMANDS
  // ============================================================================
  {
    pattern: 'transition',
    intent: 'transition_management',
    actionType: 'workflow_start',
    parameters: [
      { name: 'oldDomain', type: 'domain', required: true },
      { name: 'newDomain', type: 'domain', required: true },
    ],
    regex: [
      /(?:archive|transition from)\s+(.+?)\s+(?:and start|to)\s+(.+)/i,
    ],
    examples: (domain) => [
      `Archive old interest and start ${domain}`,
      `Transition to ${domain}`,
    ],
    applicablePhases: ['transition'],
  },

  {
    pattern: 'bridge',
    intent: 'cross_domain_connection',
    actionType: 'ai_analysis',
    parameters: [
      { name: 'domainA', type: 'domain', required: true },
      { name: 'domainB', type: 'domain', required: true },
    ],
    regex: [
      /(?:find connections|bridge)\s+between\s+(.+?)\s+and\s+(.+)/i,
      /combine\s+(.+?)\s+and\s+(.+)/i,
    ],
    examples: (domain) => [
      `Find connections between ${domain} and coding`,
      `Bridge ${domain} and previous interests`,
    ],
    applicablePhases: ['mastery', 'integration'],
  },

  {
    pattern: 'archive',
    intent: 'transition_management',
    actionType: 'workflow_start',
    parameters: [
      { name: 'domain', type: 'domain', required: true },
      { name: 'preserveWhat', type: 'string', required: false },
    ],
    regex: [
      /archive\s+(.+)/i,
      /preserve\s+(?:knowledge from\s+)?(.+)/i,
    ],
    examples: (domain) => [
      `Archive ${domain} and preserve knowledge`,
      `Preserve ${domain} learnings`,
    ],
    applicablePhases: ['transition'],
  },

  // ============================================================================
  // ANALYSIS & INSIGHTS COMMANDS
  // ============================================================================
  {
    pattern: 'analyze',
    intent: 'workflow_optimization',
    actionType: 'ai_analysis',
    parameters: [
      { name: 'what', type: 'string', required: true },
      { name: 'aspect', type: 'string', required: false },
    ],
    regex: [
      /analyze\s+(?:my\s+)?(.+)/i,
      /show\s+(?:me\s+)?(?:my\s+)?(.+?)\s+(?:stats|analytics)/i,
    ],
    examples: (domain) => [
      `Analyze my ${domain} progress`,
      `Show my ${domain} stats`,
    ],
    applicablePhases: ['deep_dive', 'mastery'],
  },

  {
    pattern: 'predict',
    intent: 'workflow_optimization',
    actionType: 'ai_analysis',
    parameters: [
      { name: 'goal', type: 'string', required: true },
    ],
    regex: [
      /when will I (?:reach|achieve)\s+(.+)/i,
      /predict\s+(.+)/i,
    ],
    examples: (domain) => [
      `When will I reach ${domain} mastery?`,
      `Predict ${domain} progress`,
    ],
    applicablePhases: ['deep_dive', 'mastery'],
  },

  {
    pattern: 'recommend',
    intent: 'resource_research',
    actionType: 'ai_analysis',
    parameters: [
      { name: 'for', type: 'string', required: true },
    ],
    regex: [
      /recommend\s+(?:next steps for\s+)?(.+)/i,
      /what should I (?:do|learn)\s+(?:next|for)\s+(.+)/i,
    ],
    examples: (domain) => [
      `Recommend next steps for ${domain}`,
      `What should I learn next in ${domain}?`,
    ],
    applicablePhases: ['discovery', 'deep_dive', 'mastery'],
  },
];

// ============================================================================
// COMMAND PARSING & EXECUTION
// ============================================================================

export interface ParsedCommand {
  pattern: CommandPattern;
  intent: CommandIntent;
  actionType: CommandActionType;
  parameters: Record<string, any>;
  confidence: number; // 0-100
  rawInput: string;
  contextDomain?: HyperfixationDomain;
}

/**
 * Parse natural language input into structured command
 */
export function parseCommand(
  input: string,
  currentDomain?: HyperfixationDomain
): ParsedCommand | null {
  const inputLower = input.toLowerCase().trim();

  // Try each command pattern
  for (const patternDef of COMMAND_PATTERNS) {
    for (const regex of patternDef.regex) {
      const match = inputLower.match(regex);

      if (match) {
        // Extract parameters from regex groups
        const parameters: Record<string, any> = {};
        const paramDefs = patternDef.parameters;

        // Map regex capture groups to parameter names
        for (let i = 0; i < paramDefs.length && i < match.length - 1; i++) {
          const paramDef = paramDefs[i];
          const capturedValue = match[i + 1];

          if (capturedValue) {
            parameters[paramDef.name] = parseParameterValue(capturedValue, paramDef.type);
          } else if (paramDef.defaultValue !== undefined) {
            parameters[paramDef.name] = paramDef.defaultValue;
          }
        }

        // Inject current domain context if applicable
        if (currentDomain) {
          parameters.domainId = currentDomain.id;
          parameters.domainName = currentDomain.name;
        }

        return {
          pattern: patternDef.pattern,
          intent: patternDef.intent,
          actionType: patternDef.actionType,
          parameters,
          confidence: 85,
          rawInput: input,
          contextDomain: currentDomain,
        };
      }
    }
  }

  return null;
}

/**
 * Generate example commands for current domain
 */
export function generateExamplesForDomain(domain: HyperfixationDomain): string[] {
  const examples: string[] = [];

  // Get patterns relevant to current lifecycle phase
  const relevantPatterns = COMMAND_PATTERNS.filter((p) => {
    if (!p.applicablePhases) return true;
    return p.applicablePhases.includes(domain.currentPhase);
  });

  // Generate 2-3 examples per pattern
  relevantPatterns.slice(0, 8).forEach((pattern) => {
    const patternExamples = pattern.examples(domain.name);
    examples.push(...patternExamples.slice(0, 2));
  });

  return examples;
}

/**
 * Execute parsed command
 */
export async function executeCommand(
  parsedCommand: ParsedCommand
): Promise<CommandExecution> {
  const startTime = Date.now();

  try {
    let result: 'success' | 'partial' | 'failed' = 'success';
    let error: string | undefined;

    // Execute based on action type
    switch (parsedCommand.actionType) {
      case 'calendar_event':
        await createCalendarEvent(parsedCommand.parameters);
        break;

      case 'notion_update':
        await updateNotionPage(parsedCommand.parameters);
        break;

      case 'research_task':
        await createResearchTask(parsedCommand.parameters);
        break;

      case 'data_log':
        await logData(parsedCommand.parameters);
        break;

      case 'integration_trigger':
        await triggerIntegration(parsedCommand.parameters);
        break;

      case 'ai_analysis':
        await runAIAnalysis(parsedCommand.parameters);
        break;

      case 'workflow_start':
        await startWorkflow(parsedCommand.parameters);
        break;

      default:
        result = 'failed';
        error = `Unsupported action type: ${parsedCommand.actionType}`;
    }

    return {
      id: generateId(),
      commandId: '', // Will be set when saving to DB
      executedAt: new Date(),
      rawInput: parsedCommand.rawInput,
      parsedParameters: parsedCommand.parameters,
      result,
      error,
      durationMs: Date.now() - startTime,
    };
  } catch (err) {
    return {
      id: generateId(),
      commandId: '',
      executedAt: new Date(),
      rawInput: parsedCommand.rawInput,
      parsedParameters: parsedCommand.parameters,
      result: 'failed',
      error: err instanceof Error ? err.message : String(err),
      durationMs: Date.now() - startTime,
    };
  }
}

// ============================================================================
// ACTION IMPLEMENTATIONS (Placeholders)
// ============================================================================

async function createCalendarEvent(params: Record<string, any>): Promise<void> {
  console.log('Creating calendar event:', params);
  // TODO: Integrate with Google Calendar / Apple Calendar
}

async function updateNotionPage(params: Record<string, any>): Promise<void> {
  console.log('Updating Notion page:', params);
  // TODO: Integrate with Notion API
}

async function createResearchTask(params: Record<string, any>): Promise<void> {
  console.log('Creating research task:', params);
  // TODO: Create structured research task
}

async function logData(params: Record<string, any>): Promise<void> {
  console.log('Logging data:', params);
  // TODO: Save to database
}

async function triggerIntegration(params: Record<string, any>): Promise<void> {
  console.log('Triggering integration:', params);
  // TODO: Trigger external integration (Instagram, Twitter, etc.)
}

async function runAIAnalysis(params: Record<string, any>): Promise<void> {
  console.log('Running AI analysis:', params);
  // TODO: Call Claude API for analysis
}

async function startWorkflow(params: Record<string, any>): Promise<void> {
  console.log('Starting workflow:', params);
  // TODO: Execute workflow steps
}

// ============================================================================
// HELPERS
// ============================================================================

function parseParameterValue(value: string, type: string): any {
  switch (type) {
    case 'number':
      return parseFloat(value);
    case 'duration':
      return parseDuration(value);
    case 'time':
      return parseTime(value);
    case 'date':
      return new Date(value);
    default:
      return value;
  }
}

function parseDuration(str: string): number {
  const match = str.match(/(\d+)\s*(hour|minute)s?/i);
  if (!match) return 60; // default 1 hour in minutes

  const value = parseInt(match[1]);
  const unit = match[2].toLowerCase();

  return unit.startsWith('hour') ? value * 60 : value;
}

function parseTime(str: string): Date {
  // Simplified - in production, use proper date parsing library
  if (str.includes('tomorrow')) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  }
  return new Date();
}

function generateId(): string {
  return `cmd_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
