/**
 * 🎭 AGENT ORCHESTRATOR
 *
 * Central coordination system for all agents.
 * Manages task distribution, dependency resolution, and execution flow.
 */

import {
  Agent,
  AgentTask,
  AgentType,
  FeatureRequest,
  AgentOrchestrationPlan,
  AgentResult,
} from '../types/agents';

export class AgentOrchestrator {
  private agents: Map<AgentType, Agent> = new Map();
  private activeTasks: Map<string, AgentTask> = new Map();
  private completedTasks: Map<string, AgentResult> = new Map();

  /**
   * Register an agent with the orchestrator
   */
  registerAgent(agent: Agent): void {
    this.agents.set(agent.type, agent);
    console.log(`✅ Registered ${agent.emoji} ${agent.name}`);
  }

  /**
   * Create an orchestration plan for a feature request
   */
  createPlan(request: FeatureRequest): AgentOrchestrationPlan {
    const tasks: AgentTask[] = [];
    let taskOrder = 0;

    // Standard agent execution order for features
    const executionOrder: AgentType[] = [
      'framework',  // 1. Define data structures first
      'pixel',      // 2. Design UI components
      'synapse',    // 3. Add voice/input integration
      'bridge',     // 4. Set up external integrations
      'responsive', // 5. Optimize for all devices
      'quality',    // 6. Test and validate
      'insight',    // 7. Add analytics tracking
    ];

    // Filter to only required agents for this feature
    const requiredOrder = executionOrder.filter(agentType =>
      request.requiredAgents.includes(agentType)
    );

    // Create tasks with proper dependencies
    requiredOrder.forEach((agentType, index) => {
      const previousTaskId = index > 0 ? `${request.id}-${requiredOrder[index - 1]}` : '';

      tasks.push({
        id: `${request.id}-${agentType}`,
        type: agentType,
        featureName: request.featureName,
        description: `${agentType} work for ${request.featureName}`,
        priority: request.priority,
        dependencies: previousTaskId ? [previousTaskId] : [],
        status: 'idle',
      });
    });

    // Estimate complexity and duration
    const complexity = this.estimateComplexity(tasks);
    const estimatedDuration = this.estimateDuration(tasks, complexity);

    return {
      featureRequest: request,
      tasks,
      estimatedDuration,
      complexity,
    };
  }

  /**
   * Execute a feature implementation plan
   */
  async executePlan(plan: AgentOrchestrationPlan): Promise<Map<string, AgentResult>> {
    console.log(`🚀 Starting execution plan for: ${plan.featureRequest.featureName}`);
    console.log(`📊 Complexity: ${plan.complexity}, Estimated: ${plan.estimatedDuration}min`);

    const results = new Map<string, AgentResult>();

    // Execute tasks in order, respecting dependencies
    for (const task of plan.tasks) {
      await this.executeTask(task, results);
    }

    console.log(`✅ Completed plan for: ${plan.featureRequest.featureName}`);
    return results;
  }

  /**
   * Execute a single agent task
   */
  private async executeTask(
    task: AgentTask,
    results: Map<string, AgentResult>
  ): Promise<AgentResult> {
    // Check if dependencies are met
    const dependenciesMet = task.dependencies.every(depId => {
      const depResult = results.get(depId);
      return depResult && depResult.success;
    });

    if (!dependenciesMet) {
      const error = `Dependencies not met for task ${task.id}`;
      console.error(`❌ ${error}`);
      return { success: false, error };
    }

    // Get the agent
    const agent = this.agents.get(task.type);
    if (!agent) {
      const error = `Agent not found: ${task.type}`;
      console.error(`❌ ${error}`);
      return { success: false, error };
    }

    // Mark task as processing
    task.status = 'processing';
    task.startedAt = new Date();
    this.activeTasks.set(task.id, task);

    console.log(`▶️  Executing ${agent.emoji} ${agent.name} for ${task.featureName}`);

    try {
      // Execute the task
      const result = await agent.execute(task);

      // Mark task as complete
      task.status = result.success ? 'complete' : 'error';
      task.completedAt = new Date();
      task.result = result.data;
      task.error = result.error;

      this.completedTasks.set(task.id, result);
      results.set(task.id, result);

      if (result.success) {
        console.log(`✅ Completed ${agent.emoji} ${agent.name} for ${task.featureName}`);
      } else {
        console.error(`❌ Failed ${agent.emoji} ${agent.name}: ${result.error}`);
      }

      return result;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      task.status = 'error';
      task.error = errorMsg;

      console.error(`❌ Error in ${agent.name}: ${errorMsg}`);
      return { success: false, error: errorMsg };
    } finally {
      this.activeTasks.delete(task.id);
    }
  }

  /**
   * Estimate complexity based on number and type of tasks
   */
  private estimateComplexity(tasks: AgentTask[]): 'low' | 'medium' | 'high' {
    if (tasks.length <= 3) return 'low';
    if (tasks.length <= 5) return 'medium';
    return 'high';
  }

  /**
   * Estimate duration based on tasks and complexity
   */
  private estimateDuration(tasks: AgentTask[], complexity: 'low' | 'medium' | 'high'): number {
    const baseTimePerTask = 10; // minutes
    const complexityMultiplier = {
      low: 1,
      medium: 1.5,
      high: 2,
    };

    return Math.ceil(tasks.length * baseTimePerTask * complexityMultiplier[complexity]);
  }

  /**
   * Get current status of all tasks
   */
  getStatus(): {
    active: AgentTask[];
    completed: Array<{ task: AgentTask; result: AgentResult }>;
  } {
    return {
      active: Array.from(this.activeTasks.values()),
      completed: Array.from(this.completedTasks.entries()).map(([taskId, result]) => ({
        task: Array.from(this.activeTasks.values()).find(t => t.id === taskId)!,
        result,
      })),
    };
  }

  /**
   * Clear completed tasks
   */
  clearCompleted(): void {
    this.completedTasks.clear();
  }
}

// Singleton instance
export const orchestrator = new AgentOrchestrator();
