import { execa } from "execa";
import fs from "fs-extra";
import path from "path";

// export async function installDependencies(
//   pm: string,
//   targetDir: string,
//   additionalDevDeps: string[] = []
// ) {
//   console.log(`\n📥 Installing dependencies with ${pm}...\n`);

//   const pkgPath = path.join(targetDir, "package.json");
//   const pkg = await fs.readJSON(pkgPath);
//   const existing = {
//     ...(pkg.dependencies ?? {}),
//     ...(pkg.devDependencies ?? {}),
//   };

//   const baseDevDeps = [
//     "@eslint/js@^9.30.1",
//     "@types/react@^19.1.8",
//     "@types/react-dom@^19.1.6",
//     "@types/node@^24.0.15",
//     "@vitejs/plugin-react@^4.6.0",
//     "eslint@^9.30.1",
//     "eslint-plugin-react-hooks@^5.2.0",
//     "eslint-plugin-react-refresh@^0.4.20",
//     "globals@^16.3.0",
//     "prettier@^3.6.2",
//     "prettier-plugin-tailwindcss@^0.6.14",
//     "tw-animate-css@^1.3.5",
//     "typescript@~5.8.3",
//     "typescript-eslint@^8.35.1",
//     "vite@^7.0.4",
//     "tailwindcss@^4.1.11",
//     "@tailwindcss/vite@^4.1.11",
//     "react-router",
//   ];

//   const allDevDeps = [...baseDevDeps, ...additionalDevDeps];

//   const filtered = allDevDeps.filter((dep) => {
//     const [name] = dep.split("@");
//     return !existing[name];
//   });

//   if (filtered.length > 0) {
//     const devArgs =
//       pm === "npm"
//         ? ["install", "-D", ...filtered]
//         : ["add", "-D", ...filtered];
//     await execa(pm, devArgs, { cwd: targetDir, stdio: "inherit" });
//   }

//   console.log(`\n✅ Installed missing dependencies using ${pm}.`);
// }

export async function installDependencies(
  pm: string,
  targetDir: string,
  additionalDeps: string[] = [],
  additionalDevDeps: string[] = []
) {
  console.log(`\n📥 Installing dependencies with ${pm}...\n`);

  const pkgPath = path.join(targetDir, "package.json");
  const pkg = await fs.readJSON(pkgPath);
  const existing = {
    ...(pkg.dependencies ?? {}),
    ...(pkg.devDependencies ?? {}),
  };

  const runtimeDeps = [
    "react@^19.1.0",
    "react-dom@^19.1.0",
    "react-router@^7.7.0",
    "@tanstack/react-query@^5.83.0",
    "class-variance-authority@^0.7.1",
    "clsx@^2.1.1",
    "tailwind-merge@^3.3.1",
    "lucide-react@^0.525.0",
    "@radix-ui/react-slot@^1.2.3",
    ...additionalDeps,
  ];

  const devDeps = [
    "@types/node@^24.0.15",
    "prettier@^3.6.2",
    "prettier-plugin-tailwindcss@^0.6.14",
    "tw-animate-css@^1.3.5",
    "tailwindcss@^4.1.11",
    "@tailwindcss/vite@^4.1.11",
    ...additionalDevDeps,
  ];

  const filteredRuntime = runtimeDeps.filter((dep) => {
    const [name] = dep.split("@");
    return !existing[name];
  });

  const filteredDev = devDeps.filter((dep) => {
    const [name] = dep.split("@");
    return !existing[name];
  });

  if (filteredRuntime.length > 0) {
    const args =
      pm === "npm"
        ? ["install", ...filteredRuntime]
        : ["add", ...filteredRuntime];
    await execa(pm, args, { cwd: targetDir, stdio: "inherit" });
  }

  if (filteredDev.length > 0) {
    const args =
      pm === "npm"
        ? ["install", "-D", ...filteredDev]
        : ["add", "-D", ...filteredDev];
    await execa(pm, args, { cwd: targetDir, stdio: "inherit" });
  }

  console.log(`\n✅ Installed missing dependencies using ${pm}.`);
}
