import { Instagram, MapPin, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface BusinessLinksProps {
  name: string;
  area?: string;
  instagram?: string;
  website?: string;
  maps?: string;
  className?: string;
}

const buildMapsUrl = (name: string, area?: string) => {
  const q = encodeURIComponent(`${name} ${area ?? ""} Petrolina PE`.trim());
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
};

const buildInstagramUrl = (raw: string) => {
  if (raw.startsWith("http")) return raw;
  const handle = raw.replace(/^@/, "");
  return `https://instagram.com/${handle}`;
};

const linkBase =
  "inline-flex items-center justify-center w-8 h-8 rounded-full transition-all hover:scale-110 shadow-soft";

export const BusinessLinks = ({
  name,
  area,
  instagram,
  website,
  maps,
  className,
}: BusinessLinksProps) => {
  const mapsUrl = maps ?? buildMapsUrl(name, area);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Ver ${name} no Google Maps`}
        title="Ver no Maps"
        className={cn(linkBase, "bg-secondary text-secondary-foreground hover:bg-secondary/90")}
      >
        <MapPin className="h-4 w-4" />
      </a>
      {instagram && (
        <a
          href={buildInstagramUrl(instagram)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Instagram de ${name}`}
          title="Instagram"
          className={cn(
            linkBase,
            "text-white",
          )}
          style={{
            background:
              "linear-gradient(135deg, hsl(330 85% 55%), hsl(18 95% 54%), hsl(44 100% 56%))",
          }}
        >
          <Instagram className="h-4 w-4" />
        </a>
      )}
      {website && (
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Site de ${name}`}
          title="Site oficial"
          className={cn(linkBase, "bg-accent text-accent-foreground hover:bg-accent/90")}
        >
          <Globe className="h-4 w-4" />
        </a>
      )}
    </div>
  );
};
