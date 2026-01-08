import { useState, useEffect } from "react";
import { Menu, X, Search, ShoppingBag, User, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = ({ menuOpen, setMenuOpen, isOverlay }) => {
  const navLinks = [
    "For You",
    "Trending Now",
    "Top Selections",
    "Featured Products",
    "New Arrivals",
  ];

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  // Overlay version for mobile menu + backdrop
  if (isOverlay) {
    return (
      <>
        {/* Backdrop */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-md z-40 lg:hidden"
              onClick={() => setMenuOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 top-[112px] bg-white z-50 lg:hidden"
            >
              <nav className="flex flex-col p-8 gap-8 h-full">
                {navLinks.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-2xl font-serif border-b border-stone-100 pb-4 flex justify-between items-center group"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link}
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}

                <div className="mt-auto pt-10 text-stone-400 text-xs tracking-widest uppercase">
                  © 2026 Maison Salastre
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Desktop + mobile header
  return (
    <header
      className={`w-full fixed top-0 z-[60] transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b shadow-sm"
          : "bg-stone-50/80 backdrop-blur-sm"
      }`}
    >
      {/* Top utility bar */}
      <div className="w-full bg-black text-white text-[10px] uppercase tracking-[0.2em] py-2 text-center font-medium">
        Defining the Architecture of Modern Living
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-1">
          <a
            href="/"
            className="text-2xl font-dancing tracking-wide hover:opacity-70 transition-opacity cursor-pointer"
          >
            Maison SalAstré
          </a>
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="relative text-[11px] uppercase tracking-[0.15em] text-stone-600 hover:text-black transition-colors duration-300 group"
            >
              {link}
              <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>
          ))}
        </nav>

        {/* Right icons */}
        <div className="flex-1 flex items-center justify-end gap-5">
          {/* Search */}
          <div className="hidden sm:flex items-center border-b border-stone-200 focus-within:border-black transition-colors py-1 mr-4">
            <Search className="w-3.5 h-3.5 text-stone-400" />
            <input
              type="text"
              placeholder="SEARCH"
              className="bg-transparent border-none text-[10px] tracking-widest pl-3 focus:outline-none w-24 focus:w-40 transition-all duration-500 uppercase"
            />
          </div>

          {/* User icon */}
          <button className="text-stone-700 hover:text-black transition-colors">
            <User className="w-4 h-4 stroke-[1.5px]" />
          </button>

          {/* Shopping bag */}
          <button className="relative text-stone-700 hover:text-black transition-colors">
            <ShoppingBag className="w-4 h-4 stroke-[1.5px]" />
            <span className="absolute -top-1 -right-1.5 bg-black text-white text-[8px] w-3.5 h-3.5 flex items-center justify-center rounded-full">
              0
            </span>
          </button>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden ml-2 p-1 relative z-[60] text-stone-700 hover:text-black transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="w-5 h-5 stroke-[2px]" />
            ) : (
              <Menu className="w-5 h-5 stroke-[2px]" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
