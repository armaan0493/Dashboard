type RatingSummaryProps = {
  rating: number;
  reviewCount: number;
};

function getStarString(rating: number) {
  const fullStars = Math.max(0, Math.min(5, Math.floor(rating)));
  const emptyStars = 5 - fullStars;
  return `${"★".repeat(fullStars)}${"☆".repeat(emptyStars)}`;
}

export function RatingSummary({ rating, reviewCount }: RatingSummaryProps) {
  const starString = getStarString(rating);

  return (
    <div
      className="flex flex-wrap items-center gap-x-3 gap-y-1"
      aria-label={`${rating.toFixed(1)} out of 5 stars based on ${reviewCount.toLocaleString()} reviews`}
    >
      <span className="font-semibold text-[#F8B400]" aria-hidden="true">
        {starString}
      </span>
      <span className="text-sm font-medium text-foreground">
        {rating.toFixed(1)} stars
      </span>
      <span className="text-xs text-foreground/60">
        ({reviewCount.toLocaleString()} reviews)
      </span>
    </div>
  );
}
