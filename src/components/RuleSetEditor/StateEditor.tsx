import type { ReactNode } from "react";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { Button } from "@/components/ui/button.tsx";

export type StateEditorProps = {
  currentState: string | number;
  availableStates: string[];
  onStateChange?: (state: string) => void;
};

export function StateEditor({
  currentState,
  availableStates,
  onStateChange,
}: StateEditorProps): ReactNode {
  const [open, setOpen] = useState(false);

  const handleStateSelect = (selectedState: string) => {
    onStateChange?.(selectedState);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">{String(currentState)}</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-2">
          {availableStates.map((state) => (
            <Button
              key={state}
              variant={state === String(currentState) ? "default" : "outline"}
              onClick={() => handleStateSelect(state)}
            >
              {state}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}