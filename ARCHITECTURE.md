# 🧠 UNIVERSAL HYPERFIXATION FRAMEWORK
## Architecture & Design Document

## 🎯 Core Vision

Build a **universal hyperfixation amplifier** that adapts to ANY interest domain dynamically. Instead of building N features for N interests, build ONE framework that evolves with your brain.

---

## 🏗️ System Architecture

### Layer 1: Domain Intelligence Layer
**Purpose**: Understand what you're obsessed with RIGHT NOW

```typescript
HyperfixationDomain {
  - Domain identification & classification
  - Lifecycle phase tracking (Discovery → Deep Dive → Mastery → Transition)
  - Intensity & engagement metrics
  - Automatic onboarding & setup
}
```

### Layer 2: Universal Pattern Layer
**Purpose**: Recognize patterns across ALL fixations

```typescript
UniversalPatterns {
  - Research & learning patterns
  - Practice & experimentation workflows
  - Creation & sharing behaviors
  - Resource acquisition patterns
  - Community engagement cycles
}
```

### Layer 3: Adaptive Interface Layer
**Purpose**: Dynamically reconfigure UI for current domain

```typescript
AdaptiveUI {
  - Dynamic card generation based on domain
  - Context-aware voice commands
  - Domain-specific integrations
  - Personalized resource suggestions
}
```

### Layer 4: Knowledge Graph Layer
**Purpose**: Connect insights across ALL your interests

```typescript
KnowledgeGraph {
  - Cross-fixation connections
  - Skill transfer mapping
  - Portfolio career building
  - Interest archaeology & retrieval
}
```

---

## 📊 Data Model

### Core Entities

#### 1. HyperfixationDomain
Represents a single interest/obsession

```typescript
interface HyperfixationDomain {
  id: string;
  name: string;
  category: DomainCategory;
  status: 'active' | 'dormant' | 'archived';
  intensityScore: number; // 0-100

  // Lifecycle
  currentPhase: LifecyclePhase;
  discoveryDate: Date;
  lastActiveDate: Date;

  // Patterns
  typicalSessionDuration: number;
  preferredTimeOfDay: TimeRange[];
  resourcesInvested: ResourceInvestment;

  // Metadata
  commonTools: Tool[];
  relatedDomains: string[]; // IDs of connected domains
  communityPlatforms: Platform[];

  // AI-generated
  suggestedWorkflows: Workflow[];
  suggestedIntegrations: Integration[];
  learningPathway: LearningMilestone[];
}

type DomainCategory =
  | 'creative'      // pottery, music, art, writing
  | 'technical'     // coding, trading, data science
  | 'physical'      // climbing, dancing, martial arts
  | 'intellectual'  // languages, philosophy, history
  | 'social'        // community organizing, teaching
  | 'entrepreneurial' // business, investing, side projects
  | 'digital_creative' // video editing, graphic design
  | 'collecting'    // cards, sneakers, vinyl
  | 'gaming'        // competitive games, speedrunning
  | 'wellness';     // fitness, nutrition, meditation

type LifecyclePhase =
  | 'discovery'     // Information hoarding, tool research
  | 'deep_dive'     // Intensive learning, skill acquisition
  | 'mastery'       // Advanced techniques, teaching others
  | 'integration'   // Combining with other interests
  | 'transition'    // Winding down, documentation
  | 'dormant'       // Inactive but may resurface
  | 'archived';     // Fully complete/moved on
```

#### 2. UniversalCommand
Voice/text commands that adapt to any domain

```typescript
interface UniversalCommand {
  id: string;
  pattern: CommandPattern;
  currentDomainContext: string; // Current fixation ID

  // Examples for current context
  examplePhrases: string[];

  // Execution
  intent: CommandIntent;
  parameters: CommandParameter[];
  executionHistory: CommandExecution[];
}

type CommandPattern =
  | 'research'          // "Research [topic] for [duration]"
  | 'practice'          // "Block practice time for [skill]"
  | 'create'            // "Start [project type] project"
  | 'track'             // "Track progress on [technique]"
  | 'schedule'          // "Schedule [activity] for [time]"
  | 'connect'           // "Find experts in [domain]"
  | 'compare'           // "Compare [tool A] vs [tool B]"
  | 'document'          // "Document today's [activity] session"
  | 'share'             // "Share progress on [platform]"
  | 'transition'        // "Archive [old] and start [new]"
  | 'optimize'          // "Optimize my [workflow] for [goal]"
  | 'reflect';          // "Review my progress in [domain]"

// Pattern examples:
// Pottery: "Research glazing techniques for 2 hours"
// Crypto: "Research DeFi protocols for 2 hours"
// Urban planning: "Research zoning laws for 2 hours"
```

