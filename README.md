# Mechacrypt


**Tactile Logic. Precision Security.**

A hyper-realistic 3D word-puzzle game inspired by Wordle, featuring smooth mechanical animations, flippable letter tiles with LED feedback indicators, and a vibrant colorful aesthetic. Built with React Three Fiber and FastAPI.

[Live Preview](#) &cdot; [Report Bug](https://github.com/ObsCure9277/Mechacrypt/issues) &cdot; [Request Feature](https://github.com/ObsCure9277/Mechacrypt/issues)

---

## 📋 Table of Contents

- [🔑 Key Features](#-key-features)
- [🎮 How to Play](#-how-to-play)
- [💻 Tech Stack](#-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [📂 Project Structure](#-project-structure)
- [🎨 Design Details](#-design-details)
- [💡 API Endpoints](#-api-endpoints)
- [🔧 Development](#-development)
- [🌐 Browser Support](#-browser-support)
- [📄 License](#-license)
- [🙏 Acknowledgments](#-acknowledgments)

---

## 🔑 Key Features

### ✅ 3D Mechanical Experience
-   **Interactive Grid**: A fully 3D 6×5 grid with physically grounded flippable tiles.
-   **Dual-Sided Tiles**: Metallic finish on the front for letters; emissive LED indicators (Green/Amber/Gray) on the back.

### ✅ Fluid Animations
-   **Spring Physics**: Tile rotations powered by `react-spring` for realistic weight and momentum.
-   **Smooth Transitions**: `GSAP`-powered camera movements and scene transitions.

### ✅ Daily Challenges
-   **Daily Word**: A new word every day, synchronized via the backend API.
-   **Random Mode**: Specific endpoint for unlimited random word practice.

### ✅ Comprehensive Stats
-   **Tracking**: Win rate, current streak, max streak, and guess distribution histograms.
-   **Persistence**: Stats are saved locally to track your progress over time.

### ✅ Responsive & Polished
-   **Mobile Ready**: Optimized controls and camera angles for touch devices.
-   **Visuals**: High-fidelity materials, lighting, and post-processing.

---

## 🎮 How to Play

1.  **Start**: The game loads with an empty 6×5 grid.
2.  **Type**: Enter a 5-letter word using your keyboard (physical or on-screen).
3.  **Submit**: Press **ENTER** to validate your guess.
4.  **Watch**: Tiles mechanicaly flip to reveal LED feedback on the back:
    -   🟢 **Green LED**: Letter is correct and in the right position.
    -   🟡 **Amber LED**: Letter is in the word but in the wrong position.
    -   ⚫ **Gray LED**: Letter is not in the word.
5.  **Win**: Guess the word in 6 attempts or less!

---

## 💻 Tech Stack

<table>
  <tr>
    <td><b>Frontend</b></td>
    <td>
      <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
      <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
      <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" />
      <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
    </td>
  </tr>
  <tr>
    <td><b>3D & Animation</b></td>
    <td>
      <img src="https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white" />
      <img src="https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white" />
    </td>
  </tr>
  <tr>
    <td><b>Backend</b></td>
    <td>
      <img src="https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue" />
      <img src="https://img.shields.io/badge/fastapi-109989?style=for-the-badge&logo=FASTAPI&logoColor=white" />
    </td>
  </tr>
  <tr>
    <td><b>State Management</b></td>
    <td>
      <img src="https://img.shields.io/badge/Zustand-443E38?style=for-the-badge" />
    </td>
  </tr>
</table>

---

## 🚀 Getting Started

### Prerequisites

-   **Node.js** 18+ and npm
-   **Python** 3.12+
-   **pip** (Python package manager)

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/ObsCure9277/MECLE.git
cd MECLE
```

#### 2. Backend Setup
```bash
cd backend
python -m venv venv
# Windows
.\venv\Scripts\activate
# Linux/Mac
source venv/bin/activate

pip install -r requirements.txt
python main.py
```
*The backend API will be available at `http://localhost:8000`*

#### 3. Frontend Setup
Open a new terminal configuration.
```bash
cd frontend
npm install
npm run dev
```
*The frontend will be available at `http://localhost:5173`*

> **Note**: Ensure the backend is running before using the frontend to fetch valid words.

---

## 📂 Project Structure

```
MECLE/
├── frontend/                # React + Vite application
│   ├── src/
│   │   ├── components/
│   │   │   ├── 3d/          # R3F components (Tile, Grid, Camera)
│   │   │   └── ui/          # Standard React UI (Modals, Keyboard)
│   │   ├── stores/          # Zustand state management
│   │   ├── utils/           # Helper functions
│   │   └── App.tsx          # Main entry
│   └── public/              # Static assets
└── backend/                 # FastAPI application
    ├── main.py              # API routes and logic
    ├── words.py             # Word list dataset
    └── requirements.txt     # Python dependencies
```

---

## 🎨 Design Details

### Visual Style
-   **Colorful Aesthetics**: Each letter has a unique gradient color (red, yellow, green, blue, etc) to create a vibrant look.
-   **Materials**: Uses standard metallic and roughness maps to achieve a "tactile" feel.
-   **Lighting**: Carefully placed point lights enhance the LED glow on the back of the tiles.

### Animation Tech
-   **Tile Flip**: 180° rotation on the Y-axis using `react-spring` physics (tension: 120, friction: 14).
-   **Camera**: Dynamic camera positioning using `GSAP` tweens to focus on the grid or UI elements.

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | API health check |
| `GET` | `/daily-word` | Get today's word (date-seeded for consistency) |
| `GET` | `/random-word` | Get a random word for practice mode |
| `POST` | `/validate` | Validate a guess against the target word |

---

## 🔧 Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build frontend for production |
| `npm run lint` | Run ESLint validation |
| `python main.py` | Start backend server |

### Environment Variables

**Frontend** (`frontend/.env`):
```env
VITE_BACKEND_URL=http://localhost:8000
```

**Backend** (`backend/.env`):
```env
BACKEND_URL=http://localhost:8000
FRONTEND_URL=http://localhost:5173
```

---

## 🌐 Browser Support

MECLE requires a browser with **WebGL** support for 3D rendering.

-   ✅ Chrome (Latest)
-   ✅ Firefox (Latest)
-   ✅ Safari (Latest)
-   ✅ Edge (Latest)
-   ⚠️ Internet Explorer (Not Supported)

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🙏 Acknowledgments

-   **[Wordle](https://www.nytimes.com/games/wordle/index.html)** - The original inspiration.
-   **[React Three Fiber](https://docs.pmnd.rs/react-three-fiber)** - Making Three.js accessible in React.
-   **[FastAPI](https://fastapi.tiangolo.com/)** - High performance backend framework.
-   **[Tailwind CSS](https://tailwindcss.com/)** - Rapid UI styling.

---

**Made with ❤️ by [ObsCure9277](https://github.com/ObsCure9277)**
