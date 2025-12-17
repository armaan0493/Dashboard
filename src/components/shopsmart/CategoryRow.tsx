import { categories } from "@/lib/mockData";

export function CategoryRow() {
  return (
    <section className="bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
          Shop by Category
        </h2>
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
          {categories.map((category) => (
            <button
              key={category.id}
              className="group flex flex-col items-center gap-3 rounded-xl bg-gray-50 p-4 transition hover:bg-[#1A73E8] hover:shadow-lg sm:p-6"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-3xl shadow-md transition group-hover:scale-110 sm:h-20 sm:w-20 sm:text-4xl">
                {category.icon}
              </div>
              <span className="text-sm font-semibold text-gray-900 transition group-hover:text-white sm:text-base">
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
