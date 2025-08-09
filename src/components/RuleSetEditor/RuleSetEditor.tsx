import { type ReactNode, useState } from "react";
import { useSimulatorStore } from "@/store.ts";
import { cellColors } from "@/util/colors.ts";
import { MoveEditor } from "@/components/RuleSetEditor/MoveEditor.tsx";
import { ColorEditor } from "@/components/RuleSetEditor/ColorEditor.tsx";
import { StateEditor } from "@/components/RuleSetEditor/StateEditor.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Plus, Trash2 } from "lucide-react";

export function RuleSetEditor(): ReactNode {
  const ruleset = useSimulatorStore((state) => state.ruleset);
  const updateRuleMove = useSimulatorStore((state) => state.updateRuleMove);
  const updateRuleColor = useSimulatorStore((state) => state.updateRuleColor);
  const updateRuleState = useSimulatorStore((state) => state.updateRuleState);
  const createNewState = useSimulatorStore((state) => state.createNewState);
  const deleteState = useSimulatorStore((state) => state.deleteState);
  const deleteRule = useSimulatorStore((state) => state.deleteRule);

  const [newStateName, setNewStateName] = useState("");

  let defaultNewStateIndex = Object.keys(ruleset.states).length;
  while (ruleset.states[`${defaultNewStateIndex}`]) {
    defaultNewStateIndex++;
  }

  const handleCreateState = () => {
    const name = newStateName.trim() || `${defaultNewStateIndex}`;
    if (name && !ruleset.states[name]) {
      createNewState(name);
      setNewStateName("");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {Object.entries(ruleset.states).map(([stateKey, stateRules]) => (
        <div key={stateKey} className="flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-lg">State: {stateKey}</h3>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => deleteState(stateKey)}
              disabled={Object.keys(ruleset.states).length <= 1}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Tooltip delayDuration={500}>
                    <TooltipTrigger>When</TooltipTrigger>
                    <TooltipContent>
                      <p>When on this color, do these actions</p>
                    </TooltipContent>
                  </Tooltip>
                </TableHead>
                <TableHead>
                  <Tooltip delayDuration={500}>
                    <TooltipTrigger>Write</TooltipTrigger>
                    <TooltipContent>
                      <p>Write this color to the current cell</p>
                    </TooltipContent>
                  </Tooltip>
                </TableHead>
                <TableHead>
                  <Tooltip delayDuration={500}>
                    <TooltipTrigger>Move</TooltipTrigger>
                    <TooltipContent>
                      <p>Perform this movement</p>
                    </TooltipContent>
                  </Tooltip>
                </TableHead>
                <TableHead>
                  <Tooltip delayDuration={500}>
                    <TooltipTrigger>State</TooltipTrigger>
                    <TooltipContent>
                      <p>Switch to this state</p>
                    </TooltipContent>
                  </Tooltip>
                </TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(stateRules).map(([colorKey, rule]) =>
                rule ? (
                  <TableRow key={colorKey}>
                    <TableCell>
                      <div
                        className="w-8 h-8 rounded border border-gray-500"
                        style={{ background: cellColors[Number(colorKey)] }}
                      />
                    </TableCell>
                    <TableCell>
                      <ColorEditor
                        colorIndex={rule.writeColor}
                        onColorChange={(newColor) =>
                          updateRuleColor(stateKey, Number(colorKey), newColor)
                        }
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
                      <StateEditor
                        currentState={rule.nextState}
                        onStateChange={(newState) =>
                          updateRuleState(stateKey, Number(colorKey), newState)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteRule(stateKey, Number(colorKey))}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ) : null,
              )}
            </TableBody>
          </Table>
        </div>
      ))}
      <div className="flex flex-col gap-2">
        <h3 className="font-medium text-lg">Create New State</h3>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder={`${defaultNewStateIndex}`}
            value={newStateName}
            onChange={(e) => setNewStateName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCreateState();
              }
            }}
          />
          <Button
            onClick={handleCreateState}
            disabled={
              !!newStateName.trim() && !!ruleset.states[newStateName.trim()]
            }
          >
            <Plus />
          </Button>
        </div>
      </div>
    </div>
  );
}
