import fs from "fs-extra";
import path from "node:path";

export async function setupTailwind(targetDir: string) {
  const viteConfigPath = path.join(targetDir, "vite.config.ts");

  if (!(await fs.pathExists(viteConfigPath))) {
    console.warn("⚠️ vite.config.ts not found. Skipping Tailwind setup.");
    return;
  }

  const newViteConfig = `import tailwindcss from "@tailwindcss/vite";
    import react from "@vitejs/plugin-react";
    import path from "path";
    import { defineConfig } from "vite";

    export default defineConfig({
      plugins: [react(), tailwindcss()],
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
        },
      },
    });
    `;

  await fs.writeFile(viteConfigPath, newViteConfig);
  console.log("✅ Updated vite.config.ts for Tailwind + alias setup.");

  // Tailwind v4 index.css
  await fs.writeFile(
    path.join(targetDir, "src/index.css"),
    `@import "tailwindcss";
  
      :root {
        font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
        line-height: 1.5;
        font-weight: 400;
  
        color-scheme: light dark;
        color: rgba(255, 255, 255, 0.87);
        background-color: #242424;
  
        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
  
        body {
        margin: 0;
        display: flex;
        place-items: center;
        min-width: 320px;
        min-height: 100vh;
      }
  
      @media (prefers-color-scheme: light) {
        :root {
          color: #213547;
          background-color: #ffffff;
        }
      }
      `
  );
}
