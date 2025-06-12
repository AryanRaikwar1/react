// src/component/Layout.jsx
import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHome, 
  FiUser, 
  FiMail, 
  FiLogIn, 
  FiUserPlus, 
  FiSun, 
  FiMoon,
  FiX,
  FiMenu,
  FiArrowRight,
  FiTwitter,
  FiLinkedin,
  FiGithub,
  FiDollarSign,
  FiTrendingUp,
  FiSliders
} from 'react-icons/fi';
import { AiFillCustomerService } from 'react-icons/ai';
import { FireExtinguisherIcon } from 'lucide-react';
import { FcIcons8Cup } from 'react-icons/fc';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const hoverEffect = {
  scale: 1.03,
  transition: { type: "spring", stiffness: 400, damping: 10 }
};

const tapEffect = {
  scale: 0.97,
};

const LoadingSpinner = ({ darkMode }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex space-x-3">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -15, 0],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2
            }}
            className={`w-4 h-4 rounded-full ${
              darkMode ? 'bg-purple-400' : 'bg-purple-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const Layout = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode');
      if (savedMode !== null) return savedMode === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [isLoading, setIsLoading] = useState(false);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const navItems = [
    { to: '/', text: 'Home', icon: <FiHome /> },
    { to: '/about', text: 'About', icon: <FiUser /> },
    { to: '/contact', text: 'Contact', icon: <FiMail /> },
    { to: '/connect us', text: 'Create Now', icon: <FiLogIn /> },
  ];

  const footerLinks = [
    { title: 'Product', links: ['Features', 'Pricing', 'API'] },
    { title: 'Company', links: ['About', 'Blog', 'Careers'] },
    { title: 'Legal', links: ['Privacy', 'Terms', 'Cookies'] },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="show"
      className={`flex flex-col min-h-screen transition-colors duration-300 ${
        darkMode 
          ? 'bg-gray-900 text-gray-100' 
          : 'bg-gray-50 text-gray-800'
      }`}
    >
      {/* Header */}
      <motion.header
        variants={itemVariants}
        className={`${
          darkMode ? 'bg-gray-800/90 border-gray-700' : 'bg-white/90 border-gray-200'
        } backdrop-blur-sm py-4 shadow-sm sticky top-0 z-50 border-b`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <motion.div whileHover={hoverEffect} whileTap={tapEffect}>
            <Link to="/" className="flex items-center">
              <div className={`p-2 rounded-lg ${
                darkMode ? 'bg-purple-900/30' : 'bg-purple-100'
              }`}>
                <FiDollarSign className={`w-6 h-6 ${
                  darkMode ? 'text-purple-400' : 'text-purple-600'
                }`} />
              </div>
              <h1 className="ml-3 text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Trackonomy
              </h1>
            </Link>
          </motion.div>

          <div className="flex items-center space-x-4">
            <motion.nav
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="hidden md:flex space-x-1"
            >
              {navItems.map((item) => (
                <motion.div key={item.to} variants={itemVariants}>
                  <Link
                    to={item.to}
                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      darkMode 
                        ? 'hover:bg-gray-700/50 hover:text-purple-400' 
                        : 'hover:bg-gray-100 hover:text-purple-600'
                    } ${
                      location.pathname === item.to 
                        ? darkMode 
                          ? 'text-purple-400' 
                          : 'text-purple-600'
                        : ''
                    }`}
                  >
                    <motion.span
                      whileHover={hoverEffect}
                      whileTap={tapEffect}
                      className="flex items-center gap-2"
                    >
                      {item.icon}
                      {item.text}
                    </motion.span>
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            <motion.button
              whileHover={hoverEffect}
              whileTap={tapEffect}
              onClick={toggleDarkMode}
              className="p-2 rounded-full focus:outline-none"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <FiSun className="w-5 h-5 text-yellow-300" />
              ) : (
                <FiMoon className="w-5 h-5 text-gray-600" />
              )}
            </motion.button>

            <motion.button
              className={`hidden md:flex items-center px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium text-sm shadow-lg`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="flex items-center gap-2">
                Sign Up <FiUserPlus />
              </span>
            </motion.button>

            <motion.button
              whileHover={hoverEffect}
              whileTap={tapEffect}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg focus:outline-none"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <FiX className={`w-6 h-6 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`} />
              ) : (
                <FiMenu className={`w-6 h-6 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`} />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`md:hidden overflow-hidden ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col space-y-2">
                {navItems.map((item) => (
                  <motion.div
                    key={item.to}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      to={item.to}
                      className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium ${
                        darkMode 
                          ? 'hover:bg-gray-700/50' 
                          : 'hover:bg-gray-100'
                      } ${
                        location.pathname === item.to
                          ? darkMode
                            ? 'bg-gray-700/50 text-purple-400'
                            : 'bg-gray-100 text-purple-600'
                          : ''
                      }`}
                    >
                      {item.icon}
                      <span className="ml-3">{item.text}</span>
                    </Link>
                  </motion.div>
                ))}
                <motion.button
                  className={`px-4 py-3 mt-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium flex items-center justify-center gap-2`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Get Started <FiArrowRight />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Main content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-grow"
      >
        {isLoading ? (
          <LoadingSpinner darkMode={darkMode} />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        )}
      </motion.main>

      {/* Enhanced Footer */}
      <motion.footer
        variants={itemVariants}
        className={`${
          darkMode ? 'bg-gray-800/90 border-gray-700' : 'bg-white/90 border-gray-200'
        } backdrop-blur-sm border-t`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Brand Info */}
            <div className="space-y-4">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${
                  darkMode ? 'bg-purple-900/30' : 'bg-purple-100'
                }`}>
                  <FiTrendingUp className={`w-6 h-6 ${
                    darkMode ? 'text-purple-400' : 'text-purple-600'
                  }`} />
                </div>
                <h2 className="ml-3 text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Trackonomy
                </h2>
              </div>
              <p className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Empowering your financial journey with smart tools and insights.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: <FiTwitter />, color: 'text-blue-400' },
                  { icon: <FiLinkedin />, color: 'text-blue-500' },
                  { icon: <FiGithub />, color: darkMode ? 'text-gray-300' : 'text-gray-600' }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className={`text-xl ${social.color}`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {footerLinks.map((section) => (
              <div key={section.title} className="space-y-4">
                <h3 className={`text-sm font-semibold uppercase tracking-wider ${
                  darkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <motion.li key={link} whileHover={{ x: 5 }}>
                      <a
                        href="#"
                        className={`text-sm ${
                          darkMode 
                            ? 'text-gray-400 hover:text-purple-400' 
                            : 'text-gray-500 hover:text-purple-600'
                        } transition-colors`}
                      >
                        {link}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Newsletter */}
            <div className="space-y-4">
              <h3 className={`text-sm font-semibold uppercase tracking-wider ${
                darkMode ? 'text-gray-300' : 'text-gray-500'
              }`}>
                Newsletter
              </h3>
              <p className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Subscribe to get financial tips and updates.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className={`flex-grow px-4 py-2 rounded-l-lg text-sm border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
                <motion.button
                  className={`px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-r-lg text-sm font-medium`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className={`mt-12 pt-8 border-t ${
            darkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                © {new Date().getFullYear()} Trackonomy. All rights reserved.
              </p>
              
              <motion.div 
                whileInView={{ scale: 1 }}
                transition={{ type: "spring" }}
                className="mt-4 md:mt-0 inline-block px-5 py-3 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-200 dark:border-gray-700"
              >
                
              </motion.div>
            </div>
          </div>
        </div>
      </motion.footer>
    </motion.div>
  );
};

export default Layout;