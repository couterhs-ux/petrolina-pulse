import { Mail, MessageCircle, Instagram, MapPin } from "lucide-react";
import logoPnz from "@/assets/logo-pnz.png";

const exploreLinks = [
  { label: "Categorias", href: "#categorias" },
  { label: "Eventos", href: "#eventos" },
  { label: "Promoções", href: "#promocoes" },
  { label: "Melhores Avaliados", href: "#melhores" },
];

const businessLinks = [
  { label: "Cadastrar Estabelecimento", href: "/anuncie" },
  { label: "Planos de Anúncio", href: "/anuncie#planos" },
  { label: "Área do Anunciante", href: "/anuncie" },
];

// Ícone TikTok (não disponível no lucide-react)
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.49a8.16 8.16 0 0 0 4.77 1.52V6.59a4.85 4.85 0 0 1-1.84-.1z" />
  </svg>
);

const socials = [
  {
    label: "WhatsApp",
    href: "https://wa.me/5587900000000?text=Ol%C3%A1!%20Vim%20pelo%20Guia%20PNZ",
    Icon: MessageCircle,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/guiapnz",
    Icon: Instagram,
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@guiapnz",
    Icon: TikTokIcon,
  },
  {
    label: "E-mail",
    href: "mailto:contato@guiapnz.com",
    Icon: Mail,
  },
];

export const Footer = () => {
  return (
    <footer className="bg-[hsl(222_35%_7%)] text-white pt-14 pb-24 md:pb-10">
      <div className="container px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/10">
          {/* Coluna 1 - Marca */}
          <div className="lg:pr-8">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logoPnz}
                alt="Guia PNZ"
                width={48}
                height={48}
                className="w-12 h-12 rounded-xl object-cover bg-white p-0.5 shadow-sun"
              />
              <div className="min-w-0">
                <p className="font-display tracking-wide text-2xl leading-none">Guia PNZ</p>
                <p className="text-xs text-white/70 mt-1">Viva Petrolina. Descubra tudo.</p>
              </div>
            </div>
            <p className="text-sm text-white/75 leading-relaxed max-w-sm">
              O hub digital de Petrolina-PE. Restaurantes, eventos, promoções, serviços e tudo o que move o Vale do São Francisco — num só lugar.
            </p>
            <div className="flex items-center gap-2 mt-4 text-xs text-white/60">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              <span>Petrolina, Pernambuco</span>
            </div>
          </div>

          {/* Coluna 2 - Explore */}
          <div className="lg:px-8">
            <p className="font-display tracking-wide text-xl mb-4 text-primary">Explore</p>
            <ul className="space-y-3 text-sm">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/75 hover:text-white hover:underline underline-offset-4 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3 - Para Negócios */}
          <div className="lg:px-8">
            <p className="font-display tracking-wide text-xl mb-4 text-primary">Para Negócios</p>
            <ul className="space-y-3 text-sm">
              {businessLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/75 hover:text-white hover:underline underline-offset-4 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 4 - Contato */}
          <div className="lg:pl-8">
            <p className="font-display tracking-wide text-xl mb-4 text-primary">Contato</p>
            <a
              href="mailto:contato@guiapnz.com"
              className="inline-flex items-center gap-2 text-sm text-white/85 hover:text-white mb-5 break-all"
            >
              <Mail className="h-4 w-4 shrink-0 text-primary" />
              contato@guiapnz.com
            </a>

            <div className="flex flex-wrap gap-2.5">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-primary border border-white/10 hover:border-primary flex items-center justify-center transition-all hover:scale-110"
                >
                  <Icon className="h-4 w-4 text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Rodapé final */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-xs text-white/60">
            © 2026 Guia PNZ. Petrolina, Pernambuco. Todos os direitos reservados.
          </p>
          <p className="text-xs text-white/50">
            Feito com <span className="text-primary">🧡</span> no Vale do São Francisco
          </p>
        </div>
      </div>
    </footer>
  );
};
