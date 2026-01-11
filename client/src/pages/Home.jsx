import React from "react";
import Menu from "../componets/Menu";
import Dishes from "../componets/Dishes";
import HeroSection from "../componets/HeroSection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Menu />
      <Dishes />
    </div>
  );
};

export default Home;
