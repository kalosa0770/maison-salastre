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
const Homepage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative bg-[#FAF3E8]">
      {/* ENTIRE PAGE WRAPPER THAT WILL BLUR */}
      <motion.div
        animate={{
          filter: menuOpen ? "blur(10px)" : "blur(0px)",
          scale: menuOpen ? 0.98 : 1
        }}
        transition={{
          duration: 0.35,
          ease: [0.16, 1, 0.3, 1]
        }}
      >
        {/* Header is included in blur if desired; can separate if you want header to stay sharp */}
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Hero />
        <FeaturedProducts />
        <TrendingNow />
        <ForYou />
        <TopSelections />
        <NewArrivals />
        <Footer />
       
      </motion.div>

      {/* Mobile menu and backdrop are rendered outside the blur wrapper */}
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} isOverlay />
    </div>
  );
};

export default Homepage;
