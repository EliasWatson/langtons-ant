import type { ReactNode } from "react";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { cellColors } from "@/util/colors.ts";
import { ColorButton } from "@/components/RuleSetEditor/ColorButton.tsx";

export type ColorEditorProps = {
  colorIndex: number;
  onColorChange?: (colorIndex: number) => void;
};

export function ColorEditor({
  colorIndex,
  onColorChange,
}: ColorEditorProps): ReactNode {
  const [open, setOpen] = useState(false);

  const handleColorSelect = (selectedColorIndex: number) => {
    onColorChange?.(selectedColorIndex);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <ColorButton colorIndex={colorIndex} />
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid grid-cols-4 gap-2">
          {cellColors.map((_, index) => (
            <ColorButton
              key={index}
              colorIndex={index}
              onClick={() => handleColorSelect(index)}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
