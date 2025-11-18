# 🧪 Quality Testing & QA Review Checklist

**Agent:** Quality (Automated Testing & Quality Assurance Guardian)
**Review Type:** Testing & Quality Review
**Date:** _____________

---

## 📋 FEATURE INFORMATION

**Feature Name:** ___________________________________
**Feature Type:** [ ] New Feature [ ] Enhancement [ ] Bug Fix [ ] Refactor
**Complexity:** [ ] Simple [ ] Moderate [ ] Complex [ ] Epic
**Files Changed:** ___________________________________
**Reviewer:** ___________________________________

---

## 📊 TEST COVERAGE ANALYSIS

### Overall Coverage
- **Total Coverage:** _____%
- **Statements:** _____%
- **Branches:** _____%
- **Functions:** _____%
- **Lines:** _____%

**Target:** ≥ 80% coverage
**Status:** [ ] ✅ Meets target [ ] ⚠️ Below target

### Coverage Breakdown
```
File/Directory                    | Statements | Branches | Functions | Lines
----------------------------------|------------|----------|-----------|-------
src/components/                   |     %      |    %     |    %      |   %
src/hooks/                        |     %      |    %     |    %      |   %
src/services/                     |     %      |    %     |    %      |   %
src/utils/                        |     %      |    %     |    %      |   %
```

### Uncovered Code
```
File:Lines - Reason not covered
```

---

## 🧪 UNIT TESTING

### Unit Test Existence
- [ ] Tests exist for all utilities
- [ ] Tests exist for all pure functions
- [ ] Tests exist for all custom hooks
- [ ] Tests exist for all services
- [ ] Tests exist for data transformations
- [ ] Tests exist for validation logic

**Unit Test Files:**
```
[ ] src/utils/__tests__/responsive.test.ts
[ ] src/hooks/__tests__/useFocusTimer.test.ts
[ ] (list all unit test files)
```

### Unit Test Quality
- [ ] Tests are isolated (no interdependencies)
- [ ] Tests are deterministic (no flakiness)
- [ ] Tests are fast (< 100ms each)
- [ ] Descriptive test names (`it('should...')`)
- [ ] Arrange-Act-Assert pattern followed
- [ ] Edge cases covered
- [ ] Error cases tested

**Unit Test Score:** ____ / 10

**Issues Found:**
```
Test File - Issue description
```

---

## 🧩 COMPONENT TESTING

### Component Test Existence
- [ ] Tests exist for all new components
- [ ] Tests exist for modified components
- [ ] Tests cover component rendering
- [ ] Tests cover prop variations
- [ ] Tests cover user interactions
- [ ] Tests cover conditional rendering

**Component Test Files:**
```
[ ] src/components/ui/__tests__/Card.test.tsx
[ ] src/components/bento/__tests__/CommandCenter.test.tsx
[ ] (list all component test files)
```

### Component Test Quality
- [ ] Render tests (component displays correctly)
- [ ] Props tests (props affect output)
- [ ] Interaction tests (clicks, presses, inputs)
- [ ] Accessibility tests (labels, roles)
- [ ] Error state tests
- [ ] Loading state tests

**Component Test Score:** ____ / 10

**Issues Found:**
```
Test File - Issue description
```

---

## 🔗 INTEGRATION TESTING

### Integration Test Existence
- [ ] Tests exist for component + service interactions
- [ ] Tests exist for component + state interactions
- [ ] Tests exist for API + state + UI flows
- [ ] Tests exist for multi-component workflows

**Integration Test Files:**
```
[ ] src/features/__tests__/voice-command.integration.test.tsx
[ ] (list all integration test files)
```

### Integration Test Quality
- [ ] Wraps components in necessary providers (QueryClient, etc.)
- [ ] Mocks external services/APIs
- [ ] Tests complete user flows
- [ ] Tests error scenarios
- [ ] Tests loading states
- [ ] Verifies service calls

**Integration Test Score:** ____ / 10

**Issues Found:**
```
Test File - Issue description
```

---

## 🎭 E2E TESTING

### E2E Test Existence
- [ ] E2E tests for critical user journeys
- [ ] E2E tests for happy path workflows
- [ ] E2E tests for error recovery
- [ ] E2E tests for navigation flows

**E2E Test Files:**
```
[ ] e2e/focusTimer.e2e.ts
[ ] (list all E2E test files)
```

