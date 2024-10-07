import React, { useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Play,
  Pause,
} from "lucide-react";

const ControlButton = ({ children, onClick }) => (
  <button
    className="relative group transition-transform duration-200 ease-in-out transform hover:scale-110"
    onClick={onClick}
  >
    <span className="relative z-10 flex items-center justify-center w-10 h-10">
      <span className="absolute -left-1 top-1/2 transform -translate-y-1/2 text-white text-2xl font-normal">
        [
      </span>
      {children}
      <span className="absolute -right-1 top-1/2 transform -translate-y-1/2 text-white text-2xl font-normal">
        ]
      </span>
    </span>
  </button>
);

const VideoControls = ({
  prevVideo,
  nextVideo,
  toggleMute,
  toggleFullscreen,
  togglePlayPause,
  isMuted,
  isFullscreen,
  isPlaying,
  progress,
  handleProgressBarClick,
}) => {
  const progressBarRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleProgressClick = (e) => {
    e.stopPropagation(); // Stop the event from bubbling up
    if (progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const clickPosition = (e.clientX - rect.left) / rect.width;
      handleProgressBarClick(clickPosition);
    }
  };

  const handleMouseMove = (e) => {
    if (progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      className="p-4 bg-gradient-to-t from-black to-transparent"
      onClick={(e) => e.stopPropagation()} // Prevent clicks on the controls from reaching the video container
    >
      <div className="flex justify-between items-center mb-2">
        <ControlButton
          onClick={(e) => {
            e.stopPropagation();
            prevVideo();
          }}
        >
          <ChevronLeft size={24} strokeWidth={1.5} className="text-white" />
        </ControlButton>
        <div className="flex space-x-2">
          <ControlButton
            onClick={(e) => {
              e.stopPropagation();
              togglePlayPause();
            }}
          >
            {isPlaying ? (
              <Pause size={24} strokeWidth={1.7} className="text-white" />
            ) : (
              <Play size={24} strokeWidth={1.7} className="text-white" />
            )}
          </ControlButton>
          <ControlButton
            onClick={(e) => {
              e.stopPropagation();
              toggleMute();
            }}
          >
            {isMuted ? (
              <VolumeX size={24} strokeWidth={1.7} className="text-white" />
            ) : (
              <Volume2 size={24} strokeWidth={1.7} className="text-white" />
            )}
          </ControlButton>
          <ControlButton
            onClick={(e) => {
              e.stopPropagation();
              toggleFullscreen();
            }}
          >
            {isFullscreen ? (
              <Minimize size={24} strokeWidth={1.7} className="text-white" />
            ) : (
              <Maximize size={24} strokeWidth={1.7} className="text-white" />
            )}
          </ControlButton>
        </div>
        <ControlButton
          onClick={(e) => {
            e.stopPropagation();
            nextVideo();
          }}
        >
          <ChevronRight size={24} strokeWidth={1.7} className="text-white" />
        </ControlButton>
      </div>
      <div
        ref={progressBarRef}
        className="relative w-full h-12 cursor-pointer"
        onClick={handleProgressClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="absolute top-1/2 -translate-y-1/2 w-full h-1 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-300 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div
          style={{
            boxShadow: `
              0 0 8px 1px rgb(228 115 32 / 50%),
              0 0 4px 1px rgb(228 115 32 / 60%) inset,
              0 0 12px 2px rgb(228 115 32 / 30%)
            `,
            border: "2.5px solid rgb(228 115 32)",
            borderRadius: "6px",
            opacity,
            WebkitMaskImage: `radial-gradient(5% 60px at ${position.x}px ${position.y}px, black 45%, transparent)`,
          }}
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-500"
        />
      </div>
    </div>
  );
};

export default VideoControls;
