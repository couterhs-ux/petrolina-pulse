import { useState } from "react";
import saoJoaoImg from "@/assets/sao-joao-programacao.png";

type Day = {
  date: string;
  weekday: string;
  artists: string[];
};

const lineup: Day[] = [
  { date: "19.JUN", weekday: "Sexta", artists: ["Leonardo", "Natanzinho Lima", "Rey Vaqueiro", "Seu Desejo", "Michele Andrade", "PV Calado"] },
  { date: "20.JUN", weekday: "Sábado", artists: ["Gusttavo Lima", "Pablo", "Zé Vaqueiro", "Jonas Esticado", "Toque Dez", "Trio Granah"] },
  { date: "21.JUN", weekday: "Domingo", artists: ["Marisa Monte", "João Gomes", "Dorgival Dantas", "Waldonys", "Lucy Alves", "Fabiana Santiago"] },
  { date: "22.JUN", weekday: "Segunda", artists: ["Joelma", "Limão com Mel", "Mano Walter", "Silvânia & Berg", "Filho do Piseiro", "Priscila Senna"] },
  { date: "23.JUN", weekday: "Terça", artists: ["Matheus Fernandes", "Nattan", "Henry Freitas", "Tarcísio Acordeon", "Hugo e Guilherme", "Iguinho e Lulinha", "Pedro Libe"] },
  { date: "24.JUN", weekday: "Quarta", artists: ["Luan Santana", "Ivete Sangalo", "Léo Santana", "Mari Fernandez", "Vitor Fernandes"] },
  { date: "25.JUN", weekday: "Quinta", artists: ["Xand Avião", "Bruno e Marrone", "Thiaguinho", "Felipe Amorim", "Lipe Lucena", "Elisson Castro"] },
  { date: "26.JUN", weekday: "Sexta", artists: ["Wesley Safadão", "Simone Mendes", "Menos é Mais", "Eric Land", "Raphaela Santos", "Ana Costa"] },
  { date: "27.JUN", weekday: "Sábado", artists: ["Henrique e Juliano", "Nattan", "Léo Foguete", "Calcinha Preta", "Grelo", "Patrick Costa"] },
];

export const SaoJoaoLineup = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const visible = selected ? lineup.filter((d) => d.date === selected) : lineup;

  return (
    <section className="relative py-12 md:py-16 overflow-hidden bg-gradient-to-b from-primary/5 via-background to-secondary/5">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "24px 24px" }} />

      <div className="container px-4 relative">
        <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 text-secondary text-xs font-bold uppercase tracking-wide mb-3">
              🪗 Programação Oficial • 2026
            </div>
            <h2 className="text-3xl md:text-5xl font-black leading-tight mb-3">
              São João de <span className="text-primary">Petrolina</span>
            </h2>
            <p className="text-muted-foreground max-w-xl">
              9 dias de festa, mais de 50 atrações nacionais e regionais no maior São João do Sertão. De 19 a 27 de junho.
            </p>
          </div>
          <div className="w-full md:w-72 shrink-0 rounded-2xl overflow-hidden shadow-card border border-border/50">
            <img src={saoJoaoImg} alt="Programação oficial São João de Petrolina 2026" className="w-full h-auto" loading="lazy" />
          </div>
        </div>

        {/* Day chips */}
        <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-2">
          <button
            onClick={() => setSelected(null)}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all ${
              selected === null ? "bg-primary text-primary-foreground shadow-card" : "bg-card border border-border hover:border-primary/50"
            }`}
          >
            Todos os dias
          </button>
          {lineup.map((d) => (
            <button
              key={d.date}
              onClick={() => setSelected(d.date)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all ${
                selected === d.date ? "bg-primary text-primary-foreground shadow-card" : "bg-card border border-border hover:border-primary/50"
              }`}
            >
              {d.date}
            </button>
          ))}
        </div>

        {/* Lineup grid - shields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((day, idx) => {
            const palette = idx % 3;
            const headerBg =
              palette === 0 ? "bg-primary text-primary-foreground" :
              palette === 1 ? "bg-secondary text-secondary-foreground" :
              "bg-accent text-accent-foreground";
            return (
              <article
                key={day.date}
                className="group relative rounded-3xl bg-card border-2 border-border/60 shadow-card overflow-hidden hover:shadow-river hover:-translate-y-1 transition-all"
              >
                <div className={`${headerBg} px-5 py-4 flex items-center justify-between`}>
                  <div>
                    <div className="text-2xl font-black leading-none">{day.date}</div>
                    <div className="text-[10px] uppercase tracking-widest opacity-80 mt-1">{day.weekday}</div>
                  </div>
                  <div className="text-3xl">🪗</div>
                </div>
                <ul className="p-5 space-y-2">
                  {day.artists.map((artist, i) => (
                    <li
                      key={artist}
                      className={`font-bold leading-tight ${i === 0 ? "text-lg text-primary" : "text-sm text-foreground/85"}`}
                    >
                      {i === 0 && <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary mr-2 align-middle" />}
                      {artist}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          * Programação sujeita a alterações pela organização do evento. Fonte: Prefeitura de Petrolina.
        </p>
      </div>
    </section>
  );
};
