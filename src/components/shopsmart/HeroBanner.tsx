export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1A73E8] to-[#1557B0]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#F8B400] px-4 py-1.5 text-sm font-semibold text-gray-900">
            <span>🔥</span>
            <span>Hot Deals</span>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Unbeatable Savings
            <br />
            <span className="text-[#F8B400]">Up to 70% Off</span>
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-blue-50 sm:text-xl">
            Discover amazing deals on electronics, fashion, home goods and more.
            Shop now and save big on your favorite brands!
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="rounded-full bg-[#F8B400] px-8 py-3 font-semibold text-gray-900 shadow-lg transition hover:bg-[#E0A300]">
              Shop Now
            </button>
            <button className="rounded-full border-2 border-white bg-transparent px-8 py-3 font-semibold text-white transition hover:bg-white hover:text-[#1A73E8]">
              View All Deals
            </button>
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-10">
          <div className="absolute right-10 top-10 h-32 w-32 rounded-full bg-white"></div>
          <div className="absolute bottom-20 right-32 h-24 w-24 rounded-full bg-white"></div>
          <div className="absolute right-20 top-1/2 h-16 w-16 rounded-full bg-[#F8B400]"></div>
        </div>
      </div>
    </section>
  );
}
