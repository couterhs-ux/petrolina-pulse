import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/AuthContext";
import { CustomCursor } from "@/components/CustomCursor";
import { useReveal } from "@/hooks/useReveal";
import Index from "./pages/Index.tsx";
import Vaquejada from "./pages/Vaquejada.tsx";
import Anuncie from "./pages/Anuncie.tsx";
import Auth from "./pages/Auth.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const AppShell = ({ children }: { children: React.ReactNode }) => {
  useReveal();
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CustomCursor />
      <BrowserRouter>
        <AuthProvider>
          <AppShell>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/vaquejada" element={<Vaquejada />} />
            <Route path="/anuncie" element={<Anuncie />} />
            <Route path="/auth" element={<Auth />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </AppShell>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
