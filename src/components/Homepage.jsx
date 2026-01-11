import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "./CartContext"; // Use the global state

import Header from "./Header";
import Hero from "./Hero";
import FeaturedProducts from "./FeaturedProducts";
import TrendingNow from "./TrendingNow";
import ForYou from "./ForYou";
import TopSelections from "./TopSelections";
import NewArrivals from "./NewArrivals";
import Footer from "./Footer";
import CartSidebar from "./CartSidebar";

const Section = ({ children, noPadding = false }) => (
  <section className={`max-w-[1440px] mx-auto px-6 md:px-12 ${noPadding ? '' : 'py-16 md:py-28'}`}>
    {children}
  </section>
);

const SectionDivider = () => (
  <div className="max-w-[1440px] mx-auto px-6 md:px-12">
    <div className="w-full h-px bg-stone-300/40" />
  </div>
);

const Homepage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isCartOpen } = useCart(); // Listen to global cart state

  // Prevent scrolling when navigation or cart is active
  useEffect(() => {
    if (menuOpen || isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [menuOpen, isCartOpen]);

  return (
    <div className="relative min-h-screen font-sans antialiased text-stone-900 bg-[#F7F5F2] light">
      
      {/* Header automatically handles cart trigger via Context */}
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* The Sidebar is now managed by the global CartProvider state */}
      <CartSidebar />

      <motion.div
        initial={false}
        animate={{
          filter: (menuOpen || isCartOpen) ? "blur(12px)" : "blur(0px)",
          scale: (menuOpen || isCartOpen) ? 0.98 : 1,
          opacity: (menuOpen || isCartOpen) ? 0.7 : 1,
        }}
        transition={{
          duration: 0.5,
          ease: [0.19, 1, 0.22, 1],
        }}
        className="origin-top will-change-transform"
      >
        <Hero />
        <SectionDivider />
        <Section><FeaturedProducts /></Section>
        <SectionDivider />
        <Section><TrendingNow /></Section>
        <SectionDivider />
        <Section><ForYou /></Section>
        <SectionDivider />
        <Section><TopSelections /></Section>
        <SectionDivider />
        <Section><NewArrivals /></Section>
        <Footer />
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} isOverlay />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Homepage;