import {
  directionMoveMap,
  type Direction,
  directionDeltas,
} from "./directions.ts";
import type { WritableDraft } from "immer";
import type { Ruleset } from "./ruleset.ts";
import { getCellColor, type Board, setCellColor } from "./board.ts";

export type Ant = {
  x: number;
  y: number;
  direction: Direction;
  currentState: string;
};

export function simulateAntStep(
  ruleset: Readonly<Ruleset>,
  board: WritableDraft<Board>,
  ant: WritableDraft<Ant>,
): void {
  if (ruleset.states[ant.currentState] === undefined) {
    return;
  }

  const currentColor = getCellColor(board, ant.x, ant.y);
  const command = ruleset.states[ant.currentState][currentColor];

  setCellColor(board, ant.x, ant.y, command.writeColor);
  ant.currentState = `${command.nextState}`;

  ant.direction = directionMoveMap[ant.direction][command.move];

  if (command.move !== "S") {
    ant.x += directionDeltas[ant.direction][0];
    ant.y += directionDeltas[ant.direction][1];
  }
}
