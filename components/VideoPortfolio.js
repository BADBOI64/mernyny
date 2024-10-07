"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import CinematicVideoGrid from "./CinematicVideoGrid";
import VideoDetailsSection from "./VideoDetailsSection";
import VideoControls from "./VideoControls";
import moonlight from "../public/videos/Moonlight.mp4";
import Group from "../public/image/Moonlight/group.jpg";
import SduBusiness from "../public/videos/Businessday.mp4";
import Sad from "../public/videos/Sad.mp4";
import SadPic from "../public/image/Sad.png";
import Prod from "../public/image/Prod.png";
const videos = [
  {
    id: 1,
    title: "Green",
    src: Sad,
    thumbnail: SadPic,
    description: "A inside look in the world of business.",
    duration: "1:26",
    date: "2024-10-04",
    category: "Short Film",
    tags: ["Urban", "Cinematic", "Music", "Business"],
    featured: true,
  },
  {
    id: 2,
    title: "Moonlight",
    src: moonlight,
    thumbnail: Group,
    description: "Explore the hidden wonders of teamwork.",
    duration: "1:31",
    date: "2024-04-22",
    category: "Branding",
    tags: ["Team", "Design", "Diffences", "School"],
    featured: true,
  },
  {
    id: 3,
    title: "Production Day",
    src: SduBusiness,
    thumbnail: Prod,
    description: "",
    duration: "2:50",
    date: "2024-10-26",
    category: "Documentary",
    tags: ["Abstract", "Experimental"],
    featured: false,
  },
];

export default function MonochromeVideoPortfolio() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isIdle, setIsIdle] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = () => {
      setIsIdle(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => setIsIdle(true), 3000);
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setLoadingProgress(0);
    let loadingInterval;

    const loadVideo = () => {
      if (videoRef.current) {
        videoRef.current.src = videos[currentVideo].src;
        videoRef.current.load();

        loadingInterval = setInterval(() => {
          setLoadingProgress((prev) => (prev >= 99 ? 99 : prev + 1));
        }, 30);

        videoRef.current.oncanplaythrough = () => {
          clearInterval(loadingInterval);
          setLoadingProgress(100);
          setTimeout(() => {
            setIsLoading(false);
            if (isInitialLoad) {
              videoRef.current
                .play()
                .then(() => {
                  setIsInitialLoad(false);
                  setIsPlaying(true);
                })
                .catch((error) => console.error("Autoplay prevented:", error));
            } else {
              videoRef.current
                .play()
                .then(() => setIsPlaying(true))
                .catch((error) => console.error("Playback prevented:", error));
            }
          }, 500);
        };
      }
    };

    loadVideo();

    return () => {
      if (loadingInterval) {
        clearInterval(loadingInterval);
      }
    };
  }, [currentVideo, isInitialLoad]);

  useEffect(() => {
    const updateProgress = () => {
      if (videoRef.current) {
        const progress =
          (videoRef.current.currentTime / videoRef.current.duration) * 100;
        setProgress(progress);
      }
    };

    const videoElement = videoRef.current;
    videoElement?.addEventListener("timeupdate", updateProgress);

    return () => {
      videoElement?.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  const nextVideo = () => setCurrentVideo((prev) => (prev + 1) % videos.length);
  const prevVideo = () =>
    setCurrentVideo((prev) => (prev - 1 + videos.length) % videos.length);

  const handleProgressBarClick = (clickPosition) => {
    if (videoRef.current) {
      const newTime = clickPosition * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
    }
  };

  const toggleMute = useCallback(() => {
    setIsMuted((prevMuted) => !prevMuted);
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      videoContainerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  }, [isFullscreen]);

  const handleVideoToggle = useCallback(() => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(console.error);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, []);

  const handleVideoDoubleClick = useCallback(
    (event) => {
      event.stopPropagation();
      toggleFullscreen();
    },
    [toggleFullscreen]
  );

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === "Space") {
        event.preventDefault();
        handleVideoToggle();
      } else if (event.key.toLowerCase() === "m") {
        toggleMute();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleVideoToggle, toggleMute]);

  return (
    <div
      className={`bg-black text-white min-h-screen ${
        isIdle ? "cursor-none" : ""
      }`}
    >
      <style jsx global>{`
        .cursor-none * {
          cursor: none !important;
        }
      `}</style>
      <motion.div
        key="showcase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          ref={videoContainerRef}
          className="h-screen relative overflow-hidden"
          onClick={handleVideoToggle}
          onDoubleClick={handleVideoDoubleClick}
        >
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center bg-black z-10"
              >
                <div className="text-center">
                  <div className="mb-2">
                    <span className="inline-flex items-center text-lg font-normal">
                      <span className="mr-1 text-2xl">[</span>
                      LOADING
                      <span className="ml-1 text-2xl">]</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-2xl mr-2">[</span>
                    <div className="w-48 h-1 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-white"
                        initial={{ width: "0%" }}
                        animate={{ width: `${loadingProgress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <span className="text-2xl ml-2">]</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-400">
                    {loadingProgress}%
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main video */}
          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full object-cover cursor-pointer"
            loop
            muted={isMuted}
            playsInline
          />

          {/* Video controls and title overlay */}
          <div
            className={`absolute inset-0 flex flex-col justify-between transition-opacity duration-300 ${
              isIdle ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="p-8 bg-gradient-to-b from-black to-transparent pt-24 flex flex-col items-center">
              <h1
                className="text-6xl font-bold mb-4 text-white inline-flex items-center"
                style={{ fontFamily: '"Arial Black", Arial, sans-serif' }}
              >
                <span className="text-7xl leading-none flex items-center">
                  <span className="mr-2">[</span>
                  <span className="mx-2" style={{ marginTop: "0.1em" }}>
                    KRÜGER
                  </span>
                  <span className="ml-2">]</span>
                </span>
              </h1>
              <h2 className="text-3xl text-gray-300">
                {videos[currentVideo].title}
              </h2>
            </div>
            <VideoControls
              prevVideo={prevVideo}
              nextVideo={nextVideo}
              toggleMute={toggleMute}
              toggleFullscreen={toggleFullscreen}
              togglePlayPause={handleVideoToggle}
              isMuted={isMuted}
              isFullscreen={isFullscreen}
              isPlaying={isPlaying}
              progress={progress}
              handleProgressBarClick={handleProgressBarClick}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <VideoDetailsSection
            key={videos[currentVideo].id}
            video={videos[currentVideo]}
          />
        </AnimatePresence>

        <CinematicVideoGrid videos={videos} setCurrentVideo={setCurrentVideo} />
      </motion.div>
    </div>
  );
}
