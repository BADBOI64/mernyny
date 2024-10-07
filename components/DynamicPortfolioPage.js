import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, X, ChevronLeft, ChevronRight } from "lucide-react";

const PortfolioItem = ({ item, index, onClick }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative cursor-pointer overflow-hidden rounded-md"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
    >
      <img
        src={item.thumbnail}
        alt={item.title}
        className="w-full h-64 object-cover rounded-md"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 rounded-md"></div>
      <div className="absolute bottom-0 left-0 p-4 w-full">
        <div className="flex items-baseline mb-1">
          <span className="text-xs font-semibold mr-2 ">
            [{String(index + 1).padStart(2, "0")}]
          </span>
          <h3 className="text-lg font-bold truncate text-white">
            {item.title}
          </h3>
        </div>
        <p className="text-sm  uppercase">{item.category}</p>
        <div className="flex items-center text-xs text-gray-400 mt-2">
          <Clock size={12} className="mr-1" />
          <span>{item.date}</span>
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

const JournalView = ({ item, onClose, onPrev, onNext }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-95 overflow-y-auto z-50"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <button onClick={onPrev} className=" ">
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-4xl font-bold text-center text-white">
            {item.title}
          </h2>
          <button onClick={onNext} className=" ">
            <ChevronRight size={24} />
          </button>
        </div>
        <button
          onClick={onClose}
          className="fixed top-4 right-4 text-black bg-white rounded-full p-2"
        >
          <X size={24} />
        </button>

        <div className="max-w-4xl mx-auto">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-96 object-cover rounded-lg mb-8"
          />

          <div className="prose prose-lg prose-invert mx-auto">
            <p className="text-xl mb-6 text-gray-300">{item.description}</p>

            <h3 className="text-2xl font-semibold mb-4 ">Project Details</h3>
            <p className="text-gray-300">{item.details}</p>

            <div className="my-8 grid grid-cols-2 gap-4">
              <img
                src={item.image2}
                alt="Detail 1"
                className="w-full h-64 object-cover rounded-lg"
              />
              <img
                src={item.image3}
                alt="Detail 2"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>

            <h3 className="text-2xl font-semibold mb-4 ">
              Challenges and Solutions
            </h3>
            <p className="text-gray-300">{item.challenges}</p>

            <h3 className="text-2xl font-semibold mb-4 ">Outcomes</h3>
            <p className="text-gray-300">{item.outcomes}</p>

            <div className="mt-8">
              <h4 className="text-xl font-semibold mb-2 ">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-800  px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-between items-center text-gray-400">
              <span className="">{item.category}</span>
              <span>{item.date}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const DynamicPortfolioPage = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  // Example portfolio items
  const portfolioItems = [
    {
      id: 1,
      title: "Project Alpha",
      category: "Web Development",
      date: "2023-05-15",
      thumbnail: "/path/to/thumbnail1.jpg",
      image: "/path/to/image1.jpg",
      image2: "/path/to/detail1.jpg",
      image3: "/path/to/detail2.jpg",
      description:
        "A responsive web application built with React and Node.js, featuring real-time data updates and a sleek user interface.",
      details:
        "Project Alpha was conceived as a solution to streamline data visualization for a major tech company. The goal was to create a dashboard that could handle large amounts of real-time data while maintaining a smooth and intuitive user experience.",
      challenges:
        "One of the main challenges we faced was optimizing the application to handle frequent updates without compromising performance. We implemented efficient state management using Redux and utilized WebSockets for real-time communication.",
      outcomes:
        "The final product exceeded client expectations, reducing data processing time by 40% and increasing user engagement by 25%. The intuitive interface received praise from both the client and end-users, setting a new standard for data visualization in their industry.",
      tags: ["React", "Node.js", "MongoDB", "Redux", "WebSockets", "D3.js"],
    },
    {
      id: 1,
      title: "Project Alpha",
      category: "Web Development",
      date: "2023-05-15",
      thumbnail: "/path/to/thumbnail1.jpg",
      image: "/path/to/image1.jpg",
      image2: "/path/to/detail1.jpg",
      image3: "/path/to/detail2.jpg",
      description:
        "A responsive web application built with React and Node.js, featuring real-time data updates and a sleek user interface.",
      details:
        "Project Alpha was conceived as a solution to streamline data visualization for a major tech company. The goal was to create a dashboard that could handle large amounts of real-time data while maintaining a smooth and intuitive user experience.",
      challenges:
        "One of the main challenges we faced was optimizing the application to handle frequent updates without compromising performance. We implemented efficient state management using Redux and utilized WebSockets for real-time communication.",
      outcomes:
        "The final product exceeded client expectations, reducing data processing time by 40% and increasing user engagement by 25%. The intuitive interface received praise from both the client and end-users, setting a new standard for data visualization in their industry.",
      tags: ["React", "Node.js", "MongoDB", "Redux", "WebSockets", "D3.js"],
    },
    {
      id: 1,
      title: "Project Alpha",
      category: "Web Development",
      date: "2023-05-15",
      thumbnail: "/path/to/thumbnail1.jpg",
      image: "/path/to/image1.jpg",
      image2: "/path/to/detail1.jpg",
      image3: "/path/to/detail2.jpg",
      description:
        "A responsive web application built with React and Node.js, featuring real-time data updates and a sleek user interface.",
      details:
        "Project Alpha was conceived as a solution to streamline data visualization for a major tech company. The goal was to create a dashboard that could handle large amounts of real-time data while maintaining a smooth and intuitive user experience.",
      challenges:
        "One of the main challenges we faced was optimizing the application to handle frequent updates without compromising performance. We implemented efficient state management using Redux and utilized WebSockets for real-time communication.",
      outcomes:
        "The final product exceeded client expectations, reducing data processing time by 40% and increasing user engagement by 25%. The intuitive interface received praise from both the client and end-users, setting a new standard for data visualization in their industry.",
      tags: ["React", "Node.js", "MongoDB", "Redux", "WebSockets", "D3.js"],
    },
    // Add more portfolio items as needed
  ];

  const handlePrev = () => {
    setSelectedItemIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : portfolioItems.length - 1
    );
  };

  const handleNext = () => {
    setSelectedItemIndex((prevIndex) =>
      prevIndex < portfolioItems.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <div className="min-h-screen bg-black text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">
          My Portfolio
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <PortfolioItem
              key={item.id}
              item={item}
              index={index}
              onClick={() => setSelectedItemIndex(index)}
            />
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selectedItemIndex !== null && (
          <JournalView
            item={portfolioItems[selectedItemIndex]}
            onClose={() => setSelectedItemIndex(null)}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default DynamicPortfolioPage;
