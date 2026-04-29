import { Calendar, MapPin, Ticket, Music, Trophy, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { BottomNav } from "@/components/sections/BottomNav";
import { SearchProvider } from "@/context/SearchContext";
import vaquejadaImg from "@/assets/vaquejada-petrolina.jpg";

const attractions = [
  {
    name: "Rey Vaqueiro",
    role: "Forró / Vaquejada",
    emoji: "🤠",
  },
  {
    name: "Tarcísio do Acordeon",
    role: "Forró / Piseiro",
    emoji: "🪗",
  },
];

const Vaquejada = () => {
  const mapsUrl =
    "https://www.google.com/maps/search/Parque+Doutor+Geraldo+Estrela+Petrolina";
  const embedUrl =
    "https://www.google.com/maps?q=Parque+Doutor+Geraldo+Estrela+Petrolina&output=embed";

  return (
    <SearchProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* HERO */}
          <section className="relative overflow-hidden">
            <div className="absolute inset-0">
              <img
                src={vaquejadaImg}
                alt="41ª Vaquejada de Petrolina"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(20 90% 35% / 0.55), hsl(15 80% 20% / 0.7))",
                }}
              />
            </div>

            <div className="relative container px-4 py-16 md:py-28 text-white">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-semibold mb-6 bg-background/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/30 hover:bg-background/30 transition"
              >
                <ArrowLeft className="h-4 w-4" /> Voltar
              </Link>

              <div className="max-w-3xl">
                <Badge className="mb-4 bg-secondary text-secondary-foreground border-0 uppercase tracking-wider">
                  🐎 Tradição Nordestina
                </Badge>
                <h1 className="text-4xl md:text-6xl font-black leading-tight mb-4 drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
                  41ª Vaquejada
                  <span className="block text-accent">de Petrolina</span>
                </h1>
                <p className="text-lg md:text-xl text-white/95 mb-8 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                  Tradição, emoção e grandes shows no coração do sertão
                </p>

                <div className="flex flex-wrap gap-3">
                  <Button
                    size="lg"
                    className="rounded-full gradient-sun text-white border-0 font-bold gap-2"
                    onClick={() =>
                      document
                        .getElementById("programacao")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    <Music className="h-5 w-5" /> Ver programação
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="rounded-full bg-background/20 backdrop-blur-sm border-white/40 text-white hover:bg-background/30 hover:text-white gap-2"
                  >
                    <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                      <MapPin className="h-5 w-5" /> Como chegar
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* INFO RÁPIDAS */}
          <section className="py-10 bg-card/50 border-y border-border">
            <div className="container px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Calendar, label: "Data", value: "30 de maio • sábado" },
                { icon: MapPin, label: "Local", value: "Parque Dr. Geraldo Estrela" },
                { icon: Ticket, label: "Entrada", value: "Gratuita" },
                { icon: Trophy, label: "Atrações", value: "Shows + Vaquejada" },
              ].map((i) => (
                <div
                  key={i.label}
                  className="bg-card rounded-2xl p-4 shadow-card flex items-start gap-3"
                >
                  <div className="p-2 rounded-xl gradient-sun text-white shrink-0">
                    <i.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
                      {i.label}
                    </div>
                    <div className="font-bold text-sm md:text-base leading-tight">
                      {i.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ATRAÇÕES */}
          <section id="programacao" className="py-12 md:py-16">
            <div className="container px-4">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-bold uppercase tracking-wide mb-2">
                  <Music className="h-3 w-3" /> Atrações Confirmadas
                </div>
                <h2 className="text-2xl md:text-3xl font-black">
                  Shows que vão agitar o sertão
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Mais atrações em breve 🔥
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {attractions.map((a) => (
                  <article
                    key={a.name}
                    className="relative rounded-2xl overflow-hidden shadow-card hover:shadow-river hover:-translate-y-1 transition-all bg-card"
                  >
                    <div
                      className="aspect-[4/3] flex items-center justify-center text-7xl"
                      style={{
                        background:
                          "linear-gradient(135deg, hsl(20 90% 50%), hsl(15 80% 30%))",
                      }}
                    >
                      {a.emoji}
                    </div>
                    <div className="p-4">
                      <h3 className="font-black text-lg leading-tight">
                        {a.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {a.role}
                      </p>
                    </div>
                  </article>
                ))}

                <article className="relative rounded-2xl overflow-hidden border-2 border-dashed border-border bg-card/50 flex items-center justify-center p-8 text-center">
                  <div>
                    <div className="text-4xl mb-2">✨</div>
                    <div className="font-bold">Mais atrações em breve</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Acompanhe as novidades
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </section>

          {/* SOBRE */}
          <section className="py-12 md:py-16 bg-card/40">
            <div className="container px-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 text-secondary text-xs font-bold uppercase tracking-wide mb-3">
                🐎 Sobre o evento
              </div>
              <h2 className="text-2xl md:text-3xl font-black mb-4">
                Uma das maiores vaquejadas do Brasil
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                A Vaquejada de Petrolina é uma das maiores do Brasil, reunindo
                vaqueiros de diversos estados, com competições emocionantes e
                uma programação de shows que movimenta toda a região do Vale do
                São Francisco.
              </p>

              <ul className="grid sm:grid-cols-2 gap-3 mt-6">
                {[
                  "🎶 Shows ao vivo",
                  "🐎 Competições de vaquejada",
                  "🍖 Praça de alimentação",
                  "👨‍👩‍👧 Diversão para toda família",
                ].map((t) => (
                  <li
                    key={t}
                    className="bg-card rounded-xl p-3 shadow-card text-sm font-semibold"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* MAPA */}
          <section className="py-12 md:py-16">
            <div className="container px-4">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 text-accent-foreground text-xs font-bold uppercase tracking-wide mb-2">
                  <MapPin className="h-3 w-3" /> Localização
                </div>
                <h2 className="text-2xl md:text-3xl font-black">Como chegar</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Parque Doutor Geraldo Estrela • Petrolina - PE
                </p>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-card border border-border">
                <iframe
                  src={embedUrl}
                  width="100%"
                  height="420"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa - Parque Doutor Geraldo Estrela"
                />
              </div>

              <div className="mt-4 flex justify-center">
                <Button asChild size="lg" className="rounded-full gradient-sun text-white border-0 gap-2">
                  <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                    <MapPin className="h-5 w-5" /> Abrir no Google Maps
                  </a>
                </Button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
        <BottomNav />
      </div>
    </SearchProvider>
  );
};

export default Vaquejada;
