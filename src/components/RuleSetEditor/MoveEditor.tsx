import type { ReactNode } from "react";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { type MoveCommand, moveCommands } from "@/simulator/ruleset.ts";
import { MoveButton } from "@/components/RuleSetEditor/MoveButton.tsx";

export type MoveEditorProps = {
  move: MoveCommand;
  onMoveChange?: (move: MoveCommand) => void;
};

export function MoveEditor({ move, onMoveChange }: MoveEditorProps): ReactNode {
  const [open, setOpen] = useState(false);

  const handleMoveSelect = (selectedMove: MoveCommand) => {
    onMoveChange?.(selectedMove);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <MoveButton move={move} />
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid grid-cols-5 gap-2">
          {moveCommands.map((moveOption) => (
            <MoveButton
              key={moveOption}
              move={moveOption}
              onClick={() => handleMoveSelect(moveOption)}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
