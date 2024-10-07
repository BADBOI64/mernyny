"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Send, Mail, Phone, MapPin } from "lucide-react";
import CinematicNavBar from "@/components/CinematicNavBar";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    type: "person",
    name: "",
    email: "",
    message: "",
    businessName: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfoControls = useAnimation();
  const formControls = useAnimation();

  React.useEffect(() => {
    contactInfoControls.start({ opacity: 1, x: 0 });
    formControls.start({ opacity: 1, x: 0 });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulating form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({
      type: "person",
      name: "",
      email: "",
      message: "",
      businessName: "",
    });

    // Reset submission status after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const ContactInfo = ({ icon: Icon, text }) => (
    <div className="flex items-center mb-4">
      <Icon size={24} className="text-orange-500 mr-4" />
      <span className="text-gray-300">{text}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white py-24 px-4">
      <CinematicNavBar />
      <div className="container mx-auto max-w-4xl">
        <motion.h1
          className="text-6xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-7xl leading-none flex items-center justify-center">
            <span className="mr-2">[</span>
            <span className="mx-2" style={{ marginTop: "0.1em" }}>
              CONTACT
            </span>
            <span className="ml-2">]</span>
          </span>
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={contactInfoControls}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-semibold mb-6">Get in touch</h2>
            <ContactInfo icon={Mail} text="hello@krugervideo.com" />
            <ContactInfo icon={Phone} text="+1 (555) 123-4567" />
            <ContactInfo
              icon={MapPin}
              text="123 Video St, Cinematic City, CV 90210"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={formControls}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-400 mb-2">[ TYPE ]</label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      value="person"
                      checked={formData.type === "person"}
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <span
                      className={`w-4 h-4 inline-block mr-2 rounded-full border border-gray-500 ${
                        formData.type === "person" ? "bg-orange-500" : ""
                      }`}
                    ></span>
                    Person
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      value="business"
                      checked={formData.type === "business"}
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <span
                      className={`w-4 h-4 inline-block mr-2 rounded-full border border-gray-500 ${
                        formData.type === "business" ? "bg-orange-500" : ""
                      }`}
                    ></span>
                    Business
                  </label>
                </div>
              </div>
              {formData.type === "business" && (
                <div className="mb-4">
                  <label
                    htmlFor="businessName"
                    className="block text-gray-400 mb-2"
                  >
                    [ BUSINESS NAME ]
                  </label>
                  <div className="flex items-center">
                    <span className="text-2xl text-white mr-2">[</span>
                    <input
                      type="text"
                      id="businessName"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-gray-700 py-2 px-1 text-white focus:outline-none focus:border-orange-500"
                      required
                    />
                    <span className="text-2xl text-white ml-2">]</span>
                  </div>
                </div>
              )}
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-400 mb-2">
                  [ NAME ]
                </label>
                <div className="flex items-center">
                  <span className="text-2xl text-white mr-2">[</span>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b border-gray-700 py-2 px-1 text-white focus:outline-none focus:border-orange-500"
                    required
                  />
                  <span className="text-2xl text-white ml-2">]</span>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-400 mb-2">
                  [ EMAIL ]
                </label>
                <div className="flex items-center">
                  <span className="text-2xl text-white mr-2">[</span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b border-gray-700 py-2 px-1 text-white focus:outline-none focus:border-orange-500"
                    required
                  />
                  <span className="text-2xl text-white ml-2">]</span>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-400 mb-2">
                  [ MESSAGE ]
                </label>
                <div className="flex items-center">
                  <span className="text-2xl text-white mr-2">[</span>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full bg-transparent border-b border-gray-700 py-2 px-1 text-white focus:outline-none focus:border-orange-500"
                    required
                  ></textarea>
                  <span className="text-2xl text-white ml-2">]</span>
                </div>
              </div>
              <motion.button
                type="submit"
                className="bg-white text-black py-2 px-6 rounded-none hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSubmitting}
              >
                <span className="text-2xl mr-2">[</span>
                {isSubmitting ? (
                  <span className="animate-pulse">Sending...</span>
                ) : (
                  <>
                    <Send size={18} className="mr-2" />
                    Send Message
                  </>
                )}
                <span className="text-2xl ml-2">]</span>
              </motion.button>
            </form>
          </motion.div>
        </div>

        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              className="fixed bottom-8 right-8 bg-green-500 text-white py-2 px-4 rounded-md shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
            >
              Message sent successfully!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ContactPage;
