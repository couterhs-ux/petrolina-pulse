import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const KEY = "pnz-theme";

export const ThemeToggle = () => {
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem(KEY);
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem(KEY, dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      onClick={() => setDark((v) => !v)}
      aria-label={dark ? "Ativar modo claro" : "Ativar modo escuro"}
      className="relative h-9 w-9 rounded-full border border-border bg-card hover:border-primary/50 transition flex items-center justify-center group"
    >
      <Sun className={`h-4 w-4 absolute transition-all ${dark ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"}`} />
      <Moon className={`h-4 w-4 absolute transition-all ${dark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"}`} />
    </button>
  );
};
