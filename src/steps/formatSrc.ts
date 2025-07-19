import { execa } from "execa";
import fs from "fs-extra";
import path from "path";

export async function formatSrc(targetDir: string) {
  await fs.writeFile(
    path.join(targetDir, ".prettierignore"),
    [
      "node_modules",
      "dist",
      "build",
      "public",
      "*.svg",
      "*.png",
      "*.jpg",
      "*.jpeg",
      "*.webp",
    ].join("\n")
  );

  const srcPath = path.join(targetDir, "src");

  if (!(await fs.pathExists(srcPath))) {
    console.warn("⚠️ Skipping format: src/ folder doesn't exist.");
    return;
  }

  try {
    console.log("🛠️ Formatting...");
    await execa(
      "pnpm",
      ["exec", "prettier", "--write", "src/**/*.{ts,tsx,js,jsx,json,css,md}"],
      {
        cwd: targetDir,
        stdio: "ignore",
      }
    );
    console.log("✅ Code formatted.");
  } catch (err: any) {
    console.warn("⚠️ Prettier failed:", err.shortMessage || err.message);
  }
}
