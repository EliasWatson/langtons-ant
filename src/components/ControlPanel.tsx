import { type ReactNode, useState } from "react";
import { ChevronRight } from "lucide-react";
import { clsx } from "clsx";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion.tsx";
import { SimulatorControls } from "@/components/SimulatorControls.tsx";

export function ControlPanel(): ReactNode {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={clsx(
        "transition-all h-screen",
        open ? "w-64" : "w-0",
        "relative",
      )}
    >
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
      <div
        className={clsx(
          "w-64 h-screen absolute top-0 left-0 z-0 p-2",
          "border-l border-gray-600 bg-gray-900",
          "flex flex-col",
        )}
      >
        <SimulatorControls />
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
