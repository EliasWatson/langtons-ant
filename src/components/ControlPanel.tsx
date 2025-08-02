import { type ReactNode, useState } from "react";
import { ChevronRight } from "lucide-react";
import { clsx } from "clsx";

export function ControlPanel(): ReactNode {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-screen p-2 border-l border-gray-600 bg-gray-900 relative">
      <div
        className={clsx(
          "w-6 h-8",
          "absolute -left-6 top-4 z-10",
          "border border-r-0 border-gray-600 bg-gray-900 rounded-l",
          "flex items-center justify-center",
          "cursor-pointer",
        )}
        onClick={() => setOpen((prev) => !prev)}
      >
        <ChevronRight
          className={clsx("transition-transform", !open && "-scale-x-100")}
        />
      </div>
      Test
    </div>
  );
}
