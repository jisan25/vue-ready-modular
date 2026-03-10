#!/usr/bin/env node

import { createModule, createSubModule } from "../lib/generator.js";

const args = process.argv.slice(2);

if (args[0] !== "make" || !args[1]) {
  console.log("Usage:");
  console.log("  vue-modular make <module-name>");
  console.log("  vue-modular make <parent-module>:<submodule-name>");
  process.exit(1);
}

const input = args[1];

// Check if user wants a submodule
if (input.includes(":")) {
  const [parent, child] = input.split(":");
  createSubModule(parent, child);
} else {
  createModule(input);
}