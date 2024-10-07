import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Calendar, Tag } from 'lucide-react';

const VideoDetailsSection = ({ video }) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="mb-12"
      >
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="text-3xl font-semibold mb-4 text-white"
        >
          {video.title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="text-gray-400 mb-4"
        >
          {video.description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="flex space-x-6 text-gray-500"
        >
          <div className="flex items-center">
            <Clock size={18} className="mr-2" />
            <span>{video.duration}</span>
          </div>
          <div className="flex items-center">
            <Calendar size={18} className="mr-2" />
            <span>{video.date}</span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="mt-4 flex flex-wrap items-center"
        >
          <Tag size={18} className="text-orange-500 mr-2 mb-2" />
          <AnimatePresence>
            {video.tags.map((tag, index) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.15, delay: index * 0.03 }}
                className="bg-orange-900 text-orange-100 px-3 py-1 rounded-full text-sm mr-2 mb-2 hover:bg-orange-800 transition-colors duration-300 border border-orange-500"
              >
                {tag}
              </motion.span>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default VideoDetailsSection;