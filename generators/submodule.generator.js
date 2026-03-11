import path from "path";
import fs from "fs";

import { generateFromBlueprint } from "../engine/blueprint.engine.js";
import { capitalize, plural, toKebabCase } from "../lib/utils/string.js";

import pageTemplate from "../lib/templates/page.template.js";
import addModalTemplate from "../lib/templates/modal-add.template.js";
import editModalTemplate from "../lib/templates/modal-edit.template.js";
import viewModalTemplate from "../lib/templates/modal-view.template.js";
import deleteModalTemplate from "../lib/templates/modal-delete.template.js";
import commonFormTemplate from "../lib/templates/modal-common-form.template.js";
import dataTemplate from "../lib/templates/data.template.js";
import serviceTemplate from "../lib/templates/service.template.js";
import queryTemplate from "../lib/templates/query.template.js";
import mutationTemplate from "../lib/templates/mutation.template.js";
import storeTemplate from "../lib/templates/store.template.js";

export function generateSubModule(parentName, subName) {
  const parent = parentName.toLowerCase();
  const sub = subName.toLowerCase();

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

    // Add import line if not exists
    const importLine = `import ${subName}Page from './pages/${subName}Page.vue'`;
    if (!content.includes(importLine)) {
      content = importLine + "\n" + content;
    }

    // Route block to append
    const routeBlock = `
      {
        path: '${plural(toKebabCase(subName))}',
        name: '${subName} List',
        component: ${subName}Page,
      },`;

    // Insert before the closing bracket of children array
    content = content.replace(
      /children:\s*\[([\s\S]*?)\]/m,
      (match, inner) => `children: [${inner}${routeBlock}\n]`,
    );

    fs.writeFileSync(routesFile, content);
  }

  generateFromBlueprint(ctx, {
    basePath: parentPath,

    folders: [`pages/${subName}Parts`],

    files: [
      {
        path: `pages/{{subName}}Page.vue`,
        template: pageTemplate,
      },

      {
        path: `pages/{{subName}}Parts/AddModal.vue`,
        template: addModalTemplate,
      },

      {
        path: `pages/{{subName}}Parts/EditModal.vue`,
        template: editModalTemplate,
      },

      {
        path: `pages/{{subName}}Parts/ViewModal.vue`,
        template: viewModalTemplate,
      },

      {
        path: `pages/{{subName}}Parts/DeleteModal.vue`,
        template: deleteModalTemplate,
      },

      {
        path: `pages/{{subName}}Parts/CommonForm.vue`,
        template: commonFormTemplate,
      },
      {
        path: `data/{{subName}}Data.js`,
        template: dataTemplate,
      },

      { path: "stores/{{subName}}Store.js", template: storeTemplate },

      { path: "services/{{subName}}Service.js", template: serviceTemplate },

      {
        path: "queries/use{{subName}}Query.js",
        template: queryTemplate,
      },

      {
        path: "queries/use{{subName}}Mutations.js",
        template: mutationTemplate,
      },
    ],
  });

  appendRoute(parentPath,  subName);

  console.log(`✅ Submodule "${sub}" created in "${parent}"`);
}