### E2E Test Quality
- [ ] Tests use stable testIDs
- [ ] Tests handle async properly (waitFor)
- [ ] Tests are independent
- [ ] Tests include setup/teardown
- [ ] Tests use meaningful assertions

**E2E Test Score:** ____ / 10

**E2E Test Status:**
- [ ] ✅ All passing
- [ ] ⚠️ Some failing: _______________
- [ ] ❌ Not implemented yet

---

## ♿ ACCESSIBILITY TESTING

### Accessibility Attributes
- [ ] All buttons have `accessibilityLabel`
- [ ] All buttons have `accessibilityRole="button"`
- [ ] All images have `accessibilityLabel`
- [ ] All inputs have associated labels
- [ ] All icons have descriptive labels
- [ ] Loading states announced
- [ ] Error states announced

**Accessibility Test Results:**
```
Component              | Missing Label | Wrong Role | Other Issue
-----------------------|---------------|------------|-------------
                       |               |            |
```

### WCAG 2.1 AA Compliance
- [ ] Color contrast ≥ 4.5:1 (normal text)
- [ ] Color contrast ≥ 3:1 (large text 18px+)
- [ ] Color contrast ≥ 3:1 (UI components)
- [ ] Touch targets ≥ 44px (iOS) / 48dp (Android)
- [ ] Focus indicators visible
- [ ] No color-only information

**Contrast Check Results:**
```
Element              | FG Color | BG Color | Ratio | Pass/Fail
---------------------|----------|----------|-------|----------
                     |          |          |       |
```

**Accessibility Score:** ____ / 10

**Issues Found:**
```
File:Line - Accessibility violation
```

---

## 🎯 CROSS-PLATFORM TESTING

### iOS Testing
- [ ] Tested on iOS simulator (iPhone SE)
- [ ] Tested on iOS simulator (iPhone 14 Pro)
- [ ] Tested on iOS simulator (iPad)
- [ ] Safe areas handled (notch, home indicator)
- [ ] iOS-specific interactions work
- [ ] iOS haptics work

**iOS Issues:**
```
Device - Issue description
```

### Android Testing
- [ ] Tested on Android emulator (Pixel 6)
- [ ] Tested on Android tablet
- [ ] Back button behavior correct
- [ ] Android-specific interactions work
- [ ] Material Design patterns followed (if applicable)

**Android Issues:**
```
Device - Issue description
```

### Web Testing
- [ ] Tested on Chrome
- [ ] Tested on Firefox
- [ ] Tested on Safari
- [ ] Keyboard navigation works
- [ ] Responsive breakpoints work

**Web Issues:**
```
Browser - Issue description
```

**Cross-Platform Score:** ____ / 10

---

## ⚡ PERFORMANCE TESTING

### Render Performance
- [ ] No unnecessary re-renders
- [ ] Components memoized appropriately
- [ ] Heavy lists virtualized (FlatList)
- [ ] Bundle size impact measured
- [ ] Memory leaks prevented

**Re-render Analysis:**
```
Component           | Unnecessary Re-renders | Fix Suggested
--------------------|------------------------|---------------
                    |                        |
```

### Animation Performance
- [ ] Animations run at 60 FPS
- [ ] Animations use native driver
- [ ] No layout thrashing
- [ ] Smooth transitions

**Animation FPS:**
```
Animation           | FPS | Native Driver | Pass/Fail
--------------------|-----|---------------|----------
                    |     |               |
```

### Network Performance
- [ ] API calls optimized
- [ ] Proper caching implemented
- [ ] Pagination for large datasets
- [ ] Retry logic for failed requests

**Performance Score:** ____ / 10

**Issues Found:**
```
File:Line - Performance issue
```

---

## 🛡️ ERROR HANDLING TESTING

### Error Scenarios Tested
- [ ] Network errors handled
- [ ] API errors displayed to user
- [ ] Validation errors shown
- [ ] Timeout errors handled
- [ ] Permission errors handled
- [ ] Fallback UI shown for errors

**Error Handling Tests:**
```
[ ] src/__tests__/error-handling.test.ts
```

### Error UI Testing
- [ ] Error boundaries in place
- [ ] User-friendly error messages
- [ ] Retry mechanisms work
- [ ] Error logging implemented

**Error Handling Score:** ____ / 10

**Issues Found:**
```
Scenario - Issue description
```

---

## 📏 CODE QUALITY METRICS

### Complexity Metrics
- **Average Cyclomatic Complexity:** _____
- **Max Function Length:** _____ lines
- **Max File Length:** _____ lines

