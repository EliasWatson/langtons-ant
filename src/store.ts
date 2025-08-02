import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { enableMapSet } from "immer";
import type { Ruleset } from "./simulator/ruleset.ts";
import { rulesetPresets } from "./simulator/presets.ts";
import type { Ant } from "./simulator/ant.ts";

enableMapSet();

type State = {
  /** Cell color map, indexed by y first, then x. */
  cells: Map<number, Map<number, number>>;
  /** The ruleset currently being used in the simulator. */
  ruleset: Ruleset;
  /** The ants currently in the simulator. */
  ants: Ant[];
};

type Actions = {
  /** Gets the color of a cell. */
  getCellColor: (x: number, y: number) => number;
  /** Sets the color of a cell. */
  setCellColor: (x: number, y: number, color: number) => void;
};

export const useSimulatorStore = create<State & Actions>()(
  immer((set, get) => ({
    cells: new Map(),
    ruleset: rulesetPresets.langtons,
    ants: [
      {
        x: 0,
        y: 0,
        direction: "E",
        currentState: rulesetPresets.langtons.initialState,
      },
    ],
    getCellColor: (x: number, y: number): number => {
      return get().cells.get(y)?.get(x) ?? 0;
    },
    setCellColor: (x: number, y: number, color: number) =>
      set((state) => {
        let row = state.cells.get(y);
        if (!row) {
          row = new Map();
          state.cells.set(y, row);
        }

        if (color === 0) {
          row.delete(x);
          if (row.size === 0) {
            state.cells.delete(y);
          }
        } else {
          row.set(x, color);
        }
      }),
  })),
);
