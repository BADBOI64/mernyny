import React, { useState, useRef } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";

const initialLifePhases = [
  {
    id: "childhood",
    title: "Childhood",
    description: "Growing up in a small town, fascinated by storytelling.",
    image: "/images/childhood.jpg",
    year: "1990-2000",
  },
  {
    id: "first-camera",
    title: "First Camera",
    description: "Got my first camera and started experimenting with visuals.",
    image: "/images/first-camera.jpg",
    year: "2001",
  },
  {
    id: "film-school",
    title: "Film School",
    description: "Studied filmmaking and honed my craft.",
    image: "/images/film-school.jpg",
    year: "2005-2009",
  },
  {
    id: "first-project",
    title: "First Major Project",
    description: "Directed my first feature-length documentary.",
    image: "/images/first-project.jpg",
    year: "2010",
  },
  {
    id: "recognition",
    title: "International Recognition",
    description: "Won awards at international film festivals.",
    image: "/images/awards.jpg",
    year: "2015",
  },
];

const PhaseCard = ({ phase, isActive, onClick }) => (
  <motion.div
    layout
    onClick={onClick}
    className={`cursor-pointer p-4 rounded-lg shadow-md ${
      isActive ? "bg-orange-600 text-white" : "bg-white"
    }`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <h3 className="text-lg font-semibold">{phase.title}</h3>
    <p className="text-sm">{phase.year}</p>
  </motion.div>
);

const PhaseDetail = ({ phase }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-lg overflow-hidden"
  >
    <img
      src={phase.image}
      alt={phase.title}
      className="w-full md:w-1/2 h-64 object-cover"
    />
    <div className="p-6 md:w-1/2">
      <h2 className="text-2xl font-bold mb-2">{phase.title}</h2>
      <p className="text-gray-600 mb-4">{phase.year}</p>
      <p>{phase.description}</p>
    </div>
  </motion.div>
);

export default function ReorderableLifeTimeline() {
  const [lifePhases, setLifePhases] = useState(initialLifePhases);
  const [activePhase, setActivePhase] = useState(lifePhases[0]);

  return (
    <div className="min-h-screen bg-orange-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-orange-800">
          My Life Timeline
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Reorder.Group
              axis="y"
              values={lifePhases}
              onReorder={setLifePhases}
              className="space-y-4"
            >
              {lifePhases.map((phase) => (
                <Reorder.Item key={phase.id} value={phase}>
                  <PhaseCard
                    phase={phase}
                    isActive={activePhase.id === phase.id}
                    onClick={() => setActivePhase(phase)}
                  />
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </div>

          <div className="md:col-span-2">
            <AnimatePresence mode="wait">
              <PhaseDetail key={activePhase.id} phase={activePhase} />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
