import { SimulatorCanvas } from "./components/SimulatorCanvas.tsx";
import { useAnimationFrame } from "./util/use-animation-frame.ts";
import { useSimulatorStore } from "./store.ts";

export default function App() {
  const simulateSteps = useSimulatorStore((state) => state.simulateSteps);

  useAnimationFrame(() => {
    simulateSteps(10);
  });

  return (
    <div className="w-screen h-screen overflow-hidden">
      <SimulatorCanvas />
    </div>
  );
}
