import type { MoveCommand } from "./ruleset.ts";

export type Direction = "N" | "E" | "S" | "W";

export const directionDeltas: Record<Direction, [number, number]> = {
  N: [0, -1],
  E: [1, 0],
  S: [0, 1],
  W: [-1, 0],
};

export const directionAngles: Record<Direction, number> = {
  W: 0,
  N: Math.PI * 0.5,
  E: Math.PI,
  S: Math.PI * 1.5,
};

export const directionMoveMap: Record<
  Direction,
  Record<MoveCommand, Direction>
> = {
  N: {
    L: "W",
    R: "E",
    U: "S",
    N: "N",
    S: "N",
    "<": "W",
    ">": "E",
    v: "S",
    "^": "N",
  },
  E: {
    L: "N",
    R: "S",
    U: "W",
    N: "E",
    S: "E",
    "<": "W",
    ">": "E",
    v: "S",
    "^": "N",
  },
  S: {
    L: "E",
    R: "W",
    U: "N",
    N: "S",
    S: "S",
    "<": "W",
    ">": "E",
    v: "S",
    "^": "N",
  },
  W: {
    L: "S",
    R: "N",
    U: "E",
    N: "W",
    S: "W",
    "<": "W",
    ">": "E",
    v: "S",
    "^": "N",
  },
};
