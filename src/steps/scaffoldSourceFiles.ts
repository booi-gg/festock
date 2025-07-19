import fs from "fs-extra";
import path from "node:path";

export async function scaffoldSourceFiles(targetDir: string) {
  // Replace main.tsx
  await fs.writeFile(
    path.join(targetDir, "src/main.tsx"),
    `import { StrictMode } from "react";
    import { createRoot } from "react-dom/client";
    import App from "./App.tsx";
    import "./index.css";

    createRoot(document.getElementById("root")!).render(
      <StrictMode>
        <App />
      </StrictMode>
    );`
  );

  // Replace app.tsx
  await fs.writeFile(
    path.join(targetDir, "src/App.tsx"),
    `import "./App.css";

    import { RouterProvider } from "react-router";
    import { router } from "./routes";

    function App() {
      return <RouterProvider router={router} />;
    }

    export default App;
    `
  );

  // Pages
  await fs.outputFile(
    path.join(targetDir, "src/pages/home/index.tsx"),
    `import { Button } from "@/components/ui/button";
      import {
        Dialog,
        DialogContent,
        DialogDescription,
        DialogHeader,
        DialogTitle,
        DialogTrigger,
      } from "@/components/ui/dialog";

      const Home = () => {
        return (
          <div className="flex flex-col items-center justify-center space-y-4 px-6 font-sans">
            <h1 className="text-6xl font-bold text-black">festock</h1>
            <p className="text-xl">Frontend Stocks</p>
            <ul className="list-inside list-disc space-y-1 text-left text-lg">
              <li>vite</li>
              <li>react</li>
              <li>typescript</li>
              <li>tailwind</li>
              <li>shadcn ui</li>
            </ul>

            <Dialog>
              <DialogTrigger asChild>
                <Button>Open Dialog</Button>
              </DialogTrigger>

              <DialogContent className="text-whitee sm:max-w-[425px]" showCloseButton>
                <DialogHeader>
                  <DialogTitle>Dialog Title</DialogTitle>
                  <DialogDescription>
                    This is long dialog description
                  </DialogDescription>
                </DialogHeader>
                This is test
              </DialogContent>
            </Dialog>
          </div>
        );
      };

      export default Home;`
  );

  await fs.outputFile(
    path.join(targetDir, "src/pages/home/addit.tsx"),
    `export const IslandErrorBoundary = <div>Something went wrong</div>;
     export const IslandFallback = <div>Hydration fail</div>;`
  );

  await fs.outputFile(
    path.join(targetDir, "src/pages/home/loader.ts"),
    `export async function islandLoader() {
     return { message: "Hello, world!" };
    }`
  );

  await fs.outputFile(
    path.join(targetDir, "src/pages/about/index.tsx"),
    `export default function About() {
      return <div className="p-4 text-2xl">About Page</div>;
    }`
  );

  // Router setup
  await fs.outputFile(
    path.join(targetDir, "src/routes.tsx"),
    `import { createBrowserRouter } from "react-router";
      import Home from "./pages/home";
      import { IslandErrorBoundary } from "./pages/home/addit";
      import { islandLoader } from "./pages/home/loader"; 
      import About from "./pages/about";
      
      export const router = createBrowserRouter([
        { path: "/", 
         Component: Home,
         loader: islandLoader,
          errorElement: IslandErrorBoundary,
          hydrateFallbackElement: null,  },
        { path: "/about", Component: About },
      ]);`
  );
}
