"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

interface CardImageProps {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  quality?: number;
}

export function CardImage({
  src,
  alt,
  sizes,
  className = "object-cover",
  quality = 65,
}: CardImageProps) {
  const [loaded, setLoaded] = useState(false);

  const blurDataURL = useMemo(
    () =>
      `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" preserveAspectRatio="none">
          <defs>
            <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
              <stop stop-color="#d4d4d8" offset="0%" />
              <stop stop-color="#e4e4e7" offset="50%" />
              <stop stop-color="#d4d4d8" offset="100%" />
            </linearGradient>
          </defs>
          <rect width="400" height="400" fill="url(#g)" />
        </svg>
      `)}`,
    []
  );

  return (
    <div className="absolute inset-0 bg-zinc-200 dark:bg-zinc-800">
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-linear-to-br from-zinc-200 via-zinc-100 to-zinc-200 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800 transition-opacity duration-300 ${
          loaded ? "opacity-0" : "opacity-100 animate-pulse"
        }`}
      />
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        quality={quality}
        loading="lazy"
        placeholder="blur"
        blurDataURL={blurDataURL}
        onLoad={() => setLoaded(true)}
        className={`${className} transition-all duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
