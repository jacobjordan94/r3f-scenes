# R3F Scenes

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-0.181.2-000000?logo=three.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2.2-646CFF?logo=vite&logoColor=white)

A collection of 3D scenes built with React Three Fiber (R3F), Three.js, and TypeScript.

## Features

- **React Three Fiber** - Declarative Three.js scenes in React
- **TypeScript** - Full type safety
- **Vite** - Fast development and HMR
- **React Router** - Multi-scene navigation
- **React Compiler** - Optimized rendering performance
- **Custom Controls** - First-person fly camera with WASD + mouse controls

## Scenes

### SEELE Conference Room

Recreation of the iconic SEELE conference room from Neon Genesis Evangelion: End of Evangelion.

**Features:**
- 12 monoliths arranged in a circle with numbered text labels
- Dark atmospheric lighting with minimal ambient light
- Gendo's desk with 3D model and spotlight
- White light strips at the base of each monolith
- Red text with LED-style appearance
- Stairs model with custom materials
- Full shadow support

**Controls:**
- **Click canvas** - Lock pointer for camera control
- **Mouse** - Look around
- **W/S** - Move forward/backward
- **A/D** - Strafe left/right
- **Space** - Fly up
- **Shift** - Fly down
- **ESC** - Unlock pointer

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Server runs on `http://0.0.0.0:5173` (accessible on local network)

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── App.tsx                           # React Router setup
├── main.tsx                          # App entry point
└── scenes/
    ├── components/
    │   └── fly-controls.tsx          # Custom first-person camera controls
    └── seele/
        ├── seele.tsx                 # Main scene setup
        ├── monoliths.tsx             # Monolith components with text
        ├── desk.tsx                  # Gendo's desk area
        └── models.tsx                # 3D model loaders
```

## Models

Place 3D models (`.glb` format) in `public/models/`:
- `gendo.glb` - Character model
- `stairs.glb` - Staircase model

## Fonts

Place font files in `public/fonts/`:
- `Coolvetica Rg.otf` - Used for "SEELE" and "SOUND ONLY" text
- `MacEnvy DB Regular.ttf` - Used for monolith numbers

## Tech Stack

- **React** 19.2.0
- **React Three Fiber** 9.4.0
- **Three.js** 0.181.2
- **@react-three/drei** 10.7.7 - Helper utilities
- **React Router** 7.9.6
- **TypeScript** 5.9.3
- **Vite** 7.2.2

## Performance Notes

- React Compiler is enabled for automatic memoization
- Shadows are enabled globally (may impact performance on low-end devices)
- Device pixel ratio is automatically detected and applied
- Antialiasing is enabled for smoother edges

## License

Private project
