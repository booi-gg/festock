import prompts from "prompts";

export async function askPackageManager() {
  const { pm } = await prompts({
    type: "select",
    name: "pm",
    message: "Choose a package manager to install dependencies:",
    choices: [
      { title: "npm", value: "npm" },
      { title: "pnpm", value: "pnpm" },
      { title: "yarn", value: "yarn" },
      { title: "Skip", value: null },
    ],
  });

  return pm;
}
