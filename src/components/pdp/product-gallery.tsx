"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

export type GalleryImage = {
  src: string;
  alt: string;
};

export function ProductGallery({ images }: { images: GalleryImage[] }) {
  const safeImages = useMemo(() => (images.length ? images : []), [images]);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeImage = safeImages[activeIndex] ?? safeImages[0];

  if (!activeImage) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/5">
        <Image
          src={activeImage.src}
          alt={activeImage.alt}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-contain p-6"
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        {safeImages.map((image, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={image.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative overflow-hidden rounded-xl border bg-background transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8] ${
                isActive
                  ? "border-[#1A73E8]"
                  : "border-foreground/10 hover:border-[#1A73E8]/60"
              }`}
              aria-current={isActive}
            >
              <span className="sr-only">{`View ${image.alt}`}</span>
              <div className="relative aspect-square">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="160px"
                  className="object-contain p-3"
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
