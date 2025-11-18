/**
 * 🤖 HYPERFOCUS AI - WORKFLOW ORCHESTRATION SYSTEM
 *
 * Coordinates the flow of work between agents, manages handoffs,
 * and ensures all quality gates are passed before feature completion.
 */

import {
  FeatureContext,
  FeatureWorkflow,
  WorkflowStage,
  AgentHandoff,
  FeatureReview,
  createHandoff,
} from './agent-protocol';
import { AGENT_REGISTRY, getAgent, AgentCapabilities } from './agent-registry';

// ============================================================================
// WORKFLOW DEFINITIONS
// ============================================================================

/**
 * Standard feature development workflow
 */
export const STANDARD_WORKFLOW_STAGES: Omit<WorkflowStage, 'status'>[] = [
  {
    name: 'Design & Architecture Review',
    agents: ['pixel', 'framework'],
    parallel: true,
    dependsOn: [],
  },
  {
    name: 'Specialized Implementation Review',
    agents: ['synapse', 'bridge', 'responsive'],
    parallel: true,
    dependsOn: ['Design & Architecture Review'],
  },
  {
    name: 'Quality & Engagement Review',
    agents: ['quality', 'dopamine'],
    parallel: true,
    dependsOn: ['Specialized Implementation Review'],
  },
  {
    name: 'Security & Analytics Review',
    agents: ['vault', 'insight'],
    parallel: true,
    dependsOn: ['Quality & Engagement Review'],
  },
  {
    name: 'Deployment Readiness',
    agents: ['ship'],
    parallel: false,
    dependsOn: ['Security & Analytics Review'],
  },
];

/**
 * Quick fix workflow (for bug fixes and small optimizations)
 */
export const QUICK_FIX_WORKFLOW_STAGES: Omit<WorkflowStage, 'status'>[] = [
  {
    name: 'Architecture & Quality',
    agents: ['framework', 'quality'],
    parallel: true,
    dependsOn: [],
  },
  {
    name: 'Security Check',
    agents: ['vault'],
    parallel: false,
    dependsOn: ['Architecture & Quality'],
  },
  {
    name: 'Deployment',
    agents: ['ship'],
    parallel: false,
    dependsOn: ['Security Check'],
  },
];

/**
 * UI-focused workflow (for design system updates)
 */
export const UI_WORKFLOW_STAGES: Omit<WorkflowStage, 'status'>[] = [
  {
    name: 'Design System Review',
    agents: ['pixel'],
    parallel: false,
    dependsOn: [],
  },
  {
    name: 'Mobile & Accessibility',
    agents: ['responsive', 'framework'],
    parallel: true,
    dependsOn: ['Design System Review'],
  },
  {
    name: 'Quality Assurance',
    agents: ['quality'],
    parallel: false,
    dependsOn: ['Mobile & Accessibility'],
  },
];

/**
 * AI Feature workflow (for voice/AI capabilities)
 */
export const AI_FEATURE_WORKFLOW_STAGES: Omit<WorkflowStage, 'status'>[] = [
  {
    name: 'AI Integration Design',
    agents: ['synapse', 'framework'],
    parallel: true,
    dependsOn: [],
  },
  {
    name: 'UI & Performance',
    agents: ['pixel', 'responsive'],
    parallel: true,
    dependsOn: ['AI Integration Design'],
  },
  {
    name: 'Security & Quality',
    agents: ['vault', 'quality'],
    parallel: true,
    dependsOn: ['UI & Performance'],
  },
  {
    name: 'Deployment',
    agents: ['ship'],
    parallel: false,
    dependsOn: ['Security & Quality'],
  },
];

// ============================================================================
// WORKFLOW SELECTION
// ============================================================================

export function selectWorkflowForFeature(
  feature: FeatureContext
): Omit<WorkflowStage, 'status'>[] {
  // Bug fixes and small optimizations use quick workflow
  if (feature.type === 'bug_fix' || feature.complexity === 'simple') {
    return QUICK_FIX_WORKFLOW_STAGES;
  }

  // Design system updates use UI workflow
  if (
    feature.affectedFiles.some(f => f.includes('src/constants/')) ||
    feature.affectedFiles.some(f => f.includes('src/components/ui/'))
  ) {
    return UI_WORKFLOW_STAGES;
  }

  // AI features use specialized AI workflow
  if (
    feature.affectedFiles.some(f => f.includes('voice')) ||
    feature.affectedFiles.some(f => f.includes('ai')) ||
    feature.components.some(c => c.toLowerCase().includes('voice'))
  ) {
    return AI_FEATURE_WORKFLOW_STAGES;
  }

  // Default to standard workflow
  return STANDARD_WORKFLOW_STAGES;
}

