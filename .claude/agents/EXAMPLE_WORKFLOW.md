# 🎯 Example: Multi-Agent Review Workflow

## Real-World Scenario: Adding a New "Hyperfixation Tracker" Feature

This document demonstrates how to use the multi-agent system to build a new feature from start to finish.

---

## 📝 Feature Specification

**Feature Name:** Hyperfixation Tracker
**Description:** A new bento card that tracks your current hyperfixation, time spent, and suggests when to switch focus
**Type:** New Feature
**Complexity:** Moderate
**Files to Create/Modify:**
- `/src/components/bento/HyperfixationTracker.tsx` (new)
- `/src/hooks/useHyperfixation.ts` (new)
- `/src/store/hyperfixationStore.ts` (new)
- `/src/types/index.ts` (modify)
- `/App.tsx` (modify to add card)

---

## 🔄 Step-by-Step Workflow

### **Stage 0: Planning**

Before writing any code, determine which agents you'll need:

**Required Agents:**
- ✅ **Pixel** (New UI component)
- ✅ **Framework** (New hook, store, component architecture)
- ✅ **Quality** (Testing required)
- ✅ **Responsive** (Mobile-first optimization needed)
- ⚠️ **Dopamine** (If adding achievements for switching hyperfixations)

**Workflow Selected:** Standard Feature Development
**Estimated Time:** 6-8 hours total

---

## 🎨 Stage 1: Design & Architecture Review

### **1.1 Pixel Review (UI/UX Design)**

**Read Context:**
```bash
cat .claude/agents/pixel/context/agent-context.md
```

**Use Checklist:**
```bash
# Open in editor
.claude/agents/pixel/checklists/component-review.md
```

**Review Criteria:**

#### Design Token Compliance ✅
```typescript
// HyperfixationTracker.tsx - GOOD ✅
import { colors, typography, spacing } from '@/constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.ui.surface,
    borderColor: colors.ui.border,
    borderRadius: spacing.card.borderRadius,
    padding: spacing.card.padding[deviceType],
  },
  title: {
    ...typography.variants.h3,
    color: colors.text.primary,
  },
});
```

```typescript
// HyperfixationTracker.tsx - BAD ❌
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#18181B', // ❌ Hardcoded color
    borderRadius: 12, // ❌ Magic number
    padding: 16, // ❌ Not device-responsive
  },
  title: {
    fontSize: 24, // ❌ Not from typography system
    color: '#FFFFFF',
  },
});
```

#### Responsive Design ✅
```typescript
// Receives deviceType prop
interface HyperfixationTrackerProps {
  deviceType: 'mobile' | 'tablet' | 'desktop';
}

export function HyperfixationTracker({ deviceType }: HyperfixationTrackerProps) {
  // Adapt layout based on device
  const cardPadding = spacing.card.padding[deviceType]; // 16px → 20px → 24px
  const touchTarget = spacing.touchTarget[deviceType]; // 56px → 48px → 44px

  return (
    <Card style={{ padding: cardPadding }}>
      <Pressable
        style={{ minHeight: touchTarget }}
        onPress={handleSwitch}
      >
        {/* Content */}
      </Pressable>
    </Card>
  );
}
```

#### Accessibility ✅
```typescript
<Pressable
  accessibilityRole="button"
  accessibilityLabel="Switch hyperfixation"
  accessibilityHint="Tap to mark current hyperfixation complete and start a new one"
  style={styles.switchButton}
  onPress={handleSwitch}
>
  <Text style={styles.buttonText}>Switch Focus</Text>
</Pressable>
```

#### Bento Grid Integration ✅
```typescript
// In App.tsx
<BentoGrid deviceType={deviceType}>
  <CommandCenter deviceType={deviceType} />
  <FocusTimer deviceType={deviceType} />
  <HyperfixationTracker deviceType={deviceType} /> {/* New card */}
  <SmartSchedule deviceType={deviceType} />
  <StatsCard deviceType={deviceType} />
  <AchievementsCard deviceType={deviceType} />
</BentoGrid>
```

**Pixel Review Result:** ✅ **APPROVED WITH RECOMMENDATIONS**

