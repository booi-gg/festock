import { execa } from "execa";
import fs from "fs-extra";
import path from "node:path";

export async function setupGit(targetDir: string) {
  const gitignorePath = path.join(targetDir, ".gitignore");

  // Only write .gitignore if it doesn't exist
  if (!(await fs.pathExists(gitignorePath))) {
    await fs.writeFile(
      gitignorePath,
      `node_modules
dist
.env
.next
*.log
.DS_Store
`
    );
  }

  // Initialize Git safely
  try {
    await execa("git", ["init"], { cwd: targetDir });
    await execa("git", ["add", "."], { cwd: targetDir });
    await execa("git", ["commit", "-m", "init"], { cwd: targetDir });
    console.log("📘 Git repo initialized.");
  } catch (err: any) {
    console.warn("⚠️ Git setup failed:", err.message);
  }
}
