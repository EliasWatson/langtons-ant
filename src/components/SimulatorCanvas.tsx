import { type ReactNode, useRef } from "react";
import { Application } from "@pixi/react";
import { SimulatorViewport } from "./SimulatorViewport.tsx";
import { Board } from "./Board.tsx";
import { Ants } from "./Ants.tsx";

export function SimulatorCanvas(): ReactNode {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={containerRef} className="grow relative">
      <Application
        className="absolute left-0 top-0"
        resizeTo={containerRef}
        autoDensity
        resolution={devicePixelRatio}
      >
        <SimulatorViewport>
          <Board />
          <Ants />
        </SimulatorViewport>
      </Application>
    </div>
  );
}
