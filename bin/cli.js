#!/usr/bin/env node

import { makeCommand } from "../commands/make.command.js";

const args = process.argv.slice(2);

const [command, input] = args;

switch (command) {
  case "make":
    makeCommand(input);
    break;

  default:
    console.log("Usage:");
    console.log("vue-modular make module");
    console.log("vue-modular make module:submodule");
}