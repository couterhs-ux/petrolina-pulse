import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { ArrowLeft, Loader2, LogIn, Mail, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/context/AuthContext";
import logoPnz from "@/assets/logo-pnz.png";

const emailSchema = z
  .string()
  .trim()
  .email({ message: "E-mail inválido" })
  .max(255, { message: "E-mail muito longo" });

const passwordSchema = z
  .string()
  .min(8, { message: "Mínimo 8 caracteres" })
  .max(72, { message: "Máximo 72 caracteres" });

const nameSchema = z
  .string()
  .trim()
  .min(2, { message: "Nome muito curto" })
  .max(80, { message: "Nome muito longo" });

const Auth = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [submitting, setSubmitting] = useState(false);

  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) navigate("/", { replace: true });
  }, [user, authLoading, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailParsed = emailSchema.safeParse(signinEmail);
    if (!emailParsed.success) return toast.error(emailParsed.error.issues[0].message);
    if (!signinPassword) return toast.error("Informe a senha");

    setSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: emailParsed.data,
      password: signinPassword,
    });
    setSubmitting(false);

    if (error) {
      const msg =
        error.message.toLowerCase().includes("invalid") ||
        error.message.toLowerCase().includes("credentials")
          ? "E-mail ou senha incorretos."
          : error.message;
      return toast.error(msg);
    }
    toast.success("Bem-vindo de volta!");
    navigate("/", { replace: true });
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const nameParsed = nameSchema.safeParse(signupName);
    if (!nameParsed.success) return toast.error(nameParsed.error.issues[0].message);
    const emailParsed = emailSchema.safeParse(signupEmail);
    if (!emailParsed.success) return toast.error(emailParsed.error.issues[0].message);
    const passParsed = passwordSchema.safeParse(signupPassword);
    if (!passParsed.success) return toast.error(passParsed.error.issues[0].message);

    setSubmitting(true);
    const { error } = await supabase.auth.signUp({
      email: emailParsed.data,
      password: passParsed.data,
      options: {
        emailRedirectTo: window.location.origin,
        data: { full_name: nameParsed.data },
      },
    });
    setSubmitting(false);

    if (error) {
      const msg = error.message.toLowerCase().includes("registered")
        ? "Esse e-mail já tem cadastro. Faça login."
        : error.message;
      return toast.error(msg);
    }
    toast.success("Conta criada! Você já pode entrar.");
    setTab("signin");
    setSigninEmail(emailParsed.data);
  };

  const handleGoogle = async () => {
    setSubmitting(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setSubmitting(false);
      return toast.error("Não foi possível entrar com Google.");
    }
    if (result.redirected) return; // browser navigates away
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="container px-4 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <img
            src={logoPnz}
            alt="Guia PNZ"
            width={44}
            height={44}
            className="w-11 h-11 rounded-2xl object-cover bg-white p-0.5 shadow-sun"
          />
          <div>
            <p className="font-display tracking-wide text-2xl leading-none">Guia PNZ</p>
            <p className="text-[11px] text-muted-foreground">Viva Petrolina</p>
          </div>
        </Link>
        <Link
          to="/"
          className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="font-display tracking-wide text-4xl md:text-5xl mb-2">
              Entre no <span className="text-primary">Guia PNZ</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Acesse a PNZ IA, salve seus favoritos e muito mais.
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5 md:p-6 shadow-card">
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogle}
              disabled={submitting}
              className="w-full rounded-xl h-11 font-semibold gap-2 mb-4"
            >
              <GoogleIcon /> Continuar com Google
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">ou com e-mail</span>
              </div>
            </div>

            <Tabs value={tab} onValueChange={(v) => setTab(v as "signin" | "signup")}>
              <TabsList className="grid grid-cols-2 w-full mb-4">
                <TabsTrigger value="signin">Entrar</TabsTrigger>
                <TabsTrigger value="signup">Criar conta</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="signin-email">E-mail</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      autoComplete="email"
                      required
                      value={signinEmail}
                      onChange={(e) => setSigninEmail(e.target.value)}
                      maxLength={255}
                      placeholder="voce@email.com"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="signin-password">Senha</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={signinPassword}
                      onChange={(e) => setSigninPassword(e.target.value)}
                      maxLength={72}
                      placeholder="••••••••"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-11 rounded-xl gradient-sun text-primary-foreground border-0 font-bold gap-2"
                  >
                    {submitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <LogIn className="h-4 w-4" />
                    )}
                    Entrar
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="signup-name">Nome</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      autoComplete="name"
                      required
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      maxLength={80}
                      placeholder="Seu nome"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="signup-email">E-mail</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      autoComplete="email"
                      required
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      maxLength={255}
                      placeholder="voce@email.com"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="signup-password">Senha</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      minLength={8}
                      maxLength={72}
                      placeholder="Mínimo 8 caracteres"
                    />
                    <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <Mail className="h-3 w-3" /> Verificamos sua senha contra vazamentos conhecidos.
                    </p>
                  </div>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-11 rounded-xl gradient-sun text-primary-foreground border-0 font-bold gap-2"
                  >
                    {submitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <UserPlus className="h-4 w-4" />
                    )}
                    Criar conta
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-5">
            Ao continuar, você concorda com nossos termos de uso.
          </p>
        </div>
      </main>
    </div>
  );
};

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
    <path
      fill="#EA4335"
      d="M12 10.2v3.9h5.5c-.2 1.4-1.6 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1S8.7 6 12 6c1.9 0 3.1.8 3.9 1.5l2.6-2.5C16.9 3.5 14.7 2.5 12 2.5 6.8 2.5 2.5 6.8 2.5 12s4.3 9.5 9.5 9.5c5.5 0 9.1-3.9 9.1-9.3 0-.6-.1-1.1-.2-1.5H12z"
    />
  </svg>
);

export default Auth;