#### 3. DynamicCard
Cards that reconfigure for each domain

```typescript
interface DynamicCard {
  id: string;
  archetype: CardArchetype;
  currentConfig: CardConfiguration;

  // Adaptive content
  title: string; // "Trading Dashboard" vs "Pottery Studio Tracker"
  dataSource: DataSource;
  visualizationType: VisualizationType;

  // Lifecycle awareness
  relevantInPhases: LifecyclePhase[];
  priorityByPhase: Record<LifecyclePhase, number>;
}

type CardArchetype =
  | 'obsession_command_center'  // Main hero card, dynamically titled
  | 'knowledge_hub'              // Learning resources for any topic
  | 'practice_tracker'           // Experimentation & skill building
  | 'resource_manager'           // Tools, equipment, budget
  | 'community_finder'           // Experts, meetups, platforms
  | 'progress_visualizer'        // Stats & milestones
  | 'cross_pollination'          // Connections to other interests
  | 'memory_palace';             // Archive & retrieve past fixations
```

#### 4. ResourceInvestment
Track tools, money, time across domains

```typescript
interface ResourceInvestment {
  domainId: string;

  // Time
  totalHoursInvested: number;
  averageSessionLength: number;
  sessionsPerWeek: number;

  // Money
  toolsPurchased: Tool[];
  subscriptions: Subscription[];
  courses: Course[];
  totalMoneyInvested: number;

  // Space
  physicalSpace?: {
    location: string;
    size: number;
    storageUsed: number;
  };
  digitalSpace?: {
    filesStored: number;
    bookmarksCollected: number;
    notesCreated: number;
  };

  // Skills acquired
  skillsLearned: Skill[];
  techniquesManaged: string[];
  certificationsEarned: string[];
}
```

#### 5. KnowledgeConnection
Links between different fixations

```typescript
interface KnowledgeConnection {
  id: string;
  domainA: string;
  domainB: string;
  connectionType: ConnectionType;
  strength: number; // 0-100

  insights: string[];
  transferableSkills: Skill[];
  combinationOpportunities: string[];

  discoveredAt: Date;
  lastReinforcedAt: Date;
}

type ConnectionType =
  | 'skill_transfer'      // Skill from A applies to B
  | 'conceptual_overlap'  // Similar concepts/patterns
  | 'tool_sharing'        // Same tools/software used
  | 'community_overlap'   // Same people/platforms
  | 'creative_fusion'     // Could combine A+B into new thing
  | 'career_synergy';     // Professional opportunities
```

---

## 🎤 Universal Command System

### Command Architecture

Every command follows this pattern:
```
[ACTION] [SUBJECT] [CONTEXT] [MODIFIERS]
```

The **ACTION** stays the same, the **SUBJECT** adapts to your current fixation:

| Universal Action | Pottery Example | Crypto Example | Urban Planning Example |
|------------------|-----------------|----------------|------------------------|
| Research [topic] for [time] | Research glazing techniques for 2 hours | Research DeFi protocols for 2 hours | Research zoning laws for 2 hours |
| Block practice time for [skill] | Block practice time for wheel throwing | Block practice time for technical analysis | Block practice time for CAD modeling |
| Track progress on [technique] | Track progress on centering clay | Track progress on options strategies | Track progress on 3D rendering |
| Find experts in [area] | Find experts in raku firing | Find experts in algorithmic trading | Find experts in sustainable architecture |
| Start [project type] | Start new bowl series | Start new trading strategy | Start neighborhood redesign project |

### Context Injection

