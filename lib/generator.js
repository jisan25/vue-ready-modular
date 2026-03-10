import path from "path";
import fs from "fs";
import { plural, capitalize } from "./utils/string.js";

import { createDir, createFile } from "./utils/file.js";

// Templates
import indexTemplate from "./templates/index.template.js";
import routesTemplate from "./templates/routes.template.js";
import storeTemplate from "./templates/store.template.js";
import dataTemplate from "./templates/data.template.js";
import serviceTemplate from "./templates/service.template.js";
import queryTemplate from "./templates/query.template.js";
import mutationTemplate from "./templates/mutation.template.js";
import pageTemplate from "./templates/page.template.js";
import addModalTemplate from "./templates/modal-add.template.js";
import commonFormTemplate from "./templates/modal-common-form.template.js";
import editModalTemplate from "./templates/modal-edit.template.js";
import viewModalTemplate from "./templates/modal-view.template.js";
import deleteModalTemplate from "./templates/modal-delete.template.js";

/**
 * Generates a modular Vue.js module with a full structure.
 * @param {string} name - Module name (e.g., "country")
 */
export function createModule(name) {
  const module = name.toLowerCase();
  const Module = capitalize(module);

  const basePath = path.join(process.cwd(), "src/modules", module);

  // Prevent overwriting existing module
  if (fs.existsSync(basePath)) {
    console.error(`❌ Module "${module}" already exists`);
    process.exit(1);
  }

  // -----------------------------
  // 1. Create folder structure
  // -----------------------------
  const folders = [
    `${basePath}/stores`,
    `${basePath}/pages/components`,
    `${basePath}/data`,
    `${basePath}/services`,
    `${basePath}/queries`,
  ];

  folders.forEach(createDir);

  // -----------------------------
  // 2. Prepare template context
  // -----------------------------
  const ctx = { name: module, Name: Module };

  // -----------------------------
  // 3. Create core module files
  // -----------------------------
  createFile(`${basePath}/index.js`, indexTemplate(ctx));
  createFile(`${basePath}/routes.js`, routesTemplate(ctx));
  createFile(`${basePath}/stores/${module}Store.js`, storeTemplate(ctx));
  createFile(`${basePath}/data/${module}Data.js`, dataTemplate(ctx));
  createFile(`${basePath}/services/${module}Service.js`, serviceTemplate(ctx));
  createFile(
    `${basePath}/queries/use${capitalize(plural(Module))}Query.js`,
    queryTemplate(ctx)
  );
  createFile(
    `${basePath}/queries/use${Module}Mutations.js`,
    mutationTemplate(ctx)
  );

  // -----------------------------
  // 4. Create page & modal components
  // -----------------------------
  createFile(`${basePath}/pages/${Module}Page.vue`, pageTemplate(ctx));
  createFile(
    `${basePath}/pages/components/AddModal.vue`,
    addModalTemplate(ctx)
  );
  createFile(
    `${basePath}/pages/components/CommonForm.vue`,
    commonFormTemplate(ctx)
  );
  createFile(
    `${basePath}/pages/components/EditModal.vue`,
    editModalTemplate(ctx)
  );
  createFile(
    `${basePath}/pages/components/ViewModal.vue`,
    viewModalTemplate(ctx)
  );
  createFile(
    `${basePath}/pages/components/DeleteModal.vue`,
    deleteModalTemplate(ctx)
  );

  console.log(`✅ Module "${module}" created successfully`);
}

export function createSubModule(parentName, subName) {
  const parent = parentName.toLowerCase();
  const sub = subName.toLowerCase();
  
  const Parent = capitalize(parent);
  const Sub = capitalize(sub);

  const parentPath = path.join(process.cwd(), "src/modules", parent);

  if (!fs.existsSync(parentPath)) {
    console.error(`❌ Parent module "${parent}" does not exist`);
    process.exit(1);
  }

  const ctx = { name: sub, Name: subName, parent: parent, Parent: Parent };

  // -----------------------------
  // 1. Create subModuleParts folder ONLY for components
  // -----------------------------
  const componentsFolder = `${parentPath}/pages/${subName}Parts`;
  createDir(componentsFolder);

  // -----------------------------
  // 2. Create Page
  // -----------------------------
  createFile(`${parentPath}/pages/${subName}Page.vue`, pageTemplate(ctx));

  // -----------------------------
  // 3. Create Components in subModuleParts
  // -----------------------------
  createFile(`${componentsFolder}/AddModal.vue`, addModalTemplate(ctx));
  createFile(`${componentsFolder}/EditModal.vue`, editModalTemplate(ctx));
  createFile(`${componentsFolder}/ViewModal.vue`, viewModalTemplate(ctx));
  createFile(`${componentsFolder}/DeleteModal.vue`, deleteModalTemplate(ctx));
  createFile(`${componentsFolder}/CommonForm.vue`, commonFormTemplate(ctx));

  // -----------------------------
  // 4. Services, Store, Query, Mutation, Data
  // -----------------------------
  createFile(
    `${parentPath}/services/${subName}Service.js`,
    serviceTemplate(ctx)
  );

  createFile(
    `${parentPath}/stores/${subName}Store.js`,
    storeTemplate(ctx)
  );

  createFile(
    `${parentPath}/queries/use${capitalize(plural(Sub))}Query.js`,
    queryTemplate(ctx)
  );

  createFile(
    `${parentPath}/queries/use${subName}Mutations.js`,
    mutationTemplate(ctx)
  );

  createFile(`${parentPath}/data/${subName}Data.js`, dataTemplate(ctx));

  console.log(
    `✅ Submodule "${subName}" created inside "${parent}" (components in ${subName}Parts)`
  );
}