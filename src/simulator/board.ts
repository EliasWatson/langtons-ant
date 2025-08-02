import type { WritableDraft } from "immer";

/** Cell color map, indexed by y first, then x. */
export type Board = Map<number, Map<number, number>>;

export function getCellColor(board: Board, x: number, y: number): number {
  return board.get(y)?.get(x) ?? 0;
}

export function setCellColor(
  board: WritableDraft<Board>,
  x: number,
  y: number,
  color: number,
): void {
  let row = board.get(y);
  if (!row) {
    row = new Map();
    board.set(y, row);
  }

  if (color === 0) {
    row.delete(x);
    if (row.size === 0) {
      board.delete(y);
    }
  } else {
    row.set(x, color);
  }
}
