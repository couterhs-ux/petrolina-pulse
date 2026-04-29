import { Mail, MessageCircle, Instagram } from "lucide-react";

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

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.49a8.16 8.16 0 0 0 4.77 1.52V6.59a4.85 4.85 0 0 1-1.84-.1z" />
  </svg>
);

const contactLinks = [
  { label: "WhatsApp", href: "https://wa.me/5587900000000?text=Ol%C3%A1!%20Vim%20pelo%20Guia%20PNZ", Icon: MessageCircle },
  { label: "Instagram", href: "https://instagram.com/guiapnz", Icon: Instagram },
  { label: "TikTok", href: "https://tiktok.com/@guiapnz", Icon: TikTokIcon },
  { label: "E-mail", href: "mailto:contato@guiapnz.com", Icon: Mail },
];

const socials = [
  { label: "Instagram", href: "https://instagram.com/guiapnz" },
  { label: "TikTok", href: "https://tiktok.com/@guiapnz" },
  { label: "WhatsApp", href: "https://wa.me/5587900000000" },
];

export const Footer = () => {
  return (
    <footer
      style={{ backgroundColor: "#0f0f0f", borderTop: "1px solid rgba(255,255,255,0.07)" }}
      className="pt-20 pb-24 md:pb-12 reveal"
    >
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-start">
          {/* Logo grande */}
          <div data-reveal-child>
            <a href="/" className="inline-block">
              <span
                className="font-display block leading-[0.85] tracking-tight text-foreground"
                style={{ fontSize: "clamp(4rem, 9vw, 8rem)" }}
              >
                GUIA <span style={{ color: "#FF6B00" }}>PNZ</span>
              </span>
            </a>
            <p className="mt-6 max-w-sm font-light text-sm" style={{ color: "#999" }}>
              O hub digital de Petrolina-PE. Restaurantes, eventos, promoções, serviços
              e tudo o que move o Vale do São Francisco — num só lugar.
            </p>
          </div>

          {/* 3 colunas de links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            <FooterColumn title="Explorar" links={exploreLinks} />
            <FooterColumn title="Negócios" links={businessLinks} />
            <FooterColumn
              title="Contato"
              links={contactLinks.map((l) => ({ label: l.label, href: l.href }))}
              external
            />
          </div>
        </div>

        {/* Rodapé final */}
        <div
          className="mt-16 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <p
            className="font-syne uppercase text-[11px]"
            style={{ letterSpacing: "0.2em", color: "#666" }}
          >
            © 2026 Guia PNZ. Petrolina, Pernambuco.
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-syne uppercase text-[11px] font-semibold transition-colors"
                style={{ letterSpacing: "0.2em", color: "#999" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FF6B00")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#999")}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterColumn = ({
  title,
  links,
  external = false,
}: {
  title: string;
  links: { label: string; href: string }[];
  external?: boolean;
}) => (
  <div data-reveal-child>
    <p
      className="font-syne uppercase text-[11px] font-bold mb-5"
      style={{ letterSpacing: "0.25em", color: "#FF6B00" }}
    >
      {title}
    </p>
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            target={external && link.href.startsWith("http") ? "_blank" : undefined}
            rel={external && link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="font-light text-sm transition-colors"
            style={{ color: "#f0ece4" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#FF6B00")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#f0ece4")}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);
