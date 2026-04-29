import { useEffect, useState } from "react";
import { Cloud, Sun, CloudRain, CloudSun, Wind, Droplets, ThermometerSun, Loader2 } from "lucide-react";

type Daily = { date: string; max: number; min: number; code: number };
type WeatherData = { current: { temp: number; code: number; wind: number; humidity: number }; daily: Daily[] };

// Open-Meteo (gratuita, sem chave) — Petrolina-PE
const URL = "https://api.open-meteo.com/v1/forecast?latitude=-9.3891&longitude=-40.5030&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=America%2FFortaleza&forecast_days=5";

const codeIcon = (code: number) => {
  if (code === 0) return Sun;
  if (code <= 3) return CloudSun;
  if (code >= 51 && code <= 67) return CloudRain;
  if (code >= 80) return CloudRain;
  return Cloud;
};

const codeLabel = (code: number) => {
  if (code === 0) return "Céu limpo";
  if (code <= 3) return "Parcialmente nublado";
  if (code <= 48) return "Nublado";
  if (code <= 67) return "Chuva";
  if (code <= 77) return "Neve";
  if (code <= 82) return "Pancadas de chuva";
  return "Tempestade";
};

const weekday = (iso: string) => {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", "");
};

export const Weather = () => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(URL)
      .then((r) => r.json())
      .then((j) => {
        setData({
          current: {
            temp: Math.round(j.current.temperature_2m),
            code: j.current.weather_code,
            wind: Math.round(j.current.wind_speed_10m),
            humidity: Math.round(j.current.relative_humidity_2m),
          },
          daily: j.daily.time.map((t: string, i: number) => ({
            date: t,
            max: Math.round(j.daily.temperature_2m_max[i]),
            min: Math.round(j.daily.temperature_2m_min[i]),
            code: j.daily.weather_code[i],
          })),
        });
      })
      .catch(() => setError(true));
  }, []);

  if (error) return null;

  return (
    <section className="py-10 bg-gradient-to-br from-secondary/10 via-background to-primary/5">
      <div className="container px-4">
        <div className="rounded-3xl bg-card border border-border/60 shadow-card overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[auto,1fr]">
            {/* CURRENT */}
            <div className="p-6 md:p-8 bg-gradient-to-br from-primary to-secondary text-primary-foreground">
              {!data ? (
                <div className="flex items-center gap-2 opacity-80">
                  <Loader2 className="h-4 w-4 animate-spin" /> Carregando clima...
                </div>
              ) : (
                <>
                  <div className="text-[10px] uppercase tracking-widest opacity-80">Agora em Petrolina</div>
                  <div className="flex items-center gap-4 mt-2">
                    {(() => {
                      const Icon = codeIcon(data.current.code);
                      return <Icon className="h-14 w-14" strokeWidth={1.5} />;
                    })()}
                    <div>
                      <div className="text-5xl font-black leading-none">{data.current.temp}°</div>
                      <div className="text-xs font-semibold opacity-90 mt-1">{codeLabel(data.current.code)}</div>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-5 text-xs">
                    <div className="flex items-center gap-1.5">
                      <Wind className="h-3.5 w-3.5" /> {data.current.wind} km/h
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Droplets className="h-3.5 w-3.5" /> {data.current.humidity}%
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* FORECAST */}
            <div className="p-4 md:p-6">
              <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <ThermometerSun className="h-3.5 w-3.5" /> Próximos dias
              </div>
              {!data ? (
                <div className="grid grid-cols-5 gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-24 rounded-xl bg-muted animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-5 gap-2">
                  {data.daily.map((d, i) => {
                    const Icon = codeIcon(d.code);
                    return (
                      <div key={d.date} className={`rounded-xl p-3 text-center border ${i === 0 ? "border-primary/40 bg-primary/5" : "border-border/60"}`}>
                        <div className="text-[10px] font-bold uppercase text-muted-foreground">{i === 0 ? "Hoje" : weekday(d.date)}</div>
                        <Icon className="h-6 w-6 mx-auto my-2 text-primary" strokeWidth={1.5} />
                        <div className="text-sm font-black">{d.max}°</div>
                        <div className="text-[10px] text-muted-foreground">{d.min}°</div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
