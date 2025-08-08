import type { ReactNode } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { type MoveCommand, moveCommands } from "@/simulator/ruleset.ts";
import { MoveButton } from "@/components/RuleSetEditor/MoveButton.tsx";

export type MoveEditorProps = {
  move: MoveCommand;
};

export function MoveEditor({ move }: MoveEditorProps): ReactNode {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <MoveButton move={move} />
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid grid-cols-5 gap-2">
          {moveCommands.map((move) => (
            <MoveButton move={move} />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
