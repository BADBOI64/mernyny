"use client";

import React from "react";
import DynamicPortfolioPage from "../../components/DynamicPortfolioPage";
import CinematicNavBar from "../../components/CinematicNavBar";

export default function Cases() {
  return (
    <div className="min-h-screen bg-black">
      <CinematicNavBar />
      <DynamicPortfolioPage />
    </div>
  );
}