When you say "Research [X]", the AI knows:
- What domain you're currently fixated on
- What phase you're in (Discovery vs Mastery changes resources)
- What you've already learned (avoid redundancy)
- What's next in your learning pathway
- Who the experts are in this space
- What tools you'll need to explore this

---

## 🎨 Dynamic UI Generation

### Card Configuration Matrix

Each card archetype reconfigures based on domain and lifecycle phase:

#### Example: "Obsession Command Center" Card

**When fixated on Pottery (Deep Dive phase):**
```typescript
{
  title: "🏺 Pottery Studio Command Center",
  primaryActions: [
    "Schedule kiln firing",
    "Track glaze tests",
    "Find local clay suppliers",
    "Document piece progress"
  ],
  metrics: [
    "Pieces completed this month",
    "Hours on wheel",
    "Firing success rate"
  ],
  resources: [
    "Studio membership hours remaining",
    "Clay inventory",
    "Next workshop date"
  ]
}
```

**When fixated on Crypto Trading (Discovery phase):**
```typescript
{
  title: "💹 Crypto Research Command Center",
  primaryActions: [
    "Research new protocol",
    "Compare exchange fees",
    "Study technical analysis",
    "Paper trade strategy"
  ],
  metrics: [
    "Hours researched",
    "Concepts learned",
    "Paper trading win rate"
  ],
  resources: [
    "Courses in progress",
    "Bookmarked analysis tools",
    "Discord communities joined"
  ]
}
```

### Responsive Card Priority

Card importance changes by lifecycle phase:

| Card Type | Discovery | Deep Dive | Mastery | Transition |
|-----------|-----------|-----------|---------|------------|
| Knowledge Hub | 🔥🔥🔥 | 🔥🔥 | 🔥 | 🔥 |
| Practice Tracker | 🔥 | 🔥🔥🔥 | 🔥🔥 | 🔥 |
| Community Finder | 🔥🔥 | 🔥🔥🔥 | 🔥🔥🔥 | 🔥 |
| Resource Manager | 🔥🔥 | 🔥🔥 | 🔥 | 🔥 |
| Memory Palace | - | 🔥 | 🔥🔥 | 🔥🔥🔥 |

---

## 🤖 AI Integration Points

### 1. Domain Detection
```typescript
// Triggers that suggest new fixation:
- "I'm obsessed with [X]" in voice/text
- Calendar shows new recurring activities
- Browser history shows deep research sessions
- Purchases related to new domain
- Following new experts/communities
```

### 2. Auto-Onboarding Workflow
```typescript
When new domain detected:
1. Classify domain (creative, technical, physical, etc.)
2. Ask clarifying questions:
   - "Are you learning or already experienced?"
   - "What got you interested in this?"
   - "What's your goal with [domain]?"
3. Generate initial setup:
   - Recommend learning resources
   - Suggest tools/equipment
   - Find relevant communities
   - Create starter workflows
   - Set up progress tracking
4. Configure UI:
   - Generate domain-specific cards
   - Update voice command context
   - Adjust notification preferences
```

### 3. Cross-Domain Intelligence
```typescript
// Automatically discover connections:
Pottery + Coding = "Explore computational ceramic design"
Trading + Statistics = "Build quantitative trading models"
Urban Planning + Gaming = "Try Cities: Skylines for planning practice"
Climbing + Physics = "Study force vectors and movement optimization"
```

### 4. Predictive Transitions
```typescript
// Detect when fixation is waning:
- Session frequency decreasing
- Engagement depth declining
- New domain research starting
- Completion language ("finished X", "mastered Y")

Action: Trigger knowledge preservation workflow
```

---

## 🔌 Integration Architecture

### Integration Discovery Engine

When new domain detected, suggest relevant APIs/services:

