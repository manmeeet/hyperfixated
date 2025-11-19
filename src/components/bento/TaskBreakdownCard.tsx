/**
 * 📋 TASK BREAKDOWN CARD
 *
 * AI-powered task chunking for executive function support
 */

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, ScrollView } from '../native-compat';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';

interface Subtask {
  id: string;
  title: string;
  estimatedMinutes: number;
  completed: boolean;
}

interface Task {
  id: string;
  title: string;
  complexityScore: number;
  subtasks: Subtask[];
}

interface TaskBreakdownCardProps {
  deviceType?: string;
}

export const TaskBreakdownCard: React.FC<TaskBreakdownCardProps> = ({ deviceType = 'desktop' }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const breakdownTask = (title: string): Subtask[] => {
    // Simulate AI breaking down the task
    const keywords = title.toLowerCase();
    let subtasks: Subtask[] = [];

    if (keywords.includes('learn')) {
      subtasks = [
        { id: '1', title: 'Research fundamentals', estimatedMinutes: 30, completed: false },
        { id: '2', title: 'Watch tutorial video', estimatedMinutes: 45, completed: false },
        { id: '3', title: 'Practice with examples', estimatedMinutes: 60, completed: false },
        { id: '4', title: 'Build small project', estimatedMinutes: 120, completed: false },
      ];
    } else if (keywords.includes('write') || keywords.includes('create')) {
      subtasks = [
        { id: '1', title: 'Outline main points', estimatedMinutes: 15, completed: false },
        { id: '2', title: 'Write first draft', estimatedMinutes: 45, completed: false },
        { id: '3', title: 'Review and edit', estimatedMinutes: 20, completed: false },
        { id: '4', title: 'Finalize and publish', estimatedMinutes: 10, completed: false },
      ];
    } else {
      subtasks = [
        { id: '1', title: 'Gather materials', estimatedMinutes: 15, completed: false },
        { id: '2', title: 'Complete main work', estimatedMinutes: 60, completed: false },
        { id: '3', title: 'Review results', estimatedMinutes: 15, completed: false },
      ];
    }

    return subtasks;
  };

  const handleCreateTask = () => {
    if (!newTaskTitle.trim()) return;

    const subtasks = breakdownTask(newTaskTitle);
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: newTaskTitle,
      complexityScore: subtasks.length * 20,
      subtasks,
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setIsCreating(false);
  };

  const toggleSubtask = (taskId: string, subtaskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          subtasks: task.subtasks.map(st =>
            st.id === subtaskId ? { ...st, completed: !st.completed } : st
          ),
        };
      }
      return task;
    }));
  };

  const getComplexityColor = (score: number) => {
    if (score >= 80) return 'var(--red-primary)';
    if (score >= 50) return 'var(--amber-primary)';
    return 'var(--green-primary)';
  };

  return (
    <Card>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text size="3xl">📋</Text>
            <View>
              <Text variant="heading" size="lg" weight="bold">
                Task Breakdown
              </Text>
              <Text size="sm" style={styles.subtitle}>
                AI-powered chunking
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setIsCreating(true)}
          >
            <Text size="2xl">➕</Text>
          </TouchableOpacity>
        </View>

        {/* Create Task Form */}
        {isCreating && (
          <View style={styles.createForm}>
            <TextInput
              style={styles.input}
              placeholder="Enter a complex task..."
             
              value={newTaskTitle}
              onChangeText={setNewTaskTitle}
              autoFocus
            />
            <View style={styles.formButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setIsCreating(false);
                  setNewTaskTitle('');
                }}
              >
                <Text size="sm">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.createButton} onPress={handleCreateTask}>
                <Text size="sm" weight="semibold">
                  Break Down
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Tasks List */}
        <ScrollView style={styles.tasksList}>
          {tasks.map(task => {
            const completedCount = task.subtasks.filter(st => st.completed).length;
            const totalTime = task.subtasks.reduce((sum, st) => sum + st.estimatedMinutes, 0);

            return (
              <View key={task.id} style={styles.taskCard}>
                <View style={styles.taskHeader}>
                  <Text variant="heading" size="base" weight="bold" style={styles.taskTitle}>
                    {task.title}
                  </Text>
                  <View
                    style={[
                      styles.complexityBadge,
                      { backgroundColor: getComplexityColor(task.complexityScore) },
                    ]}
                  >
                    <Text size="xs" weight="semibold">
                      {Math.round(task.complexityScore)}
                    </Text>
                  </View>
                </View>

                <Text size="sm" style={styles.taskMeta}>
                  {completedCount}/{task.subtasks.length} steps · ~{totalTime}min
                </Text>

                <View style={styles.subtasksList}>
                  {task.subtasks.map(subtask => (
                    <TouchableOpacity
                      key={subtask.id}
                      style={styles.subtaskRow}
                      onPress={() => toggleSubtask(task.id, subtask.id)}
                    >
                      <Text size="lg">{subtask.completed ? '✅' : '⬜'}</Text>
                      <View style={styles.subtaskContent}>
                        <Text
                          size="sm"
                          style={{
                            ...styles.subtaskTitle,
                            ...(subtask.completed ? styles.subtaskCompleted : {}),
                          }}
                        >
                          {subtask.title}
                        </Text>
                        <Text size="xs" style={styles.timeEstimate}>
                          ~{subtask.estimatedMinutes}min
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            );
          })}

          {tasks.length === 0 && !isCreating && (
            <View style={styles.emptyState}>
              <Text size="3xl">🎯</Text>
              <Text size="sm" style={styles.emptyText}>
                Add a complex task to break it down into manageable steps
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 8,
  },
  subtitle: {
    color: 'var(--color-text-secondary)',
  },
  addButton: {
    padding: 4,
  },
  createForm: {
    padding: 16,
    backgroundColor: 'var(--color-surface)',
    borderRadius: 8,
    marginBottom: 16,
  },
  input: {
    backgroundColor: 'var(--color-background)',
    borderWidth: 1,
    borderColor: 'var(--color-text-secondary)',
    borderRadius: 4,
    padding: 8,
    color: 'var(--color-text)',
    fontSize: 14,
    marginBottom: 8,
  },
  formButtons: {
    flexDirection: 'row' as const,
    gap: 8,
    justifyContent: 'flex-end' as const,
  },
  cancelButton: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: 'var(--color-surface)',
    borderRadius: 4,
  },
  createButton: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: 'var(--amber-primary)',
    borderRadius: 4,
  },
  tasksList: {
    flex: 1,
  },
  taskCard: {
    padding: 16,
    backgroundColor: 'var(--color-surface)',
    borderRadius: 8,
    marginBottom: 16,
  },
  taskHeader: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'flex-start' as const,
    marginBottom: 4,
  },
  taskTitle: {
    flex: 1,
    marginRight: 8,
  },
  complexityBadge: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 4,
  },
  taskMeta: {
    color: 'var(--color-text-secondary)',
    marginBottom: 16,
  },
  subtasksList: {
    gap: 8,
  },
  subtaskRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 8,
    padding: 8,
    backgroundColor: 'var(--color-surface)',
    borderRadius: 4,
  },
  subtaskContent: {
    flex: 1,
  },
  subtaskTitle: {
    marginBottom: 4,
  },
  subtaskCompleted: {
    textDecorationLine: 'line-through' as const,
    color: 'var(--color-text-secondary)',
  },
  timeEstimate: {
    color: 'var(--color-text-secondary)',
  },
  emptyState: {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    padding: 32,
    gap: 16,
  },
  emptyText: {
    color: 'var(--color-text-secondary)',
    textAlign: 'center' as const,
  },
});
