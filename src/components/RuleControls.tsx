import type { ReactNode } from "react";
import { RuleSetEditor } from "@/components/RuleSetEditor/RuleSetEditor.tsx";

export function RuleControls(): ReactNode {
  return (
    <div className="flex flex-col">
      <RuleSetEditor />
    </div>
  );
}
