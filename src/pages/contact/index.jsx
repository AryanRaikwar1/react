// src/components/ContactUs.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Reset submission status after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-center mb-10"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <motion.h2 
            className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Let's Connect
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Drop us a message and we'll get back to you faster than you can say "hello!"
          </motion.p>
        </motion.div>

        <AnimatePresence>
          {isSubmitted ? (
            <motion.div
              key="success"
              className="bg-gradient-to-r from-green-100 to-teal-100 p-8 rounded-3xl shadow-xl border border-green-200"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 10 }}
            >
              <div className="flex flex-col items-center text-center">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 0.8,
                    ease: "easeInOut"
                  }}
                >
                  <svg className="w-20 h-20 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </motion.div>
                <h3 className="mt-4 text-2xl font-bold text-gray-800">Message Sent!</h3>
                <p className="mt-2 text-gray-600">We've received your message and will get back to you soon.</p>
                <motion.button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 px-6 py-2 bg-gradient-to-r from-green-400 to-teal-500 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Another
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border border-white border-opacity-20"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 shadow-sm"
                      placeholder="Your name"
                    />
                    <motion.div 
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"
                      animate={{ 
                        width: formData.name ? '100%' : '0%',
                        opacity: formData.name ? 1 : 0.5
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 shadow-sm"
                      placeholder="your.email@example.com"
                    />
                    <motion.div 
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500"
                      animate={{ 
                        width: formData.email ? '100%' : '0%',
                        opacity: formData.email ? 1 : 0.5
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                  <div className="relative">
                    <textarea
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 shadow-sm"
                      placeholder="What would you like to say?"
                    ></textarea>
                    <motion.div 
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"
                      animate={{ 
                        width: formData.message ? '100%' : '0%',
                        opacity: formData.message ? 1 : 0.5
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <motion.button
                    type="submit"
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 ${isLoading ? 'bg-gray-400' : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'}`}
                    whileHover={!isLoading ? { scale: 1.02 } : {}}
                    whileTap={!isLoading ? { scale: 0.98 } : {}}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="flex justify-center"
                      >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </motion.div>
                    ) : (
                      <span className="flex items-center justify-center">
                        <motion.span 
                          animate={{ 
                            textShadow: ["0 0 8px rgba(255,255,255,0)", "0 0 8px rgba(255,255,255,0.5)", "0 0 8px rgba(255,255,255,0)"],
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                        >
                          Send Message
                        </motion.span>
                        <motion.svg 
                          className="w-5 h-5 ml-2"
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                          animate={{
                            x: [0, 4, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </motion.svg>
                      </span>
                    )}
                  </motion.button>
                </motion.div>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        <motion.div 
          className="flex justify-center mt-12 space-x-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {['twitter', 'facebook', 'linkedin', 'instagram'].map((social) => (
            <motion.a
              key={social}
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition-all"
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="sr-only">{social}</span>
              <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactUs;