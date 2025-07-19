#!/usr/bin/env node

import { existsSync } from "node:fs";
import path from "node:path";
import { askPackageManager } from "./steps/askPackageManager.js";
import { createViteApp } from "./steps/createViteApp.js";
import { addPrettierConfig } from "./steps/dsf.js";
import { formatSrc } from "./steps/formatSrc.js";
import { installDependencies } from "./steps/installDependencies.js";
import { scaffoldSourceFiles } from "./steps/scaffoldSourceFiles.js";
import { setupGit } from "./steps/setupGit.js";
import { setupShadcnUi } from "./steps/setupShadcnUi.js";
import { setupTailwind } from "./steps/setupTailwind.js";
import { updatePackageJson } from "./steps/updatePackageJson.js";
import { writePnpmBuildsJson } from "./steps/writePnpmBuildsJson.js";

// const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectName = process.argv[2] || "my-app";
const targetDir = path.resolve(process.cwd(), projectName);

if (existsSync(targetDir)) {
  console.error(`❌ Directory ${projectName} already exists.`);
  process.exit(1);
}

console.log(`\n📦 Creating new project in ${targetDir}\n`);

const pm = await askPackageManager();

await createViteApp(projectName, pm);
await writePnpmBuildsJson(pm, targetDir);

await setupTailwind(targetDir);
await scaffoldSourceFiles(targetDir);
await writePnpmBuildsJson(pm, targetDir);

if (pm) {
  await installDependencies(pm, targetDir);
}

await updatePackageJson(projectName, targetDir);
await addPrettierConfig(targetDir);
await setupShadcnUi(targetDir, pm);
await setupGit(targetDir);
await formatSrc(targetDir);

console.log(`\n🚀 All set! Next steps:\n`);
console.log(`  cd ${projectName}`);
if (pm) {
  console.log(`  ${pm} run dev`);
} else {
  console.log(`  # install dependencies then run your dev server`);
}
