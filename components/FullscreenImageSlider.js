"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";

import ImgMoerk from "../public/image/moerk.jpg";
import Chopper from "../public/videos/Chopper.mov";
import EmilDark from "../public/image/emil-dark-portrait.jpg";
import Classic from "../public/image/Classic.jpg";
import HF from "../public/image/HF.jpg";

const images = [
  {
    id: 1,
    type: "image",
    src: EmilDark,
    alt: "Person seated in dark lighting",
    caption: "Business Owner",
    category: ["2023-NOW", "RATZ", "VIDEO-PRODUCTION", "MUSIC-PRODUCTION"],
    text: "Taking on the challenge of running a business has taught me resilience, creativity, and leadership in both video and music production. This journey has expanded my expertise and sharpened my ability to innovate in a dynamic industry.",
    textColor: "white",
  },
  {
    id: 2,
    type: "video",
    src: Chopper,
    alt: "Video of a chopper with the gunner",
    caption: "Military veteran",
    category: ["2020-2023", "DEPLOYED", "IRAQ", "MACHINE-GUNNER"],
    text: "I spent three years in the army as a light infantry soldier, which eventually led to the opportunity to deploy to Iraq. After completing my service, I decided to pursue new ambitions and chase other dreams.",
    textColor: "white",
  },
  {
    id: 3,
    type: "image",
    src: Classic,
    alt: "Person working on a laptop",
    caption: "Exploring the Classic",
    category: ["DOUBLE-BASS", "MAGICAL", "CINEMATIC"],
    text: "Playing double bass in an orchestra provides a strong foundation for the music, adding depth and richness to the sound. It requires precision, rhythm, and close coordination with the rest of the ensemble, making it a crucial part of the orchestra’s harmony.",
    textColor: "white",
  },
  {
    id: 4,
    type: "image",
    src: ImgMoerk,
    alt: "working on a laptop",
    caption: "Childcare Assistant",
    category: ["FUN", "EXPERIENCE", "DEVELOPMENT"],
    text: "As a childcare assistant, I gained hands-on experience in supporting children's learning and development. I helped foster a safe, engaging environment by assisting with daily routines, organizing activities, and encouraging positive social interactions. This role strengthened my ability to communicate with both children and parents while honing my organizational and problem-solving skills.",
    textColor: "white",
  },
  {
    id: 5,
    type: "image",
    src: HF,
    alt: "a band playing on a stage",
    caption: "HF",
    category: ["MUSIC", "CHILL", "FUN"],
    text: "HF (Higher Preparatory Examination) is a two-year program in Denmark that prepares students for higher education. It offers a flexible curriculum with various subjects, emphasizing practical knowledge and personal development in a supportive environment.",
    textColor: "white",
  },
];
function useParallax(value, distance) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function ImageSection({ image, isActive }) {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isVerticalVideo, setIsVerticalVideo] = useState(false);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useSpring(useParallax(scrollYProgress, 300), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (image.type === "video" && videoRef.current) {
      setIsLoading(true);
      setLoadingProgress(0);
      let loadingInterval;

      const loadVideo = () => {
        videoRef.current.src = image.src;
        videoRef.current.load();

        loadingInterval = setInterval(() => {
          setLoadingProgress((prev) => (prev >= 99 ? 99 : prev + 1));
        }, 30);

        videoRef.current.oncanplaythrough = () => {
          clearInterval(loadingInterval);
          setLoadingProgress(100);
          setTimeout(() => {
            setIsLoading(false);
            setIsVideoReady(true);
            setIsVerticalVideo(
              videoRef.current.videoHeight > videoRef.current.videoWidth
            );
          }, 500);
        };
      };

      loadVideo();

      return () => {
        if (loadingInterval) {
          clearInterval(loadingInterval);
        }
      };
    }
  }, [image]);

  useEffect(() => {
    if (isActive && isVideoReady && videoRef.current) {
      videoRef.current
        .play()
        .catch((error) => console.log("Video play error:", error));
    } else if (!isActive && isVideoReady && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isActive, isVideoReady]);

  return (
    <section ref={ref} className="h-screen relative overflow-hidden snap-start">
      <div className="w-full h-full">
        {image.type === "video" ? (
          <>
            <video
              ref={videoRef}
              src={image.src}
              className={`w-full h-full ${
                isVerticalVideo ? "object-contain" : "object-cover"
              }`}
              muted
              loop
              playsInline
            />
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
          </>
        ) : (
          <Image
            src={image.src}
            alt={image.alt}
            layout="fill"
            objectFit="cover"
            priority
          />
        )}
      </div>
      <motion.div
        className="absolute bottom-0 left-0 w-full p-4 sm:p-6 md:p-10"
        style={{ y }}
      >
        <div className="max-w-2xl">
          <motion.div
            className="p-4 sm:p-6 bg-black bg-opacity-75 rounded-lg"
            style={{ color: image.textColor }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <span
              className="rounded-[1.5px] inline-flex items-center mb-2"
              style={{ color: image.textColor }}
            >
              <span className="mr-1 text-base sm:text-lg leading-none">[</span>
              <span className="mx-1 text-base sm:text-lg leading-none">
                00{image.id}
              </span>
              <span className="ml-1 text-base sm:text-lg leading-none">]</span>
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
              {image.caption}
            </h2>
            <div className="mb-2 flex flex-wrap">
              {image.category.map((cat, index) => (
                <span
                  key={index}
                  className="rounded-[1.5px] inline-flex items-center mr-2 mb-2"
                  style={{ color: image.textColor }}
                >
                  <span className="mr-1 text-xs sm:text-sm leading-none">
                    [
                  </span>
                  <span className="mx-1 text-xs sm:text-sm leading-none uppercase">
                    {cat}
                  </span>
                  <span className="ml-1 text-xs sm:text-sm leading-none">
                    ]
                  </span>
                </span>
              ))}
            </div>
            <p
              className="text-sm sm:text-base md:text-lg max-w-md mb-2"
              style={{ color: image.textColor }}
            >
              {image.text}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

const FullscreenImageSlider = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.style.scrollSnapType = "y mandatory";
      container.style.scrollBehavior = "smooth";

      const handleScroll = () => {
        const index = Math.round(container.scrollTop / window.innerHeight);
        setActiveIndex(index);
      };

      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-black h-screen overflow-y-scroll scrollbar-hide"
    >
      {images.map((image, index) => (
        <ImageSection
          key={image.id}
          image={image}
          isActive={index === activeIndex}
        />
      ))}
    </div>
  );
};

export default FullscreenImageSlider;
