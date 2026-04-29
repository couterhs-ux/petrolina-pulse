import { useEffect, useRef, useState } from "react";
import { Store, CalendarDays, Users, Star } from "lucide-react";
import { useLiveUsers } from "@/hooks/useLiveUsers";

type Stat = {
  icon: React.ComponentType<{ className?: string }>;
  target: number;
  suffix?: string;
  decimals?: number;
  label: string;
  live?: boolean;
};

const baseStats: Stat[] = [
  { icon: Store, target: 500, suffix: "+", label: "Estabelecimentos cadastrados" },
  { icon: CalendarDays, target: 120, suffix: "+", label: "Eventos por mês" },
  { icon: Users, target: 0, label: "Usuários online agora", live: true },
  { icon: Star, target: 4.8, decimals: 1, suffix: "★", label: "Avaliação média" },
];

const formatValue = (value: number, decimals = 0) =>
  decimals > 0 ? value.toFixed(decimals) : Math.floor(value).toLocaleString("pt-BR");

const Counter = ({ target, suffix = "", decimals = 0, start }: { target: number; suffix?: string; decimals?: number; start: boolean }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    const duration = 1600;
    const startTime = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - startTime) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setValue(target);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target]);

  return (
    <span>
      {formatValue(value, decimals)}
      {suffix}
    </span>
  );
};

export const Stats = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 },
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-10 md:py-16 bg-muted/60 dark:bg-card border-y border-border"
      aria-label="Estatísticas do Guia PNZ"
    >
      <div className="container px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center p-4 md:p-6 rounded-2xl bg-card/70 dark:bg-background/40 backdrop-blur-sm border border-border/60 shadow-card hover:shadow-sun transition-shadow"
              >
                <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-3 gradient-sun shadow-sun">
                  <Icon className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground" />
                </div>
                <p className="font-display tracking-wide text-4xl md:text-6xl leading-none text-primary tabular-nums">
                  <Counter
                    target={stat.target}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                    start={visible}
                  />
                </p>
                <p className="mt-2 text-xs md:text-sm font-semibold text-muted-foreground leading-snug">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
