import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, X, Send, Loader2, Sparkles, Trash2, Lock, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import logoPnz from "@/assets/logo-pnz.png";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Onde comer hoje em Petrolina? 🍽️",
  "O que rola no fim de semana?",
  "Melhores vinícolas do Vale 🍇",
  "Dicas pra visitar a Orla 🌊",
];

// Limites do frontend (defesa em camada — o backend também valida)
const MAX_MESSAGES_PER_SESSION = 5;
const MAX_MESSAGE_CHARS = 300;
const COOLDOWN_MS = 2000;

const initialMessage: Msg = {
  role: "assistant",
  content:
    "Opa! Eu sou a **PNZ IA** ☀️ Sua guia esperta de Petrolina. Pode mandar a pergunta — restaurante, evento, vinícola, São João, o que for daqui!",
};

export const ChatWidget = () => {
  const { user, loading: authLoading } = useAuth();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sentCount, setSentCount] = useState(0);
  const [cooldownLeft, setCooldownLeft] = useState(0);
  const lastSentAtRef = useRef<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isAuthed = !!user;
  const reachedLimit = sentCount >= MAX_MESSAGES_PER_SESSION;

  const clearChat = () => {
    setMessages([initialMessage]);
    setInput("");
    setSentCount(0);
    setCooldownLeft(0);
    lastSentAtRef.current = 0;
  };

  // Reset chat ao fechar o widget
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => clearChat(), 200);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Reset ao deslogar
  useEffect(() => {
    if (!user) clearChat();
  }, [user]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, open]);

  // Tick do cooldown
  useEffect(() => {
    if (cooldownLeft <= 0) return;
    const id = setInterval(() => {
      const remaining = Math.max(0, COOLDOWN_MS - (Date.now() - lastSentAtRef.current));
      setCooldownLeft(remaining);
      if (remaining === 0) clearInterval(id);
    }, 100);
    return () => clearInterval(id);
  }, [cooldownLeft]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    if (!isAuthed) {
      toast.error("Faça login para usar o assistente.");
      return;
    }

    if (trimmed.length > MAX_MESSAGE_CHARS) {
      toast.error(`Mensagem muito longa (máx. ${MAX_MESSAGE_CHARS} caracteres).`);
      return;
    }

    if (reachedLimit) {
      toast.error(`Limite de ${MAX_MESSAGES_PER_SESSION} mensagens por sessão atingido.`);
      return;
    }

    const sinceLast = Date.now() - lastSentAtRef.current;
    if (lastSentAtRef.current > 0 && sinceLast < COOLDOWN_MS) {
      const wait = Math.ceil((COOLDOWN_MS - sinceLast) / 1000);
      toast.error(`Aguarde ${wait}s antes de enviar de novo.`);
      return;
    }

    const userMsg: Msg = { role: "user", content: trimmed };
    const apiMessages: Msg[] = [...messages.slice(1), userMsg];

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setSentCount((c) => c + 1);
    lastSentAtRef.current = Date.now();
    setCooldownLeft(COOLDOWN_MS);

    let assistantSoFar = "";
    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && last !== initialMessage) {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantSoFar } : m,
          );
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      // supabase.functions.invoke envia o JWT do usuário automaticamente.
      // Nada de chaves expostas no código do frontend.
      const { data, error } = await supabase.functions.invoke("pnz-chat", {
        body: { messages: apiMessages },
      });

      if (error) {
        const status = (error as { context?: { status?: number } })?.context?.status;
        if (status === 401) toast.error("Sessão expirada. Faça login novamente.");
        else if (status === 429) toast.error("Muita gente perguntando agora! Tenta de novo 🙏");
        else if (status === 402) toast.error("Créditos de IA esgotados.");
        else toast.error("Erro ao falar com a IA.");
        setMessages((prev) => prev.slice(0, -1));
        setSentCount((c) => Math.max(0, c - 1));
        return;
      }

      // Resposta pode vir como objeto JSON (não-stream) ou string
      const content =
        typeof data === "string"
          ? data
          : data?.choices?.[0]?.message?.content ?? data?.content ?? "";

      if (content) upsertAssistant(content);
      else toast.error("Resposta vazia da IA.");
    } catch (e) {
      console.error("Chat error:", e);
      toast.error("Falha ao conectar com a IA");
      setMessages((prev) => prev.slice(0, -1));
      setSentCount((c) => Math.max(0, c - 1));
    } finally {
      setLoading(false);
    }
  };

  const remaining = Math.max(0, MAX_MESSAGES_PER_SESSION - sentCount);
  const cooldownActive = cooldownLeft > 0;
  const inputTooLong = input.length > MAX_MESSAGE_CHARS;

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Abrir assistente PNZ IA"
          className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 w-14 h-14 rounded-full gradient-sun shadow-sun flex items-center justify-center hover:scale-110 transition-transform"
        >
          <MessageCircle className="h-6 w-6 text-primary-foreground" />
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-secondary text-secondary-foreground text-[10px] font-black flex items-center justify-center border-2 border-background">
            IA
          </span>
        </button>
      )}

      {open && (
        <div className="fixed inset-x-0 bottom-0 md:inset-auto md:bottom-6 md:right-6 z-50 w-full md:w-[380px] h-[80vh] md:h-[560px] bg-card md:rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden">
          {/* Header */}
          <div className="gradient-sun text-primary-foreground px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={logoPnz}
                alt=""
                width={32}
                height={32}
                className="w-8 h-8 rounded-full bg-background/20 p-0.5"
              />
              <div>
                <p className="font-black text-sm leading-tight flex items-center gap-1">
                  PNZ IA <Sparkles className="h-3 w-3" />
                </p>
                <p className="text-[10px] opacity-90">
                  {isAuthed
                    ? `Restam ${remaining}/${MAX_MESSAGES_PER_SESSION} mensagens`
                    : "Sua guia esperta de Petrolina"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={clearChat}
                aria-label="Limpar conversa"
                title="Limpar conversa"
                className="w-8 h-8 rounded-full hover:bg-background/20 flex items-center justify-center"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setOpen(false)}
                aria-label="Fechar"
                className="w-8 h-8 rounded-full hover:bg-background/20 flex items-center justify-center"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Wall: precisa logar */}
          {!authLoading && !isAuthed ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-8 bg-background">
              <div className="w-16 h-16 rounded-2xl gradient-sun flex items-center justify-center mb-4 shadow-sun">
                <Lock className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="font-display tracking-wide text-2xl mb-2">
                Faça login para usar o assistente
              </h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-xs">
                A PNZ IA é exclusiva para membros do Guia PNZ. É grátis e leva menos de 1 minuto.
              </p>
              <Button
                asChild
                onClick={() => setOpen(false)}
                className="rounded-xl gradient-sun text-primary-foreground border-0 font-bold gap-2 h-11 px-6"
              >
                <Link to="/auth">
                  <LogIn className="h-4 w-4" /> Entrar ou criar conta
                </Link>
              </Button>
            </div>
          ) : (
            <>
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
                    <p className="text-[11px] text-muted-foreground font-semibold px-1">
                      Sugestões:
                    </p>
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        disabled={reachedLimit || cooldownActive || loading}
                        className="block w-full text-left text-xs bg-card border border-border hover:border-primary hover:bg-muted rounded-xl px-3 py-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}

                {reachedLimit && (
                  <div className="text-center text-xs text-muted-foreground bg-muted/50 rounded-xl px-3 py-2">
                    Você atingiu o limite de {MAX_MESSAGES_PER_SESSION} mensagens nesta sessão.
                    Use 🗑️ para começar de novo.
                  </div>
                )}
              </div>

              {/* Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="border-t border-border px-2 pt-2 pb-2 bg-card"
              >
                <div className="flex items-center gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value.slice(0, MAX_MESSAGE_CHARS + 50))}
                    placeholder={
                      reachedLimit
                        ? "Limite atingido nesta sessão"
                        : cooldownActive
                          ? `Aguarde ${Math.ceil(cooldownLeft / 1000)}s…`
                          : "Pergunta algo sobre Petrolina…"
                    }
                    disabled={loading || reachedLimit}
                    maxLength={MAX_MESSAGE_CHARS + 50}
                    className="flex-1 bg-muted rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={
                      loading ||
                      !input.trim() ||
                      inputTooLong ||
                      reachedLimit ||
                      cooldownActive
                    }
                    className="rounded-full gradient-sun text-primary-foreground border-0 shrink-0"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <div className="flex items-center justify-between mt-1.5 px-2 text-[10px]">
                  <span
                    className={
                      inputTooLong ? "text-destructive font-semibold" : "text-muted-foreground"
                    }
                  >
                    {input.length}/{MAX_MESSAGE_CHARS}
                  </span>
                  {cooldownActive && (
                    <span className="text-muted-foreground">
                      ⏱ {Math.ceil(cooldownLeft / 1000)}s
                    </span>
                  )}
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
};

function renderMarkdown(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return <strong key={i}>{p.slice(2, -2)}</strong>;
    }
    return <span key={i}>{p}</span>;
  });
}
