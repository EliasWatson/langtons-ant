import type { ReactNode } from "react";
import { RuleSetEditor } from "@/components/RuleSetEditor/RuleSetEditor.tsx";
import { useSimulatorStore } from "@/store.ts";
import { rulesetPresets } from "@/simulator/presets.ts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";

export function RuleControls(): ReactNode {
  const ruleset = useSimulatorStore((state) => state.ruleset);
  const setRulesetPreset = useSimulatorStore((state) => state.setRulesetPreset);

  const currentPresetKey = Object.entries(rulesetPresets).find(
    ([, preset]) => preset === ruleset
  )?.[0] || "";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h3 className="font-medium text-lg">Ruleset Presets</h3>
        <Select value={currentPresetKey} onValueChange={setRulesetPreset}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a preset" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(rulesetPresets).map(([key, preset]) => (
              <SelectItem key={key} value={key}>
                {preset.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <RuleSetEditor />
    </div>
  );
}
