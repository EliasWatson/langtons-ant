import type { Direction } from "./directions.ts";

export type Ant = {
  x: number;
  y: number;
  direction: Direction;
  currentState: string;
};
