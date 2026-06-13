import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  children: ReactNode;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-emerald text-ivory hover:bg-emerald-light focus-visible:ring-emerald",
  secondary:
    "bg-ivory text-emerald border border-emerald hover:bg-emerald/5 focus-visible:ring-emerald",
  ghost: "bg-transparent text-emerald hover:bg-emerald/5 focus-visible:ring-emerald",
  danger:
    "bg-crimson text-ivory hover:bg-crimson-light focus-visible:ring-crimson",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={[
        "inline-flex items-center justify-center gap-2 rounded-md font-medium",
        "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory",
        "disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
      {...rest}
    >
      {children}
    </button>
  );
}
