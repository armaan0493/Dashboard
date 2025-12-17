import { todaysDeals } from "@/lib/mockData";
import { DealCard } from "./DealCard";

export function DealsSection() {
  return (
    <section className="bg-[#F2F2F2] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Today&apos;s Top Deals
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Limited time offers - Don&apos;t miss out!
            </p>
          </div>
          <button className="hidden text-sm font-semibold text-[#1A73E8] transition hover:underline sm:block">
            View All →
          </button>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {todaysDeals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
        <div className="mt-6 text-center sm:hidden">
          <button className="text-sm font-semibold text-[#1A73E8] transition hover:underline">
            View All Deals →
          </button>
        </div>
      </div>
    </section>
  );
}