**Feedback:**
- ✅ All design tokens used correctly
- ✅ Responsive across all breakpoints
- ✅ Accessibility labels comprehensive
- 💡 **Suggestion:** Add subtle pulse animation when it's time to switch hyperfixations

---

### **1.2 Framework Review (Code Architecture)**

**Read Context:**
```bash
cat .claude/agents/framework/context/agent-context.md
```

**Use Checklist:**
```bash
.claude/agents/framework/checklists/architecture-review.md
```

**Review Criteria:**

#### TypeScript Type Safety ✅
```typescript
// /src/types/index.ts

export interface Hyperfixation {
  id: string;
  name: string;
  category: 'coding' | 'writing' | 'music' | 'trading' | 'learning' | 'other';
  startedAt: Date;
  totalMinutes: number;
  sessionCount: number;
  tags: string[];
}

export interface HyperfixationSession {
  id: string;
  hyperfixationId: string;
  startedAt: Date;
  endedAt?: Date;
  durationMinutes: number;
  notes?: string;
}

// Component props
export interface HyperfixationTrackerProps {
  deviceType: 'mobile' | 'tablet' | 'desktop';
  onSwitch?: (oldHyperfixation: Hyperfixation, newHyperfixation: Hyperfixation) => void;
}
```

#### State Management (Zustand Store) ✅
```typescript
// /src/store/hyperfixationStore.ts
import { create } from 'zustand';
import { Hyperfixation, HyperfixationSession } from '@/types';

interface HyperfixationState {
  // State
  current: Hyperfixation | null;
  history: Hyperfixation[];
  sessions: HyperfixationSession[];
  isTracking: boolean;

  // Actions
  startHyperfixation: (hyperfixation: Omit<Hyperfixation, 'id' | 'startedAt'>) => void;
  endHyperfixation: () => void;
  addSession: (session: Omit<HyperfixationSession, 'id'>) => void;
  updateCurrentTime: (minutes: number) => void;
}

export const useHyperfixationStore = create<HyperfixationState>((set, get) => ({
  current: null,
  history: [],
  sessions: [],
  isTracking: false,

  startHyperfixation: (data) => set({
    current: {
      ...data,
      id: `hyper-${Date.now()}`,
      startedAt: new Date(),
      totalMinutes: 0,
      sessionCount: 0,
    },
    isTracking: true,
  }),

  endHyperfixation: () => {
    const { current, history } = get();
    if (!current) return;

    set({
      current: null,
      history: [current, ...history],
      isTracking: false,
    });
  },

  addSession: (session) => set((state) => ({
    sessions: [
      { ...session, id: `session-${Date.now()}` },
      ...state.sessions,
    ],
  })),

  updateCurrentTime: (minutes) => set((state) => ({
    current: state.current
      ? { ...state.current, totalMinutes: state.current.totalMinutes + minutes }
      : null,
  })),
}));
```

#### Custom Hook ✅
```typescript
// /src/hooks/useHyperfixation.ts
import { useEffect, useCallback } from 'react';
import { useHyperfixationStore } from '@/store/hyperfixationStore';

export function useHyperfixation() {
  const {
    current,
    history,
    isTracking,
    startHyperfixation,
    endHyperfixation,
    updateCurrentTime,
  } = useHyperfixationStore();

  // Track time spent every minute
  useEffect(() => {
    if (!isTracking || !current) return;

    const interval = setInterval(() => {
      updateCurrentTime(1); // Add 1 minute
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [isTracking, current, updateCurrentTime]);

  // Calculate stats
  const stats = {
    currentMinutes: current?.totalMinutes || 0,
    currentHours: Math.floor((current?.totalMinutes || 0) / 60),
    suggestSwitch: (current?.totalMinutes || 0) >= 120, // Suggest switch after 2 hours
    totalHyperfixations: history.length,
  };

  // Actions
  const handleStart = useCallback((name: string, category: Hyperfixation['category']) => {
    startHyperfixation({ name, category, tags: [] });
  }, [startHyperfixation]);

  const handleEnd = useCallback(() => {
    endHyperfixation();
  }, [endHyperfixation]);

  const handleSwitch = useCallback((newName: string, newCategory: Hyperfixation['category']) => {
    endHyperfixation();
    startHyperfixation({ name: newName, category: newCategory, tags: [] });
  }, [endHyperfixation, startHyperfixation]);

  return {
    current,
    history,
    isTracking,
    stats,
    actions: {
      start: handleStart,
      end: handleEnd,
      switch: handleSwitch,
    },
  };
}
```

