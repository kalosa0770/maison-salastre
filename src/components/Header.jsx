import { useState, useEffect } from "react";
import { Menu, X, Search, ShoppingBag, User, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "./CartContext"; 

const Header = ({ menuOpen, setMenuOpen, isOverlay }) => {
  // Access global cart state
  const { cartItems = [], toggleCart } = useCart(); 
  const cartCount = cartItems.length;

  const navLinks = [
    { name: "New Arrivals", id: "new-arrivals" },
    { name: "Trending Now", id: "trending-now" },
    { name: "Featured Products", id: "featured-products" },
    { name: "Top Selections", id: "top-selections" },
    { name: "For You", id: "for-you" },
  ];

  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset for the fixed header height
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setMenuOpen(false);
    }
  };

  if (isOverlay) {
    return (
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-[70] lg:hidden"
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-white z-[80] lg:hidden shadow-2xl flex flex-col"
            >
              <div className="flex justify-end p-6">
                <button onClick={() => setMenuOpen(false)} className="p-2 active:scale-90 transition-transform">
                  <X className="w-6 h-6 stroke-[1.2px] text-stone-900" />
                </button>
              </div>

              <nav className="flex flex-col px-10 pt-4 gap-8">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.id}
                    custom={i}
                    variants={menuLinkVariants}
                    initial="hidden"
                    animate="visible"
                    onClick={() => scrollToSection(link.id)}
                    className="text-2xl font-light tracking-tight text-stone-900 flex justify-between items-center group text-left"
                  >
                    {link.name}
                    <ArrowRight className="w-5 h-5 opacity-30 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                ))}
              </nav>

              <div className="mt-auto p-10 space-y-8">
                <div className="flex gap-8 border-t border-stone-100 pt-8">
                  <button className="flex items-center gap-2 text-sm uppercase tracking-widest text-stone-500 hover:text-stone-900 transition-colors">
                    <User className="w-4 h-4" /> Account
                  </button>
                  <button 
                    onClick={() => { setMenuOpen(false); toggleCart(); }}
                    className="flex items-center gap-2 text-sm uppercase tracking-widest text-stone-500 hover:text-stone-900 transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" /> Cart ({cartCount})
                  </button>
                </div>
                <p className="text-[10px] text-stone-400 tracking-[0.2em] uppercase">
                  © 2026 Maison SalAstré
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
      className={`w-full fixed top-0 z-[60] transition-all duration-700 ease-in-out ${
        scrolled
          ? "bg-white/80 backdrop-blur-lg shadow-sm py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-between">
        
        {/* Left: Desktop Navigation */}
        <nav className="hidden lg:flex flex-1 items-center gap-10">
          {navLinks.slice(0, 3).map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="relative text-[10px] uppercase tracking-[0.25em] text-stone-600 hover:text-black transition-colors duration-300 group font-bold"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </button>
          ))}
        </nav>

        {/* Center: Branding */}
        <div className="flex-none text-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-2xl md:text-3xl font-dancing font-medium tracking-tighter text-stone-900 transition-all hover:opacity-60 active:scale-95"
          >
            Maison SalAstré
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex-1 flex items-center justify-end gap-5 md:gap-8">
          <div className="hidden md:flex items-center group cursor-pointer">
            <input
              type="text"
              placeholder="SEARCH"
              className="bg-transparent border-none text-[10px] tracking-widest text-right pr-3 focus:outline-none w-0 group-hover:w-32 focus:w-32 transition-all duration-500 uppercase placeholder:text-stone-400 font-bold"
            />
            <Search className="w-[18px] h-[18px] stroke-[1.5px] text-stone-700" />
          </div>

          <button className="hidden sm:block text-stone-700 hover:text-black transition-colors">
            <User className="w-[18px] h-[18px] stroke-[1.5px]" />
          </button>

          <button 
            onClick={toggleCart}
            className="relative text-stone-700 hover:text-black transition-all active:scale-90"
          >
            <ShoppingBag className="w-[20px] h-[20px] stroke-[1.5px]" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute -top-2 -right-2 bg-stone-900 text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-lg"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button
            className="lg:hidden p-1 text-stone-900 active:scale-90 transition-transform"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="w-6 h-6 stroke-[1.5px]" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;