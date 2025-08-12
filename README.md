# 🦸 AI Heroes

**Who wins in a fight? Let the AIs decide.**

AI Heroes is a sleek, interactive dashboard that settles the age-old question: "Who would win in a fight?" by asking multiple large language models to judge iconic character matchups. Watch Superman face off against Kratos, see Goku battle Thor, and discover which heroes dominate the leaderboard according to AI.

🎯 **[Deploy on Vercel in 2 minutes](#-quick-deploy)**

---

## ✨ What is this?

**The Ultimate Character Battle Simulator**
- 🏆 **Leaderboard**: See which characters dominate across all matchups
- ⚔️ **Head-to-Head**: Compare any two characters with beautiful animated probability bars
- 🤖 **Multi-Model**: Filter results by different AI models (GPT, Claude, etc.)
- 📱 **Share**: Every comparison gets a unique URL — perfect for settling debates
- 🎨 **Beautiful**: Smooth animations, dark/light themes, fully responsive

**Built for Speed & Simplicity**
- ⚡ Fully static — no backend needed
- 🚀 Blazing fast load times
- 📊 Pure CSS visualizations (no heavy chart libraries)
- 🔗 Shareable URLs for every matchup

---

## 🏗️ Technical Overview

### Stack
```
🔧 Vite + React + TypeScript
🎨 CSS Modules (minimal, clean styling)
📱 Responsive design (mobile-first)
🌐 Static site (deploy anywhere)
```

### Architecture
```
web/
├── src/
│   ├── components/           # UI components
│   │   ├── Header/          # 🎨 Title & theme toggle
│   │   ├── ModelSelect/     # 🤖 AI model filter
│   │   ├── LeaderboardBarChart/  # 📊 Animated victory bars
│   │   ├── CharacterSelectPair/  # ⚔️ Character picker
│   │   └── MatchupProbabilityCard/  # 🎯 Head-to-head results
│   ├── data/                # 📄 Data layer & types
│   └── utils/               # 🛠️ URL handling & colors
└── public/data/            # 💾 Static JSON data
```

### Data Structure

**Characters** (`public/data/characters.json`)
```json
{
  "id": "superman",
  "name": "Superman", 
  "universe": "DC",
  "imageUrl": "/images/superman.jpeg",
  "color": "#1A8FE3"
}
```

**Matchups** (`public/data/matchups.json`)
```json
{
  "a": "superman",
  "b": "kratos", 
  "runs": 10,
  "winsA": 7,
  "winsB": 3,
  "model": "gpt-4o",
  "updatedAt": "2025-01-12T10:30:00Z"
}
```

---

## 🚀 Quick Deploy

### Option 1: Vercel (Recommended)
1. Push your repo to GitHub
2. Go to [vercel.com](https://vercel.com) → Import project
3. Configure:
   - **Root Directory**: `web`
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Deploy! 🎉

### Option 2: Any Static Host
```bash
cd web
npm ci
npm run build
# Upload dist/ folder to your favorite host
```

---

## 💻 Development

**Get started in 30 seconds:**
```bash
cd web
npm ci
npm run dev
```

**Available commands:**
```bash
npm run dev     # 🔥 Start dev server
npm run build   # 📦 Build for production  
npm run preview # 👀 Preview production build
npm run lint    # 🧹 Check code quality
```

---

## 🎮 How It Works

1. **Pick Your Fighters**: Select any two characters from the dropdown
2. **Watch the Battle**: See animated probability bars showing win rates
3. **Explore the Leaderboard**: Discover which characters dominate overall
4. **Filter by AI Model**: Compare how different models judge the same fights
5. **Share Your Discoveries**: Every matchup gets a unique URL

**The magic**: Each matchup represents 10 "fights" judged by AI models. The bars show win percentages, and the leaderboard totals victories across all pairs.

---

*Want to add new characters or run fresh evaluations? The data lives in simple JSON files — just update and redeploy!*

