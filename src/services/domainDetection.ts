/**
 * 🧠 DOMAIN DETECTION & ONBOARDING SYSTEM
 * Automatically detect new hyperfixations and guide user through setup
 */

import type {
  HyperfixationDomain,
  DomainCategory,
  DetectionSignalType,
  DomainDetectionSignal,
  OnboardingSession,
  OnboardingResponse,
  LifecyclePhase,
} from '../types/hyperfixation';

// ============================================================================
// DETECTION SIGNAL ANALYSIS
// ============================================================================

export interface DetectionResult {
  detected: boolean;
  confidence: number; // 0-100
  suggestedName: string;
  suggestedCategory: DomainCategory;
  signals: DomainDetectionSignal[];
  reasoning: string;
}

/**
 * Analyze user input for explicit hyperfixation statements
 * Examples: "I'm obsessed with pottery", "Just got into crypto trading"
 */
export function detectExplicitStatement(input: string): DetectionResult | null {
  const obsessionPatterns = [
    /(?:i'm|i am|just|really|totally|completely)\s+(?:obsessed with|into|hooked on|fixated on|loving)\s+([a-z\s]+)/i,
    /(?:new|latest|current)\s+(?:obsession|fixation|hobby|interest)(?:\s+is|\s*:)?\s+([a-z\s]+)/i,
    /(?:started|beginning|learning|getting into)\s+([a-z\s]+)(?:\s+recently|\s+lately)?/i,
    /can't stop (?:thinking about|doing|learning about)\s+([a-z\s]+)/i,
  ];

  for (const pattern of obsessionPatterns) {
    const match = input.match(pattern);
    if (match && match[1]) {
      const detectedTopic = match[1].trim();
      const category = inferCategory(detectedTopic);

      return {
        detected: true,
        confidence: 85,
        suggestedName: capitalizeFirstLetter(detectedTopic),
        suggestedCategory: category,
        signals: [
          {
            type: 'explicit_statement',
            content: input,
            confidence: 85,
            detectedAt: new Date(),
            source: 'voice_or_text_input',
          },
        ],
        reasoning: `User explicitly mentioned being obsessed with or getting into "${detectedTopic}"`,
      };
    }
  }

  return null;
}

/**
 * Detect patterns in calendar/time blocking activities
 */
export function detectCalendarPattern(
  events: Array<{ title: string; startTime: Date; duration: number }>
): DetectionResult | null {
  // Look for recurring new activities
  const activityCounts = new Map<string, number>();

  events.forEach((event) => {
    const normalizedTitle = event.title.toLowerCase().trim();
    activityCounts.set(normalizedTitle, (activityCounts.get(normalizedTitle) || 0) + 1);
  });

  // Find activities that appear 3+ times in recent history
  for (const [activity, count] of activityCounts.entries()) {
    if (count >= 3) {
      const category = inferCategory(activity);

      return {
        detected: true,
        confidence: 70,
        suggestedName: capitalizeFirstLetter(activity),
        suggestedCategory: category,
        signals: [
          {
            type: 'calendar_pattern',
            content: `"${activity}" appears ${count} times in calendar`,
            confidence: 70,
            detectedAt: new Date(),
            source: 'calendar_integration',
          },
        ],
        reasoning: `Detected recurring calendar activity: "${activity}" (${count} occurrences)`,
      };
    }
  }

  return null;
}

/**
 * Detect deep research patterns (multiple searches on same topic)
 */
export function detectResearchPattern(
  searches: Array<{ query: string; timestamp: Date }>
): DetectionResult | null {
  // Group searches by topic keywords
  const topicClusters = clusterSearchesByTopic(searches);

  for (const [topic, queries] of topicClusters.entries()) {
    // If 5+ searches on same topic in short time = potential new fixation
    if (queries.length >= 5) {
      const category = inferCategory(topic);

      return {
        detected: true,
        confidence: 75,
        suggestedName: capitalizeFirstLetter(topic),
        suggestedCategory: category,
        signals: [
          {
            type: 'research_pattern',
            content: `${queries.length} searches related to "${topic}"`,
            confidence: 75,
            detectedAt: new Date(),
            source: 'search_history',
          },
        ],
        reasoning: `Intense research detected: ${queries.length} searches about "${topic}"`,
      };
    }
  }

  return null;
}

/**
 * Detect tool/equipment purchases related to new domains
 */
export function detectPurchaseHistory(
  purchases: Array<{ item: string; category: string; price: number; date: Date }>
): DetectionResult | null {
  // Look for purchases in new categories
  const recentPurchases = purchases.filter(
    (p) => Date.now() - p.date.getTime() < 30 * 24 * 60 * 60 * 1000 // last 30 days
  );

  const categorySpending = new Map<string, { total: number; items: string[] }>();

  recentPurchases.forEach((purchase) => {
    const existing = categorySpending.get(purchase.category) || { total: 0, items: [] };
    existing.total += purchase.price;
    existing.items.push(purchase.item);
    categorySpending.set(purchase.category, existing);
  });

  // Significant spending in new category = potential fixation
  for (const [category, data] of categorySpending.entries()) {
    if (data.total > 100 && data.items.length >= 2) {
      const domainCategory = inferCategory(category);

      return {
        detected: true,
        confidence: 80,
        suggestedName: capitalizeFirstLetter(category),
        suggestedCategory: domainCategory,
        signals: [
          {
            type: 'purchase_history',
            content: `$${data.total} spent on ${data.items.length} ${category}-related items`,
            confidence: 80,
            detectedAt: new Date(),
            source: 'purchase_tracking',
          },
        ],
        reasoning: `Significant investment detected: $${data.total} on ${category} (${data.items.join(', ')})`,
      };
    }
  }

  return null;
}

/**
 * Combine multiple signals for higher confidence detection
 */
export function combineSignals(signals: DomainDetectionSignal[]): DetectionResult | null {
  if (signals.length === 0) return null;

  // Group signals by suggested topic
  const topicSignals = new Map<string, DomainDetectionSignal[]>();

  signals.forEach((signal) => {
    // Extract topic from signal content (simplified)
    const topic = extractTopicFromSignal(signal);
    const existing = topicSignals.get(topic) || [];
    existing.push(signal);
    topicSignals.set(topic, existing);
  });

  // Find topic with most signals
  let maxTopic = '';
  let maxSignals: DomainDetectionSignal[] = [];

  for (const [topic, sigs] of topicSignals.entries()) {
    if (sigs.length > maxSignals.length) {
      maxTopic = topic;
      maxSignals = sigs;
    }
  }

  // Multiple signals = higher confidence
  if (maxSignals.length >= 2) {
    const avgConfidence = maxSignals.reduce((sum, s) => sum + s.confidence, 0) / maxSignals.length;
    const combinedConfidence = Math.min(95, avgConfidence + maxSignals.length * 5); // Bonus for multiple signals

    const category = inferCategory(maxTopic);

    return {
      detected: true,
      confidence: combinedConfidence,
      suggestedName: capitalizeFirstLetter(maxTopic),
      suggestedCategory: category,
      signals: maxSignals,
      reasoning: `Multiple signals detected for "${maxTopic}": ${maxSignals.map((s) => s.type).join(', ')}`,
    };
  }

  return null;
}

// ============================================================================
// CATEGORY INFERENCE
// ============================================================================

/**
 * Infer domain category from topic name/keywords
 */
export function inferCategory(topic: string): DomainCategory {
  const topicLower = topic.toLowerCase();

  // Creative domains
  if (
    /pottery|ceramic|painting|drawing|music|art|design|photography|writing|poetry|sculpt/.test(
      topicLower
    )
  ) {
    return 'creative';
  }

  // Technical domains
  if (
    /coding|programming|crypto|trading|data|science|engineering|machine learning|ai|web dev|software/.test(
      topicLower
    )
  ) {
    return 'technical';
  }

  // Physical domains
  if (
    /climb|climbing|dance|dancing|martial arts|yoga|running|cycling|sports|fitness|gym/.test(
      topicLower
    )
  ) {
    return 'physical';
  }

  // Intellectual domains
  if (
    /language|philosophy|history|science|research|reading|literature|psychology|physics|math/.test(
      topicLower
    )
  ) {
    return 'intellectual';
  }

  // Gaming
  if (/gaming|games|speedrun|streaming|esports|video game/.test(topicLower)) {
    return 'gaming';
  }

  // Collecting
  if (/collect|card|sneaker|vinyl|antique|memorabilia/.test(topicLower)) {
    return 'collecting';
  }

  // Entrepreneurial
  if (/business|startup|invest|entrepreneur|side project|hustle/.test(topicLower)) {
    return 'entrepreneurial';
  }

  // Digital creative
  if (/video edit|3d model|animation|graphic design|game dev/.test(topicLower)) {
    return 'digital_creative';
  }

  // Wellness
  if (/meditation|therapy|nutrition|wellness|mental health|mindfulness/.test(topicLower)) {
    return 'wellness';
  }

  // Social
  if (/community|teaching|organizing|networking|mentoring/.test(topicLower)) {
    return 'social';
  }

  // Default to creative if unsure
  return 'creative';
}

// ============================================================================
// ONBOARDING SYSTEM
// ============================================================================

export interface OnboardingQuestion {
  id: string;
  question: string;
  type: 'text' | 'choice' | 'multiselect' | 'scale';
  options?: string[];
  scaleMin?: number;
  scaleMax?: number;
  required: boolean;
}

/**
 * Generate onboarding questions based on detected domain
 */
export function generateOnboardingQuestions(
  detectionResult: DetectionResult
): OnboardingQuestion[] {
  const baseQuestions: OnboardingQuestion[] = [
    {
      id: 'confirm_name',
      question: `We detected you might be interested in "${detectionResult.suggestedName}". Is that right?`,
      type: 'choice',
      options: ['Yes, exactly!', 'Close, but let me adjust it', 'No, not quite'],
      required: true,
    },
    {
      id: 'experience_level',
      question: `What's your experience level with ${detectionResult.suggestedName}?`,
      type: 'choice',
      options: [
        'Complete beginner (just discovered it)',
        'Beginner (trying things out)',
        'Intermediate (actively learning)',
        'Advanced (pretty skilled)',
        'Expert (could teach others)',
      ],
      required: true,
    },
    {
      id: 'what_sparked_interest',
      question: 'What got you interested in this?',
      type: 'text',
      required: false,
    },
    {
      id: 'primary_goal',
      question: `What's your main goal with ${detectionResult.suggestedName}?`,
      type: 'choice',
      options: [
        'Just for fun / hobby',
        'Serious skill development',
        'Professional / career related',
        'Creative expression',
        'Physical / mental wellness',
        'Social / community building',
        'Make money / side income',
        'Still figuring it out',
      ],
      required: true,
    },
    {
      id: 'time_commitment',
      question: 'How much time do you want to dedicate per week?',
      type: 'choice',
      options: [
        '1-2 hours (casual)',
        '3-5 hours (regular)',
        '6-10 hours (serious)',
        '10+ hours (intense)',
        'Flexible / varies',
      ],
      required: true,
    },
    {
      id: 'budget',
      question: 'What's your budget for tools, courses, and materials?',
      type: 'choice',
      options: [
        'Minimal ($0-50/month)',
        'Moderate ($50-200/month)',
        'Significant ($200-500/month)',
        'Substantial ($500+/month)',
        'Not sure yet',
      ],
      required: false,
    },
  ];

  // Add category-specific questions
  const categoryQuestions = getCategorySpecificQuestions(
    detectionResult.suggestedCategory,
    detectionResult.suggestedName
  );

  return [...baseQuestions, ...categoryQuestions];
}

/**
 * Get category-specific onboarding questions
 */
function getCategorySpecificQuestions(
  category: DomainCategory,
  domainName: string
): OnboardingQuestion[] {
  switch (category) {
    case 'creative':
      return [
        {
          id: 'creative_output',
          question: 'Do you want help sharing your work?',
          type: 'choice',
          options: ['Yes, on social media', 'Yes, but privately', 'Not yet', 'No thanks'],
          required: false,
        },
        {
          id: 'creative_tools',
          question: 'Do you already have the tools you need?',
          type: 'choice',
          options: ['Yes, all set', 'Some, but need more', 'No, need to research', 'Not sure'],
          required: false,
        },
      ];

    case 'technical':
      return [
        {
          id: 'technical_project',
          question: 'Do you have a specific project in mind?',
          type: 'choice',
          options: ['Yes, clear goal', 'Have ideas', 'Want to explore first', 'Not yet'],
          required: false,
        },
        {
          id: 'technical_community',
          question: 'Want help finding online communities and resources?',
          type: 'choice',
          options: ['Yes please', 'Maybe later', 'Already connected', 'No thanks'],
          required: false,
        },
      ];

    case 'physical':
      return [
        {
          id: 'physical_location',
          question: 'Where will you practice?',
          type: 'choice',
          options: ['At home', 'Gym/studio', 'Outdoors', 'Multiple locations', 'Not sure yet'],
          required: false,
        },
        {
          id: 'physical_tracking',
          question: 'Want to track progress and improvements?',
          type: 'choice',
          options: ['Yes, detailed tracking', 'Basic tracking', 'Casual logging', 'No tracking'],
          required: false,
        },
      ];

    case 'collecting':
      return [
        {
          id: 'collection_size',
          question: 'How big is your collection so far?',
          type: 'choice',
          options: ['Just starting', '1-10 items', '10-50 items', '50+ items', 'Massive collection'],
          required: false,
        },
        {
          id: 'collection_budget',
          question: 'Want help tracking spending and wishlists?',
          type: 'choice',
          options: ['Yes, budget tracking', 'Just wishlists', 'Both please', 'No thanks'],
          required: false,
        },
      ];

    default:
      return [];
  }
}

/**
 * Process onboarding responses and create initial domain configuration
 */
export function processOnboardingResponses(
  detectionResult: DetectionResult,
  responses: OnboardingResponse[]
): Partial<HyperfixationDomain> {
  const responseMap = new Map(responses.map((r) => [r.question, r.answer]));

  // Determine initial phase based on experience level
  let initialPhase: LifecyclePhase = 'discovery';
  const experienceLevel = responses.find((r) => r.question.includes('experience level'))?.answer;

  if (experienceLevel?.includes('Complete beginner')) {
    initialPhase = 'discovery';
  } else if (experienceLevel?.includes('Intermediate') || experienceLevel?.includes('actively')) {
    initialPhase = 'deep_dive';
  } else if (experienceLevel?.includes('Advanced') || experienceLevel?.includes('Expert')) {
    initialPhase = 'mastery';
  }

  // Determine time patterns from commitment answer
  const timeCommitment = responses.find((r) => r.question.includes('time'))?.answer;
  let weeklyHours = 3; // default

  if (timeCommitment?.includes('1-2')) weeklyHours = 1.5;
  else if (timeCommitment?.includes('3-5')) weeklyHours = 4;
  else if (timeCommitment?.includes('6-10')) weeklyHours = 8;
  else if (timeCommitment?.includes('10+')) weeklyHours = 12;

  // Parse budget
  const budgetAnswer = responses.find((r) => r.question.includes('budget'))?.answer;
  let monthlyBudget = 100; // default

  if (budgetAnswer?.includes('$0-50')) monthlyBudget = 25;
  else if (budgetAnswer?.includes('$50-200')) monthlyBudget = 125;
  else if (budgetAnswer?.includes('$200-500')) monthlyBudget = 350;
  else if (budgetAnswer?.includes('$500+')) monthlyBudget = 750;

  return {
    name: detectionResult.suggestedName,
    category: detectionResult.suggestedCategory,
    status: 'active',
    currentPhase: initialPhase,
    discoveryDate: new Date(),
    lastActiveDate: new Date(),
    intensityScore: 75, // Start high for new fixation
    passionThermometer: {
      current: 80,
      peak: 80,
      trend: 'rising',
    },
    timePatterns: {
      totalHoursInvested: 0,
      averageSessionLength: 60,
      sessionsPerWeek: weeklyHours / 1.5, // rough estimate
      preferredTimeOfDay: [],
      peakProductivityHour: undefined,
    },
    resourceInvestment: {
      monetary: {
        totalSpent: 0,
        currency: 'USD',
        breakdown: {
          tools: 0,
          courses: 0,
          materials: 0,
          subscriptions: 0,
          events: 0,
          other: 0,
        },
      },
      temporal: {
        totalHours: 0,
        activeHours: 0,
        passiveHours: 0,
        weeklyAverage: weeklyHours,
      },
      physical: undefined,
      digital: {
        filesStored: 0,
        storageUsedMB: 0,
        bookmarksCollected: 0,
        notesCreated: 0,
        projectsStarted: 0,
      },
      cognitive: {
        deepWorkHours: 0,
        flowStateFrequency: 0,
        cognitiveLoadRating: 3,
      },
    },
    tags: [detectionResult.suggestedCategory],
    notes: responses.find((r) => r.question.includes('What got you'))?.answer || '',
  };
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function clusterSearchesByTopic(
  searches: Array<{ query: string; timestamp: Date }>
): Map<string, string[]> {
  const clusters = new Map<string, string[]>();

  // Simplified clustering - in production, use better NLP
  searches.forEach((search) => {
    const keywords = search.query.toLowerCase().split(/\s+/);
    const mainKeyword = keywords[0]; // Simplified

    const existing = clusters.get(mainKeyword) || [];
    existing.push(search.query);
    clusters.set(mainKeyword, existing);
  });

  return clusters;
}

function extractTopicFromSignal(signal: DomainDetectionSignal): string {
  // Simplified topic extraction - in production, use NLP
  const words = signal.content.toLowerCase().split(/\s+/);
  return words.find((w) => w.length > 4) || 'unknown';
}

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ============================================================================
// EXAMPLE USAGE
// ============================================================================

/*
// User says: "I'm obsessed with pottery"
const result = detectExplicitStatement("I'm obsessed with pottery");

if (result?.detected) {
  console.log(`Detected new fixation: ${result.suggestedName}`);
  console.log(`Category: ${result.suggestedCategory}`);
  console.log(`Confidence: ${result.confidence}%`);

  // Generate onboarding flow
  const questions = generateOnboardingQuestions(result);

  // After user answers questions...
  const domainConfig = processOnboardingResponses(result, responses);

  // Create new domain in database
  await createHyperfixationDomain(domainConfig);
}
*/
