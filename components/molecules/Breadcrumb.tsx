import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" className="flex items-center flex-wrap gap-1 text-sm text-zinc-500 dark:text-zinc-400 mb-6">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && (
            <ChevronRight className="w-3.5 h-3.5 text-zinc-300 shrink-0" />
          )}
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-orange-500 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-zinc-900 dark:text-zinc-100 font-medium truncate max-w-40">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
