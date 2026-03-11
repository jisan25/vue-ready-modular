import path from "path";
import fs from "fs";

import { generateFromBlueprint } from "../engine/blueprint.engine.js";
import { capitalize, plural } from "../lib/utils/string.js";

import indexTemplate from "../lib/templates/index.template.js";
import routesTemplate from "../lib/templates/routes.template.js";
import storeTemplate from "../lib/templates/store.template.js";
import dataTemplate from "../lib/templates/data.template.js";
import serviceTemplate from "../lib/templates/service.template.js";
import queryTemplate from "../lib/templates/query.template.js";
import mutationTemplate from "../lib/templates/mutation.template.js";
import pageTemplate from "../lib/templates/page.template.js";
import addModalTemplate from "../lib/templates/modal-add.template.js";
import editModalTemplate from "../lib/templates/modal-edit.template.js";
import viewModalTemplate from "../lib/templates/modal-view.template.js";
import deleteModalTemplate from "../lib/templates/modal-delete.template.js";
import commonFormTemplate from "../lib/templates/modal-common-form.template.js";

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
      "data",
      "services",
      "queries",
    ],

    files: [
      { path: "index.js", template: indexTemplate },
      { path: "routes.js", template: routesTemplate },

      { path: "stores/{{name}}Store.js", template: storeTemplate },

      { path: "data/{{name}}Data.js", template: dataTemplate },

      { path: "services/{{name}}Service.js", template: serviceTemplate },

      {
        path: "queries/use{{Name}}Query.js",
        template: queryTemplate,
      },

      {
        path: "queries/use{{Name}}Mutations.js",
        template: mutationTemplate,
      },

      {
        path: "pages/{{Name}}Page.vue",
        template: pageTemplate,
      },

      {
        path: "pages/components/AddModal.vue",
        template: addModalTemplate,
      },

      {
        path: "pages/components/EditModal.vue",
        template: editModalTemplate,
      },

      {
        path: "pages/components/ViewModal.vue",
        template: viewModalTemplate,
      },

      {
        path: "pages/components/DeleteModal.vue",
        template: deleteModalTemplate,
      },

      {
        path: "pages/components/CommonForm.vue",
        template: commonFormTemplate,
      },
    ],
  });

  console.log(`✅ Module "${module}" created`);
}