#### Component Implementation ✅
```typescript
// /src/components/bento/HyperfixationTracker.tsx
import React, { useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/Card';
import { useHyperfixation } from '@/hooks/useHyperfixation';
import { colors, typography, spacing } from '@/constants';

interface HyperfixationTrackerProps {
  deviceType: 'mobile' | 'tablet' | 'desktop';
}

export function HyperfixationTracker({ deviceType }: HyperfixationTrackerProps) {
  const { current, stats, actions } = useHyperfixation();
  const [showSwitchModal, setShowSwitchModal] = useState(false);

  const handleSwitchPress = () => {
    setShowSwitchModal(true);
  };

  return (
    <Card style={styles.container}>
      <Text variant="h3" style={styles.title}>
        Current Hyperfixation
      </Text>

      {current ? (
        <>
          <View style={styles.current}>
            <Text variant="h2" style={styles.name}>
              {current.name}
            </Text>
            <Text variant="caption" style={styles.category}>
              {current.category}
            </Text>
          </View>

          <View style={styles.stats}>
            <Text variant="mono" style={styles.time}>
              {stats.currentHours}h {stats.currentMinutes % 60}m
            </Text>
            {stats.suggestSwitch && (
              <Text variant="bodySmall" style={styles.suggestion}>
                💡 Time to switch focus?
              </Text>
            )}
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Switch hyperfixation"
            style={[
              styles.button,
              { minHeight: spacing.touchTarget[deviceType] }
            ]}
            onPress={handleSwitchPress}
          >
            <Text variant="body" weight="semibold" style={styles.buttonText}>
              Switch Focus
            </Text>
          </Pressable>
        </>
      ) : (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Start tracking hyperfixation"
          style={[
            styles.button,
            { minHeight: spacing.touchTarget[deviceType] }
          ]}
          onPress={() => actions.start('New Hyperfixation', 'other')}
        >
          <Text variant="body" weight="semibold" style={styles.buttonText}>
            Start Tracking
          </Text>
        </Pressable>
      )}

      {/* Switch Modal would go here */}
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  title: {
    color: colors.text.primary,
  },
  current: {
    gap: spacing.xs,
  },
  name: {
    color: colors.brand.primary,
  },
  category: {
    color: colors.text.secondary,
    textTransform: 'uppercase',
  },
  stats: {
    gap: spacing.sm,
  },
  time: {
    fontSize: typography.sizes['2xl'],
    color: colors.brand.orange,
  },
  suggestion: {
    color: colors.semantic.warning,
  },
  button: {
    backgroundColor: colors.brand.primary,
    borderRadius: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.text.primary,
  },
});
```

**Framework Review Result:** ✅ **APPROVED**

**Feedback:**
- ✅ Excellent TypeScript type safety
- ✅ Proper separation of concerns (component → hook → store)
- ✅ Clean state management with Zustand
- ✅ Memoized callbacks in hook
- ✅ No performance anti-patterns
- 💡 **Suggestion:** Consider adding data persistence (AsyncStorage) for hyperfixation history

---

## 🧪 Stage 2: Quality & Testing Review

### **2.1 Quality Review (Testing & QA)**

**Read Context:**
```bash
cat .claude/agents/quality/context/agent-context.md
```

**Use Checklist:**
```bash
.claude/agents/quality/checklists/testing-review.md
```

**Required Tests:**

