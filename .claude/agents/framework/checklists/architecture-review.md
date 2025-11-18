# 🏗️ Framework Architecture Review Checklist

**Agent:** Framework (Code Architecture & System Design Guardian)
**Review Type:** Feature Architecture Review
**Date:** _____________

---

## 📋 FEATURE INFORMATION

**Feature Name:** ___________________________________
**Feature Type:** [ ] New Feature [ ] Enhancement [ ] Refactor [ ] Bug Fix
**Complexity:** [ ] Simple [ ] Moderate [ ] Complex [ ] Epic
**Affected Files:** ___________________________________
**Reviewer:** ___________________________________

---

## 🎯 TYPESCRIPT TYPE SAFETY

### Type Coverage
- [ ] No `any` types (except justified third-party)
- [ ] All component props have interfaces
- [ ] All function parameters typed
- [ ] All function return types explicit
- [ ] All API responses have DTOs
- [ ] Proper use of generic types
- [ ] Union types used appropriately

**Type Safety Score:** ____ / 10

**Issues Found:**
```typescript
// File:Line - Issue
// Example: src/components/Foo.tsx:42 - Parameter 'data' has implicit 'any' type
```

### Type Quality
- [ ] No type assertions (`as`) unless necessary
- [ ] Strict null checks honored (no `!` unless safe)
- [ ] Discriminated unions for complex states
- [ ] Utility types used appropriately (Partial, Pick, Omit, etc.)
- [ ] Type inference leveraged (not over-specified)
- [ ] No circular type dependencies

**Issues Found:**
```typescript
// File:Line - Issue
```

---

## 🏛️ COMPONENT ARCHITECTURE

### Layered Structure
- [ ] Follows layered component hierarchy (Base → Layout → Feature → Container)
- [ ] Composition over inheritance used
- [ ] Single responsibility per component
- [ ] Proper separation of concerns
- [ ] No prop drilling (≤ 2 levels deep)
- [ ] Business logic NOT in components

**Architecture Alignment Score:** ____ / 10

**Issues Found:**
```
File:Line - Issue description
```

### Component Organization
- [ ] Imports grouped (react, libraries, local)
- [ ] Types/interfaces before component
- [ ] Hooks at top of component
- [ ] Handlers defined before render
- [ ] Styles after component (StyleSheet.create)
- [ ] File length reasonable (< 300 lines)

**Issues Found:**
```
File:Line - Issue description
```

### Props & Interfaces
- [ ] Props interface comprehensive
- [ ] Optional props have defaults
- [ ] Prop types appropriate (not too generic)
- [ ] Callback props named consistently (onAction, handleAction)
- [ ] Children prop typed (ReactNode, ReactElement, etc.)
- [ ] Props documented (JSDoc comments)

**Issues Found:**
```
File:Line - Issue description
```

---

## 🔄 STATE MANAGEMENT

### Local State (useState)
- [ ] useState used only for component-local state
- [ ] State updates are immutable
- [ ] State initialized properly
- [ ] No derived state (use useMemo instead)
- [ ] State shape normalized
- [ ] No duplicate state

**Issues Found:**
```
File:Line - Issue description
```

### Global State (Zustand)
- [ ] UI state in Zustand stores
- [ ] Store organized by domain
- [ ] Actions colocated with state
- [ ] Selectors used for derived data
- [ ] No redundant state
- [ ] Store properly typed

**Store Files:**
```
[ ] /src/store/focusStore.ts
[ ] /src/store/uiStore.ts
[ ] (other stores)
```

### Server State (React Query)
- [ ] API data managed by React Query
- [ ] Query keys properly namespaced
- [ ] Stale time configured appropriately
- [ ] Cache time reasonable
- [ ] Mutations invalidate queries
- [ ] Optimistic updates implemented (if needed)

**Query/Mutation Files:**
```
[ ] /src/hooks/useCalendarEvents.ts
[ ] (other query hooks)
```

---

## 🔌 SERVICE LAYER

### Service Organization
- [ ] API calls in service layer (NOT components)
- [ ] Services use dependency injection
- [ ] Service methods well-named
- [ ] Services export singleton instances
- [ ] Service files organized by domain

**Service Files:**
```
[ ] /src/services/api/calendar.ts
[ ] /src/services/voice/speechToText.ts
[ ] (other services)
```

### Error Handling
- [ ] Try-catch around async operations
- [ ] Errors properly typed (Error, ApiError, etc.)
- [ ] User-friendly error messages
- [ ] Errors logged appropriately
- [ ] Retry logic for network requests
- [ ] Error boundaries in place

**Issues Found:**
```
File:Line - Issue description
```

### API Integration
- [ ] API responses transformed (DTO → Model)
- [ ] Authentication handled properly
- [ ] Rate limiting considered
- [ ] Request/response interceptors used
- [ ] API client properly configured
- [ ] Environment variables used for keys

**Issues Found:**
```
File:Line - Issue description
```

---

## 🪝 CUSTOM HOOKS

### Hook Quality
- [ ] Hooks encapsulate reusable logic
- [ ] Hooks follow naming convention (`use*`)
- [ ] Hooks handle cleanup (useEffect return)
- [ ] Dependency arrays correct
- [ ] Callbacks memoized (useCallback)
- [ ] Expensive computations memoized (useMemo)

