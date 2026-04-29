import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Categories } from "@/components/sections/Categories";
import { SearchResults } from "@/components/sections/SearchResults";
import { Highlights } from "@/components/sections/Highlights";
import { Events } from "@/components/sections/Events";
import { SaoJoaoLineup } from "@/components/sections/SaoJoaoLineup";
import { VaquejadaHighlight } from "@/components/sections/VaquejadaHighlight";
import { Promotions } from "@/components/sections/Promotions";
import { NearYou } from "@/components/sections/NearYou";
import { Tourism } from "@/components/sections/Tourism";

import { Florists } from "@/components/sections/Florists";
import { Colleges } from "@/components/sections/Colleges";
import { CTA } from "@/components/sections/CTA";
import { Social } from "@/components/sections/Social";
import { Footer } from "@/components/sections/Footer";
import { BottomNav } from "@/components/sections/BottomNav";
import { SearchProvider } from "@/context/SearchContext";
import { ChatWidget } from "@/components/ChatWidget";

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
          <SaoJoaoLineup />
          <VaquejadaHighlight />
          <Tourism />
          <Promotions />
          <NearYou />

          <Florists />
          <Colleges />
          <CTA />
          <Social />
        </main>
        <Footer />
        <BottomNav />
        <ChatWidget />
      </div>
    </SearchProvider>
  );
};

export default Index;
