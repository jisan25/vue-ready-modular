import path from "path";
import fs from "fs";

import { generateFromBlueprint } from "../engine/blueprint.engine.js";
import { capitalize } from "../lib/utils/string.js";

import indexTemplate from "../lib/templates/index.template.js";
import routesTemplate from "../lib/templates/routes.template.js";
import storeTemplate from "../lib/templates/store.template.js";
import pageTemplate from "../lib/templates/page.template.js";
import formModalTemplate from "../lib/templates/modal-form.template.js";
import viewModalTemplate from "../lib/templates/modal-view.template.js";


export function generateModule(name) {
  const module = name.toLowerCase();
  const Module = capitalize(module);

  const basePath = path.join(process.cwd(), "src/modules", module);

  if (fs.existsSync(basePath)) {
    console.error(`❌ Module "${module}" already exists`);
    process.exit(1);
  }

  const ctx = {
    name: module,
    Name: Module,
  };

  generateFromBlueprint(ctx, {
    basePath,

    folders: [
      "stores",
      "pages/components",
    ],

    files: [
      { path: "index.js", template: indexTemplate },
      { path: "routes.js", template: routesTemplate },

      { path: "stores/{{Name}}Store.js", template: storeTemplate },

      {
        path: "pages/{{Name}}Page.vue",
        template: pageTemplate,
      },
      {
        path: "pages/components/FormModal.vue",
        template: formModalTemplate,
      },
      {
        path: "pages/components/ViewModal.vue",
        template: viewModalTemplate,
      },

    ],
  });

  console.log(`✅ Module "${module}" created`);
}