**Hook Files:**
```
[ ] /src/hooks/useFocusTimer.ts
[ ] (other hooks)
```

### Hook Best Practices
- [ ] No hooks inside conditionals
- [ ] No hooks inside loops
- [ ] Hooks return stable references
- [ ] Hooks properly typed
- [ ] Hooks testable (no tight coupling)
- [ ] Hooks documented

**Issues Found:**
```
File:Line - Issue description
```

---

## ⚡ PERFORMANCE

### Render Optimization
- [ ] No unnecessary re-renders
- [ ] Components memoized appropriately (React.memo)
- [ ] Expensive computations memoized (useMemo)
- [ ] Callbacks memoized (useCallback)
- [ ] Context usage optimized
- [ ] State updates batched

**Performance Score:** ____ / 10

**Issues Found:**
```
File:Line - Issue description
```

### Data & Assets
- [ ] Large lists virtualized (FlatList)
- [ ] Images optimized and lazy-loaded
- [ ] Heavy data processing moved to workers (if needed)
- [ ] Proper cleanup prevents memory leaks
- [ ] Bundle size impact minimal

**Issues Found:**
```
File:Line - Issue description
```

### Animation Performance
- [ ] Animations use native driver
- [ ] reanimated used for complex animations
- [ ] 60 FPS target maintained
- [ ] No layout thrashing

**Issues Found:**
```
File:Line - Issue description
```

---

## 🎨 CODE QUALITY

### Naming & Style
- [ ] Descriptive variable names
- [ ] Consistent naming conventions
- [ ] PascalCase for components
- [ ] camelCase for functions/variables
- [ ] SCREAMING_SNAKE_CASE for constants
- [ ] No single-letter variables (except i, j in loops)

**Issues Found:**
```
File:Line - Issue description
```

### Function Quality
- [ ] Functions small and focused (< 50 lines)
- [ ] Functions do ONE thing well
- [ ] Function names describe action
- [ ] Parameters limited (≤ 4)
- [ ] Pure functions where possible
- [ ] Side effects isolated

**Issues Found:**
```
File:Line - Issue description
```

### Code Cleanliness
- [ ] No dead code
- [ ] No commented code
- [ ] No console.logs in production
- [ ] DRY principle followed
- [ ] Consistent code formatting
- [ ] Imports organized

**Issues Found:**
```
File:Line - Issue description
```

---

## 📚 DOCUMENTATION

### Code Comments
- [ ] Complex logic has comments
- [ ] Comments explain "why", not "what"
- [ ] JSDoc comments on public APIs
- [ ] Type definitions self-documenting
- [ ] TODOs have context and owner

**Issues Found:**
```
File:Line - Issue description
```

### Documentation Files
- [ ] README updated (if needed)
- [ ] API documentation current
- [ ] Architecture decisions recorded (if significant)
- [ ] Examples provided for reusable utilities

**Documentation Score:** ____ / 10

---

## 🧪 TESTABILITY

### Code Structure
- [ ] Code is testable (no tight coupling)
- [ ] Dependencies can be mocked
- [ ] Pure functions extracted
- [ ] Side effects isolated
- [ ] Services use dependency injection

**Testability Score:** ____ / 10

**Issues Found:**
```
File:Line - Issue description
```

---

## 📊 REVIEW SUMMARY

### Overall Assessment
- [ ] ✅ **APPROVED** - Excellent architecture
- [ ] 🔄 **APPROVED WITH RECOMMENDATIONS** - Minor improvements suggested
- [ ] ⚠️ **NEEDS REVISION** - Significant architectural issues
- [ ] ❌ **BLOCKED** - Critical violations

### Severity Breakdown
- **Critical Issues:** _____ (must fix)
- **High Priority:** _____ (should fix)
- **Medium Priority:** _____ (nice to have)
- **Low Priority:** _____ (optional)

### Architecture Score Card
- TypeScript Type Safety: ____ / 10
- Component Architecture: ____ / 10
- State Management: ____ / 10
- Service Layer: ____ / 10
- Custom Hooks: ____ / 10
- Performance: ____ / 10
- Code Quality: ____ / 10
- Documentation: ____ / 10
- Testability: ____ / 10

**Overall Score:** ____ / 90

---

## 💬 DETAILED FEEDBACK

### Critical Issues (Blocking)
```
1.
2.
3.
```

### High Priority Recommendations
```
1.
2.
3.
```

### Suggested Improvements
```
1.
2.
3.
```

### Architectural Highlights
```
1.
2.
3.
```

---

## 🔄 REFACTORING SUGGESTIONS

### Recommended Refactors
```
1. Extract business logic to custom hook:
   - Current: Logic in component
   - Suggested: Create /src/hooks/useFeatureName.ts

2. Move API calls to service layer:
   - Current: fetch() in component
   - Suggested: Create /src/services/api/feature.ts

3. (Additional refactors)
```

---

## 🎯 NEXT STEPS

### Required Actions
1. ___________________________________
2. ___________________________________
3. ___________________________________

### Recommended Actions
1. ___________________________________
2. ___________________________________
3. ___________________________________

### Estimated Time: ________ hours

---

## 📝 REVIEWER NOTES

```
Additional context, architectural observations, or long-term recommendations:


```

---

**Reviewer Signature:** ___________________________________
**Date Completed:** ___________________________________
