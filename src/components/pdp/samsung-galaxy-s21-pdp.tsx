import Link from "next/link";
import { FeatureList } from "@/components/pdp/feature-list";
import { ProductGallery } from "@/components/pdp/product-gallery";
import { ProductSection } from "@/components/pdp/product-section";
import { RatingSummary } from "@/components/pdp/rating-summary";

const product = {
  name: "Samsung Galaxy S21",
  price: 54999,
  originalPrice: 59999,
  rating: 4.2,
  reviewCount: 1248,
  images: [
    {
      src: "/products/samsung-galaxy-s21/front.svg",
      alt: "Samsung Galaxy S21 front view",
    },
    {
      src: "/products/samsung-galaxy-s21/back.svg",
      alt: "Samsung Galaxy S21 back view",
    },
    {
      src: "/products/samsung-galaxy-s21/side.svg",
      alt: "Samsung Galaxy S21 side view",
    },
  ],
  features: [
    "8GB RAM | 128GB Storage",
    "64MP Triple Pro Camera",
    '6.2" Dynamic AMOLED Display',
    "Exynos 2100 Processor",
    "4000mAh Battery",
  ],
};

function formatInr(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function SamsungGalaxyS21Pdp() {
  const discountPct = Math.max(
    0,
    Math.round((1 - product.price / product.originalPrice) * 100),
  );

  return (
    <div className="bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-10">
        <div className="mb-6 flex flex-wrap items-center gap-2 text-xs text-foreground/60">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-foreground/80">{product.name}</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <ProductGallery images={product.images} />

          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {product.name}
              </h1>
              <RatingSummary
                rating={product.rating}
                reviewCount={product.reviewCount}
              />
            </div>

            <div className="rounded-2xl border border-foreground/10 bg-background p-5 sm:p-6">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-foreground/60">
                    Special price
                  </p>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-3xl font-semibold text-[#1A73E8]">
                      {formatInr(product.price)}
                    </span>
                    <span className="text-sm text-foreground/50 line-through">
                      {formatInr(product.originalPrice)}
                    </span>
                    {discountPct ? (
                      <span className="rounded-full bg-[#F8B400]/15 px-2 py-1 text-xs font-semibold text-[#B15D00]">
                        {discountPct}% OFF
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="flex gap-2">
                  <span className="rounded-full border border-[#1A73E8]/30 bg-[#1A73E8]/10 px-3 py-1 text-xs font-medium text-[#1A73E8]">
                    Free returns
                  </span>
                  <span className="rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1 text-xs font-medium text-foreground/70">
                    1-year warranty
                  </span>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  className="inline-flex h-12 flex-1 items-center justify-center rounded-xl border border-[#1A73E8] px-5 text-sm font-semibold text-[#1A73E8] transition hover:bg-[#1A73E8]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8]"
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  className="inline-flex h-12 flex-1 items-center justify-center rounded-xl bg-[#1A73E8] px-5 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8]"
                >
                  Buy Now
                </button>
              </div>
            </div>

            <ProductSection
              title="Key Features"
              description="Everything you need to know at a glance."
            >
              <FeatureList items={product.features} />
            </ProductSection>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <ProductSection
            title="Delivery"
            description="Delivery availability and dates will be shown here once you enter a pincode."
          >
            <div className="space-y-3 text-sm text-foreground/80">
              <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-4">
                <p className="font-medium text-foreground">Delivery info</p>
                <p className="mt-1 text-foreground/70">
                  Placeholder: Add pincode selector and ETA in a future iteration.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-foreground/10 p-4">
                  <p className="text-xs font-semibold text-foreground/60">
                    Standard delivery
                  </p>
                  <p className="mt-1 font-medium">2–5 business days</p>
                </div>
                <div className="rounded-xl border border-foreground/10 p-4">
                  <p className="text-xs font-semibold text-foreground/60">
                    Express delivery
                  </p>
                  <p className="mt-1 font-medium">Available in select cities</p>
                </div>
              </div>
            </div>
          </ProductSection>

          <ProductSection
            title="Why you will love it"
            description="A clean, no-clutter summary designed to help you decide faster."
          >
            <div className="space-y-4 text-sm text-foreground/80">
              <p>
                The Galaxy S21 balances a compact flagship design with an
                excellent camera setup, a sharp AMOLED display, and all-day
                performance.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-foreground/10 bg-background p-4">
                  <p className="text-xs font-semibold text-foreground/60">
                    Primary color
                  </p>
                  <p className="mt-1 font-medium text-[#1A73E8]">#1A73E8</p>
                </div>
                <div className="rounded-xl border border-foreground/10 bg-background p-4">
                  <p className="text-xs font-semibold text-foreground/60">
                    Accent color
                  </p>
                  <p className="mt-1 font-medium text-[#B15D00]">#F8B400</p>
                </div>
              </div>
            </div>
          </ProductSection>
        </div>
      </div>
    </div>
  );
}