#### Unit Tests - Hook ✅
```typescript
// /src/hooks/__tests__/useHyperfixation.test.ts
import { renderHook, act, waitFor } from '@testing-library/react-hooks';
import { useHyperfixation } from '../useHyperfixation';

describe('useHyperfixation Hook', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should initialize with no current hyperfixation', () => {
    const { result } = renderHook(() => useHyperfixation());

    expect(result.current.current).toBeNull();
    expect(result.current.isTracking).toBe(false);
  });

  it('should start tracking a new hyperfixation', () => {
    const { result } = renderHook(() => useHyperfixation());

    act(() => {
      result.current.actions.start('Learning TypeScript', 'learning');
    });

    expect(result.current.current).toMatchObject({
      name: 'Learning TypeScript',
      category: 'learning',
      totalMinutes: 0,
    });
    expect(result.current.isTracking).toBe(true);
  });

  it('should increment time every minute', async () => {
    const { result } = renderHook(() => useHyperfixation());

    act(() => {
      result.current.actions.start('Coding', 'coding');
    });

    // Fast-forward 1 minute
    act(() => {
      jest.advanceTimersByTime(60 * 1000);
    });

    await waitFor(() => {
      expect(result.current.current?.totalMinutes).toBe(1);
    });

    // Fast-forward another minute
    act(() => {
      jest.advanceTimersByTime(60 * 1000);
    });

    await waitFor(() => {
      expect(result.current.current?.totalMinutes).toBe(2);
    });
  });

  it('should suggest switch after 2 hours', async () => {
    const { result } = renderHook(() => useHyperfixation());

    act(() => {
      result.current.actions.start('Marathon Coding', 'coding');
    });

    // Fast-forward 2 hours (120 minutes)
    act(() => {
      jest.advanceTimersByTime(120 * 60 * 1000);
    });

    await waitFor(() => {
      expect(result.current.stats.suggestSwitch).toBe(true);
    });
  });

  it('should end hyperfixation and move to history', () => {
    const { result } = renderHook(() => useHyperfixation());

    act(() => {
      result.current.actions.start('Writing', 'writing');
    });

    const hyperfixation = result.current.current;

    act(() => {
      result.current.actions.end();
    });

    expect(result.current.current).toBeNull();
    expect(result.current.isTracking).toBe(false);
    expect(result.current.history).toContainEqual(hyperfixation);
  });

  it('should switch hyperfixations', () => {
    const { result } = renderHook(() => useHyperfixation());

    act(() => {
      result.current.actions.start('Old Fixation', 'coding');
    });

    act(() => {
      result.current.actions.switch('New Fixation', 'writing');
    });

    expect(result.current.current?.name).toBe('New Fixation');
    expect(result.current.current?.category).toBe('writing');
    expect(result.current.history.length).toBe(1);
    expect(result.current.history[0].name).toBe('Old Fixation');
  });
});
```

#### Component Tests ✅
```typescript
// /src/components/bento/__tests__/HyperfixationTracker.test.tsx
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { HyperfixationTracker } from '../HyperfixationTracker';
import { useHyperfixation } from '@/hooks/useHyperfixation';

// Mock the hook
jest.mock('@/hooks/useHyperfixation');

describe('HyperfixationTracker Component', () => {
  it('should render "Start Tracking" when no current hyperfixation', () => {
    (useHyperfixation as jest.Mock).mockReturnValue({
      current: null,
      stats: {},
      actions: {
        start: jest.fn(),
      },
    });

    render(<HyperfixationTracker deviceType="mobile" />);

    expect(screen.getByText('Start Tracking')).toBeTruthy();
  });

  it('should display current hyperfixation details', () => {
    (useHyperfixation as jest.Mock).mockReturnValue({
      current: {
        name: 'Learning React Native',
        category: 'learning',
        totalMinutes: 45,
      },
      stats: {
        currentHours: 0,
        currentMinutes: 45,
        suggestSwitch: false,
      },
      actions: {},
    });

    render(<HyperfixationTracker deviceType="mobile" />);

    expect(screen.getByText('Learning React Native')).toBeTruthy();
    expect(screen.getByText('learning')).toBeTruthy();
    expect(screen.getByText('0h 45m')).toBeTruthy();
  });

  it('should show switch suggestion after 2 hours', () => {
    (useHyperfixation as jest.Mock).mockReturnValue({
      current: {
        name: 'Marathon Session',
        category: 'coding',
        totalMinutes: 150,
      },
      stats: {
        currentHours: 2,
        currentMinutes: 150,
        suggestSwitch: true,
      },
      actions: {},
    });

    render(<HyperfixationTracker deviceType="mobile" />);

    expect(screen.getByText('💡 Time to switch focus?')).toBeTruthy();
  });

  it('should be accessible', () => {
    (useHyperfixation as jest.Mock).mockReturnValue({
      current: null,
      stats: {},
      actions: { start: jest.fn() },
    });

    render(<HyperfixationTracker deviceType="mobile" />);

    const button = screen.getByLabelText('Start tracking hyperfixation');
    expect(button).toBeTruthy();
    expect(button.props.accessibilityRole).toBe('button');
  });

  it('should use device-specific touch targets', () => {
    (useHyperfixation as jest.Mock).mockReturnValue({
      current: null,
      stats: {},
      actions: { start: jest.fn() },
    });

    const { getByLabelText } = render(
      <HyperfixationTracker deviceType="mobile" />
    );

    const button = getByLabelText('Start tracking hyperfixation');
    expect(button.props.style).toContainEqual({ minHeight: 56 }); // Mobile touch target
  });
});
```

