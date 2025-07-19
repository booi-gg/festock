import fs from "fs-extra";
import path from "node:path";

export async function addPrettierConfig(targetDir: string) {
  const config = {
    plugins: ["prettier-plugin-tailwindcss"],
  };

  const prettierPath = path.join(targetDir, ".prettierrc");

  await fs.writeJSON(prettierPath, config, { spaces: 2 });

  console.log("🧹 Added .prettierrc with Tailwind plugin.");
}
