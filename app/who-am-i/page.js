"use client";

import React from "react";
import dynamic from "next/dynamic";
import FullscreenImageSlider from "../../components/FullscreenImageSlider";

const CinematicNavBar = dynamic(
  () => import("../../components/CinematicNavBar"),
  { ssr: false }
);

const WhoAmI = () => {
  return (
    <div className="min-h-screen relative">
      <CinematicNavBar />
      <FullscreenImageSlider />
    </div>
  );
};

export default WhoAmI;
