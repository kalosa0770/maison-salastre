import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b"
            alt="Fashion Model"
            className="w-full h-full object-cover brightness-20"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="max-w-2xl text-white">
          <h1 className="text-5xl md:text-7xl font-dancing leading-tight mb-6 tracking-tight">
            Discover <br />
            Timeless Pieces
          </h1>

          <p className="text-lg md:text-xl font-light mb-10 max-w-lg leading-relaxed italic">
            Crafted with passion, designed to celebrate your unique style.
          </p>

          <div className="flex flex-col sm:flex-row gap-5">
            <button className="px-8 py-4 bg-white text-black text-xs uppercase tracking-[0.2em] font-medium hover:bg-stone-200 transition-colors duration-300 flex items-center justify-center gap-2 group">
              New Arrivals
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="px-8 py-4 border border-white text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-white/10 transition-all duration-300">
              For You
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
