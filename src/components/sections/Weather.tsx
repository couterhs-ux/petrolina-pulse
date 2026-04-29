import { useEffect, useState } from "react";
import { Cloud, Sun, CloudRain, CloudSun, Wind, Droplets, ThermometerSun, Loader2, RefreshCw, Umbrella, Activity, MapPin } from "lucide-react";

type Daily = { date: string; max: number; min: number; code: number; rainProb: number; uvMax: number };
type Current = {
  temp: number;
  feels: number;
  code: number;
  wind: number;
  windDir: number;
  humidity: number;
  rainProb: number;
  uv: number;
  isDay: boolean;
  pressure: number;
};
type WeatherData = { current: Current; daily: Daily[]; updatedAt: Date };

// Open-Meteo — dados oficiais, precisos, atualizados a cada hora. Petrolina-PE oficial.
const URL =
  "https://api.open-meteo.com/v1/forecast" +
  "?latitude=-9.3891&longitude=-40.5030" +
  "&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,relative_humidity_2m,precipitation_probability,uv_index,is_day,surface_pressure" +
  "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max" +
  "&timezone=America%2FFortaleza&forecast_days=7";

const codeIcon = (code: number, isDay = true) => {
  if (code === 0) return isDay ? Sun : Cloud;
  if (code <= 3) return CloudSun;
  if (code >= 51 && code <= 67) return CloudRain;
  if (code >= 80) return CloudRain;
  return Cloud;
};

const codeLabel = (code: number) => {
  if (code === 0) return "Céu limpo";
  if (code === 1) return "Predomínio de sol";
  if (code === 2) return "Parcialmente nublado";
  if (code === 3) return "Nublado";
  if (code <= 48) return "Névoa";
  if (code <= 57) return "Garoa";
  if (code <= 67) return "Chuva";
  if (code <= 77) return "Neve";
  if (code <= 82) return "Pancadas de chuva";
  return "Tempestade";
};

const uvLabel = (uv: number) => {
  if (uv < 3) return { label: "Baixo", color: "text-success" };
  if (uv < 6) return { label: "Moderado", color: "text-accent" };
  if (uv < 8) return { label: "Alto", color: "text-primary" };
  if (uv < 11) return { label: "Muito alto", color: "text-destructive" };
  return { label: "Extremo", color: "text-destructive" };
};

const windDir = (deg: number) => {
  const dirs = ["N", "NE", "L", "SE", "S", "SO", "O", "NO"];
  return dirs[Math.round(deg / 45) % 8];
};

const weekday = (iso: string) => {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", "");
};

