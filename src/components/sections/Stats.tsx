import { useEffect, useRef, useState } from "react";

type Stat = {
  value: number;
  decimals?: number;
  /** Suffix exibido em laranja */
  suffix: string;
  /** Divide o valor antes de formatar (ex.: K = 1000) */
  divisor?: number;
  label: string;
  description: string;
};

const stats: Stat[] = [
  {
    value: 500,
    suffix: "+",
    label: "Estabelecimentos",
    description: "Negócios cadastrados em toda Petrolina",
  },
  {
    value: 120,
    suffix: "+",
    label: "Eventos por mês",
    description: "Shows, festas e experiências para viver",
  },
  {
    value: 15,
    suffix: "K",
    label: "Usuários ativos",
    description: "Petrolinenses navegando todo mês",
  },
  {
    value: 4.8,
    decimals: 1,
    suffix: "★",
    label: "Avaliação média",
    description: "Aprovado por quem usa de verdade",
  },
];

const Counter = ({
  target,
  decimals = 0,
  start,
}: {
  target: number;
  decimals?: number;
  start: boolean;
}) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    const duration = 1800;
    const startTime = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setValue(target);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target]);

  const formatted =
    decimals > 0
      ? value.toFixed(decimals)
      : Math.floor(value).toLocaleString("pt-BR");

  return <>{formatted}</>;
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
      style={{ backgroundColor: "#0f0f0f" }}
      aria-label="Estatísticas do Guia PNZ"
      className="reveal"
    >
      <div className="container px-0">
        <div
          className="grid grid-cols-2 md:grid-cols-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-start text-left p-6 md:p-10"
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                borderRight:
                  i < stats.length - 1
                    ? "1px solid rgba(255,255,255,0.07)"
                    : undefined,
              }}
            >
              <p
                className="font-display leading-none tabular-nums"
                style={{ fontSize: "clamp(3rem, 6vw, 5rem)", color: "#f0ece4" }}
              >
                <Counter
                  target={stat.value}
                  decimals={stat.decimals}
                  start={visible}
                />
                <span style={{ color: "#FF6B00" }}>{stat.suffix}</span>
              </p>

              <p
                className="mt-4 font-syne uppercase text-xs font-semibold"
                style={{ letterSpacing: "0.2em", color: "#666" }}
              >
                {stat.label}
              </p>

              <p
                className="mt-2 font-light text-sm leading-relaxed"
                style={{ color: "#999" }}
              >
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
