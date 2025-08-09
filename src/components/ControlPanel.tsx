import { type ReactNode, useState } from "react";
import { ChevronRight } from "lucide-react";
import { clsx } from "clsx";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs.tsx";
import { SimulatorControls } from "@/components/SimulatorControls.tsx";
import { RuleControls } from "@/components/RuleControls.tsx";

export function ControlPanel(): ReactNode {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={clsx(
        "transition-all h-screen",
        open ? "w-80" : "w-0",
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
          "w-80 h-screen absolute top-0 left-0 z-0 p-2",
          "border-l border-gray-600 bg-gray-900",
          "flex flex-col overflow-y-auto",
        )}
      >
        <SimulatorControls />
        <Tabs defaultValue="rules" className="mt-6 flex-1">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="rules">Rules</TabsTrigger>
            <TabsTrigger value="ants">Ants</TabsTrigger>
          </TabsList>
          <TabsContent value="rules" className="mt-4">
            <RuleControls />
          </TabsContent>
          <TabsContent value="ants" className="mt-4">
            TODO
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
