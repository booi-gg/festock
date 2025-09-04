# 🧰 festock

> A zero-config CLI to scaffold a modern frontend stack with Vite + React 19 + Tailwind CSS 4 + shadcn/ui + TanStack Query + React Router v7 — fully typed and pre-configured.

## 🚀 Features

- 📦 Vite + React 19
- 🎨 Tailwind CSS 4 with Prettier plugin
- 🧱 shadcn/ui and component setup
- ⚛️ React Router v7 (data API mode)
- 🔥 TanStack Query 5 (react-query)
- 💅 ESLint + Prettier + TypeScript ready
- 🔧 Git initialized and Tailwind sorted
- 🎯 Fully typed & production-ready base

## 🧑‍💻 Usage

You **don't need to install it globally**. Just run:

```bash
npx festock@latest fe-stock-app
```

## 🛠️ Local Development

To test festock locally:

1. **Clone and build**:
   ```bash
   git clone https://github.com/booi-gg/festock.git
   cd festock
   bun install  # or npm install
   bun run build  # or npm run build
   ```

2. **Link globally**:
   ```bash
   npm link
   ```

3. **Test the CLI**:
   ```bash
   festock my-test-app
   cd my-test-app
   npm run dev  # or your preferred package manager
   ```

4. **Unlink when done**:
   ```bash
   npm unlink -g festock
   ```

## Folder Structure

```text
my-app/
├── public/
│ └── react.svg
├── src/
│ ├── assets/
│ │ └── react.svg
│ ├── components/
│ │ └── ui/
│ │ ├── button.tsx
│ │ ├── dialog.tsx
│ │ ├── input.tsx
│ │ └── label.tsx
│ ├── lib/
│ │ └── utils.ts
│ ├── pages/
│ │ ├── about/
│ │ │ └── index.tsx
│ │ └── home/
│ │      ├── addit.tsx
│ │      ├── index.tsx
│ │      └── loader.ts
│ ├── App.css
│ ├── App.tsx
│ ├── index.css
│ ├── main.tsx
│ └── routes.tsx
├── .gitignore
├── .prettierignore
├── .prettierrc
├── .pnpm-builds.json
├── components.json
├── eslint.config.js
├── index.html
├── package.json
├── pnpm-lock.yaml
├── README.md
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts

```
