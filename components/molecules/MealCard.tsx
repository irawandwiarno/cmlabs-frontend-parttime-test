"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CardImage } from "@/components/atoms/CardImage";
import { ROUTES } from "@/lib/constants/routes";

interface MealCardProps {
  id: string;
  name: string;
  thumb: string;
  ingredientName?: string;
}

export function MealCard({ id, name, thumb, ingredientName }: MealCardProps) {
  const href = ingredientName
    ? ROUTES.mealDetailFromIngredient(id, ingredientName)
    : ROUTES.mealDetail(id);

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ contentVisibility: "auto", containIntrinsicSize: "260px 260px" }}
    >
      <Link
        href={href}
        className="block relative overflow-hidden rounded-2xl bg-zinc-200 dark:bg-zinc-800 aspect-square shadow-md ring-1 ring-black/5 dark:ring-white/5 group"
      >
        <CardImage
          src={thumb}
          alt={name}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
          className="object-cover group-hover:scale-105"
          quality={60}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/15 to-transparent" />
        <span className="absolute bottom-2 left-0 right-0 text-center text-white text-sm font-semibold px-2 drop-shadow-md">
          {name}
        </span>
      </Link>
    </motion.div>
  );
}
