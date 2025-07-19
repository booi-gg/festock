import fs from "fs-extra";
import path from "node:path";

export async function updatePackageJson(
  projectName: string,
  targetDir: string
) {
  const pkgPath = path.join(targetDir, "package.json");
  const pkg = await fs.readJSON(pkgPath);

  pkg.name = projectName;
  pkg.version = "0.0.0";
  pkg.private = true;
  pkg.scripts = {
    dev: "vite",
    build: "tsc -b && vite build",
    lint: "eslint .",
    preview: "vite preview",
  };
  pkg.type = "module";

  await fs.writeJSON(pkgPath, pkg, { spaces: 2 });
}
