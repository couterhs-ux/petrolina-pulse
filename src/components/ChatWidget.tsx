import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import logoPnz from "@/assets/logo-pnz.png";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Onde comer hoje em Petrolina? 🍽️",
  "O que rola no fim de semana?",
  "Melhores vinícolas do Vale 🍇",
  "Dicas pra visitar a Orla 🌊",
];

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/pnz-chat`;

export const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Opa! Eu sou a **PNZ IA** ☀️ Sua guia esperta de Petrolina. Pode mandar a pergunta — restaurante, evento, vinícola, São João, o que for daqui!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Msg = { role: "user", content: trimmed };
    const apiMessages: Msg[] = [...messages.slice(1), userMsg];

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    let assistantSoFar = "";
    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && last !== messages[0]) {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantSoFar } : m
          );
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!resp.ok) {
        if (resp.status === 429) {
          toast.error("Muita gente perguntando agora! Tenta de novo 🙏");
        } else if (resp.status === 402) {
          toast.error("Créditos de IA esgotados.");
        } else {
          toast.error("Erro ao falar com a IA.");
        }
        setMessages((prev) => prev.slice(0, -1));
        setLoading(false);
        return;
      }

      if (!resp.body) throw new Error("Sem stream");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let done = false;

      while (!done) {
        const { done: d, value } = await reader.read();
        if (d) break;
        buffer += decoder.decode(value, { stream: true });

        let nl: number;
        while ((nl = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, nl);
          buffer = buffer.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") {
            done = true;
            break;
          }
          try {
            const parsed = JSON.parse(json);
            const content: string | undefined = parsed.choices?.[0]?.delta?.content;
            if (content) upsertAssistant(content);
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (e) {
      console.error(e);
      toast.error("Falha ao conectar com a IA");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Abrir assistente PNZ IA"
          className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 w-14 h-14 rounded-full gradient-sun shadow-sun flex items-center justify-center hover:scale-110 transition-transform animate-pulse-slow"
        >
          <MessageCircle className="h-6 w-6 text-primary-foreground" />
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-secondary text-secondary-foreground text-[10px] font-black flex items-center justify-center border-2 border-background">
            IA
          </span>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className="fixed inset-x-0 bottom-0 md:inset-auto md:bottom-6 md:right-6 z-50 w-full md:w-[380px] h-[80vh] md:h-[560px] bg-card md:rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden">
          {/* Header */}
          <div className="gradient-sun text-primary-foreground px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={logoPnz} alt="" width={32} height={32} className="w-8 h-8 rounded-full bg-background/20 p-0.5" />
              <div>
                <p className="font-black text-sm leading-tight flex items-center gap-1">
                  PNZ IA <Sparkles className="h-3 w-3" />
                </p>
                <p className="text-[10px] opacity-90">Sua guia esperta de Petrolina</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Fechar"
              className="w-8 h-8 rounded-full hover:bg-background/20 flex items-center justify-center"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3 bg-background">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm"
                  }`}
                >
                  {renderMarkdown(m.content)}
                </div>
              </div>
            ))}
            {loading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl rounded-bl-sm px-3 py-2 text-sm flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-3 w-3 animate-spin" /> Pensando…
                </div>
              </div>
            )}

            {messages.length === 1 && (
              <div className="pt-2 space-y-1.5">
                <p className="text-[11px] text-muted-foreground font-semibold px-1">Sugestões:</p>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="block w-full text-left text-xs bg-card border border-border hover:border-primary hover:bg-muted rounded-xl px-3 py-2 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="border-t border-border p-2 flex items-center gap-2 bg-card"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pergunta algo sobre Petrolina…"
              disabled={loading}
              className="flex-1 bg-muted rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            />
            <Button
              type="submit"
              size="icon"
              disabled={loading || !input.trim()}
              className="rounded-full gradient-sun text-primary-foreground border-0 shrink-0"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

// Renderização leve de markdown (negrito **texto** e quebras de linha)
function renderMarkdown(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return <strong key={i}>{p.slice(2, -2)}</strong>;
    }
    return <span key={i}>{p}</span>;
  });
}
