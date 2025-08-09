# Langton's Ant Simulator

This is a high-performance Langton's Ant cellular automaton simulator built with React, TypeScript, and PIXI.js. It provides an interactive environment to explore the emergent behavior of Langton's Ant and its variations.

## Features

- **High-Performance Rendering**: Uses PIXI.js to render large grids with thousands of ants smoothly.
- **Customizable Rulesets**: Create your own rules for the ant's behavior, extending beyond the classic black/white rules.
- **Interactive Viewport**: Pan and zoom the simulation grid to explore the patterns up close or from a distance.
- **Simulation Controls**: Play, pause, reset, and control the speed of the simulation.
- **Preset Rules**: Comes with a few preset rules to get you started.

## Technology Stack

- **Frontend**: React 19, TypeScript, Vite
- **Rendering**: PIXI.js with `@pixi/react` wrapper
- **State Management**: Zustand with Immer middleware for efficient and immutable state updates.
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives for accessible and unstyled components.
- **Validation**: Zod for runtime validation of custom rulesets.

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- pnpm package manager

### Installation and Running

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/langtons-ant-react.git
    cd langtons-ant-react
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Run the development server:**
    ```bash
    pnpm dev
    ```
    The application will be available at `http://localhost:5173`.

## Development Commands

- `pnpm dev`: Start the development server with hot reload.
- `pnpm build`: Build the application for production. This includes a TypeScript check.
- `pnpm preview`: Preview the production build locally.
- `pnpm lint`: Run ESLint to check for code quality issues.
- `pnpm prettier`: Format the code using Prettier.

## Architecture Overview

The application is structured to separate the simulation logic from the UI components.

- **`src/simulator`**: Contains the core logic for the simulation, including the ant's behavior, the board state, and the rulesets.
- **`src/components`**: Contains the React components for the UI, including the control panel, the ruleset editor, and the PIXI.js-based rendering components.
- **`src/store.ts`**: The Zustand store manages the entire application state, including the simulation state, board data, and ant entities.
- **Rendering**: The `SimulatorCanvas.tsx` component wraps the PIXI.js application. The `Board.tsx` and `Ants.tsx` components render the grid and the ants, respectively. The `useAnimationFrame` hook drives the simulation loop.

This project was generated from a template and completed by the Claude Code developer agent.
