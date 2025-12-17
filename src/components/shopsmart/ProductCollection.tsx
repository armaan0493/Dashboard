import { Product } from "@/lib/mockData";
import { ProductCard } from "./ProductCard";

interface ProductCollectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  bgColor?: string;
}

export function ProductCollection({
  title,
  subtitle,
  products,
  bgColor = "bg-white",
}: ProductCollectionProps) {
  return (
    <section className={`${bgColor} py-12`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
            )}
          </div>
          <button className="hidden text-sm font-semibold text-[#1A73E8] transition hover:underline sm:block">
            View All →
          </button>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-6 text-center sm:hidden">
          <button className="text-sm font-semibold text-[#1A73E8] transition hover:underline">
            View All →
          </button>
        </div>
      </div>
    </section>
  );
}
