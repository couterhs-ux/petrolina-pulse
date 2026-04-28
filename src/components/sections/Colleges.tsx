import { GraduationCap, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const colleges = [
  { name: "UNIVASF", courses: "Mais de 30 cursos", type: "Pública", image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop", phone: "87999990070" },
  { name: "FACAPE", courses: "Direito, Adm, Contábeis", type: "Privada", image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop", phone: "87999990071" },
  { name: "UPE Petrolina", courses: "Saúde e Engenharia", type: "Pública", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop", phone: "87999990072" },
];

export const Colleges = () => {
  return (
    <section className="py-10 md:py-14 bg-muted/30">
      <div className="container px-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-soft">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black">🎓 Faculdades</h2>
            <p className="text-sm text-muted-foreground">Cursos e instituições de ensino superior</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {colleges.map((c) => (
            <article key={c.name} className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-sun transition-all">
              <div className="relative aspect-video overflow-hidden">
                <img src={c.image} alt={c.name} loading="lazy" className="w-full h-full object-cover" />
                <Badge className="absolute top-3 left-3 bg-background text-foreground border-0">{c.type}</Badge>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{c.name}</h3>
                <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />{c.courses}
                </p>
                <WhatsAppButton phone={c.phone} message={`Olá! Quero saber mais sobre ${c.name}`} className="w-full" label="Falar com a faculdade" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