**Targets:**
- Cyclomatic Complexity: < 10
- Function Length: < 50 lines
- File Length: < 300 lines

### Code Smells
- [ ] No duplicate code blocks
- [ ] No long parameter lists (> 4 params)
- [ ] No deeply nested conditionals (> 3 levels)
- [ ] No god objects/files

**Issues Found:**
```
File:Line - Code smell description
```

---

## 📚 TEST DOCUMENTATION

### Test Readability
- [ ] Test descriptions clear and descriptive
- [ ] Test organization logical (describe blocks)
- [ ] Complex test logic commented
- [ ] Mock data well-organized
- [ ] Test utilities documented

**Documentation Score:** ____ / 10

### Test Maintenance
- [ ] Tests are maintainable
- [ ] Tests don't test implementation details
- [ ] Tests use appropriate abstractions
- [ ] Test data factories used (if applicable)

**Issues Found:**
```
Test File - Documentation/maintenance issue
```

---

## 📊 REVIEW SUMMARY

### Overall Assessment
- [ ] ✅ **APPROVED** - Excellent test coverage and quality
- [ ] 🔄 **APPROVED WITH RECOMMENDATIONS** - Minor gaps to address
- [ ] ⚠️ **NEEDS ADDITIONAL TESTING** - Significant coverage gaps
- [ ] ❌ **BLOCKED** - Critical quality violations

### Severity Breakdown
- **Critical Issues:** _____ (must fix before merge)
- **High Priority:** _____ (should fix before merge)
- **Medium Priority:** _____ (fix in follow-up)
- **Low Priority:** _____ (nice to have)

### Quality Score Card
- Test Coverage: ____ / 10 (Target: ≥ 80%)
- Unit Testing: ____ / 10
- Component Testing: ____ / 10
- Integration Testing: ____ / 10
- E2E Testing: ____ / 10
- Accessibility: ____ / 10
- Cross-Platform: ____ / 10
- Performance: ____ / 10
- Error Handling: ____ / 10
- Test Documentation: ____ / 10

**Overall Score:** ____ / 100

---

## 💬 DETAILED FEEDBACK

### Critical Issues (Blocking)
```
1. Missing unit tests for useVoiceCommand hook
   - File: src/hooks/useVoiceCommand.ts
   - Impact: Core functionality untested
   - Required: Create src/hooks/__tests__/useVoiceCommand.test.ts

2.

3.
```

### High Priority Recommendations
```
1. Add integration test for voice command flow
   - Missing: Full user journey test
   - Suggested: Create src/features/__tests__/voice-command.integration.test.tsx

2.

3.
```

### Suggested Improvements
```
1. Improve test descriptions (use 'should' pattern)
2. Extract common test utilities to __mocks__/ folder
3. Add snapshot tests for complex components
```

### Quality Highlights
```
1. Excellent unit test coverage for utility functions ✨
2. Great accessibility testing practices 🎯
3. Comprehensive error handling tests 🛡️
```

---

## 🎯 MISSING TESTS

### High Priority Missing Tests
```
1. Unit Tests:
   [ ] src/hooks/useVoiceCommand.ts - NO TESTS
   [ ] src/utils/commandParser.ts - PARTIAL COVERAGE (45%)

2. Integration Tests:
   [ ] Voice command end-to-end flow
   [ ] Timer + achievements integration

3. E2E Tests:
   [ ] Complete focus session workflow
```

### Test Examples Needed
```typescript
// Example: src/hooks/__tests__/useVoiceCommand.test.ts
describe('useVoiceCommand', () => {
  it('should initialize with idle state', () => {
    const { result } = renderHook(() => useVoiceCommand());
    expect(result.current.status).toBe('idle');
  });

  it('should handle recording errors gracefully', async () => {
    // Test implementation
  });
});
```

---

## 🎯 NEXT STEPS

### Required Actions (Before Merge)
1. Add unit tests for `useVoiceCommand` hook
2. Fix accessibility label on voice button
3. Add integration test for voice → timer flow

### Recommended Actions
1. Improve test coverage to 80%+
2. Add E2E test for complete focus session
3. Add performance benchmarks for animations

### Estimated Time: ________ hours

---

## 📝 REVIEWER NOTES

```
Additional quality observations or long-term testing recommendations:


```

---

**Reviewer Signature:** ___________________________________
**Date Completed:** ___________________________________
