import { Fragment, type ReactNode } from "react";
import { useSimulatorStore } from "@/store.ts";
import { cellColors } from "@/util/colors.ts";

export function RuleSetEditor(): ReactNode {
  const ruleset = useSimulatorStore((state) => state.ruleset);

  return (
    <div className="flex flex-col">
      {Object.entries(ruleset.states).map(([stateKey, stateRules]) => (
        <div key={stateKey} className="flex flex-col gap-2">
          <div>{stateKey}</div>
          <div className="grid grid-cols-5 gap-2">
            {Object.entries(stateRules).map(([colorKey, rule]) => (
              <Fragment key={colorKey}>
                <div
                  className="w-8 h-8 rounded border border-gray-500"
                  style={{ background: cellColors[Number(colorKey)] }}
                />
                <div />
                <div
                  className="w-8 h-8 rounded border border-gray-500"
                  style={{ background: cellColors[rule.writeColor] }}
                />
                <div>{rule.move}</div>
                <div>{rule.nextState}</div>
              </Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
