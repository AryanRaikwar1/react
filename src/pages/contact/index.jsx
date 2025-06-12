import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const FloatingOrbs = () => (
  <>
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className={`absolute rounded-full filter blur-[80px] opacity-20 ${i % 2 === 0 ? 'bg-purple-500' : 'bg-blue-500'
          }`}
        style={{
          width: `${Math.random() * 300 + 200}px`,
          height: `${Math.random() * 300 + 200}px`,
          left: `${Math.random() * 80 + 10}%`,
          top: `${Math.random() * 80 + 10}%`
        }}
        animate={{
          x: [0, Math.random() * 100 - 50],
          y: [0, Math.random() * 100 - 50],
          transition: {
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }
        }}
      />
    ))}
  </>
);

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const formRef = useRef();
  const isInView = useInView(formRef, { once: false, amount: 0.1 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  const fieldVariants = {
    inactive: { scale: 1 },
    active: {
      scale: 1.02,
      transition: { type: 'spring', stiffness: 400 }
    }
  };

  const underlineVariants = {
    inactive: { width: '0%', opacity: 0 },
    active: { width: '100%', opacity: 1 },
    filled: { width: '100%', opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      {/* Background elements */}
      <FloatingOrbs />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(124,58,237,0.1)_0%,_transparent_70%)] opacity-30" />

      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        ref={formRef}
      >
        {/* Header Section */}
        <motion.div
          className="text-center mb-20"
          variants={itemVariants}
        >
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: 1,
              y: 0,
              textShadow: '0 0 15px rgba(167, 139, 250, 0.3)'
            }}
            transition={{ delay: 0.2 }}
          >
            Contact Our Team
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Have questions or want to discuss a project? Reach out and we'll get back to you within 24 hours.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            className="lg:order-2"
            variants={itemVariants}
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  className="backdrop-blur-lg bg-white/5 p-10 rounded-2xl shadow-2xl border border-white/10 relative overflow-hidden"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    boxShadow: '0 20px 25px -5px rgba(74, 222, 128, 0.2)'
                  }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: 'spring', damping: 15 }}
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
                      <svg className="w-20 h-20 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </motion.div>
                    <h3 className="mt-6 text-2xl font-bold text-white">Message Sent!</h3>
                    <p className="mt-3 text-gray-300">We've received your message and will get back to you soon.</p>
                    <motion.button
                      onClick={() => setIsSubmitted(false)}
                      className="mt-8 px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      whileHover={{
                        scale: 1.05,
                        boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.4)'
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Send Another Message
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="backdrop-blur-lg bg-white/5 p-10 rounded-2xl shadow-2xl border border-white/10"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="space-y-8">
                    <motion.div
                      variants={fieldVariants}
                      animate={activeField === 'name' ? 'active' : 'inactive'}
                      onFocus={() => setActiveField('name')}
                      onBlur={() => setActiveField(null)}
                    >
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <input
                          id="name"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-5 py-4 bg-white/10 border border-white/15 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 shadow-sm text-white placeholder-gray-400"
                          placeholder="Enter your name"
                        />
                        <motion.div
                          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                          variants={underlineVariants}
                          initial="inactive"
                          animate={formData.name ? 'filled' : activeField === 'name' ? 'active' : 'inactive'}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      variants={fieldVariants}
                      animate={activeField === 'email' ? 'active' : 'inactive'}
                      onFocus={() => setActiveField('email')}
                      onBlur={() => setActiveField(null)}
                    >
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-5 py-4 bg-white/10 border border-white/15 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm text-white placeholder-gray-400"
                          placeholder="your.email@example.com"
                        />
                        <motion.div
                          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                          variants={underlineVariants}
                          initial="inactive"
                          animate={formData.email ? 'filled' : activeField === 'email' ? 'active' : 'inactive'}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      variants={fieldVariants}
                      animate={activeField === 'message' ? 'active' : 'inactive'}
                      onFocus={() => setActiveField('message')}
                      onBlur={() => setActiveField(null)}
                    >
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                        Your Message
                      </label>
                      <div className="relative">
                        <textarea
                          id="message"
                          name="message"
                          rows="5"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          className="w-full px-5 py-4 bg-white/10 border border-white/15 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 shadow-sm text-white placeholder-gray-400"
                          placeholder="How can we help you?"
                        ></textarea>
                        <motion.div
                          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                          variants={underlineVariants}
                          initial="inactive"
                          animate={formData.message ? 'filled' : activeField === 'message' ? 'active' : 'inactive'}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </motion.div>

                    <motion.button
                      type="submit"
                      className={`w-full py-4 px-6 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 ${isLoading
                          ? 'bg-gray-600 cursor-not-allowed'
                          : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                        }`}
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
                          Send Message
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
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="lg:order-1"
            variants={itemVariants}
          >
            <div className="backdrop-blur-lg bg-white/5 p-10 rounded-2xl shadow-2xl border border-white/10 h-full">
              <motion.h2
                className="text-3xl font-bold text-white mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Our Information
              </motion.h2>

              <div className="space-y-8">
                <motion.div
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                >
                  <div className="flex-shrink-0 p-3 bg-purple-500/10 rounded-lg">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">Location</h3>
                    <p className="mt-1 text-gray-300">123 Tech Street, San Francisco, CA 94107</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 }}
                >
                  <div className="flex-shrink-0 p-3 bg-blue-500/10 rounded-lg">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">Email</h3>
                    <p className="mt-1 text-gray-300">hello@yourcompany.com</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <div className="flex-shrink-0 p-3 bg-indigo-500/10 rounded-lg">
                    <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">Phone</h3>
                    <p className="mt-1 text-gray-300">+1 (555) 123-4567</p>
                  </div>
                </motion.div>

                <motion.div
                  className="pt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                >
                  <h3 className="text-lg font-medium text-white mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    {['twitter', 'facebook', 'linkedin', 'instagram'].map((social) => (
                      <motion.a
                        key={social}
                        href="#"
                        className="w-12 h-12 flex items-center justify-center rounded-xl backdrop-blur-sm bg-white/10 shadow-md hover:shadow-lg transition-all"
                        whileHover={{ y: -5, scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`Follow us on ${social}`}
                      >
                        <span className="sr-only">{social}</span>
                        <div className="w-5 h-5 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactUsPage;