import fs from "fs-extra";
import path from "node:path";

export async function scaffoldShadcn(targetDir: string) {
  // Scaffold src/components/ui
  await fs.ensureDir(path.join(targetDir, "src/components/ui"));
  await fs.writeFile(
    path.join(targetDir, "src/components/ui/button.tsx"),
    `import { Slot } from "@radix-ui/react-slot";
    import { cva, type VariantProps } from "class-variance-authority";
    import { cn } from "@/lib/utils";
    
    const buttonVariants = cva(
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
      {
        variants: {
          variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
          },
          size: {
            sm: "h-9 rounded-md px-3",
            md: "h-10 px-4 py-2",
            lg: "h-11 rounded-md px-8",
          },
        },
        defaultVariants: {
          variant: "default",
          size: "md",
        },
      }
    );
    
    export interface ButtonProps
      extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
      asChild?: boolean;
    }
    
    export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
      ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
          <Comp
            className={cn(buttonVariants({ variant, size }), className)}
            ref={ref}
            {...props}
          />
        );
      }
    );
    Button.displayName = "Button";
    `
  );
}
