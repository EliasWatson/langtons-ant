import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { enableMapSet } from "immer";
import type { Ruleset } from "./simulator/ruleset.ts";
import { rulesetPresets } from "./simulator/presets.ts";
import { type Ant, simulateAntStep } from "./simulator/ant.ts";
import type { Board } from "./simulator/board.ts";

enableMapSet();

type State = {
  /** Whether the simulation is currently paused. */
  paused: boolean;
  /** A map of cell coordinates to their colors. */
  board: Board;
  /** The ruleset currently being used in the simulator. */
  ruleset: Ruleset;
  /** The ants currently in the simulator. */
  ants: Ant[];
};

type Actions = {
  togglePaused: () => void;
  simulateSteps: (steps: number) => void;
  reset: () => void;
};

export const useSimulatorStore = create<State & Actions>()(
  immer((set) => ({
    paused: false,
    board: new Map(),
    ruleset: rulesetPresets.langtons,
    ants: [
      {
        x: 0,
        y: 0,
        direction: "E",
        currentState: rulesetPresets.langtons.initialState,
      },
    ],
    togglePaused: () =>
      set((state) => {
        state.paused = !state.paused;
      }),
    simulateSteps: (steps) =>
      set((state) => {
        for (let i = 0; i < steps; i++) {
          for (const ant of state.ants) {
            simulateAntStep(state.ruleset, state.board, ant);
          }
        }
      }),
    reset: () =>
      set((state) => {
        state.board.clear();
        state.ants = [
          {
            x: 0,
            y: 0,
            direction: "E",
            currentState: state.ruleset.initialState,
          },
        ];
      }),
  })),
);
