import { useState } from "react";
import { motion } from "framer-motion";

import Header from "./Header";
import Hero from "./Hero";
import FeaturedProducts from "./FeaturedProducts";
import TrendingNow from "./TrendingNow";
import ForYou from "./ForYou";
import TopSelections from "./TopSelections";
import NewArrivals from "./NewArrivals";
import Footer from "./Footer";

const SectionDivider = () => (
  <div className="flex justify-center">
    <span className="w-[100%] h-px bg-stone-300/60" />
  </div>
);

const Homepage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative bg-[#F7F5F2]">
      {/* Page Blur Wrapper */}
      <motion.div
        animate={{
          filter: menuOpen ? "blur(10px)" : "blur(0px)",
          scale: menuOpen ? 0.98 : 1,
        }}
        transition={{
          duration: 0.35,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        <Hero />

        <SectionDivider />
        <FeaturedProducts />

        <SectionDivider />
        <TrendingNow />

        <SectionDivider />
        <ForYou />

        <SectionDivider />
        <TopSelections />

        <SectionDivider />
        <NewArrivals />

        <Footer />
      </motion.div>

      {/* Overlay Header / Mobile Menu */}
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} isOverlay />
    </div>
  );
};

export default Homepage;
