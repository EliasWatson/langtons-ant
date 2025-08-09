import type { ReactNode } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";

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
  return (
    <Select
      value={String(currentState)}
      onValueChange={(value) => onStateChange?.(value)}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {availableStates.map((state) => (
          <SelectItem key={state} value={state}>
            {state}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
