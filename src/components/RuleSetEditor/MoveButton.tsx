import type { ComponentProps, ReactNode } from "react";
import { Button } from "@/components/ui/button.tsx";
import { type MoveCommand, moveNames } from "@/simulator/ruleset.ts";
import {
  RotateCcw,
  RotateCw,
  Undo2,
  CircleSlash,
  ArrowRight,
  RedoDot,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";

export type MoveButtonProps = ComponentProps<"button"> & { move: MoveCommand };

export function MoveButton({ move, ...props }: MoveButtonProps): ReactNode {
  const Icon = moveIcons[move];
  return (
    <Tooltip delayDuration={500}>
      <TooltipTrigger asChild>
        <Button {...props}>{Icon && <Icon />}</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{moveNames[move]}</p>
      </TooltipContent>
    </Tooltip>
  );
}

const moveIcons = {
  L: RotateCcw,
  R: RotateCw,
  U: Undo2,
  N: RedoDot,
  S: CircleSlash,
  "<": ArrowLeft,
  ">": ArrowRight,
  "^": ArrowUp,
  v: ArrowDown,
};
