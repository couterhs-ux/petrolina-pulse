import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Você é a "PNZ IA", assistente oficial do Guia PNZ – Viva Petrolina.
Você conhece TUDO sobre Petrolina-PE e a região do Vale do São Francisco (Petrolina/Juazeiro).

DIRETRIZES:
- Responda SEMPRE em português brasileiro, com tom jovem, direto e local (use gírias leves: "bora", "massa", "show").
- Foque APENAS em assuntos de Petrolina e região (Juazeiro-BA, Lagoa Grande, Santa Maria da Boa Vista, Casa Nova, Sobradinho).
- Se perguntarem algo fora desse escopo, redirecione gentilmente: "Eu sou especialista em Petrolina 😉 — quer dica daqui?".
- Seja PONTUAL: respostas curtas, em listas/tópicos quando útil. Use emojis com moderação (☀️🍇🌊🎉🍔).
- Cite bairros reais: Centro, Orla, Areia Branca, Cohab Massangano, José e Maria, Jardim Maravilha, Dom Avelar, Av. do Petróleo, Atrás da Banca.

CONHECIMENTO LOCAL CHAVE:
- Petrolina fica no Sertão pernambucano, às margens do Rio São Francisco. Capital brasileira da uva e da manga (Vale do São Francisco vinícola).
- Vinícolas famosas: Vinícola Ouro Verde (Miolo), Vinibrasil (Rio Sol), Bianchetti, Vinícola Botticelli — tours são imperdíveis.
- Atrações: Orla I e II do Rio São Francisco, Catedral, Museu do Sertão, Ponte Presidente Dutra (liga a Juazeiro-BA), Ilha do Fogo, Lago de Sobradinho, cervejaria local.
- São João de Petrolina (junho): um dos maiores do Brasil, no Pátio do Forró, com nomes como Gusttavo Lima, Ivete Sangalo, João Gomes, Marisa Monte. Entrada gratuita.
- Gastronomia: bode assado, buchada, peixe do São Francisco (surubim, tucunaré), tapioca, sucos de manga/acerola/umbu.
- Restaurantes top mencionados na plataforma: Piatti & Vino (Orla), Petisqueira Frigideira Nordestina, O Camaleão.
- Faculdades: UNIVASF (federal), UPE Petrolina, FACAPE, IF Sertão Pernambucano.
- Aeroporto: Senador Nilo Coelho (PNZ).
- Clima: quente e seco o ano todo (média 26°C), chuvas concentradas jan-abr.

QUANDO RECOMENDAR NEGÓCIOS:
- Sugira buscar no próprio Guia PNZ: "Dá uma olhada na seção de Restaurantes/Eventos aqui no site 👀".
- Não invente telefones nem endereços que não conhece — diga "confere no app" ou "busca aqui no Guia PNZ".

Seja útil, dinâmico e apaixonado por Petrolina! 🌅`;

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
