import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { enableMapSet } from "immer";
import type { Ruleset, MoveCommand } from "./simulator/ruleset.ts";
import { rulesetPresets } from "./simulator/presets.ts";
import { type Ant, simulateAntStep } from "./simulator/ant.ts";
import type { Board } from "./simulator/board.ts";

enableMapSet();

type State = {
  /** Whether the simulation is currently paused. */
  paused: boolean;
  /** The number of simulation steps to perform per frame. */
  stepsPerFrame: number;
  /** A map of cell coordinates to their colors. */
  board: Board;
  /** The ruleset currently being used in the simulator. */
  ruleset: Ruleset;
  /** The ants currently in the simulator. */
  ants: Ant[];
};

type Actions = {
  togglePaused: () => void;
  setStepsPerFrame: (steps: number) => void;
  simulateSteps: (steps: number) => void;
  reset: () => void;
  updateRuleMove: (
    stateKey: string,
    colorIndex: number,
    newMove: MoveCommand,
  ) => void;
  updateRuleColor: (
    stateKey: string,
    colorIndex: number,
    newColor: number,
  ) => void;
  updateRuleState: (
    stateKey: string,
    colorIndex: number,
    newState: string,
  ) => void;
  setRulesetPreset: (presetKey: keyof typeof rulesetPresets) => void;
};

export const useSimulatorStore = create<State & Actions>()(
  immer((set) => ({
    paused: false,
    stepsPerFrame: 1,
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
    setStepsPerFrame: (steps) => set({ stepsPerFrame: steps }),
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
    updateRuleMove: (stateKey, colorIndex, newMove) =>
      set((state) => {
        const stateRules = state.ruleset.states[stateKey];
        if (stateRules && stateRules[colorIndex]) {
          stateRules[colorIndex].move = newMove;
        }
      }),
    updateRuleColor: (stateKey, colorIndex, newColor) =>
      set((state) => {
        const stateRules = state.ruleset.states[stateKey];
        if (stateRules && stateRules[colorIndex]) {
          stateRules[colorIndex].writeColor = newColor;
        }

        const referencedColors = getReferencedColors(state);
        const maxColorIndex = Math.max(...referencedColors);
        for (const stateKey of Object.keys(state.ruleset.states)) {
          const rules = state.ruleset.states[stateKey];
          while (rules.length <= maxColorIndex) {
            rules.push(null);
          }
          for (const color of referencedColors) {
            rules[color] ??= {
              writeColor: color,
              move: "N",
              nextState: stateKey,
            };
          }
        }
      }),
    updateRuleState: (stateKey, colorIndex, newState) =>
      set((state) => {
        const stateRules = state.ruleset.states[stateKey];
        if (stateRules && stateRules[colorIndex]) {
          stateRules[colorIndex].nextState = newState;
        }
      }),
    setRulesetPreset: (presetKey) =>
      set((state) => {
        state.ruleset = rulesetPresets[presetKey];
        state.board.clear();
        state.ants = [
          {
            x: 0,
            y: 0,
            direction: "E",
            currentState: rulesetPresets[presetKey].initialState,
          },
        ];
      }),
  })),
);

function getReferencedColors(state: State): number[] {
  return Array.from(
    new Set<number>(
      Object.values(state.ruleset.states)
        .flat()
        .map((rule) => rule?.writeColor)
        .filter((color): color is number => color !== undefined),
    ),
  );
}
