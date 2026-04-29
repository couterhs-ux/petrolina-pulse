import { useEffect, useState } from "react";

/**
 * Contador "ao vivo" de usuários online.
 *
 * - Faixa: 240 a 565
 * - Atualiza a cada ~5 minutos
 * - Cada passo varia pouco em relação ao valor atual (±3 a ±15)
 * - Sincronizado entre abas/componentes via localStorage (mesma seed por janela de 5 min)
 */
const MIN = 240;
const MAX = 565;
const STEP_MS = 5 * 60 * 1000; // 5 minutos
const STORAGE_KEY = "pnz_live_users_v1";

// PRNG determinístico simples (mulberry32) para que todos os clientes
// vejam o mesmo valor na mesma janela de 5 minutos.
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

/** Calcula o valor para uma janela específica, baseado no valor anterior. */
function computeForBucket(bucket: number, previous: number): number {
  const rand = mulberry32(bucket);
  // delta pequeno: ±3 a ±15
  const magnitude = 3 + Math.floor(rand() * 13); // 3..15
  const sign = rand() < 0.5 ? -1 : 1;
  let next = previous + sign * magnitude;

  // Se chegou perto das bordas, força voltar para o meio um pouco
  if (next < MIN + 10) next = previous + Math.abs(magnitude);
  if (next > MAX - 10) next = previous - Math.abs(magnitude);

  return clamp(Math.round(next), MIN, MAX);
}

/** Reconstrói o valor atual a partir de um seed inicial estável. */
function getCurrentValue(): number {
  const now = Date.now();
  const currentBucket = Math.floor(now / STEP_MS);

  // Tenta usar cache do localStorage
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const cached = JSON.parse(raw) as { bucket: number; value: number };
        if (cached.bucket === currentBucket) return cached.value;
        if (cached.bucket < currentBucket && currentBucket - cached.bucket < 50) {
          // avança bucket por bucket a partir do último conhecido
          let val = cached.value;
          for (let b = cached.bucket + 1; b <= currentBucket; b++) {
            val = computeForBucket(b, val);
          }
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ bucket: currentBucket, value: val }),
          );
          return val;
        }
      }
    } catch {
      // ignore
    }
  }

  // Sem cache utilizável: parte de um valor base estável e avança até hoje
  // a partir de uma origem recente (últimos 200 buckets ≈ ~16h)
  const startBucket = currentBucket - 200;
  let val = 380; // valor inicial agradável no meio da faixa
  for (let b = startBucket + 1; b <= currentBucket; b++) {
    val = computeForBucket(b, val);
  }

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ bucket: currentBucket, value: val }),
      );
    } catch {
      // ignore
    }
  }
  return val;
}

export function useLiveUsers(): number {
  const [value, setValue] = useState<number>(() =>
    typeof window === "undefined" ? 380 : getCurrentValue(),
  );

  useEffect(() => {
    // Atualiza imediatamente ao montar
    setValue(getCurrentValue());

    // Recalcula a cada 30s (barato) — só muda quando o bucket de 5min vira
    const interval = setInterval(() => {
      setValue((prev) => {
        const next = getCurrentValue();
        return next === prev ? prev : next;
      });
    }, 30_000);

    // Sincroniza entre abas
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setValue(getCurrentValue());
    };
    window.addEventListener("storage", onStorage);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return value;
}
