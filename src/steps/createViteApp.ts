import { execa } from "execa";

export async function createViteApp(projectName: string, pm: string) {
  try {
    await execa(
      "npm",
      ["create", "vite@latest", projectName, "--template", "react-ts"],
      {
        stdio: "inherit",
      }
    );
  } catch (err: any) {
    if (err.exitCode === 1 && err.message.includes("node")) {
      console.warn("⚠️ Incompatible Node version. Requires >= 20.19.0");
    } else {
      throw err;
    }
  }
}
