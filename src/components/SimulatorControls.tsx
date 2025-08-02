import type { ReactNode } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Pause, Play, StepForward } from "lucide-react";
import { useSimulatorStore } from "@/store.ts";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";

export function SimulatorControls(): ReactNode {
  const paused = useSimulatorStore((state) => state.paused);
  const togglePaused = useSimulatorStore((state) => state.togglePaused);
  const simulateSteps = useSimulatorStore((state) => state.simulateSteps);

  return (
    <div className="flex gap-2">
      <Tooltip delayDuration={500}>
        <TooltipTrigger>
          <Button onClick={togglePaused}>
            {paused ? <Play /> : <Pause />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{paused ? "Play" : "Pause"}</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip delayDuration={500}>
        <TooltipTrigger>
          <Button disabled={!paused} onClick={() => simulateSteps(1)}>
            <StepForward />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Step</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
