import { type ReactNode } from "react";
import { useSimulatorStore } from "@/store.ts";
import { cellColors } from "@/util/colors.ts";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button.tsx";
import { MoveEditor } from "@/components/RuleSetEditor/MoveEditor.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function RuleSetEditor(): ReactNode {
  const ruleset = useSimulatorStore((state) => state.ruleset);
  const updateRuleMove = useSimulatorStore((state) => state.updateRuleMove);

  return (
    <div className="flex flex-col gap-6">
      {Object.entries(ruleset.states).map(([stateKey, stateRules]) => (
        <div key={stateKey} className="flex flex-col gap-4">
          <h3 className="font-medium text-lg">State: {stateKey}</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>When</TableHead>
                <TableHead>Write</TableHead>
                <TableHead>Move</TableHead>
                <TableHead>State</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(stateRules).map(([colorKey, rule]) => (
                <TableRow key={colorKey}>
                  <TableCell>
                    <div
                      className="w-8 h-8 rounded border border-gray-500"
                      style={{ background: cellColors[Number(colorKey)] }}
                    />
                  </TableCell>
                  <TableCell>
                    <div
                      className="w-8 h-8 rounded border border-gray-500"
                      style={{ background: cellColors[rule.writeColor] }}
                    />
                  </TableCell>
                  <TableCell>
                    <MoveEditor
                      move={rule.move}
                      onMoveChange={(newMove) =>
                        updateRuleMove(stateKey, Number(colorKey), newMove)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline">{rule.nextState}</Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        Place content for the popover here.
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  );
}
