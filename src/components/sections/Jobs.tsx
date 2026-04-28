import { Briefcase, MapPin, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { jobs } from "@/data/businesses";

export const Jobs = () => {
  return (
    <section className="py-10 md:py-14 bg-background">
      <div className="container px-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shadow-soft">
            <Briefcase className="h-5 w-5 text-accent-foreground" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black">💼 Empregos em Petrolina</h2>
            <p className="text-sm text-muted-foreground">Vagas locais — candidate-se direto pelo WhatsApp</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {jobs.map((j) => (
            <article key={j.id} className="bg-card rounded-2xl p-4 shadow-card hover:shadow-sun transition-all flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl gradient-sun flex items-center justify-center shrink-0">
                <Briefcase className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-[10px] border-secondary text-secondary">{j.type}</Badge>
                </div>
                <h3 className="font-bold text-base leading-tight mb-1 truncate">{j.name}</h3>
                <p className="text-xs text-muted-foreground mb-1 truncate">{j.company}</p>
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{j.area}</span>
                  <span className="flex items-center gap-1 font-semibold text-foreground"><DollarSign className="h-3 w-3" />{j.salary}</span>
                </div>
              </div>
              <WhatsAppButton phone={j.phone} message={`Olá! Tenho interesse na vaga: ${j.name}`} label="Candidatar" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
