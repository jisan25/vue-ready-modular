import path from "path";
import fs from "fs";

import { generateFromBlueprint } from "../engine/blueprint.engine.js";
import { capitalize, plural } from "../lib/utils/string.js";

import pageTemplate from "../lib/templates/page.template.js";
import addModalTemplate from "../lib/templates/modal-add.template.js";
import editModalTemplate from "../lib/templates/modal-edit.template.js";
import viewModalTemplate from "../lib/templates/modal-view.template.js";
import deleteModalTemplate from "../lib/templates/modal-delete.template.js";
import commonFormTemplate from "../lib/templates/modal-common-form.template.js";

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
    parent,
    Parent,
    Names: plural(Sub),
  };

  generateFromBlueprint(ctx, {
    basePath: parentPath,

    folders: [
      `pages/${Sub}Parts`
    ],

    files: [
      {
        path: `pages/{{Name}}Page.vue`,
        template: pageTemplate,
      },

      {
        path: `pages/{{Name}}Parts/AddModal.vue`,
        template: addModalTemplate,
      },

      {
        path: `pages/{{Name}}Parts/EditModal.vue`,
        template: editModalTemplate,
      },

      {
        path: `pages/{{Name}}Parts/ViewModal.vue`,
        template: viewModalTemplate,
      },

      {
        path: `pages/{{Name}}Parts/DeleteModal.vue`,
        template: deleteModalTemplate,
      },

      {
        path: `pages/{{Name}}Parts/CommonForm.vue`,
        template: commonFormTemplate,
      },
    ],
  });

  console.log(`✅ Submodule "${sub}" created in "${parent}"`);
}