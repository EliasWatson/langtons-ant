import { SimulatorCanvas } from "./components/SimulatorCanvas.tsx";
import { useSimulatorStore } from "./store.ts";
import { useEffect } from "react";

export default function App() {
  const setCellColor = useSimulatorStore((store) => store.setCellColor);
  useEffect(() => {
    setCellColor(0, 0, 1);
  }, [setCellColor]);

  return (
    <div className="w-screen h-screen overflow-hidden">
      <SimulatorCanvas />
    </div>
  );
}
