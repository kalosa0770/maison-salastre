import React from "react";
import { Instagram, Twitter, Facebook, ArrowRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-stone-50 text-stone-900 py-20 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 pb-20">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <h2 className="text-2xl font-serif tracking-tight text-stone-900">
              Maison <span className="italic font-light">SalAstré</span>
            </h2>
            <p className="text-stone-500 text-[11px] leading-relaxed tracking-[0.1em] font-light uppercase max-w-[200px]">
              Timeless pieces, crafted for the discerning eye.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-8">
            <h3 className="text-[10px] tracking-[0.4em] uppercase font-bold text-stone-900">Shop & Info</h3>
            <ul className="space-y-4 text-[11px] uppercase tracking-widest font-medium text-stone-500">
              <li><a href="#" className="hover:text-black transition-colors duration-300">About the Maison</a></li>
              <li><a href="#" className="hover:text-black transition-colors duration-300">Collections</a></li>
              <li><a href="#" className="hover:text-black transition-colors duration-300">Sustainability</a></li>
              <li><a href="#" className="hover:text-black transition-colors duration-300">Contact</a></li>
            </ul>
          </div>

          {/* Social Column */}
          <div className="space-y-8">
            <h3 className="text-[10px] tracking-[0.4em] uppercase font-bold text-stone-900">Follow</h3>
            <div className="flex gap-6">
              <a href="#" className="text-stone-400 hover:text-black transition-all transform hover:-translate-y-1">
                <Instagram className="w-5 h-5 stroke-[1.2px]" />
              </a>
              <a href="#" className="text-stone-400 hover:text-black transition-all transform hover:-translate-y-1">
                <Twitter className="w-5 h-5 stroke-[1.2px]" />
              </a>
              <a href="#" className="text-stone-400 hover:text-black transition-all transform hover:-translate-y-1">
                <Facebook className="w-5 h-5 stroke-[1.2px]" />
              </a>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-8">
            <h3 className="text-[10px] tracking-[0.4em] uppercase font-bold text-stone-900">Journal</h3>
            <p className="text-[11px] text-stone-500 font-light leading-relaxed">
              Subscribe to receive updates on new arrivals and seasonal private sales.
            </p>
            <form className="relative flex items-center border-b border-stone-300 pb-3 focus-within:border-black transition-colors duration-500">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="bg-transparent border-none w-full text-[10px] tracking-widest focus:outline-none text-stone-900 placeholder:text-stone-300 uppercase"
              />
              <button type="submit" className="group text-stone-400 hover:text-black transition-all">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="pt-10 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] tracking-[0.3em] uppercase text-stone-400">
            © 2026 MAISON SALASTRÉ. 
          </p>
          
          <div className="flex gap-10 text-[9px] tracking-[0.2em] uppercase text-stone-400">
             <a href="#" className="hover:text-black transition-colors">Shipping</a>
             <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;