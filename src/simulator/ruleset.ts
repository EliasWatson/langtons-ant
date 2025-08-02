import { z } from "zod";

const moveCommandSchema = z.enum(["L", "R", "U", "N", "S", "<", ">", "v", "^"]);
export type MoveCommand = z.infer<typeof moveCommandSchema>;

const commandSchema = z.object({
  writeColor: z.number(),
  move: moveCommandSchema,
  nextState: z.union([z.string(), z.number()]),
});
export type Command = z.infer<typeof commandSchema>;

export const rulesetSchema = z.object({
  name: z.string(),
  initialState: z.string(),
  states: z.record(z.string(), z.array(commandSchema)),
});
export type Ruleset = z.infer<typeof rulesetSchema>;
