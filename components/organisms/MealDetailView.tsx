"use client";

import { motion, type Variants } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/atoms/Badge";
import { CardImage } from "@/components/atoms/CardImage";
import { SkeletonBox } from "@/components/atoms/SkeletonBox";
import { Breadcrumb } from "@/components/molecules/Breadcrumb";
import { useMealById } from "@/lib/hooks/useMealById";
import { getMealIngredients, getYouTubeId } from "@/lib/api/mealdb";
import { ROUTES } from "@/lib/constants/routes";

interface MealDetailViewProps {
  id: string;
  fromIngredient?: string;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

function MealDetailSkeleton({ fromIngredient }: { fromIngredient?: string }) {
  const breadcrumbItems = [
    { label: "Home", href: ROUTES.home },
    { label: "Ingredients", href: ROUTES.ingredients },
    ...(fromIngredient
      ? [
          {
            label: fromIngredient,
            href: ROUTES.ingredientDetail(fromIngredient),
          },
        ]
      : []),
    { label: "Loading..." },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <Breadcrumb items={breadcrumbItems} />
      <SkeletonBox className="h-10 w-72 mb-4 rounded-xl" />
      <div className="flex gap-2 mb-8">
        <SkeletonBox className="h-6 w-20 rounded-full" />
        <SkeletonBox className="h-6 w-28 rounded-full" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <SkeletonBox className="aspect-square rounded-2xl" />
        <div className="space-y-3">
          <SkeletonBox className="h-7 w-36 rounded-xl" />
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonBox key={i} className="h-4 w-full rounded" />
          ))}
          <SkeletonBox className="h-4 w-3/4 rounded" />
        </div>
      </div>
      <SkeletonBox className="h-8 w-24 rounded-xl mb-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-10">
        {Array.from({ length: 10 }).map((_, i) => (
          <SkeletonBox key={i} className="h-10 rounded-xl" />
        ))}
      </div>
      <SkeletonBox className="h-8 w-28 rounded-xl mb-4 mx-auto" />
      <SkeletonBox className="w-full aspect-video rounded-2xl" />
    </div>
  );
}

export function MealDetailView({ id, fromIngredient }: MealDetailViewProps) {
  const { data: meal, loading, error } = useMealById(id);
  const [isCopied, setIsCopied] = useState(false);
  const copyResetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyResetTimerRef.current !== null) {
        window.clearTimeout(copyResetTimerRef.current);
      }
    };
  }, []);

  if (loading) {
    return <MealDetailSkeleton fromIngredient={fromIngredient} />;
  }

  if (error || !meal) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 text-center">
        <p className="text-red-500 text-lg">{error ?? "Meal not found"}</p>
      </div>
    );
  }

  const ingredients = getMealIngredients(meal);
  const youtubeId = meal.strYoutube ? getYouTubeId(meal.strYoutube) : null;

  const breadcrumbItems = [
    { label: "Home", href: ROUTES.home },
    { label: "Ingredients", href: ROUTES.ingredients },
    ...(fromIngredient
      ? [
          {
            label: fromIngredient,
            href: ROUTES.ingredientDetail(fromIngredient),
          },
        ]
      : []),
    { label: meal.strMeal },
  ];

  const instructionParagraphs = meal.strInstructions
    ? meal.strInstructions.split(/\r?\n/).filter((paragraph: string) => paragraph.trim())
    : [];

  const recipeCopyText = ingredients
    .map(({ name, measure }) => `${measure} ${name}`.trim())
    .join("\n");

  const handleCopyRecipes = async () => {
    setIsCopied(true);

    if (copyResetTimerRef.current !== null) {
      window.clearTimeout(copyResetTimerRef.current);
    }

    copyResetTimerRef.current = window.setTimeout(() => {
      setIsCopied(false);
      copyResetTimerRef.current = null;
    }, 3000);

    try {
      await navigator.clipboard.writeText(recipeCopyText);
    } catch {
      // Keep feedback behavior even if clipboard permission is blocked.
    }
  };

  return (
    <motion.div
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
      initial="hidden"
      animate="show"
      className="max-w-4xl mx-auto px-4 sm:px-6 py-10"
    >
      <motion.div variants={fadeUp}>
        <Breadcrumb items={breadcrumbItems} />
      </motion.div>

      <motion.h1
        variants={fadeUp}
        className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-3"
      >
        {meal.strMeal}
      </motion.h1>

      <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-8">
        {meal.strCategory && <Badge label={meal.strCategory} variant="orange" />}
        {meal.strArea && <Badge label={`${meal.strArea} Culinary`} variant="blue" />}
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10"
      >
        <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg bg-zinc-200 dark:bg-zinc-800 ring-1 ring-black/5 dark:ring-white/5">
          <CardImage
            src={meal.strMealThumb ?? ""}
            alt={meal.strMeal}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            quality={70}
          />
        </div>

        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            Instructions
          </h2>
          <div className="md:max-h-140 overflow-y-auto pr-1 space-y-3 text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
            {instructionParagraphs.length > 0 ? (
              instructionParagraphs.map((para, i) => <p key={i}>{para}</p>)
            ) : (
              <p>{meal.strInstructions}</p>
            )}
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="mb-10">
        <div className="flex items-center justify-start gap-1 mb-4">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Recipes
          </h2>
          <div className="relative group">
            <button
              type="button"
              onClick={handleCopyRecipes}
              aria-label="Copy Recipes"
              className="inline-flex items-center justify-center w-9 h-9 text-zinc-600 dark:text-zinc-300 hover:text-orange-500 hover:border-orange-300 transition-colors"
            >
              {isCopied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            </button>
            <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-9 whitespace-nowrap rounded-md bg-zinc-900 text-white text-xs px-2 py-1 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
              {isCopied ? <span className="text-green-600">Recipes Copied</span> : "Copy Recipes"}
            </span>
          </div>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {ingredients.map(({ name, measure }, i) => (
            <li
              key={`${name}-${measure}-${i}`}
              className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-xl px-4 py-2.5"
            >
              <span className="w-2 h-2 rounded-full bg-orange-400 shrink-0" />
              <span className="text-zinc-700 dark:text-zinc-200 text-sm font-medium">
                {name}
              </span>
              {measure && (
                <span className="ml-auto text-zinc-400 text-xs">{measure}</span>
              )}
            </li>
          ))}
        </ul>
      </motion.div>

      {youtubeId && (
        <motion.div variants={fadeUp}>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4 text-center">
            Tutorials
          </h2>
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title={`${meal.strMeal} tutorial`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
