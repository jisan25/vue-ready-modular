import path from "path";
import fs from "fs";

import { generateFromBlueprint } from "../engine/blueprint.engine.js";
import { capitalize, plural, toKebabCase } from "../lib/utils/string.js";

import pageTemplate from "../lib/templates/page.template.js";
import formModalTemplate from "../lib/templates/modal-form.template.js";
import viewModalTemplate from "../lib/templates/modal-view.template.js";
import storeTemplate from "../lib/templates/store.template.js";

export function generateSubModule(parentName, subName) {
  const parent = parentName.toLowerCase();
  const sub = toKebabCase(subName).replace(/-/g, "_"); // SupplierProduct -> supplier_product

  const Parent = capitalize(parent);
  const Sub = capitalize(sub);

  const parentPath = path.join(process.cwd(), "src/modules", parent);

  if (!fs.existsSync(parentPath)) {
    console.error(`❌ Parent module "${parent}" does not exist`);
    process.exit(1);
  }

  const ctx = {
    name: sub,
    Name: Sub,
    subName,
    parent,
    Parent,
    Names: plural(Sub),
  };

function appendRoute(parentPath, subName) {
  const routesFile = path.join(parentPath, "routes.js");

  if (!fs.existsSync(routesFile)) return;

  let content = fs.readFileSync(routesFile, "utf-8");

  const importLine = `import ${subName}Page from './pages/${subName}Page.vue'`;

  // ✅ Add import safely
  if (!content.includes(importLine)) {
    content = importLine + "\n" + content;
  }

  const routeBlock = `
      {
        path: '${plural(toKebabCase(subName))}',
        name: '${capitalize(subName)} List',
        component: ${subName}Page,
        meta: {
          permissions: ['${subName.toLowerCase()}.view'],
        },
      },`;

  // ✅ Find "children: ["
  const childrenStart = content.indexOf("children:");

  if (childrenStart === -1) return;

  const arrayStart = content.indexOf("[", childrenStart);

  if (arrayStart === -1) return;

  // ✅ Proper bracket matching (IMPORTANT)
  let bracketCount = 0;
  let i = arrayStart;

  for (; i < content.length; i++) {
    if (content[i] === "[") bracketCount++;
    else if (content[i] === "]") bracketCount--;

    if (bracketCount === 0) break;
  }

  const arrayEnd = i;

  if (arrayEnd === -1) return;

  const before = content.slice(0, arrayEnd);
  const after = content.slice(arrayEnd);

  content = before + routeBlock + "\n" + after;

  fs.writeFileSync(routesFile, content);
}

  generateFromBlueprint(ctx, {
    basePath: parentPath,

    folders: [`pages/${subName}Parts`],

    files: [
      { path: "stores/{{subName}}Store.js", template: storeTemplate },

      {
        path: `pages/{{subName}}Page.vue`,
        template: pageTemplate,
      },

      {
        path: `pages/{{subName}}Parts/FormModal.vue`,
        template: formModalTemplate,
      },
      {
        path: `pages/{{subName}}Parts/ViewModal.vue`,
        template: viewModalTemplate,
      },
    ],
  });

  appendRoute(parentPath, subName);

  console.log(`✅ Submodule "${sub}" created in "${parent}"`);
}
