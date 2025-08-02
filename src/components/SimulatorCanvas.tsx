import { type ReactNode } from "react";
import { Application } from "@pixi/react";
import { SimulatorViewport } from "./SimulatorViewport.tsx";
import { Board } from "./Board.tsx";
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
        <Board />
        <Ants />
      </SimulatorViewport>
    </Application>
  );
}
