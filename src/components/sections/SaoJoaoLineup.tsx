import { useEffect, useMemo, useState } from "react";
import { Search, Heart, Share2, MapPin, Clock, Music2, Calendar, Sparkles, X, Bell, ChevronDown } from "lucide-react";
import saoJoaoImg from "@/assets/sao-joao-programacao.png";
import { toast } from "@/hooks/use-toast";

type Artist = {
  name: string;
  time?: string;
  stage: "Palco Principal" | "Palco Cultural" | "Palco Sertão";
  genre: string;
  headliner?: boolean;
};

type Day = {
  date: string;       // 19.JUN
  iso: string;        // 2026-06-19
  weekday: string;
  theme: string;
  artists: Artist[];
};

const lineup: Day[] = [
  {
    date: "19.JUN", iso: "2026-06-19", weekday: "Sexta", theme: "Abertura Oficial",
    artists: [
      { name: "Leonardo", stage: "Palco Principal", genre: "Sertanejo", headliner: true },
      { name: "Natanzinho Lima", stage: "Palco Principal", genre: "Forró" },
      { name: "Rey Vaqueiro", stage: "Palco Sertão", genre: "Forró" },
      { name: "Seu Desejo", stage: "Palco Cultural", genre: "Forró pé-de-serra" },
      { name: "Michele Andrade", stage: "Palco Sertão", genre: "Forró" },
      { name: "PV Calado", stage: "Palco Cultural", genre: "MPB Sertaneja" },
    ],
  },
  {
    date: "20.JUN", iso: "2026-06-20", weekday: "Sábado", theme: "Noite Sertaneja",
    artists: [
      { name: "Gusttavo Lima", stage: "Palco Principal", genre: "Sertanejo", headliner: true },
      { name: "Pablo", stage: "Palco Principal", genre: "Arrocha" },
      { name: "Zé Vaqueiro", stage: "Palco Sertão", genre: "Piseiro" },
      { name: "Jonas Esticado", stage: "Palco Sertão", genre: "Forró" },
      { name: "Toque Dez", stage: "Palco Cultural", genre: "Forró" },
      { name: "Trio Granah", stage: "Palco Cultural", genre: "Forró pé-de-serra" },
    ],
  },
  {
    date: "21.JUN", iso: "2026-06-21", weekday: "Domingo", theme: "MPB & Raízes",
    artists: [
      { name: "Marisa Monte", stage: "Palco Principal", genre: "MPB", headliner: true },
      { name: "João Gomes", stage: "Palco Principal", genre: "Piseiro" },
      { name: "Dorgival Dantas", stage: "Palco Sertão", genre: "Forró" },
      { name: "Waldonys", stage: "Palco Sertão", genre: "Forró instrumental" },
      { name: "Lucy Alves", stage: "Palco Cultural", genre: "MPB" },
      { name: "Fabiana Santiago", stage: "Palco Cultural", genre: "Forró" },
    ],
  },
  {
    date: "22.JUN", iso: "2026-06-22", weekday: "Segunda", theme: "Noite do Brega & Forró",
    artists: [
      { name: "Joelma", stage: "Palco Principal", genre: "Brega/Calypso", headliner: true },
      { name: "Limão com Mel", stage: "Palco Principal", genre: "Forró" },
      { name: "Mano Walter", stage: "Palco Sertão", genre: "Forró" },
      { name: "Silvânia & Berg", stage: "Palco Sertão", genre: "Forró" },
      { name: "Filho do Piseiro", stage: "Palco Cultural", genre: "Piseiro" },
      { name: "Priscila Senna", stage: "Palco Cultural", genre: "Brega" },
    ],
  },
  {
    date: "23.JUN", iso: "2026-06-23", weekday: "Terça", theme: "Véspera de São João",
    artists: [
      { name: "Matheus Fernandes", stage: "Palco Principal", genre: "Sertanejo", headliner: true },
      { name: "Nattan", stage: "Palco Principal", genre: "Forró" },
      { name: "Henry Freitas", stage: "Palco Sertão", genre: "Forró" },
      { name: "Tarcísio Acordeon", stage: "Palco Sertão", genre: "Forró" },
      { name: "Hugo e Guilherme", stage: "Palco Cultural", genre: "Sertanejo" },
      { name: "Iguinho e Lulinha", stage: "Palco Cultural", genre: "Forró" },
      { name: "Pedro Libe", stage: "Palco Cultural", genre: "Piseiro" },
    ],
  },
  {
    date: "24.JUN", iso: "2026-06-24", weekday: "Quarta", theme: "Dia de São João 🔥",
    artists: [
      { name: "Luan Santana", stage: "Palco Principal", genre: "Sertanejo", headliner: true },
      { name: "Ivete Sangalo", stage: "Palco Principal", genre: "Axé/Pop", headliner: true },
      { name: "Léo Santana", stage: "Palco Principal", genre: "Pagodão" },
      { name: "Mari Fernandez", stage: "Palco Sertão", genre: "Forró" },
      { name: "Vitor Fernandes", stage: "Palco Sertão", genre: "Forró" },
    ],
  },
  {
    date: "25.JUN", iso: "2026-06-25", weekday: "Quinta", theme: "Pagode & Sertanejo Raiz",
    artists: [
      { name: "Xand Avião", stage: "Palco Principal", genre: "Forró", headliner: true },
      { name: "Bruno e Marrone", stage: "Palco Principal", genre: "Sertanejo raiz" },
      { name: "Thiaguinho", stage: "Palco Sertão", genre: "Pagode" },
      { name: "Felipe Amorim", stage: "Palco Sertão", genre: "Forró" },
      { name: "Lipe Lucena", stage: "Palco Cultural", genre: "Piseiro" },
      { name: "Elisson Castro", stage: "Palco Cultural", genre: "Forró" },
    ],
  },
  {
    date: "26.JUN", iso: "2026-06-26", weekday: "Sexta", theme: "Noite das Divas",
    artists: [
      { name: "Wesley Safadão", stage: "Palco Principal", genre: "Forró", headliner: true },
      { name: "Simone Mendes", stage: "Palco Principal", genre: "Sertanejo" },
      { name: "Menos é Mais", stage: "Palco Sertão", genre: "Pagode" },
      { name: "Eric Land", stage: "Palco Sertão", genre: "Sofrência" },
      { name: "Raphaela Santos", stage: "Palco Cultural", genre: "Forró" },
      { name: "Ana Costa", stage: "Palco Cultural", genre: "MPB" },
    ],
  },
  {
    date: "27.JUN", iso: "2026-06-27", weekday: "Sábado", theme: "Encerramento Histórico",
    artists: [
      { name: "Henrique e Juliano", stage: "Palco Principal", genre: "Sertanejo", headliner: true },
      { name: "Nattan", stage: "Palco Principal", genre: "Forró" },
      { name: "Léo Foguete", stage: "Palco Sertão", genre: "Piseiro" },
      { name: "Calcinha Preta", stage: "Palco Sertão", genre: "Forró/Brega" },
      { name: "Grelo", stage: "Palco Cultural", genre: "Forró pé-de-serra" },
      { name: "Patrick Costa", stage: "Palco Cultural", genre: "Piseiro" },
    ],
  },
];

