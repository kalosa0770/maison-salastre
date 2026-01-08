import React from "react";
import { Instagram, Twitter, Facebook, ArrowRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-stone-50 text-stone-300 py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <h2 className="text-2xl font-dancing text-gray-800 tracking-wide">
                Maison SalAstré
            </h2>
            <p className="text-gray-700 text-xs leading-relaxed tracking-wide font-light italic">
              Timeless pieces, crafted with passion.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-6">
            <h3 className="text-[10px] tracking-[0.4em] uppercase font-bold text-gray-800">Quick Links</h3>
            <ul className="space-y-3 text-xs font-light text-stone-500">
              <li><a href="#" className="hover:text-white transition-colors duration-300">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Shop</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Contact</a></li>
            </ul>
          </div>

          {/* Social Column */}
          <div className="space-y-6">
            <h3 className="text-[10px] tracking-[0.4em] uppercase font-bold text-gray-800">Follow Us</h3>
            <div className="flex gap-5">
              <a href="#" className="text-stone-500 hover:text-white transition-colors"><Instagram className="w-5 h-5 stroke-[1.5px]" /></a>
              <a href="#" className="text-stone-500 hover:text-white transition-colors"><Twitter className="w-5 h-5 stroke-[1.5px]" /></a>
              <a href="#" className="text-stone-500 hover:text-white transition-colors"><Facebook className="w-5 h-5 stroke-[1.5px]" /></a>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-6">
            <h3 className="text-[10px] tracking-[0.4em] uppercase font-bold text-gray-800">Newsletter</h3>
            <p className="text-xs text-stone-500 font-light">Stay updated with our latest arrivals.</p>
            <form className="relative flex items-center border-b border-stone-700 pb-2 focus-within:border-white transition-colors duration-500">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="bg-transparent border-none w-full text-[10px] tracking-widest focus:outline-none text-white placeholder:text-stone-700 uppercase"
              />
              <button type="submit" className="group text-[10px] tracking-widest font-bold text-stone-400 hover:text-white flex items-center gap-2 transition-all">
                SUBSCRIBE <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="pt-10 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[9px] tracking-[0.3em] uppercase text-stone-600">
            © 2026 MAISON SALASTRÉ. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8 text-[9px] tracking-[0.2em] uppercase text-stone-600">
             <a href="#" className="hover:text-stone-400 transition-colors">Privacy</a>
             <a href="#" className="hover:text-stone-400 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;