# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build for production (runs TypeScript check then Vite build)
- `pnpm lint` - Run ESLint on all files
- `pnpm prettier` - Format code with Prettier
- `pnpm preview` - Preview production build locally

## Architecture Overview

This is a Langton's Ant cellular automaton simulator built with React, TypeScript, and PIXI.js for high-performance 2D rendering.

### Core Architecture

**State Management**: Uses Zustand with Immer for immutable state updates. The main store (`src/store.ts`) manages:

- Simulation state (paused, steps per frame)
- Board state (Map of cell coordinates to colors)
- Ruleset configuration
- Ant entities with position, direction, and state

**Simulation Engine** (`src/simulator/`):

- `ant.ts` - Core ant simulation logic with `simulateAntStep()` function
- `ruleset.ts` - Zod schemas for rule validation and types
- `board.ts` - Board operations (get/set cell colors)
- `directions.ts` - Movement and rotation logic
- `presets.ts` - Predefined rulesets

**Rendering Pipeline**: PIXI.js-based rendering with React integration:

- `SimulatorCanvas.tsx` - PIXI Application wrapper
- `SimulatorViewport.tsx` - Viewport with pan/zoom using pixi-viewport
- `Board.tsx` - Renders grid cells as PIXI Graphics
- `Ants.tsx` - Renders ant entities

**UI Components**:

- Control panel with play/pause, speed control, reset
- Rule set editor for creating custom automaton rules
- Uses Radix UI primitives with Tailwind CSS styling

### Key Patterns

- Animation loop managed by `useAnimationFrame` hook drives simulation steps
- Immer enables safe mutation of complex nested state (Board Map, Ant arrays)
- PIXI.js handles performant rendering of potentially thousands of colored cells
- Zod provides runtime validation for user-defined rulesets

### Technology Stack

- **Frontend**: React 19, TypeScript, Vite
- **Rendering**: PIXI.js with @pixi/react wrapper
- **State**: Zustand + Immer middleware
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives
- **Validation**: Zod schemas
- **Build**: Vite with TypeScript compilation
