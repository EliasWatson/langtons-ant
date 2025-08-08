import { z } from "zod";

export const moveCommands = [
  "L",
  "R",
  "U",
  "N",
  "S",
  "<",
  ">",
  "v",
  "^",
] as const;

const moveCommandSchema = z.enum(moveCommands);
export type MoveCommand = z.infer<typeof moveCommandSchema>;

export const moveNames: Record<string, string> = {
  L: "Turn Left",
  R: "Turn Right",
  U: "U-Turn",
  N: "No Turn",
  S: "Stay",
  "<": "Move Left",
  ">": "Move Right",
  v: "Move Down",
  "^": "Move Up",
};

const commandSchema = z.object({
  writeColor: z.number(),
  move: moveCommandSchema,
  nextState: z.union([z.string(), z.number()]),
});
export type Command = z.infer<typeof commandSchema>;

export const rulesetSchema = z.object({
  name: z.string(),
  initialState: z.string(),
  states: z.record(z.string(), z.array(commandSchema.nullable())),
});
export type Ruleset = z.infer<typeof rulesetSchema>;
