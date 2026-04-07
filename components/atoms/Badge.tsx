interface BadgeProps {
  label: string;
  variant?: "orange" | "zinc" | "blue";
}

export function Badge({ label, variant = "orange" }: BadgeProps) {
  const styles = {
    orange: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border border-orange-200 dark:border-orange-800",
    zinc: "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700",
    blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800",
  };
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${styles[variant]}`}
    >
      {label}
    </span>
  );
}
