/**
 * 📋 TASK BREAKDOWN CARD
 *
 * AI-powered task chunking for executive function support
 */

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, ScrollView } from '../native-compat';
import { Card } from '../ui/Card';
import { Text } from '../ui/Text';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { DeviceType } from '../../constants/breakpoints';

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
  deviceType: DeviceType;
}

export const TaskBreakdownCard: React.FC<TaskBreakdownCardProps> = ({ deviceType }) => {
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
    if (score >= 80) return Colors.red.primary;
    if (score >= 50) return Colors.amber.primary;
    return Colors.green.primary;
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  subtitle: {
    color: Colors.textSecondary,
  },
  addButton: {
    padding: Spacing.xs,
  },
  createForm: {
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: Spacing.sm,
    marginBottom: Spacing.md,
  },
  input: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.textSecondary,
    borderRadius: Spacing.xs,
    padding: Spacing.sm,
    color: Colors.text,
    fontSize: 14,
    marginBottom: Spacing.sm,
  },
  formButtons: {
    flexDirection: 'row',
    gap: Spacing.sm,
    justifyContent: 'flex-end',
  },
  cancelButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.surface,
    borderRadius: Spacing.xs,
  },
  createButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.amber.primary,
    borderRadius: Spacing.xs,
  },
  tasksList: {
    flex: 1,
  },
  taskCard: {
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: Spacing.sm,
    marginBottom: Spacing.md,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.xs,
  },
  taskTitle: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  complexityBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Spacing.xs,
  },
  taskMeta: {
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  subtasksList: {
    gap: Spacing.sm,
  },
  subtaskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.sm,
    backgroundColor: Colors.surface,
    borderRadius: Spacing.xs,
  },
  subtaskContent: {
    flex: 1,
  },
  subtaskTitle: {
    marginBottom: Spacing.xs,
  },
  subtaskCompleted: {
    textDecorationLine: 'line-through',
    color: Colors.textSecondary,
  },
  timeEstimate: {
    color: Colors.textSecondary,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  emptyText: {
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