const STAGES = ["Todos", "Palco Principal", "Palco Sertão", "Palco Cultural"] as const;
const FAV_KEY = "saojoao-pnz-favs";

const stageColor = (s: Artist["stage"]) =>
  s === "Palco Principal" ? "bg-primary/15 text-primary border-primary/30" :
  s === "Palco Sertão" ? "bg-secondary/15 text-secondary border-secondary/30" :
  "bg-accent/15 text-accent border-accent/30";

const useCountdown = (targetIso: string) => {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const target = new Date(targetIso + "T19:00:00-03:00").getTime();
  const diff = Math.max(0, target - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { d, h, m, s, done: diff === 0 };
};

export const SaoJoaoLineup = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [stage, setStage] = useState<(typeof STAGES)[number]>("Todos");
  const [query, setQuery] = useState("");
  const [onlyFavs, setOnlyFavs] = useState(false);
  const [favs, setFavs] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    try { setFavs(JSON.parse(localStorage.getItem(FAV_KEY) || "[]")); } catch {}
  }, []);

  const toggleFav = (name: string) => {
    setFavs((prev) => {
      const next = prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name];
      localStorage.setItem(FAV_KEY, JSON.stringify(next));
      toast({ title: prev.includes(name) ? "Removido dos favoritos" : "❤️ Adicionado aos favoritos", description: name });
      return next;
    });
  };

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) await navigator.share({ title: "São João de Petrolina 2026", text: "Confere a programação completa!", url });
      else { await navigator.clipboard.writeText(url); toast({ title: "Link copiado!" }); }
    } catch {}
  };

  const countdown = useCountdown("2026-06-19");

  const totalArtists = lineup.reduce((a, d) => a + d.artists.length, 0);

  const visible = useMemo(() => {
    const days = selected ? lineup.filter((d) => d.date === selected) : lineup;
    return days
      .map((day) => ({
        ...day,
        artists: day.artists.filter((a) => {
          if (stage !== "Todos" && a.stage !== stage) return false;
          if (onlyFavs && !favs.includes(a.name)) return false;
          if (query && !`${a.name} ${a.genre}`.toLowerCase().includes(query.toLowerCase())) return false;
          return true;
        }),
      }))
      .filter((d) => d.artists.length > 0);
  }, [selected, stage, query, onlyFavs, favs]);

  const matchCount = visible.reduce((a, d) => a + d.artists.length, 0);

  return (
    <section className="relative py-12 md:py-16 overflow-hidden bg-gradient-to-b from-primary/5 via-background to-secondary/5">
      {/* tech grid */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "24px 24px" }} />
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

      <div className="container px-4 relative">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row gap-8 items-start mb-8">
          <div className="flex-1 min-w-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 text-secondary text-xs font-bold uppercase tracking-wide mb-3">
              <Sparkles className="h-3 w-3" /> Programação Oficial • 2026
            </div>
            <h2 className="text-3xl md:text-5xl font-black leading-tight mb-3">
              São João de <span className="text-primary">Petrolina</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mb-5">
              9 noites, 3 palcos, mais de {totalArtists} atrações. O maior São João do Sertão de 19 a 27 de junho no Pátio do Forró.
            </p>

            {/* stats */}
            <div className="grid grid-cols-3 gap-2 max-w-md mb-5">
              {[
                { v: "9", l: "Dias" },
                { v: "3", l: "Palcos" },
                { v: `${totalArtists}+`, l: "Atrações" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl bg-card border border-border/60 px-3 py-3 text-center shadow-card">
                  <div className="text-2xl font-black text-primary">{s.v}</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>

            {/* countdown */}
            {!countdown.done && (
              <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-[1.5px] max-w-md">
                <div className="rounded-[14px] bg-card px-4 py-3 flex items-center gap-3">
                  <Bell className="h-5 w-5 text-primary shrink-0" />
                  <div className="flex-1">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Começa em</div>
                    <div className="font-mono font-black text-lg leading-tight">
                      {countdown.d}d <span className="text-primary">:</span> {String(countdown.h).padStart(2,"0")}h <span className="text-primary">:</span> {String(countdown.m).padStart(2,"0")}m <span className="text-primary">:</span> {String(countdown.s).padStart(2,"0")}s
                    </div>
                  </div>
                  <button onClick={share} className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition" aria-label="Compartilhar">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="w-full lg:w-72 shrink-0 rounded-2xl overflow-hidden shadow-card border border-border/50">
            <img src={saoJoaoImg} alt="Programação oficial São João de Petrolina 2026" className="w-full h-auto" loading="lazy" />
          </div>
        </div>

        {/* SEARCH + FILTERS BAR */}
        <div className="rounded-2xl bg-card/80 backdrop-blur border border-border/60 p-3 mb-6 shadow-card">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar artista ou gênero (ex: Ivete, piseiro...)"
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-background border border-border focus:border-primary outline-none text-sm"
              />
              {query && (
                <button onClick={() => setQuery("")} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted">
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
            <div className="flex gap-2">
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value as typeof stage)}
                className="px-3 py-2.5 rounded-xl bg-background border border-border text-sm font-semibold focus:border-primary outline-none"
              >
                {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <button
                onClick={() => setOnlyFavs((v) => !v)}
                className={`px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition border ${
                  onlyFavs ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border hover:border-primary/50"
                }`}
              >
                <Heart className={`h-4 w-4 ${onlyFavs ? "fill-current" : ""}`} />
                {favs.length > 0 && <span>{favs.length}</span>}
              </button>
            </div>
          </div>

          {/* day chips */}
          <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide pb-1">
            <button
              onClick={() => setSelected(null)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition ${
                selected === null ? "bg-primary text-primary-foreground" : "bg-background border border-border hover:border-primary/50"
              }`}
            >
              Todos
            </button>
            {lineup.map((d) => (
              <button
                key={d.date}
                onClick={() => setSelected(d.date === selected ? null : d.date)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition flex items-center gap-1.5 ${
                  selected === d.date ? "bg-primary text-primary-foreground" : "bg-background border border-border hover:border-primary/50"
                }`}
              >
                <Calendar className="h-3 w-3" />
                {d.date}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/60 text-xs text-muted-foreground">
            <span><strong className="text-foreground">{matchCount}</strong> {matchCount === 1 ? "atração encontrada" : "atrações encontradas"}</span>
            {(query || stage !== "Todos" || onlyFavs || selected) && (
              <button
                onClick={() => { setQuery(""); setStage("Todos"); setOnlyFavs(false); setSelected(null); }}
                className="text-primary font-semibold hover:underline"
              >
                Limpar filtros
              </button>
            )}
          </div>
        </div>

        {/* LINEUP GRID */}
        {visible.length === 0 ? (
          <div className="text-center py-16 rounded-2xl bg-muted/30">
            <Music2 className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <p className="font-bold">Nenhuma atração encontrada</p>
            <p className="text-sm text-muted-foreground">Ajuste os filtros para ver mais</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {visible.map((day, idx) => {
              const palette = idx % 3;
              const headerBg =
                palette === 0 ? "bg-primary text-primary-foreground" :
                palette === 1 ? "bg-secondary text-secondary-foreground" :
                "bg-accent text-accent-foreground";
              const isOpen = expanded === day.date || selected !== null || query !== "" || onlyFavs || stage !== "Todos";
              const shown = isOpen ? day.artists : day.artists.slice(0, 3);

              return (
                <article
                  key={day.date}
                  className="group relative rounded-3xl bg-card border-2 border-border/60 shadow-card overflow-hidden hover:shadow-river hover:-translate-y-1 transition-all"
                >
                  <div className={`${headerBg} px-5 py-4`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-black leading-none">{day.date}</div>
                        <div className="text-[10px] uppercase tracking-widest opacity-80 mt-1">{day.weekday}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl">🪗</div>
                      </div>
                    </div>
                    <div className="mt-2 text-xs font-semibold opacity-90 flex items-center gap-1.5">
                      <Sparkles className="h-3 w-3" /> {day.theme}
                    </div>
                  </div>

                  <ul className="p-4 space-y-2">
                    {shown.map((a) => {
                      const isFav = favs.includes(a.name);
                      return (
                        <li
                          key={a.name}
                          className={`group/item rounded-xl border p-3 transition hover:border-primary/40 hover:bg-primary/5 ${
                            a.headliner ? "border-primary/30 bg-primary/5" : "border-border/60"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className={`font-bold leading-tight truncate ${a.headliner ? "text-base text-primary" : "text-sm"}`}>
                                  {a.name}
                                </span>
                                {a.headliner && <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-primary text-primary-foreground uppercase tracking-wider">Headliner</span>}
                              </div>
                              <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${stageColor(a.stage)}`}>
                                  <MapPin className="inline h-2.5 w-2.5 mr-0.5" />{a.stage.replace("Palco ", "")}
                                </span>
                                <span className="text-[10px] text-muted-foreground">{a.genre}</span>
                              </div>
                            </div>
                            <button
                              onClick={() => toggleFav(a.name)}
                              className={`p-1.5 rounded-full transition shrink-0 ${
                                isFav ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-muted"
                              }`}
                              aria-label="Favoritar"
                            >
                              <Heart className={`h-4 w-4 ${isFav ? "fill-current" : ""}`} />
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  {!isOpen && day.artists.length > 3 && (
                    <button
                      onClick={() => setExpanded(day.date)}
                      className="w-full py-2.5 text-xs font-bold text-primary border-t border-border hover:bg-primary/5 transition flex items-center justify-center gap-1"
                    >
                      <ChevronDown className="h-3.5 w-3.5" /> Ver mais {day.artists.length - 3} atrações
                    </button>
                  )}
                </article>
              );
            })}
          </div>
        )}

        <p className="text-center text-xs text-muted-foreground mt-8">
          * Programação sujeita a alterações pela organização. Fonte: Prefeitura de Petrolina • Pátio do Forró
        </p>
      </div>
    </section>
  );
};
