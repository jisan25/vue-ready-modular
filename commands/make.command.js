import { generateModule } from "../generators/module.generator.js";
import { generateSubModule } from "../generators/submodule.generator.js";

export function makeCommand(input) {
  if (!input) {
    console.error("Module name required");
    process.exit(1);
  }

  if (input.includes(":")) {
    const [parent, child] = input.split(":");
    generateSubModule(parent, child);
  } else {
    generateModule(input);
  }
}