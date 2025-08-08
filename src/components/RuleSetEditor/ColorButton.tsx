import type { ComponentProps, ReactNode } from "react";
import { Button } from "@/components/ui/button.tsx";
import { cellColors } from "@/util/colors.ts";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";

export type ColorButtonProps = ComponentProps<"button"> & {
  colorIndex: number;
};

export function ColorButton({
  colorIndex,
  ...props
}: ColorButtonProps): ReactNode {
  const color = cellColors[colorIndex];

  return (
    <Tooltip delayDuration={500}>
      <TooltipTrigger asChild>
        <Button
          {...props}
          className="w-8 h-8 p-0 border border-gray-500"
          style={{ backgroundColor: color }}
        />
      </TooltipTrigger>
      <TooltipContent>
        <p>Color {colorIndex}</p>
      </TooltipContent>
    </Tooltip>
  );
}
