import path from "path";
import { createDir, createFile } from "../lib/utils/file.js";

function renderPath(templatePath, ctx) {
  let output = templatePath;

  Object.keys(ctx).forEach((key) => {
    output = output.replaceAll(`{{${key}}}`, ctx[key]);
  });

  return output;
}

export function generateFromBlueprint(ctx, blueprint) {
  const { basePath, folders = [], files = [] } = blueprint;

  // Create folders
  folders.forEach((folder) => {
    const full = path.join(basePath, folder);
    createDir(full);
  });

  // Create files
  files.forEach((file) => {
    const filePath = renderPath(file.path, ctx);

    const full = path.join(basePath, filePath);

    const content = file.template(ctx);

    createFile(full, content);
  });
}