// ============================================================================
// WORKFLOW CREATION
// ============================================================================

export function createWorkflow(feature: FeatureContext): FeatureWorkflow {
  const workflowTemplate = selectWorkflowForFeature(feature);

  const stages: WorkflowStage[] = workflowTemplate.map(stage => ({
    ...stage,
    status: 'pending',
  }));

  // First stage starts as in_progress
  if (stages.length > 0) {
    stages[0].status = 'in_progress';
  }

  return {
    workflowId: `workflow-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    feature,
    stages,
    currentStage: stages[0]?.name || '',
    handoffs: [],
    reviews: [],
    status: 'in_progress',
    startedAt: new Date().toISOString(),
  };
}

// ============================================================================
// HANDOFF GENERATION
// ============================================================================

export function generateHandoffsForStage(
  workflow: FeatureWorkflow,
  stageName: string
): AgentHandoff[] {
  const stage = workflow.stages.find(s => s.name === stageName);
  if (!stage) return [];

  const handoffs: AgentHandoff[] = [];

  // Get previous reviews for context
  const previousReviews = workflow.reviews.filter(
    r => r.timestamp < new Date().toISOString()
  );

  // Determine the "from" agent (last agent to complete review, or 'developer')
  const lastReview = previousReviews[previousReviews.length - 1];
  const fromAgent = lastReview?.agent || ('framework' as const);

  // Create handoff for each agent in the stage
  for (const agentName of stage.agents) {
    const requirements = previousReviews.flatMap(r =>
      r.nextSteps
        .filter(step => step.assignedTo === agentName)
        .map((step, idx) => ({
          id: `req-${agentName}-${idx}`,
          source: r.agent,
          type: 'functional' as const,
          description: step.description,
          priority: step.priority === 'immediate' ? ('required' as const) : ('recommended' as const),
          acceptanceCriteria: [],
        }))
    );

    const handoff = createHandoff(
      fromAgent,
      agentName,
      workflow.feature,
      requirements
    );

    handoff.previousReview = lastReview;
    handoffs.push(handoff);
  }

  return handoffs;
}

// ============================================================================
// STAGE PROGRESSION
// ============================================================================

export function advanceWorkflowStage(
  workflow: FeatureWorkflow
): FeatureWorkflow {
  const currentStageIndex = workflow.stages.findIndex(
    s => s.name === workflow.currentStage
  );

  if (currentStageIndex === -1) return workflow;

  // Mark current stage as completed
  workflow.stages[currentStageIndex].status = 'completed';

  // Check if there's a next stage
  const nextStageIndex = currentStageIndex + 1;
  if (nextStageIndex >= workflow.stages.length) {
    // Workflow completed!
    return {
      ...workflow,
      status: 'completed',
      completedAt: new Date().toISOString(),
    };
  }

  // Check if next stage dependencies are met
  const nextStage = workflow.stages[nextStageIndex];
  const dependenciesMet = (nextStage.dependsOn || []).every(depName => {
    const depStage = workflow.stages.find(s => s.name === depName);
    return depStage?.status === 'completed';
  });

  if (!dependenciesMet) {
    return {
      ...workflow,
      status: 'blocked',
      blockers: [
        {
          agent: 'framework',
          issue: `Stage "${nextStage.name}" blocked: dependencies not met`,
          severity: 'high',
        },
      ],
    };
  }

  // Advance to next stage
  workflow.stages[nextStageIndex].status = 'in_progress';
  workflow.currentStage = nextStage.name;

  // Generate handoffs for the new stage
  const newHandoffs = generateHandoffsForStage(workflow, nextStage.name);
  workflow.handoffs.push(...newHandoffs);

  return workflow;
}

// ============================================================================
// REVIEW PROCESSING
// ============================================================================

export function processAgentReview(
  workflow: FeatureWorkflow,
  review: FeatureReview
): FeatureWorkflow {
  // Add review to workflow
  workflow.reviews.push(review);

  // Get current stage
  const currentStage = workflow.stages.find(s => s.name === workflow.currentStage);
  if (!currentStage) return workflow;

  // Check if review blocks progress
  if (review.status === 'blocked') {
    return {
      ...workflow,
      status: 'blocked',
      blockers: [
        ...(workflow.blockers || []),
        {
          agent: review.agent,
          issue: review.feedback.find(f => f.severity === 'critical')?.message || 'Blocked',
          severity: 'critical',
        },
      ],
    };
  }

  // Check if all agents in current stage have completed review
  const stageAgents = currentStage.agents;
  const stageReviews = workflow.reviews.filter(r =>
    stageAgents.includes(r.agent)
  );

  const allAgentsReviewed = stageAgents.every(agentName =>
    stageReviews.some(r => r.agent === agentName)
  );

  const allApproved = stageReviews.every(
    r => r.status === 'approved' || r.status === 'needs_revision'
  );

  // If all agents reviewed and approved, advance to next stage
  if (allAgentsReviewed && allApproved) {
    return advanceWorkflowStage(workflow);
  }

  return workflow;
}

// ============================================================================
// WORKFLOW REPORTING
// ============================================================================

export interface WorkflowReport {
  workflowId: string;
  featureName: string;
  status: FeatureWorkflow['status'];
  progress: {
    currentStage: string;
    stagesCompleted: number;
    totalStages: number;
    percentComplete: number;
  };
  reviews: {
    total: number;
    approved: number;
    needsRevision: number;
    blocked: number;
  };
  timeline: {
    started: string;
    completed?: string;
    estimatedCompletion?: string;
    actualDuration?: number;
  };
  blockers: FeatureWorkflow['blockers'];
  nextSteps: string[];
}

export function generateWorkflowReport(workflow: FeatureWorkflow): WorkflowReport {
  const completedStages = workflow.stages.filter(s => s.status === 'completed').length;
  const totalStages = workflow.stages.length;

  const reviewCounts = workflow.reviews.reduce(
    (acc, review) => {
      acc.total++;
      if (review.status === 'approved') acc.approved++;
      if (review.status === 'needs_revision') acc.needsRevision++;
      if (review.status === 'blocked') acc.blocked++;
      return acc;
    },
    { total: 0, approved: 0, needsRevision: 0, blocked: 0 }
  );

  const nextSteps: string[] = [];

  // Determine next steps based on current state
  if (workflow.status === 'blocked') {
    nextSteps.push('Resolve blocking issues');
    workflow.blockers?.forEach(blocker => {
      nextSteps.push(`- ${blocker.agent}: ${blocker.issue}`);
    });
  } else if (workflow.status === 'completed') {
    nextSteps.push('Feature ready for deployment!');
  } else {
    const currentStage = workflow.stages.find(s => s.name === workflow.currentStage);
    if (currentStage) {
      currentStage.agents.forEach(agent => {
        const hasReview = workflow.reviews.some(r => r.agent === agent);
        if (!hasReview) {
          nextSteps.push(`Awaiting review from ${getAgent(agent).displayName}`);
        }
      });
    }
  }

  return {
    workflowId: workflow.workflowId,
    featureName: workflow.feature.name,
    status: workflow.status,
    progress: {
      currentStage: workflow.currentStage,
      stagesCompleted: completedStages,
      totalStages,
      percentComplete: Math.round((completedStages / totalStages) * 100),
    },
    reviews: reviewCounts,
    timeline: {
      started: workflow.startedAt,
      completed: workflow.completedAt,
      estimatedCompletion: workflow.completedAt
        ? undefined
        : new Date(
            new Date(workflow.startedAt).getTime() +
              import('./agent-protocol').calculateWorkflowTime(
                workflow,
                Object.values(AGENT_REGISTRY)
              ) *
                60 *
                1000
          ).toISOString(),
    },
    blockers: workflow.blockers,
    nextSteps,
  };
}

// ============================================================================
// WORKFLOW VISUALIZATION
// ============================================================================

export function generateWorkflowMermaid(workflow: FeatureWorkflow): string {
  let mermaid = 'graph TD\n';
  mermaid += `    Start[Feature: ${workflow.feature.name}]\n`;

  workflow.stages.forEach((stage, idx) => {
    const stageId = `Stage${idx}`;
    const status =
      stage.status === 'completed'
        ? '✅'
        : stage.status === 'in_progress'
        ? '⏳'
        : '⏸️';

    mermaid += `    ${stageId}["${status} ${stage.name}"]\n`;

    // Add agent nodes
    stage.agents.forEach(agentName => {
      const agent = getAgent(agentName);
      const review = workflow.reviews.find(r => r.agent === agentName);
      const reviewStatus = review
        ? review.status === 'approved'
          ? '✅'
          : review.status === 'blocked'
          ? '❌'
          : '🔄'
        : '⏸️';

      const agentNodeId = `${stageId}_${agentName}`;
      mermaid += `    ${agentNodeId}["${reviewStatus} ${agent.displayName}"]\n`;
      mermaid += `    ${stageId} --> ${agentNodeId}\n`;
    });
  });

  // Connect stages
  mermaid += '    Start --> Stage0\n';
  for (let i = 0; i < workflow.stages.length - 1; i++) {
    mermaid += `    Stage${i} --> Stage${i + 1}\n`;
  }

  return mermaid;
}
