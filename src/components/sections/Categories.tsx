import { Utensils, Scissors, Dumbbell, Stethoscope, Wrench, PartyPopper, Flower2, GraduationCap, Briefcase, Home, Bike } from "lucide-react";

const categories = [
  { icon: Utensils, name: "Restaurantes", color: "from-orange-500 to-red-500" },
  { icon: Scissors, name: "Barbearias", color: "from-amber-500 to-orange-600" },
  { icon: Dumbbell, name: "Academias", color: "from-emerald-500 to-teal-600" },
  { icon: Stethoscope, name: "Clínicas", color: "from-sky-500 to-blue-600" },
  { icon: Wrench, name: "Serviços", color: "from-slate-500 to-zinc-700" },
  { icon: PartyPopper, name: "Eventos", color: "from-pink-500 to-fuchsia-600" },
  { icon: Flower2, name: "Floriculturas", color: "from-rose-400 to-pink-500" },
  { icon: GraduationCap, name: "Faculdades", color: "from-indigo-500 to-violet-600" },
  { icon: Briefcase, name: "Empregos", color: "from-yellow-500 to-amber-600" },
  { icon: Home, name: "Imóveis", color: "from-green-500 to-emerald-600" },
  { icon: Bike, name: "Delivery", color: "from-red-500 to-orange-600" },
];

export const Categories = () => {
  return (
    <section className="py-10 md:py-14 bg-background">
      <div className="container px-4">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-black">Explore a cidade</h2>
            <p className="text-sm text-muted-foreground">Tudo o que Petrolina oferece, num clique</p>
          </div>
        </div>

        <div className="flex md:grid md:grid-cols-6 lg:grid-cols-11 gap-4 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.name}
                className="group flex flex-col items-center gap-2 shrink-0 w-20 md:w-auto"
              >
                <div className={`w-16 h-16 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-card group-hover:scale-110 group-active:scale-95 transition-transform`}>
                  <Icon className="h-7 w-7 md:h-6 md:w-6 text-white" />
                </div>
                <span className="text-xs font-semibold text-foreground text-center leading-tight">
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
