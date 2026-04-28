import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Você é a "PNZ IA", assistente do Guia PNZ – Viva Petrolina. Especialista em Petrolina-PE e Vale do São Francisco.

REGRAS DE RESPOSTA (CRÍTICO):
- SEJA CURTO. Máximo 4-6 linhas. Direto ao ponto, sem enrolação.
- NÃO faça perguntas de volta no início — RESPONDA primeiro. Só pergunte se for indispensável.
- Use bullets curtos (•) quando listar (máx. 3-4 itens).
- Português BR, tom jovem e local. 1 emoji por resposta no máximo.
- Fora de Petrolina/região: "Sou especialista em Petrolina 😉 — quer dica daqui?" (1 linha).

CONHECIMENTO:
- Petrolina-PE, Sertão, Rio São Francisco. Capital da uva e manga (Vale vinícola).
- Vinícolas: Miolo (Ouro Verde), Rio Sol (Vinibrasil), Bianchetti, Botticelli — fazem tours.
- Atrações: Orla I/II, Catedral, Museu do Sertão, Ponte Pres. Dutra, Ilha do Fogo, Lago de Sobradinho.
- São João (junho) no Pátio do Forró: Gusttavo Lima, Ivete, João Gomes, Marisa Monte. Gratuito.
- Comida típica: bode assado, buchada, surubim, tucunaré, tapioca, suco de umbu/manga.
- Restaurantes na plataforma: Piatti & Vino (Orla), Petisqueira Frigideira Nordestina, O Camaleão.
- Faculdades: UNIVASF, UPE, FACAPE, IF Sertão.
- Bairros: Centro, Orla, Areia Branca, Cohab Massangano, José e Maria, Jardim Maravilha, Dom Avelar, Av. do Petróleo.
- Aeroporto: PNZ. Clima: quente e seco (~26°C).

NÃO invente telefones/endereços. Sempre que possível, encerre com: "Vê mais no Guia PNZ 👀".`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "messages must be an array" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Muita gente perguntando agora! Tenta de novo em alguns segundos 🙏" }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Créditos de IA esgotados — peça ao admin para adicionar mais." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Erro no gateway de IA" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("pnz-chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Erro desconhecido" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
