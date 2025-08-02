import { type ReactNode, useEffect, useState } from "react";
import { Viewport } from "pixi-viewport";
import { extend, useApplication } from "@pixi/react";
import type { Renderer } from "pixi.js";

extend({ Viewport });

export type SimulatorViewportProps = {
  children?: ReactNode;
};

export function SimulatorViewport({
  children,
}: SimulatorViewportProps): ReactNode {
  const { app } = useApplication();
  // The renderer might be undefined, but the type does not reflect that by default.
  const renderer = app.renderer as Renderer | undefined;

  const [viewportInstance, setViewportInstance] = useState<Viewport | null>(
    null,
  );
  useEffect(() => {
    if (!viewportInstance) return;

    viewportInstance.drag().pinch().wheel().decelerate();

    viewportInstance.moveCenter({ x: 0, y: 0 });
    viewportInstance.setZoom(50);
  }, [viewportInstance]);

  return renderer ? (
    <viewport ref={setViewportInstance} events={renderer.events}>
      {children}
    </viewport>
  ) : null;
}