**Quality Review Result:** ✅ **APPROVED**

**Test Coverage:** 87%

**Feedback:**
- ✅ Comprehensive hook tests (all scenarios covered)
- ✅ Component tests include accessibility
- ✅ Edge cases tested
- ✅ Mocks used appropriately
- 💡 **Suggestion:** Add integration test for full user flow (start → track → switch)

---

## 📊 Final Review Summary

### Agent Review Scores

| Agent | Score | Status | Notes |
|-------|-------|--------|-------|
| Pixel 🎨 | 58/60 | ✅ APPROVED | Minor animation suggestion |
| Framework 🏗️ | 88/90 | ✅ APPROVED | Excellent architecture |
| Quality 🧪 | 87/100 | ✅ APPROVED | Great test coverage |

### Overall Feature Quality: 🌟 **EXCELLENT**

**Ready for Production:** ✅ YES

**Estimated Implementation Time:** 6 hours
**Actual Implementation Time:** 5.5 hours

---

## ✅ Checklist Summary

### Pre-Merge Checklist
- [x] All design tokens used correctly (Pixel)
- [x] Responsive across mobile/tablet/desktop (Pixel)
- [x] Accessibility compliance (Pixel + Quality)
- [x] TypeScript type safety (Framework)
- [x] Proper state management (Framework)
- [x] Custom hook implemented (Framework)
- [x] Test coverage ≥ 80% (Quality)
- [x] Unit tests passing (Quality)
- [x] Component tests passing (Quality)
- [x] No performance regressions (Framework + Responsive)

### Post-Merge Actions
- [ ] Monitor analytics for feature adoption (Insight - future)
- [ ] Add achievements for hyperfixation milestones (Dopamine - future)
- [ ] Implement data persistence (Framework - follow-up)

---

## 🎯 Lessons Learned

**What Worked Well:**
1. **Early Pixel review** prevented design system violations
2. **Framework hook extraction** made testing easy
3. **Quality tests** caught edge cases before implementation

**What to Improve:**
1. Could have added Dopamine agent for achievement integration from start
2. Data persistence should have been in initial scope
3. Integration tests could be more comprehensive

---

## 📚 Artifacts Generated

**Code Files:**
- `/src/components/bento/HyperfixationTracker.tsx`
- `/src/hooks/useHyperfixation.ts`
- `/src/store/hyperfixationStore.ts`
- `/src/types/index.ts` (updated)
- `/App.tsx` (updated)

**Test Files:**
- `/src/hooks/__tests__/useHyperfixation.test.ts`
- `/src/components/bento/__tests__/HyperfixationTracker.test.tsx`

**Review Checklists:**
- Pixel component review (filled out)
- Framework architecture review (filled out)
- Quality testing review (filled out)

---

## 🎉 Result

**Feature Status:** ✅ **PRODUCTION READY**

The multi-agent review process ensured:
- 🎨 **Visual consistency** with design system
- 🏗️ **Solid architecture** for maintainability
- 🧪 **Comprehensive testing** for reliability
- ♿ **Accessibility** for all users
- 📱 **Responsive design** across devices

**Time saved on bug fixes:** ~2-3 hours (issues caught in review, not production)
**Confidence level:** **Very High** (multiple expert reviews)

---

**Next Steps:** Deploy to production and start tracking those hyperfixations! 🚀
