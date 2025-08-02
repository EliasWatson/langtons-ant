import { type ReactNode, useMemo } from "react";
import { useSimulatorStore } from "../store.ts";
import { Container, Graphics, GraphicsContext } from "pixi.js";
import { extend } from "@pixi/react";

const cellColors = [
  "#000000", // 0: Black (Background)
  "#FFFFFF", // 1: White
  "#FF00FF", // 2: Magenta/Fuchsia
  "#FFFF00", // 3: Yellow
  "#00FF00", // 4: Lime
  "#00FFFF", // 5: Cyan/Aqua
  "#FF0000", // 6: Red
  "#FFA500", // 7: Orange
  "#0000FF", // 8: Blue
  "#FF69B4", // 9: Hot Pink
  "#DA70D6", // 10: Orchid
  "#8A2BE2", // 11: BlueViolet
];

extend({ Container, Graphics });

export function Cells(): ReactNode {
  const cells = useSimulatorStore((store) => store.cells);

  const graphicsContext = useMemo(() => {
    const g = new GraphicsContext();
    g.rect(-0.5, -0.5, 0.5, 0.5);
    // The color will be changed via tinting in the Graphics component.
    g.fill({ color: "white" });
    return g;
  }, []);

  return (
    <pixiContainer interactive={false} interactiveChildren={false}>
      {[...cells.entries()].flatMap(([y, row]) =>
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
