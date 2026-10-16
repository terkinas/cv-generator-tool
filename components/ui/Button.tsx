import type { ButtonHTMLAttributes } from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "dashed"
  | "danger"
  | "destructive";
type ButtonSize = "md" | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const base =
  "inline-flex items-center justify-center gap-1.5 rounded-lg text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-indigo-600 text-white shadow-sm hover:bg-indigo-700",
  secondary:
    "border border-slate-300 bg-surface text-slate-700 shadow-sm hover:bg-slate-50",
  dashed:
    "w-full border border-dashed border-slate-300 text-slate-600 hover:border-indigo-400 hover:bg-indigo-50/50 hover:text-indigo-700 dark:hover:bg-indigo-400/10 dark:hover:text-indigo-300",
  danger: "text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/15 dark:hover:text-red-400",
  destructive: "bg-red-600 text-white shadow-sm hover:bg-red-700",
};

const sizes: Record<ButtonSize, string> = {
  md: "px-3.5 py-2",
  icon: "h-8 w-8 shrink-0",
};

export function Button({
  variant = "secondary",
  size = "md",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}
