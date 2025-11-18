# 🎨 Pixel Component Review Checklist

**Agent:** Pixel (UI/UX Design System Guardian)
**Review Type:** Component Design Review
**Date:** _____________

---

## 📋 FEATURE INFORMATION

**Feature Name:** ___________________________________
**Component(s):** ___________________________________
**Affected Files:** ___________________________________
**Reviewer:** ___________________________________

---

## ✅ DESIGN TOKEN COMPLIANCE

### Colors
- [ ] All colors use `colors` constants (no hardcoded hex values)
- [ ] Proper semantic color usage (`colors.brand.primary`, `colors.ui.surface`, etc.)
- [ ] Color contrast ratio ≥ 4.5:1 for all text
- [ ] No "purple wash" (balanced color usage across brand palette)
- [ ] Solid colors only (no gradients except primary CTAs)
- [ ] Terminal aesthetic colors used appropriately

**Issues Found:**
```
File:Line - Issue description
```

### Typography
- [ ] All font sizes use `typography` constants
- [ ] All font weights use `typography` weights
- [ ] Proper font family usage (UI: system, Data: mono, Display: heavy)
- [ ] Typography hierarchy maintained (display > heading > body > caption)
- [ ] Line heights appropriate (tight: headings, normal: body, relaxed: long-form)
- [ ] No hardcoded font values

**Issues Found:**
```
File:Line - Issue description
```

### Spacing
- [ ] All spacing uses `spacing` constants (xs, sm, md, lg, xl, etc.)
- [ ] Touch targets meet device minimums (56px mobile / 48px tablet / 44px desktop)
- [ ] Card padding uses device-specific values
- [ ] Gaps between elements use spacing scale
- [ ] Safe areas respected (status bar, bottom nav, home indicator)
- [ ] No magic number spacing values

**Issues Found:**
```
File:Line - Issue description
```

### Breakpoints
- [ ] Responsive behavior uses `breakpoints` constants
- [ ] Component receives `deviceType` prop
- [ ] Layout adapts for mobile (< 768px)
- [ ] Layout adapts for tablet (768px - 1279px)
- [ ] Layout adapts for desktop (≥ 1280px)
- [ ] No hardcoded width breakpoints

**Issues Found:**
```
File:Line - Issue description
```

---

## 📱 RESPONSIVE DESIGN

### Mobile (320px - 767px)
- [ ] Component tested on iPhone SE (320px)
- [ ] Component tested on iPhone 14 Pro (393px)
- [ ] Single column layout used
- [ ] Touch targets ≥ 56px
- [ ] Text readable (minimum 14px)
- [ ] Padding appropriate (16px default)
- [ ] No horizontal scrolling

**Screenshots/Notes:**
```
[Attach mobile screenshots or describe issues]
```

### Tablet (768px - 1279px)
- [ ] Component tested on iPad (768px)
- [ ] Two column layout (if applicable)
- [ ] Touch targets ≥ 48px
- [ ] Padding increased (20px default)
- [ ] Equal height cards in same row
- [ ] Optimal content width maintained

**Screenshots/Notes:**
```
[Attach tablet screenshots or describe issues]
```

### Desktop (≥ 1280px)
- [ ] Component tested on desktop (1280px+)
- [ ] Two column layout with max width
- [ ] Touch targets ≥ 44px (mouse-friendly)
- [ ] Padding increased (24px default)
- [ ] Hover states work properly
- [ ] Content doesn't stretch excessively

**Screenshots/Notes:**
```
[Attach desktop screenshots or describe issues]
```

---

## ♿ ACCESSIBILITY

### WCAG 2.1 AA Compliance
- [ ] Color contrast ≥ 4.5:1 for normal text
- [ ] Color contrast ≥ 3:1 for large text (18px+)
- [ ] Color contrast ≥ 3:1 for UI components
- [ ] Touch targets ≥ minimum size for device
- [ ] Focus indicators visible and high contrast
- [ ] No information conveyed by color alone

**Contrast Check Results:**
```
Element        | Foreground | Background | Ratio  | Pass/Fail
---------------|------------|------------|--------|----------
               |            |            |        |
```

### React Native Accessibility
- [ ] All interactive elements have `accessibilityRole`
- [ ] All interactive elements have `accessibilityLabel`
- [ ] Icons have descriptive labels
- [ ] Images have `alt` text or labels
- [ ] Buttons have clear purpose labels
- [ ] Form inputs have associated labels
- [ ] Loading/error states announced to screen readers

**Issues Found:**
```
File:Line - Issue description
```

