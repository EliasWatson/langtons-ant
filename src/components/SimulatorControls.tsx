import type { ReactNode } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Pause, Play, RotateCcw, StepForward } from "lucide-react";
import { useSimulatorStore } from "@/store.ts";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";
import { Slider } from "@/components/ui/slider.tsx";

export function SimulatorControls(): ReactNode {
  const paused = useSimulatorStore((state) => state.paused);
  const togglePaused = useSimulatorStore((state) => state.togglePaused);
  const simulateSteps = useSimulatorStore((state) => state.simulateSteps);
  const reset = useSimulatorStore((state) => state.reset);
  const stepsPerFrame = useSimulatorStore((state) => state.stepsPerFrame);
  const setStepsPerFrame = useSimulatorStore((state) => state.setStepsPerFrame);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Tooltip delayDuration={500}>
          <TooltipTrigger asChild>
            <Button onClick={togglePaused}>
              {paused ? <Play /> : <Pause />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{paused ? "Play" : "Pause"}</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip delayDuration={500}>
          <TooltipTrigger asChild>
            <Button disabled={!paused} onClick={() => simulateSteps(1)}>
              <StepForward />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Step</p>
          </TooltipContent>
        </Tooltip>
        <div className="grow" />
        <Tooltip delayDuration={500}>
          <TooltipTrigger asChild>
            <Button onClick={reset}>
              <RotateCcw />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Reset</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="grid grid-cols-2 text-sm">
        <div>Steps/frame</div>
        <div className="text-right">Steps/sec</div>
        <div>{stepsPerFrame}</div>
      </div>
      <Slider
        min={1}
        max={100}
        value={[stepsPerFrame]}
        onValueChange={([value]) => setStepsPerFrame(value)}
      />
    </div>
  );
}
