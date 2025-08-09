import { type ReactNode, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { useSimulatorStore } from "@/store.ts";

export type StateEditorProps = {
  currentState: string | number;
  onStateChange?: (state: string) => void;
};

export function StateEditor({
  currentState,
  onStateChange,
}: StateEditorProps): ReactNode {
  const ruleset = useSimulatorStore((state) => state.ruleset);
  const availableStates = useMemo(
    () => ["-1", ...Object.keys(ruleset.states)],
    [ruleset.states],
  );

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
