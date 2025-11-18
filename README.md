# 🧠 HYPERFOCUS AI

**The Ultimate ADHD/Hyperfixation Productivity Command Center**

A hypermaximalist, retro-futuristic productivity app built with React Native that feels like Duolingo had a baby with Motion and Claude, styled like an 80s sci-fi arcade game.

![Made for ADHD](https://img.shields.io/badge/Made%20for-ADHD-7C3AED)
![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6)

---

## ✨ Features

### 🎤 Voice Command Center
- **Hero Voice Button** with dramatic visual states (idle, listening, processing, success)
- Natural language processing powered by Claude AI
- Context-aware command execution
- Terminal-style command history

### ⏱️ Focus Timer
- **Circular progress ring** with smooth animations
- Multiple modes: Pomodoro, Hyperfocus, Custom
- Adaptive duration based on flow state detection
- Real-time streak tracking

### 📅 Smart Schedule
- AI-optimized time blocking
- Energy level optimization
- Horizontal timeline with color-coded blocks
- Drag-to-adjust scheduling (coming soon)

### 📊 Analytics & Gamification
- **Retro arcade-style achievements**
- XP progression system with levels
- Focus session tracking
- Streak rewards and celebrations

---

## 🚀 NEW FEATURES - Phase 1 (HIGH IMPACT, LOW EFFORT)

### 🏰 Memory Palace Builder
- **Visual spatial memory system** for any domain knowledge
- Create unlimited rooms for different topics/interests
- Place memory items with associations
- Retention score tracking
- Perfect for ADHD learners who think visually

### ⚡ Energy Level Prediction
- **Circadian productivity mapping** - Know your peak hours
- 24-hour energy forecasting with confidence metrics
- Visual energy chart showing patterns
- Predicts low energy periods to plan breaks
- Log actual energy to improve predictions

### 📋 Task Breakdown Engine
- **AI-powered task chunking** for executive function support
- Automatically breaks complex tasks into manageable steps
- Complexity scoring and time estimates
- Track completion progress
- Reduces overwhelm and decision fatigue

### 🔄 Interest Rotation Predictor
- **Hyperfixation cycle tracking** - Embrace your patterns
- Predicts when you'll rotate to next interest
- Shows intensity levels and active duration
- Suggests likely next interests based on history
- Helps plan transitions smoothly

### 🌐 Integration Discovery Engine
- **Automatic API orchestration** for your interests
- Discovers relevant integrations based on current focus
- Relevance scoring and recommendations
- One-click connection setup
- Supports Notion, Google Calendar, Spotify, GitHub, and more

### 🎨 Hypermaximalist Design
- **Solid color system** - No transparent washes
- **Bento grid layout** - Asymmetrical but balanced
- **Retro computing aesthetic** - Terminal green, amber warnings, pixel-perfect details
- **Mobile-first** - Designed for iPhone SE (320px) and up
- **Information choreography** - Rich animations for every interaction

---

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React Native (Expo)
- **State Management**: Zustand
- **UI Framework**: Custom design system
- **Animations**: React Native Reanimated
- **Backend**: Supabase (coming soon)
- **Voice**: OpenAI Whisper (coming soon)
- **AI**: Claude API (coming soon)

### 🤖 Agent System
HyperFocus AI uses a sophisticated multi-agent architecture:

- **🎨 Pixel Agent** - Visual Design & UI
- **🏛️ Framework Agent** - Data Architecture
- **🎤 Synapse Agent** - Voice & Input
- **🌉 Bridge Agent** - External Integrations
- **📱 Responsive Agent** - Cross-Platform Optimization
- **✅ Quality Agent** - Testing & Validation
- **📊 Insight Agent** - Analytics & Learning

Each new feature automatically triggers the appropriate agents for a complete implementation cycle.

### Project Structure
```
hyperfixated/
├── src/
│   ├── agents/             # 🤖 Agent system
│   │   ├── AgentOrchestrator.ts
│   │   ├── PixelAgent.ts
│   │   ├── FrameworkAgent.ts
│   │   ├── SynapseAgent.ts
│   │   ├── BridgeAgent.ts
│   │   ├── ResponsiveAgent.ts
│   │   ├── QualityAgent.ts
│   │   └── InsightAgent.ts
│   ├── components/
│   │   ├── bento/          # Bento grid cards
│   │   │   ├── CommandCenter.tsx
│   │   │   ├── FocusTimer.tsx
│   │   │   ├── SmartSchedule.tsx
│   │   │   ├── StatsCard.tsx
│   │   │   ├── AchievementsCard.tsx
│   │   │   ├── MemoryPalaceCard.tsx          # NEW ✨
│   │   │   ├── EnergyPredictionCard.tsx      # NEW ✨
│   │   │   ├── TaskBreakdownCard.tsx         # NEW ✨
│   │   │   ├── InterestRotationCard.tsx      # NEW ✨
│   │   │   └── IntegrationDiscoveryCard.tsx  # NEW ✨
│   │   ├── voice/          # Voice command system
│   │   │   └── VoiceButton.tsx
│   │   ├── layout/         # Layout components
│   │   │   └── BentoGrid.tsx
│   │   └── ui/             # Base UI components
│   │       ├── Card.tsx
│   │       └── Text.tsx
│   ├── features/           # 🚀 Feature modules (coming soon)
│   ├── store/              # State management
│   │   └── slices/
│   │       └── memoryPalaceSlice.ts
│   ├── constants/          # Design system
│   │   ├── colors.ts       # Solid color palette
│   │   ├── typography.ts   # Type scale
│   │   ├── spacing.ts      # Spacing system
│   │   └── breakpoints.ts  # Responsive breakpoints
│   ├── utils/              # Utilities
│   │   └── responsive.ts   # Responsive helpers
│   └── types/              # TypeScript types
│       ├── index.ts
│       ├── agents.ts
│       ├── memoryPalace.ts
│       └── energy.ts
├── ARCHITECTURE.md         # 🏗️ Detailed architecture docs
└── App.tsx                 # Main app
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/hyperfixated.git
   cd hyperfixated
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on your device**
   - **iOS**: Press `i` or scan QR code with Expo Go
   - **Android**: Press `a` or scan QR code with Expo Go
   - **Web**: Press `w` to open in browser

---

## 🎨 Design Philosophy

### Hypermaximalism
Every pixel tells a story. We pack maximum information with maximum personality without overwhelming the user through:
- **Visual hierarchy** - Size, color, position guide attention
- **Information layering** - Primary (80%), secondary (15%), tertiary (5%)
- **Contextual intelligence** - Show what matters now

### Retro-Futuristic Aesthetic
Inspired by 80s arcade games, vaporwave, and cyberpunk:
- **Terminal aesthetics** - Monospace fonts, green/amber text
- **Solid geometric shapes** - Sharp angles, circuit board patterns
- **Tactile feedback** - Satisfying clicks, bloops, success chimes
- **Pixel-perfect details** - Icons that could be 16×16 sprites scaled up

### Mobile-First
Designed for thumbs on iPhone SE, enhanced for larger screens:
- **Touch targets**: 56px (mobile), 48px (tablet), 44px (desktop)
- **Bento grid**: Vertical stack → 2-column → 3-column
- **Responsive gaps**: 12px → 16px → 20px

---

## 🎯 Roadmap

### Phase 1: Foundation ✅ (COMPLETED)
- [x] Mobile-first responsive framework
- [x] Solid color system implementation
- [x] Bento grid layout
- [x] Voice button UI
- [x] Focus timer
- [x] Basic cards (Schedule, Stats, Achievements)
- [x] **Agent system architecture**
- [x] **Memory Palace Builder**
- [x] **Energy Level Prediction**
- [x] **Task Breakdown Engine**
- [x] **Interest Rotation Predictor**
- [x] **Integration Discovery Engine**

### Phase 2: Intelligence (In Progress)
- [ ] Voice command processing (Whisper + Claude)
- [ ] Context-aware scheduling AI
- [ ] Google Calendar integration
- [ ] Notion integration
- [ ] Basic automation workflows
- [ ] Mascot animations
- [ ] AI-powered prediction models
- [ ] Pattern recognition engine

### Phase 3: Optimization (Next)
- [ ] Hyperfocus detection
- [ ] Advanced energy optimization
- [ ] Advanced workflow builder
- [ ] Predictive analytics dashboard
- [ ] Cross-platform sync (cloud)
- [ ] Premium features
- [ ] AR/VR integration prep

### Phase 4: Expansion (Future)
- [ ] Social features (community matching)
- [ ] Advanced gamification
- [ ] Life integration features
- [ ] Financial intelligence
- [ ] Physical space optimization
- [ ] Brain-computer interface prep

---

## 🤝 Contributing

We welcome contributions! This project is built for people with ADHD/hyperfixation patterns, by people who understand them.

### Development Guidelines
- Follow the design system strictly
- Use solid colors (no transparent washes)
- Mobile-first responsive design
- Test on actual devices
- Write meaningful commit messages

---

## 📄 License

MIT License - feel free to build your own hyperfocus powerhouse!

---

## 🙏 Acknowledgments

Built with hyperfocus, for hyperfixated minds.

**Special thanks to:**
- The ADHD community for inspiration
- Motion for smart scheduling ideas
- Duolingo for gamification excellence
- 80s arcade games for visual inspiration

---

## 📱 Screenshots

Coming soon! Run the app to see the hypermaximalist retro design in action.

---

**Made with 🧠 by hyperfixated developers, for hyperfixated minds.**
