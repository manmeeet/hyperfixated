# 🧠 HYPERFOCUS AI

**The Ultimate ADHD/Hyperfixation Productivity Command Center**

A hypermaximalist, retro-futuristic productivity **web app** built with Next.js that feels like Duolingo had a baby with Motion and Claude, styled like an 80s sci-fi arcade game.

![Made for ADHD](https://img.shields.io/badge/Made%20for-ADHD-7C3AED)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8)

---

## ✨ Features

### 🎤 Voice Command Center
- **Hero Voice Button** with dramatic visual states (idle, listening, processing, success)
- Natural language processing powered by Claude AI (coming soon)
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

### 🎨 Hypermaximalist Design
- **Solid color system** - No transparent washes
- **Bento grid layout** - Asymmetrical but balanced
- **Retro computing aesthetic** - Terminal green, amber warnings, pixel-perfect details
- **Mobile-first responsive** - Works perfectly on all devices
- **Information choreography** - Rich animations for every interaction

---

## 🏗️ Architecture

### Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Deployment**: Vercel
- **Backend**: Supabase (coming soon)
- **Voice**: OpenAI Whisper (coming soon)
- **AI**: Claude API (coming soon)

### Project Structure
```
hyperfixated/
├── app/
│   ├── globals.css          # Design system & Tailwind config
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page
├── components/
│   ├── bento/               # Bento grid cards
│   │   ├── CommandCenter.tsx
│   │   ├── VoiceButton.tsx
│   │   ├── FocusTimer.tsx
│   │   ├── SmartSchedule.tsx
│   │   ├── StatsCard.tsx
│   │   └── AchievementsCard.tsx
│   ├── layout/              # Layout components
│   │   └── BentoGrid.tsx
│   └── ui/                  # Base UI components
│       └── Card.tsx
├── lib/
│   └── utils.ts             # Utility functions
├── types/
│   └── index.ts             # TypeScript types
└── vercel.json              # Vercel configuration
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

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
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Deployment to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Convert to Next.js web app"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js and deploy
   - Your app will be live in seconds! 🚀

---

## 🎨 Design Philosophy

### Hypermaximalism
Every pixel tells a story. We pack maximum information with maximum personality through:
- **Visual hierarchy** - Size, color, position guide attention
- **Information layering** - Primary (80%), secondary (15%), tertiary (5%)
- **Contextual intelligence** - Show what matters now

### Retro-Futuristic Aesthetic
Inspired by 80s arcade games, vaporwave, and cyberpunk:
- **Terminal aesthetics** - Monospace fonts, green/amber text
- **Solid geometric shapes** - Sharp angles, clean borders
- **Tactile feedback** - Smooth animations, satisfying interactions
- **Pixel-perfect details** - Crisp edges, no blur effects

### Mobile-First Responsive
Designed for mobile phones, enhanced for tablets and desktops:
- **Touch targets**: 56px (mobile), 48px (tablet), 44px (desktop)
- **Bento grid**: Vertical stack → 2-column → 3-column
- **Responsive gaps**: 12px → 16px → 20px

---

## 🎯 Roadmap

### Phase 1: Web Foundation ✅ (COMPLETED)
- [x] Next.js setup with TypeScript
- [x] Tailwind CSS v4 with solid color system
- [x] Mobile-first responsive bento grid
- [x] Voice button UI with animations
- [x] Focus timer with circular progress
- [x] All bento cards (Schedule, Stats, Achievements)
- [x] Vercel deployment ready

### Phase 2: Intelligence (Next)
- [ ] Voice command processing (Whisper + Claude)
- [ ] Supabase backend integration
- [ ] User authentication
- [ ] Context-aware scheduling AI
- [ ] Google Calendar integration
- [ ] Notion integration
- [ ] Basic automation workflows

### Phase 3: Advanced Features
- [ ] Hyperfocus detection
- [ ] Energy level optimization
- [ ] Advanced workflow builder
- [ ] Predictive analytics
- [ ] Cross-device sync
- [ ] Progressive Web App (PWA)
- [ ] Mobile app packaging (Capacitor)

---

## 📱 Mobile App Packaging

This web app can be packaged into native mobile apps:

**Option 1: Progressive Web App (PWA)**
- Add to home screen on iOS/Android
- Works offline
- Native-like experience

**Option 2: Capacitor**
```bash
npm install @capacitor/core @capacitor/cli
npx cap init
npx cap add ios
npx cap add android
npx cap run ios
npx cap run android
```

---

## 🤝 Contributing

We welcome contributions! This project is built for people with ADHD/hyperfixation patterns, by people who understand them.

---

## 📄 License

MIT License - feel free to build your own hyperfocus powerhouse!

---

**Made with 🧠 by hyperfixated developers, for hyperfixated minds.**

**Stop rebuilding your systems. Start amplifying your obsessions.**
