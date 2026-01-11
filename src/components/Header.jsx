import { useState, useEffect } from "react";
import { Menu, X, Search, ShoppingBag, User, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = ({ menuOpen, setMenuOpen, isOverlay }) => {
  const navLinks = [
    "New Arrivals",
    "Trending Now",
    "Featured Products",
    "Top Selections",
    "For You",
  ];

  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation variants for the mobile menu links
  const menuLinkVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 + i * 0.08,
        duration: 0.5,
        ease: [0.19, 1, 0.22, 1],
      },
    }),
  };

  if (isOverlay) {
    return (
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Dark sophisticated backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-[70] lg:hidden"
              onClick={() => setMenuOpen(false)}
            />

            {/* Slide-out Mobile Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-white z-[80] lg:hidden shadow-2xl flex flex-col"
            >
              <div className="flex justify-end p-6">
                <button onClick={() => setMenuOpen(false)} className="p-2">
                  <X className="w-6 h-6 stroke-[1.2px] text-stone-900" />
                </button>
              </div>

              <nav className="flex flex-col px-10 pt-4 gap-8">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link}
                    custom={i}
                    variants={menuLinkVariants}
                    initial="hidden"
                    animate="visible"
                    href="#"
                    className="text-2xl font-light tracking-tight text-stone-900 flex justify-between items-center group"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link}
                    <ArrowRight className="w-5 h-5 opacity-30 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                ))}
              </nav>

              <div className="mt-auto p-10 space-y-8">
                <div className="flex gap-8 border-t border-stone-100 pt-8">
                  <button className="flex items-center gap-2 text-sm uppercase tracking-widest text-stone-500">
                    <User className="w-4 h-4" /> Account
                  </button>
                  <button className="flex items-center gap-2 text-sm uppercase tracking-widest text-stone-500">
                    <ShoppingBag className="w-4 h-4" /> Cart (0)
                  </button>
                </div>
                <p className="text-[10px] text-stone-400 tracking-[0.2em] uppercase">
                  © 2026 Maison Salastre
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  return (
    <header
      className={`w-full fixed top-0 z-[60] transition-all duration-500 ease-in-out ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-between">
        
        {/* Left: Desktop Navigation */}
        <nav className="hidden lg:flex flex-1 items-center gap-10">
          {navLinks.slice(0, 3).map((link) => (
            <a
              key={link}
              href="#"
              className="relative text-[10px] uppercase tracking-[0.25em] text-stone-600 hover:text-black transition-colors duration-300 group"
            >
              {link}
              <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </a>
          ))}
        </nav>

        {/* Center: Branding */}
        <div className="flex-none text-center">
          <a
            href="/"
            className="text-2xl md:text-3xl font-dancing font-extrabold tracking-tight text-stone-900 transition-opacity hover:opacity-70"
          >
            Maison SalAstré
          </a>
        </div>

        {/* Right: Actions */}
        <div className="flex-1 flex items-center justify-end gap-5 md:gap-8">
          {/* Search: Luxury minimal style */}
          <div className="hidden md:flex items-center group cursor-pointer">
            <input
              type="text"
              placeholder="SEARCH"
              className="bg-transparent border-none text-[10px] tracking-widest text-right pr-3 focus:outline-none w-0 group-hover:w-32 focus:w-32 transition-all duration-500 uppercase placeholder:text-stone-400"
            />
            <Search className="w-[18px] h-[18px] stroke-[1.2px] text-stone-700" />
          </div>

          <button className="hidden sm:block text-stone-700 hover:text-black transition-colors">
            <User className="w-[18px] h-[18px] stroke-[1.2px]" />
          </button>

          <button className="relative text-stone-700 hover:text-black transition-colors">
            <ShoppingBag className="w-[18px] h-[18px] stroke-[1.2px]" />
            <span className="absolute -top-2 -right-2 bg-stone-900 text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
              0
            </span>
          </button>

          <button
            className="lg:hidden p-1 text-stone-900"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="w-6 h-6 stroke-[1.2px]" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;