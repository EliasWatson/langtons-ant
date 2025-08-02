import type { ReactNode } from "react";
import { Application } from "@pixi/react";

export function SimulatorCanvas(): ReactNode {
  return (
    <Application
      className="absolute left-0 top-0"
      resizeTo={window}
      autoDensity={true}
      resolution={devicePixelRatio}
    ></Application>
  );
}
