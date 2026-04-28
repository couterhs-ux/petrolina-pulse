import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Categories } from "@/components/sections/Categories";
import { SearchResults } from "@/components/sections/SearchResults";
import { Highlights } from "@/components/sections/Highlights";
import { Events } from "@/components/sections/Events";
import { Promotions } from "@/components/sections/Promotions";
import { NearYou } from "@/components/sections/NearYou";
import { Delivery } from "@/components/sections/Delivery";
import { Jobs } from "@/components/sections/Jobs";
import { Properties } from "@/components/sections/Properties";
import { Florists } from "@/components/sections/Florists";
import { Colleges } from "@/components/sections/Colleges";
import { CTA } from "@/components/sections/CTA";
import { Social } from "@/components/sections/Social";
import { Footer } from "@/components/sections/Footer";
import { BottomNav } from "@/components/sections/BottomNav";
import { SearchProvider } from "@/context/SearchContext";

const Index = () => {
  return (
    <SearchProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <Categories />
          <SearchResults />
          <Highlights />
          <Events />
          <Promotions />
          <NearYou />
          <Delivery />
          <Jobs />
          <Properties />
          <Florists />
          <Colleges />
          <CTA />
          <Social />
        </main>
        <Footer />
        <BottomNav />
      </div>
    </SearchProvider>
  );
};

export default Index;