```typescript
interface IntegrationSuggestion {
  domainId: string;
  suggestedIntegrations: {
    name: string;
    type: 'api' | 'webhook' | 'oauth' | 'zapier';
    useCase: string;
    priority: number;
  }[];
}

// Example for Pottery:
{
  domainId: "pottery_2025_01",
  suggestedIntegrations: [
    {
      name: "Instagram API",
      type: "oauth",
      useCase: "Auto-post finished pieces to portfolio",
      priority: 90
    },
    {
      name: "Etsy API",
      type: "api",
      useCase: "Track shop analytics and manage listings",
      priority: 70
    },
    {
      name: "Studio Management System",
      type: "webhook",
      useCase: "Sync kiln schedules and studio bookings",
      priority: 85
    }
  ]
}
```

### Universal Integration Patterns

All domains share common integration needs:
- **Social**: Share progress (Instagram, Twitter, Discord)
- **Calendar**: Block time (Google Calendar, Notion Calendar)
- **Notes**: Capture insights (Notion, Obsidian, Roam)
- **Commerce**: Track spending (Mint, YNAB, personal finance APIs)
- **Learning**: Course progress (Udemy, Coursera, YouTube)
- **Community**: Find people (Discord, Reddit, Meetup)

---

## 📱 Mobile-First Considerations

### Progressive Information Disclosure

**Mobile (320px - 767px):**
- Focus on ONE active domain
- Quick actions only
- Minimal stats
- Voice-first interaction

**Tablet (768px - 1023px):**
- Show current + 1 dormant domain
- Extended metrics
- Side-by-side comparisons
- Mixed voice + touch

**Desktop (1024px+):**
- Multi-domain dashboard
- Full knowledge graph
- Deep analytics
- Keyboard shortcuts + voice

---

## 🎯 Implementation Roadmap

### Phase 1: Foundation (Week 1-2)
- [ ] Create new type system (`src/types/hyperfixation.ts`)
- [ ] Design database schema
- [ ] Build domain detection logic
- [ ] Implement basic dynamic card system

### Phase 2: Intelligence (Week 3-4)
- [ ] Universal command pattern system
- [ ] AI-powered domain classification
- [ ] Auto-onboarding workflow
- [ ] Integration suggestion engine

### Phase 3: Knowledge Graph (Week 5-6)
- [ ] Cross-fixation connection detection
- [ ] Skill transfer mapping
- [ ] Memory palace interface
- [ ] Transition workflow automation

### Phase 4: Polish (Week 7-8)
- [ ] Adaptive UI refinement
- [ ] Performance optimization
- [ ] Onboarding experience
- [ ] Documentation & examples

---

## 🧪 Example User Journeys

### Journey 1: Discovery → Deep Dive

```
Day 1: "I'm obsessed with pottery"
→ App creates pottery domain
→ Asks: skill level, goals, budget
→ Generates: learning pathway, tool wishlist, studio finder
→ Updates voice commands: "Find pottery wheels under $500"

Week 2: Deep into practice
→ App suggests: daily practice tracking
→ Recommends: Instagram pottery community
→ Creates: glaze test experiment tracker
→ Voice: "Block 3 hours for wheel practice Saturday"

Month 2: Progress visible
→ App shows: 24 pieces completed, 48 hours practiced
→ Suggests: first Etsy listing, teach beginner workshop
→ Connects: pottery + previous coding interest = "Build pottery studio booking software"
```

### Journey 2: Multi-Domain Portfolio

```
Active Domains:
- Web Development (Mastery phase)
- Crypto Trading (Deep Dive phase)
- Urban Planning (Discovery phase)

Cross-domain insights:
→ "Your web dev skills + trading interest = Build algorithmic trading platform"
→ "Your planning research + dev expertise = Create civic tech projects"
→ "Consider: Blockchain for urban planning (combines all three!)"

Career opportunities:
→ "Your unique combination = PropTech + DeFi startup potential"
```

---

## 🔮 Future Vision

### Hyperfixation Social Network
- Find others with same interest combinations
- Share workflows and automations
- Collaborative projects across domains

### AI Fixation Coach
- "You're at risk of burnout in pottery - suggest transition?"
- "Your trading passion is waning but options remain - pivot to teaching?"
- "You keep circling back to music - make it permanent?"

### Portfolio Career Builder
- Map fixations to income opportunities
- Suggest unique market positions
- Connect skills into valuable combinations

---

**This isn't a productivity app. It's a brain amplifier that grows with you, forever.**