export const Weather = () => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const r = await fetch(URL, { cache: "no-store" });
      const j = await r.json();
      setData({
        current: {
          temp: Math.round(j.current.temperature_2m),
          feels: Math.round(j.current.apparent_temperature),
          code: j.current.weather_code,
          wind: Math.round(j.current.wind_speed_10m),
          windDir: j.current.wind_direction_10m,
          humidity: Math.round(j.current.relative_humidity_2m),
          rainProb: Math.round(j.current.precipitation_probability ?? 0),
          uv: Math.round(j.current.uv_index ?? 0),
          isDay: j.current.is_day === 1,
          pressure: Math.round(j.current.surface_pressure),
        },
        daily: j.daily.time.slice(0, 7).map((t: string, i: number) => ({
          date: t,
          max: Math.round(j.daily.temperature_2m_max[i]),
          min: Math.round(j.daily.temperature_2m_min[i]),
          code: j.daily.weather_code[i],
          rainProb: Math.round(j.daily.precipitation_probability_max?.[i] ?? 0),
          uvMax: Math.round(j.daily.uv_index_max?.[i] ?? 0),
        })),
        updatedAt: new Date(),
      });
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    const t = setInterval(fetchWeather, 5 * 60 * 1000); // auto-refresh 5 min
    return () => clearInterval(t);
  }, []);

  if (error && !data) return null;

  const uv = data ? uvLabel(data.current.uv) : null;

  return (
    <section className="py-10 bg-gradient-to-br from-secondary/10 via-background to-primary/5">
      <div className="container px-4">
        <div className="rounded-3xl bg-card border border-border/60 shadow-card overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,360px),1fr]">
            {/* CURRENT */}
            <div className={`relative p-6 md:p-7 text-primary-foreground overflow-hidden ${data?.current.isDay ? "bg-gradient-to-br from-primary via-primary to-secondary" : "bg-gradient-to-br from-slate-900 via-indigo-900 to-secondary"}`}>
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
              <div className="relative">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-[10px] uppercase tracking-widest opacity-80 flex items-center gap-1.5">
                    <MapPin className="h-3 w-3" /> Petrolina-PE • Tempo Real
                  </div>
                  <button
                    onClick={fetchWeather}
                    disabled={loading}
                    className="p-1.5 rounded-full bg-white/15 hover:bg-white/25 transition disabled:opacity-50"
                    aria-label="Atualizar"
                  >
                    <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} />
                  </button>
                </div>

                {!data ? (
                  <div className="flex items-center gap-2 opacity-80 py-8">
                    <Loader2 className="h-4 w-4 animate-spin" /> Carregando dados oficiais...
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-4 mt-3">
                      {(() => {
                        const Icon = codeIcon(data.current.code, data.current.isDay);
                        return <Icon className="h-16 w-16 drop-shadow-lg" strokeWidth={1.5} />;
                      })()}
                      <div>
                        <div className="text-6xl font-black leading-none tracking-tight">{data.current.temp}°</div>
                        <div className="text-xs font-semibold opacity-90 mt-1">{codeLabel(data.current.code)}</div>
                        <div className="text-[11px] opacity-80 mt-0.5">Sensação {data.current.feels}°</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-5">
                      {[
                        { icon: Wind, label: "Vento", value: `${data.current.wind} km/h ${windDir(data.current.windDir)}` },
                        { icon: Droplets, label: "Umidade", value: `${data.current.humidity}%` },
                        { icon: Umbrella, label: "Chuva", value: `${data.current.rainProb}%` },
                        { icon: Activity, label: "UV", value: `${data.current.uv} ${uv?.label}` },
                      ].map((s) => (
                        <div key={s.label} className="bg-white/10 backdrop-blur rounded-lg px-2.5 py-1.5">
                          <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider opacity-80">
                            <s.icon className="h-2.5 w-2.5" /> {s.label}
                          </div>
                          <div className="text-xs font-bold mt-0.5">{s.value}</div>
                        </div>
                      ))}
                    </div>

                    <div className="text-[10px] opacity-75 mt-4 flex items-center gap-1.5">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                      Atualizado às {data.updatedAt.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })} • Fonte oficial Open-Meteo
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* FORECAST */}
            <div className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <ThermometerSun className="h-3.5 w-3.5" /> Próximos 7 dias
                </div>
                <div className="text-[10px] text-muted-foreground">Máx / Mín / Chuva</div>
              </div>

              {!data ? (
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="h-32 rounded-xl bg-muted animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {data.daily.map((d, i) => {
                    const Icon = codeIcon(d.code);
                    return (
                      <div
                        key={d.date}
                        className={`rounded-xl p-2.5 text-center border transition hover:border-primary/40 ${
                          i === 0 ? "border-primary/40 bg-primary/5" : "border-border/60"
                        }`}
                      >
                        <div className="text-[10px] font-bold uppercase text-muted-foreground">{i === 0 ? "Hoje" : weekday(d.date)}</div>
                        <Icon className="h-7 w-7 mx-auto my-1.5 text-primary" strokeWidth={1.5} />
                        <div className="text-sm font-black leading-none">{d.max}°</div>
                        <div className="text-[10px] text-muted-foreground mt-0.5">{d.min}°</div>
                        <div className="flex items-center justify-center gap-0.5 mt-1.5 text-[9px] text-secondary font-bold">
                          <Umbrella className="h-2.5 w-2.5" /> {d.rainProb}%
                        </div>
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
