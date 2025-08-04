import { SimulatorCanvas } from "./components/SimulatorCanvas.tsx";
import { useAnimationFrame } from "./util/use-animation-frame.ts";
import { useSimulatorStore } from "./store.ts";
import { ControlPanel } from "./components/ControlPanel.tsx";

export default function App() {
  const paused = useSimulatorStore((state) => state.paused);
  const simulateSteps = useSimulatorStore((state) => state.simulateSteps);
  const stepsPerFrame = useSimulatorStore((state) => state.stepsPerFrame);

  useAnimationFrame(() => {
    if (paused) return;

    simulateSteps(stepsPerFrame);
  });

  return (
    <div className="w-screen h-screen overflow-hidden flex">
      <SimulatorCanvas />
      <ControlPanel />
    </div>
  );
}
