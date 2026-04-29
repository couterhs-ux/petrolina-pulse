import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

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

const MAX_MESSAGES = 20;
const MAX_CONTENT_CHARS = 2000;
const ALLOWED_ROLES = new Set(["user", "assistant"]);

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate Supabase anon/user JWT to ensure the caller is using a known client
    const authHeader = req.headers.get("Authorization") ?? "";
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();
    if (!token) {
      return new Response(JSON.stringify({ error: "Não autorizado" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      throw new Error("Supabase env not configured");
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });

    // Require an authenticated user. Reject anonymous/anon-key-only callers.
    const { data: userData, error: userErr } = await supabase.auth.getUser(token);
    if (userErr || !userData?.user) {
      return new Response(JSON.stringify({ error: "Faça login para usar o assistente" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "messages inválido" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (messages.length > MAX_MESSAGES) {
      return new Response(
        JSON.stringify({ error: `Máximo de ${MAX_MESSAGES} mensagens por requisição` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Sanitize: filter roles and cap content length
    const sanitized = messages
      .filter((m: any) => m && ALLOWED_ROLES.has(m.role) && typeof m.content === "string")
      .map((m: any) => ({
        role: m.role,
        content: String(m.content).slice(0, MAX_CONTENT_CHARS),
      }));

    if (sanitized.length === 0) {
      return new Response(JSON.stringify({ error: "Nenhuma mensagem válida" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const totalChars = sanitized.reduce((s, m) => s + m.content.length, 0);
    if (totalChars > MAX_MESSAGES * MAX_CONTENT_CHARS) {
      return new Response(JSON.stringify({ error: "Payload muito grande" }), {
        status: 413,
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
          ...sanitized,
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
      JSON.stringify({ error: "Erro interno no servidor" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
