import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import Image from "next/image";

const VideoItem = ({ video, index, setCurrentVideo }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <motion.div
      ref={divRef}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative cursor-pointer overflow-hidden rounded-md"
      onClick={() => setCurrentVideo(index)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-full h-64 relative">
        <Image
          src={video.thumbnail}
          alt={video.title}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 rounded-md"></div>
      <div className="absolute bottom-0 left-0 p-4 w-full">
        <div className="flex items-baseline mb-1">
          <span className="text-xs font-semibold mr-2 text-gray-400">
            [{String(index + 1).padStart(2, "0")}]
          </span>
          <h3 className="text-lg font-bold truncate">{video.title}</h3>
        </div>
        <p className="text-sm text-gray-400 uppercase">{video.category}</p>
        <div className="flex items-center text-xs text-gray-500 mt-2">
          <Clock size={12} className="mr-1" />
          <span>{video.duration}</span>
        </div>
      </div>
      <div
        style={{
          boxShadow: `
            0 0 40px 10px rgb(228 115 32 / 80%),
            0 0 20px 5px rgb(228 115 32 / 90%) inset,
            0 0 60px 15px rgb(228 115 32 / 60%),
            0 0 100px 20px rgb(228 115 32 / 40%)
          `,
          border: "4px solid rgb(228 115 32)",
          opacity,
          WebkitMaskImage: `radial-gradient(85% 90px at ${position.x}px ${position.y}px, black 45%, transparent)`,
        }}
        className="pointer-events-none absolute inset-0 z-10 rounded-md transition-opacity duration-500"
      />
    </motion.div>
  );
};

const CinematicVideoGrid = ({ videos, setCurrentVideo }) => {
  return (
    <div className="bg-black text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <VideoItem
              key={video.id}
              video={video}
              index={index}
              setCurrentVideo={setCurrentVideo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CinematicVideoGrid;
