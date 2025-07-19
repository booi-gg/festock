// steps/setup-shadcn-ui.ts

import { execa } from "execa";
import fs from "fs-extra";
import path from "node:path";
import stripJsonComments from "strip-json-comments";

export async function setupShadcnUi(targetDir: string, pm: string) {
  console.log("✨ Init shadcn UI");

  // 1. Patch alias config in vite.config.ts
  const viteConfigPath = path.join(targetDir, "vite.config.ts");
  if (await fs.pathExists(viteConfigPath)) {
    const viteConfig = await fs.readFile(viteConfigPath, "utf8");
    if (!viteConfig.includes('"@": path.resolve(__dirname, "./src")')) {
      const updatedConfig = viteConfig.replace(
        /(defineConfig\(\{[\s\S]*?resolve:\s*\{[^}]*alias:\s*\{)/,
        `$1\n      "@": path.resolve(__dirname, "./src"),`
      );
      await fs.writeFile(viteConfigPath, updatedConfig);
    }
  }

  // 2. Update tsconfig.json (assumed clean JSON)
  const tsconfigPath = path.join(targetDir, "tsconfig.json");
  const tsconfig = await fs.readJSON(tsconfigPath);
  tsconfig.compilerOptions = tsconfig.compilerOptions || {};
  tsconfig.compilerOptions.baseUrl = ".";
  tsconfig.compilerOptions.paths = {
    ...(tsconfig.compilerOptions.paths || {}),
    "@/*": ["./src/*"],
  };
  await fs.writeJSON(tsconfigPath, tsconfig, { spaces: 2 });

  // 3. Update tsconfig.app.json (with JSONC comment handling)
  const tsconfigAppPath = path.join(targetDir, "tsconfig.app.json");
  if (await fs.pathExists(tsconfigAppPath)) {
    const raw = await fs.readFile(tsconfigAppPath, "utf-8");
    const tsconfigApp = JSON.parse(stripJsonComments(raw));

    tsconfigApp.compilerOptions ??= {};
    tsconfigApp.compilerOptions.baseUrl = ".";
    tsconfigApp.compilerOptions.paths ??= {};
    tsconfigApp.compilerOptions.paths["@/*"] = ["./src/*"];

    await fs.writeJSON(tsconfigAppPath, tsconfigApp, { spaces: 2 });
  }

  // 4. Install and initialize shadcn/ui
  const execCmd = pm === "npm" ? ["exec"] : ["dlx"];

  try {
    await execa(pm, [...execCmd, "shadcn@latest", "init"], {
      cwd: targetDir,
      stdio: "inherit",
      shell: true,
    });

    const components = ["button", "input", "label", "dialog"];
    for (const component of components) {
      await execa(pm, [...execCmd, "shadcn@latest", "add", component], {
        cwd: targetDir,
        stdio: "ignore",
        shell: true,
      });
    }

    console.log("✨ Compelte shadcn UI init");
  } catch (err: any) {
    console.warn("⚠️ Failed to run shadcn-ui setup:", err.message);
  }
}
