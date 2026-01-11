import React from "react";
import { ArrowRight, MoveUpRight } from "lucide-react";

const selections = [
  {
    id: 1,
    title: "The Sculpted Trench",
    subtitle: "Edition 001",
    image:
      "https://images.unsplash.com/photo-1585435465945-bef5a93f8849?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    title: "Minimalist Silk Slip",
    subtitle: "Pure Mulberry",
    image:
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    title: "Pleated Artisan Trousers",
    subtitle: "Hand-Finished",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=80",
  },
];

const TopSelections = () => {
  return (
    <section className="py-28 font-pt-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <header className="max-w-xl mb-24">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-10 h-px bg-stone-300" />
            <span className="text-[10px] tracking-[0.45em] text-stone-400 uppercase font-semibold">
              Curated Collection
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-dancing leading-tight text-stone-900">
            Top Selections
          </h2>
        </header>

        {/* Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-14">
          {/* Primary Feature */}
          <article className="md:col-span-7 group cursor-pointer">
            <div className="relative aspect-[4/5] overflow-hidden bg-stone-100 rounded-t-[20rem]">
              <img
                src={selections[0].image}
                alt={selections[0].title}
                className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute top-8 right-8 w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <MoveUpRight className="w-4 h-4 text-stone-900" />
              </div>
            </div>

            <div className="mt-8 flex items-end justify-between gap-6">
              <div>
                <p className="text-[10px] tracking-[0.35em] uppercase text-stone-400 mb-2">
                  {selections[0].subtitle}
                </p>
                <h3 className="text-2xl font-serif text-stone-900">
                  {selections[0].title}
                </h3>
              </div>

              <button className="text-[10px] uppercase tracking-[0.35em] font-semibold border-b border-stone-900 pb-1 transition-all hover:text-stone-500 hover:border-stone-400">
                Explore
              </button>
            </div>
          </article>

          {/* Secondary Stack */}
          <aside className="md:col-span-5 flex flex-col gap-24 md:pt-28">
            {selections.slice(1).map((item) => (
              <article key={item.id} className="group cursor-pointer">
                <div className="relative aspect-square overflow-hidden bg-stone-100 rounded-t-[20rem] mb-6">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                  />
                </div>
                <p className="text-[9px] tracking-[0.3em] uppercase text-stone-400 mb-2">
                  {item.subtitle}
                </p>
                <h4 className="text-sm font-medium uppercase tracking-wide text-stone-900 group-hover:text-stone-600 transition-colors">
                  {item.title}
                </h4>
              </article>
            ))}

            {/* View All */}
            <div>
              <button className="flex items-center gap-5 group">
                <div className="w-11 h-11 rounded-full border border-stone-300 flex items-center justify-center transition-all duration-500 group-hover:bg-stone-900 group-hover:border-stone-900">
                  <ArrowRight className="w-4 h-4 text-stone-900 group-hover:text-white transition-colors" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.35em] font-semibold text-stone-900">
                  View Full Collection
                </span>
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default TopSelections;
