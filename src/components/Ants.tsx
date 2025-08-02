import { type ReactNode, useMemo } from "react";
import { useSimulatorStore } from "../store.ts";
import { Container, Graphics, GraphicsContext } from "pixi.js";
import { extend } from "@pixi/react";
import { directionAngles } from "../simulator/directions.ts";

extend({ Container, Graphics });

export function Ants(): ReactNode {
  const ants = useSimulatorStore((store) => store.ants);

  const graphicsContext = useMemo(() => {
    const g = new GraphicsContext();
    g.moveTo(0.4, 0.3);
    g.lineTo(0.4, -0.3);
    g.lineTo(-0.4, 0);
    g.closePath();
    g.fill({ color: "red" });
    return g;
  }, []);

  return (
    <pixiContainer interactive={false} interactiveChildren={false} zIndex={1}>
      {ants.map((ant, index) => (
        <pixiGraphics
          key={index}
          context={graphicsContext}
          // A draw function is required, but we don't need to draw
          // anything here since we are using the GraphicsContext.
          draw={emptyFunction}
          x={ant.x}
          y={ant.y}
          rotation={directionAngles[ant.direction]}
        />
      ))}
    </pixiContainer>
  );
}

function emptyFunction(): void {
  // This function is intentionally left empty.
}
