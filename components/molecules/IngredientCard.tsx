"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CardImage } from "@/components/atoms/CardImage";
import { getIngredientImageUrl } from "@/lib/api/mealdb";
import { ROUTES } from "@/lib/constants/routes";

interface IngredientCardProps {
  name: string;
}

export function IngredientCard({ name }: IngredientCardProps) {
  const imageUrl = getIngredientImageUrl(name, "small");

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ contentVisibility: "auto", containIntrinsicSize: "200px 200px" }}
    >
      <Link
        href={ROUTES.ingredientDetail(name)}
        className="block relative overflow-hidden rounded-2xl bg-zinc-200 dark:bg-zinc-800 aspect-square shadow-md ring-1 ring-black/5 dark:ring-white/5 group"
      >
        <CardImage
          src={imageUrl}
          alt={name}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 200px"
          className="object-contain scale-90 group-hover:scale-95"
          quality={50}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/15 to-transparent" />
        <span className="absolute bottom-2 left-0 right-0 text-center text-white text-sm font-semibold px-2 drop-shadow-md">
          {name}
        </span>
      </Link>
    </motion.div>
  );
}
