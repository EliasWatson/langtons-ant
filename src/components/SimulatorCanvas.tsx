import { type ReactNode } from "react";
import { Application } from "@pixi/react";
import { SimulatorViewport } from "./SimulatorViewport.tsx";
import { Cells } from "./Cells.tsx";
import { Ants } from "./Ants.tsx";

export function SimulatorCanvas(): ReactNode {
  return (
    <Application
      className="absolute left-0 top-0"
      resizeTo={window}
      autoDensity
      resolution={devicePixelRatio}
    >
      <SimulatorViewport>
        <Cells />
        <Ants />
      </SimulatorViewport>
    </Application>
  );
}