### Keyboard & Screen Reader
- [ ] All interactive elements keyboard accessible (web)
- [ ] Focus order logical
- [ ] Skip links provided for long content
- [ ] Screen reader announcements appropriate
- [ ] Dynamic content changes announced

**Issues Found:**
```
File:Line - Issue description
```

---

## 🎴 BENTO GRID INTEGRATION

### Layout Compliance
- [ ] Card fits 1 or 2 column grid
- [ ] Card uses `BentoGrid` layout component
- [ ] Card height appropriate (no excessive whitespace)
- [ ] Card order makes sense (priority-based)
- [ ] Maximum 6 cards visible at once
- [ ] Vertical scrolling for overflow

**Issues Found:**
```
File:Line - Issue description
```

### Card Design
- [ ] Uses base `Card` component
- [ ] Border radius: 12px (default)
- [ ] Background: `colors.ui.surface`
- [ ] Border: 1px solid `colors.ui.border`
- [ ] Padding: device-specific from `spacing.card.padding`
- [ ] Consistent with existing bento cards

**Issues Found:**
```
File:Line - Issue description
```

---

## 🎨 VISUAL CONSISTENCY

### Hypermaximalist Retro Aesthetic
- [ ] Vivid, saturated colors used appropriately
- [ ] Terminal/retro vibe maintained
- [ ] Bold, playful design elements
- [ ] Consistent with existing app aesthetic
- [ ] No minimalist or muted design patterns

**Visual Alignment Score:** ____ / 10

### Component Consistency
- [ ] Matches existing component patterns
- [ ] Reuses base components (Card, Text, etc.)
- [ ] Follows established UI patterns
- [ ] Icons consistent with app style
- [ ] Button styles match app conventions

**Issues Found:**
```
File:Line - Issue description
```

---

## ✨ ANIMATION & INTERACTIONS

### Animation Quality
- [ ] Animations run at 60 FPS
- [ ] Animations use approved patterns (pulse/spin/bounce/slide/fade)
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Animation durations appropriate (150ms/300ms/500ms)
- [ ] Native driver enabled (`useNativeDriver: true`)
- [ ] No janky or laggy animations

**Animation Performance:**
```
Animation Name | FPS | Duration | Native Driver | Pass/Fail
---------------|-----|----------|---------------|----------
               |     |          |               |
```

### Interaction States
- [ ] Hover states (desktop/web)
- [ ] Active/pressed states
- [ ] Focus states (keyboard navigation)
- [ ] Disabled states
- [ ] Loading states
- [ ] Error states

**Issues Found:**
```
File:Line - Issue description
```

---

## 🏗️ COMPONENT ARCHITECTURE

### Code Organization
- [ ] No inline styles (uses `StyleSheet.create`)
- [ ] Styles organized logically
- [ ] Receives `deviceType` prop for responsiveness
- [ ] Uses composition (builds on base components)
- [ ] Proper TypeScript interfaces for props
- [ ] No hardcoded magic values

**Issues Found:**
```
File:Line - Issue description
```

---

## 📊 REVIEW SUMMARY

### Overall Assessment
- [ ] ✅ **APPROVED** - Meets all design standards
- [ ] 🔄 **APPROVED WITH RECOMMENDATIONS** - Minor improvements suggested
- [ ] ⚠️ **NEEDS REVISION** - Significant issues to address
- [ ] ❌ **BLOCKED** - Critical design violations

### Severity Breakdown
- **Critical Issues:** _____ (must fix before approval)
- **High Priority:** _____ (should fix)
- **Medium Priority:** _____ (nice to have)
- **Low Priority:** _____ (optional improvements)

### Design System Score
- Design Token Compliance: ____ / 10
- Responsive Design: ____ / 10
- Accessibility: ____ / 10
- Bento Grid Integration: ____ / 10
- Visual Consistency: ____ / 10
- Animation Quality: ____ / 10

**Overall Score:** ____ / 60

---

## 💬 DETAILED FEEDBACK

### Critical Issues (Must Fix)
```
1.
2.
3.
```

### High Priority Suggestions
```
1.
2.
3.
```

### Nice to Have Improvements
```
1.
2.
3.
```

### Highlights (What's Working Well)
```
1.
2.
3.
```

---

## 🎯 NEXT STEPS

### Required Actions
1. ___________________________________
2. ___________________________________
3. ___________________________________

### Estimated Time to Address: ________ hours

### Ready for Next Review?
- [ ] Yes - All critical issues resolved
- [ ] No - Awaiting fixes for: _________________

---

## 📝 REVIEWER NOTES

```
Additional context, observations, or recommendations:


```

---

**Reviewer Signature:** ___________________________________
**Date Completed:** ___________________________________
