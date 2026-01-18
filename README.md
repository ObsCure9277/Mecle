# Mechacrypt

![Mechacrypt Banner](https://img.shields.io/badge/MECHACRYPT-v1.0-blue?style=for-the-badge)

**Tactile Logic. Precision Security.**

A hyper-realistic, 3D mechanical word-puzzle game that blends the logic of Wordle with a high-fidelity Neumorphic Mechanical aesthetic, optimized for performance using the Bun.js runtime.

## 🎮 Features

- **3D Mechanical Console**: Procedurally generated brushed metal console with realistic lighting
- **Dual-Sided Tiles**: Letter display on front, LED indicators on back (Green/Amber/Gray)
- **Smooth Animations**: Spring-based mechanical rotation with GSAP camera transitions
- **Neumorphic Design**: Soft-shadow lighting system creating tactile depth
- **Daily Challenge**: Server-generated daily word puzzle
- **Performance Optimized**: Powered by Bun.js for lightning-fast asset delivery

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Bun.js |
| Frontend Framework | React + Vite + TypeScript |
| 3D Engine | React Three Fiber (Three.js) |
| Animation | GSAP + Framer Motion 3D |
| Backend | Python 3.12 + FastAPI |
| Styling | Tailwind CSS (Neumorphism) |
| State Management | Zustand |

## 📦 Installation

### Prerequisites

- **Bun.js** (installed automatically on first setup)
- **Node.js** (for fallback npm operations)
- **Python 3.12+**

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
python main.py
```

The backend API will be available at `http://localhost:8000`

## 🎯 How to Play

1. **Landing Page**: The mechanical console orbits slowly with the "SYSTEM_LOCKED" message
2. **Engage**: Click `[ ENGAGE_MECHANISM ]` to zoom into gameplay mode
3. **Type**: Enter 5-letter words using your keyboard (A-Z)
4. **Submit**: Press ENTER to validate your guess
5. **Observe**: Watch the tiles mechanically rotate to reveal LED feedback:
   - 🟢 **Green**: Letter correct and in correct position
   - 🟡 **Amber**: Letter in word but wrong position
   - ⚫ **Gray**: Letter not in word
6. **Win**: Guess the word in 6 attempts to decrypt the vault!

## 📁 Project Structure

```
mechacrypt/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── 3d/           # Three.js/R3F components
│   │   │   └── ui/           # React UI overlays
│   │   ├── stores/           # Zustand state
│   │   ├── styles/           # CSS
│   │   └── App.tsx
│   └── package.json
└── backend/
    ├── main.py               # FastAPI server
    └── requirements.txt
```

## 🎨 Design Philosophy

Mechacrypt uses **Neumorphic Design** principles:

- **Surface**: Matte brushed aluminum (#E0E0E0 light / #1A1A1A dark)
- **Lighting**: Dual-source (top-left highlights + bottom-right shadows)
- **Depth**: Extruded 3D tiles set into sunken tracks
- **Feedback**: Emissive LED materials with realistic glow

## 🔧 Development

### Available Scripts

**Frontend:**
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

**Backend:**
- `python main.py` - Start FastAPI server
- `uvicorn main:app --reload` - Start with hot reload

## 🌐 API Endpoints

- `GET /` - API health check
- `GET /daily-word` - Get today's puzzle word
- `POST /validate` - Validate a guess

## 📝 License

MIT License. Developed for the next generation of spatial web.

---

**Mechacrypt v1.0** // Precision Decryption. Physically Realized.
