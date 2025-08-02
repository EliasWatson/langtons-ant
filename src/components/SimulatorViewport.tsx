import { type ReactNode, useEffect, useState } from "react";
import { Viewport } from "pixi-viewport";
import { extend, useApplication, useTick } from "@pixi/react";
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

    viewportInstance.resize(renderer?.width, renderer?.height);
    viewportInstance.moveCenter({ x: 0, y: 0 });
    viewportInstance.setZoom(10);
  }, [renderer?.height, renderer?.width, viewportInstance]);

  useTick(() => {
    if (!viewportInstance) return;

    viewportInstance.resize(app.renderer.width, app.renderer.height);
  });

  return renderer ? (
    <viewport ref={setViewportInstance} events={renderer.events}>
      {children}
    </viewport>
  ) : null;
}
