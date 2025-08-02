import type { ReactNode } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Pause, Play } from "lucide-react";
import { useSimulatorStore } from "@/store.ts";

export function SimulatorControls(): ReactNode {
  const paused = useSimulatorStore((state) => state.paused);
  const togglePaused = useSimulatorStore((state) => state.togglePaused);

  return (
    <div className="flex gap-2">
      <Button onClick={togglePaused}>{paused ? <Play /> : <Pause />}</Button>
    </div>
  );
}
