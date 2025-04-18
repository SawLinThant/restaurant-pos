import { Toaster as Sonner } from "sonner";
import { cn } from "@/lib/utils";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ className, ...props }: ToasterProps) => {
  return (
    <Sonner
      className={cn(className)}
      toastOptions={{
        classNames: {
          toast:
            "group toast group flex w-full items-center border border-border bg-background text-foreground",
          title:
            "toast-title text-foreground group-[.toast]:text-sm font-semibold",
          description: "toast-description group-[.toast]:text-xs",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success:
            "group-[.toast]:border-green-500 group-[.toast]:text-green-500",
          error: "group-[.toast]:border-red-500 group-[.toast]:text-red-500",
          info: "group-[.toast]:border-blue-500 group-[.toast]:text-blue-500",
          warning:
            "group-[.toast]:border-yellow-500 group-[.toast]:text-yellow-500",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
