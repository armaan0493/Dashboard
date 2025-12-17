import { Deal } from "@/lib/mockData";
import Image from "next/image";

interface DealCardProps {
  deal: Deal;
}

export function DealCard({ deal }: DealCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-md transition hover:shadow-xl">
      <div className="absolute left-3 top-3 z-10 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
        -{deal.discount}%
      </div>
      <div className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-gray-900 backdrop-blur-sm">
        <span>⏰</span>
        <span>{deal.timeLeft}</span>
      </div>
      <div className="aspect-square overflow-hidden bg-gray-100">
        <Image
          src={deal.image}
          alt={deal.name}
          width={400}
          height={400}
          className="h-full w-full object-cover transition group-hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-gray-900">
          {deal.name}
        </h3>
        <div className="mb-2 flex items-center gap-2">
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <span className="text-[#F8B400]">⭐</span>
            <span className="font-medium">{deal.rating}</span>
            <span>({deal.reviews})</span>
          </div>
        </div>
        <div className="mb-3 flex items-baseline gap-2">
          <span className="text-xl font-bold text-[#1A73E8]">
            ${deal.price}
          </span>
          <span className="text-sm text-gray-500 line-through">
            ${deal.originalPrice}
          </span>
        </div>
        <div className="mb-3 text-xs text-gray-600">
          <span className="font-semibold">{deal.sold}</span> sold
        </div>
        <button className="w-full rounded-full bg-[#1A73E8] py-2.5 text-sm font-semibold text-white transition hover:bg-[#1557B0]">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
