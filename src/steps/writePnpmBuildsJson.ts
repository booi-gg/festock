import fs from "fs-extra";
import path from "path";

export async function writePnpmBuildsJson(pm: string, targetDir: string) {
  if (pm !== "pnpm") return;

  // ✅ Fix: create targetDir if it doesn't exist yet
  await fs.ensureDir(targetDir);

  await fs.writeJSON(
    path.join(targetDir, ".pnpm-builds.json"),
    {
      allowed: ["esbuild", "@tailwindcss/oxide"],
    },
    { spaces: 2 }
  );
}
