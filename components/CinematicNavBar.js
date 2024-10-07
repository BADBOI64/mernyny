"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
const NavItem = ({ label, href }) => {
  const itemRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!itemRef.current) return;
    const item = itemRef.current;
    const rect = item.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <motion.li
      ref={itemRef}
      className="relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link href={href} passHref>
        <span className="text-gray-300 hover:text-white px-4 py-2 rounded-[1.5px] inline-flex items-center cursor-pointer">
          <span className="mr-1 text-lg leading-none">[</span>
          <span className="mx-1 text-sm">{label}</span>
          <span className="ml-1 text-lg leading-none">]</span>
        </span>
      </Link>
      <div
        style={{
          boxShadow: `
            0 0 8px 1px rgb(228 115 32 / 50%),
            0 0 4px 1px rgb(228 115 32 / 60%) inset,
            0 0 12px 2px rgb(228 115 32 / 30%)
          `,
          border: "1.5px solid rgb(228 115 32)",
          borderRadius: "5px",
          opacity,
          WebkitMaskImage: `radial-gradient(35% 70px at ${position.x}px ${position.y}px, black 45%, transparent)`,
        }}
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-500"
      />
    </motion.li>
  );
};

const CinematicNavBar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-black bg-opacity-50 backdrop-blur-md z-50">
      <div className="container mx-auto px-4 py-4">
        <ul className="flex justify-center space-x-6">
          <NavItem label="PLAYER" href="/" />
          <NavItem label="CASES" href="/cases" />
          <NavItem label="WHO AM I" href="/who-am-i" />
          <NavItem label="COFFEE ?" href="/coffee" />
        </ul>
      </div>
    </nav>
  );
};

export default CinematicNavBar;
