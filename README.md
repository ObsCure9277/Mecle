# Mechacrypt

![Mechacrypt Banner](https://img.shields.io/badge/MECHACRYPT-v1.0-blue?style=for-the-badge)

**Tactile Logic. Precision Security.**

A 3D word-puzzle game inspired by Wordle, featuring smooth animations, flippable letter tiles with LED feedback indicators, and a vibrant colorful aesthetic.

## ✨ Features

- **3D Tile Grid**: Interactive 6×5 grid with flippable tiles
- **Dual-Sided Tiles**: 
  - **Front**: Letter display with metallic finish (gold for correct letters)
  - **Back**: LED indicators (Green/Amber/Gray) with emissive glow
- **Smooth Animations**: 
  - Spring-based tile rotation using React Spring
  - GSAP-powered camera transitions
- **Game Modes**: Daily challenge with random word generation
- **Statistics Tracking**: Win rate, streak tracking, and guess distribution
- **Modular UI**: Info modal, stats modal, settings, and more
- **Responsive Design**: Optimized for desktop and mobile

## 🚀 Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React 19** | UI framework |
| **TypeScript** | Type safety |
| **Vite** | Build tool and dev server |
| **React Three Fiber** | 3D rendering (Three.js wrapper) |
| **@react-three/drei** | 3D helpers (Text, RoundedBox, etc.) |
| **React Spring** | Tile flip animations |
| **GSAP** | Camera transitions |
| **Zustand** | State management |
| **Tailwind CSS** | Styling |
| **React Icons** | UI icons |

### Backend
| Technology | Purpose |
|-----------|---------|
| **Python 3.12+** | Runtime |
| **FastAPI** | REST API framework |
| **Uvicorn** | ASGI server |
| **python-dotenv** | Environment variables |

## 📦 Installation

### Prerequisites
- **Node.js** 18+ and npm
- **Python** 3.12+
- **pip** (Python package manager)

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at **http://localhost:5173**

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
python main.py
```

The backend API will be available at **http://localhost:8000**

> **Note**: Make sure to start the backend before using the frontend, otherwise the game will use fallback words.

## 🎮 How to Play

1. **Start**: The game loads with an empty 6×5 grid
2. **Type**: Enter a 5-letter word using your keyboard (A-Z)
3. **Submit**: Press **ENTER** to validate your guess
4. **Watch**: Tiles flip to reveal LED feedback on the back:
   - 🟢 **Green LED**: Letter is correct and in the right position
   - 🟡 **Amber LED**: Letter is in the word but wrong position
   - ⚫ **Gray LED**: Letter is not in the word
5. **Win**: Guess the word in 6 attempts or less!
6. **Track**: View your statistics and play again

## 📁 Project Structure

```
mechacrypt/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── 3d/              # Three.js components
│   │   │   │   ├── Tile.tsx            # 3D flippable tile
│   │   │   │   ├── TileRow.tsx         # Row of tiles
│   │   │   │   ├── GameGrid.tsx        # Full grid
│   │   │   │   └── CameraController.tsx # GSAP camera
│   │   │   └── ui/              # React UI components
│   │   │       ├── FlipCard.tsx        # Game/Status card
│   │   │       ├── KeyboardInput.tsx   # Virtual keyboard
│   │   │       ├── InfoModal.tsx       # How to play
│   │   │       ├── StatsModal.tsx      # Statistics
│   │   │       ├── SettingsModal.tsx   # Settings
│   │   │       ├── MoreModal.tsx       # About/Links
│   │   │       └── LoadingScreen.tsx   # Initial loader
│   │   ├── stores/
│   │   │   └── gameStore.ts     # Zustand state management
│   │   ├── index.css            # Global styles
│   │   ├── App.tsx              # Main app component
│   │   └── main.tsx             # Entry point
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
└── backend/
    ├── main.py                  # FastAPI server
    ├── words.py                 # Word list
    ├── requirements.txt         # Python dependencies
    └── .env                     # Environment variables
```

## 🎨 Design Details

### Visual Style
- **Colorful Title**: Each letter has a unique gradient color (red, yellow, green, blue, purple, pink, cyan, orange, lime, indigo)
- **3D Tiles**: Rounded box geometry with metallic materials
- **LED Feedback**: Emissive materials with point lights for realistic glow
- **Responsive Layout**: Max-width 650px, centered layout with proper spacing

### Animation Details
- **Tile Flip**: 180° rotation on Y-axis with spring physics (tension: 120, friction: 14)
- **Camera Transition**: GSAP tween with `power2.inOut` easing over 2 seconds
- **Loading Screen**: 3-second initial delay for smooth entry

## 🔧 Development

### Available Scripts

**Frontend:**
```bash
npm run dev      # Start Vite dev server (port 5173)
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

**Backend:**
```bash
python main.py                    # Start server (port 8000)
uvicorn main:app --reload        # Start with hot reload
```

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | API health check |
| `GET` | `/daily-word` | Get today's word (date-seeded) |
| `GET` | `/random-word` | Get a random word |
| `POST` | `/validate` | Validate a guess against target word |

### Example API Usage

**Get Random Word:**
```bash
curl http://localhost:8000/random-word
# Response: {"word": "CRYPT"}
```

**Validate Guess:**
```bash
curl -X POST http://localhost:8000/validate \
  -H "Content-Type: application/json" \
  -d '{"guess": "CRYPT", "target": "CRANE"}'
# Response: {"states": ["correct", "correct", "absent", "absent", "absent"]}
```

## 🎯 Game Logic

The validation algorithm uses a two-pass approach:
1. **First pass**: Mark exact matches (correct position) as `correct`
2. **Second pass**: Mark present letters (wrong position) as `present`, remaining as `absent`

This ensures proper handling of duplicate letters.

## 📊 Statistics

Game statistics are stored in `localStorage`:
- Games played
- Games won
- Current streak
- Max streak
- Guess distribution (1-6 guesses)

## 🔄 Environment Variables

**Frontend** (`.env` in `/frontend`):
```bash
VITE_BACKEND_URL=http://localhost:8000
```

**Backend** (`.env` in `/backend`):
```bash
BACKEND_URL=http://localhost:8000
FRONTEND_URL=http://localhost:5173
```

## 📝 License

MIT License. Developed by **NG SHEN ZHI**.

---

**Mechacrypt v1.0** // Word Puzzle Meets 3D Mechanics
