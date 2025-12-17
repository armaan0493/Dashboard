import { Header } from "@/components/shopsmart/Header";
import { HeroBanner } from "@/components/shopsmart/HeroBanner";
import { CategoryRow } from "@/components/shopsmart/CategoryRow";
import { DealsSection } from "@/components/shopsmart/DealsSection";
import { ProductCollection } from "@/components/shopsmart/ProductCollection";
import { Footer } from "@/components/shopsmart/Footer";
import { smartphones, laptops, fashion } from "@/lib/mockData";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroBanner />
      <CategoryRow />
      <DealsSection />
      <ProductCollection
        title="Smartphones"
        subtitle="Latest models from top brands"
        products={smartphones}
        bgColor="bg-white"
      />
      <ProductCollection
        title="Laptops & Accessories"
        subtitle="Power up your productivity"
        products={laptops}
        bgColor="bg-[#F2F2F2]"
      />
      <ProductCollection
        title="Trending Fashion Picks"
        subtitle="Style that makes a statement"
        products={fashion}
        bgColor="bg-white"
      />
      <Footer />
    </div>
  );
}
