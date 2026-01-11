import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Header from "./Header";
import Hero from "./Hero";
import FeaturedProducts from "./FeaturedProducts";
import TrendingNow from "./TrendingNow";
import ForYou from "./ForYou";
import TopSelections from "./TopSelections";
import NewArrivals from "./NewArrivals";
import Footer from "./Footer";

/**
 * Professional Spacing Component
 * Ensures every section has the same horizontal constraints
 * and balanced vertical breathing room.
 */
const Section = ({ children, noPadding = false }) => (
  <section className={`max-w-[1440px] mx-auto px-6 md:px-12 ${noPadding ? '' : 'py-16 md:py-28'}`}>
    {children}
  </section>
);

/**
 * Subtle Elegant Divider
 */
const SectionDivider = () => (
  <div className="max-w-[1440px] mx-auto px-6 md:px-12">
    <div className="w-full h-px bg-stone-300/40" />
  </div>
);

const Homepage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Prevent scrolling when the menu is open to maintain the professional "app" feel
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [menuOpen]);

  return (
    <div className="relative bg-[#F7F5F2] min-h-screen font-sans antialiased text-stone-900">
      {/* Standard Header: Remains interactive and sharp. 
          We keep it outside the motion.div so it doesn't blur with the content.
      */}
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <motion.div
        initial={false}
        animate={{
          filter: menuOpen ? "blur(12px)" : "blur(0px)",
          scale: menuOpen ? 0.98 : 1,
          opacity: menuOpen ? 0.7 : 1,
        }}
        transition={{
          duration: 0.5,
          ease: [0.19, 1, 0.22, 1], // Custom "Expo Out" ease for luxury feel
        }}
        className="origin-top will-change-transform"
      >
        {/* Hero often needs full width or custom padding, handled inside component */}
        <Hero />

        <SectionDivider />
        <Section>
          <FeaturedProducts />
        </Section>

        <SectionDivider />
        <Section>
          <TrendingNow />
        </Section>

        <SectionDivider />
        <Section>
          <ForYou />
        </Section>

        <SectionDivider />
        <Section>
          <TopSelections />
        </Section>

        <SectionDivider />
        <Section>
          <NewArrivals />
        </Section>

        <Footer />
      </motion.div>

      {/* Mobile Menu Overlay: 
          If your Header handles the menu internally, this remains as is. 
      */}
      <AnimatePresence>
        {menuOpen && (
          <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} isOverlay />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Homepage;