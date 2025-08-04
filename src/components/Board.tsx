import { type ReactNode, useMemo } from "react";
import { useSimulatorStore } from "../store.ts";
import { Container, Graphics, GraphicsContext } from "pixi.js";
import { extend } from "@pixi/react";
import { cellColors } from "@/util/colors.ts";

extend({ Container, Graphics });

export function Board(): ReactNode {
  const board = useSimulatorStore((store) => store.board);

  const graphicsContext = useMemo(() => {
    const g = new GraphicsContext();
    g.rect(-0.5, -0.5, 1, 1);
    // The color will be changed via tinting in the Graphics component.
    g.fill({ color: "white" });
    return g;
  }, []);

  return (
    <pixiContainer interactive={false} interactiveChildren={false}>
      {[...board.entries()].flatMap(([y, row]) =>
        [...row.entries()].map(([x, color]) => (
          <pixiGraphics
            key={`${x},${y}`}
            context={graphicsContext}
            // A draw function is required, but we don't need to draw
            // anything here since we are using the GraphicsContext.
            draw={emptyFunction}
            tint={cellColors[color]}
            x={x}
            y={y}
          />
        )),
      )}
    </pixiContainer>
  );
}

function emptyFunction(): void {
  // This function is intentionally left empty.
}
