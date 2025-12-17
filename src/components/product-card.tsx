import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-800 overflow-hidden flex flex-col h-full">
      <div className="aspect-[3/4] relative bg-gray-100 dark:bg-gray-700">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center mb-2">
          <span className="text-[#F8B400] mr-1">★</span>
          <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            {product.rating}
          </span>
        </div>
        <p className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          ₹{product.price.toLocaleString("en-IN")}
        </p>
        <button className="mt-auto w-full py-2 px-4 bg-[#1A73E8] hover:bg-blue-700 text-white font-medium rounded-md transition-colors cursor-pointer">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
