import { SimulatorCanvas } from "./components/SimulatorCanvas.tsx";
import { useAnimationFrame } from "./util/use-animation-frame.ts";
import { useSimulatorStore } from "./store.ts";
import { ControlPanel } from "./components/ControlPanel.tsx";

export default function App() {
  const simulateSteps = useSimulatorStore((state) => state.simulateSteps);

  useAnimationFrame(() => {
    simulateSteps(1);
  });

  return (
    <div className="w-screen h-screen overflow-hidden flex">
      <SimulatorCanvas />
      <ControlPanel />
    </div>
  );
}
