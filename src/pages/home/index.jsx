import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { 
  FiArrowRight, 
  FiTrendingUp, 
  FiPieChart, 
  FiDollarSign, 
  FiShield, 
  FiZap,
  FiAward,
  FiUsers,
  FiBarChart2,
  FiCreditCard,
  FiLock,
  FiGlobe
} from "react-icons/fi";

export default function Homepage() {
  const ref = useRef();
  const { scrollYProgress } = useScroll({ target: ref });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.03]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  const features = [
    {
      icon: <FiTrendingUp className="text-2xl" />,
      title: "Investment Growth",
      desc: "Track your investments and watch them grow with smart insights.",
    },
    {
      icon: <FiPieChart className="text-2xl" />,
      title: "Portfolio Management",
      desc: "Easily manage your assets in a visually rich dashboard.",
    },
    {
      icon: <FiDollarSign className="text-2xl" />,
      title: "Expense Tracker",
      desc: "Stay on top of your monthly expenses and savings.",
    },
    {
      icon: <FiShield className="text-2xl" />,
      title: "Secure Transactions",
      desc: "Bank-level security protects all your financial data.",
    },
    {
      icon: <FiCreditCard className="text-2xl" />,
      title: "Smart Payments",
      desc: "Simplify payments with integrated budgeting tools.",
    },
    {
      icon: <FiGlobe className="text-2xl" />,
      title: "Global Access",
      desc: "Access your financial tools anywhere, anytime.",
    },
  ];

  // Enhanced parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 75]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Testimonials data
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CFO, TechStart Inc.",
      content: "Trackonomy reduced our financial analysis time by 70% while improving accuracy. The AI predictions have been game-changing for our budgeting process.",
      avatar: "👩‍💼"
    },
    {
      name: "Michael Chen",
      role: "Personal Investor",
      content: "I've increased my investment returns by 35% since using Trackonomy's predictive analytics. The automatic rebalancing feature alone is worth the subscription.",
      avatar: "👨‍💼"
    },
    {
      name: "Emily Rodriguez",
      role: "Small Business Owner",
      content: "As someone who dreaded financial planning, Trackonomy made it effortless. The visual forecasts helped me secure a business loan I didn't even know I qualified for.",
      avatar: "👩‍🍳"
    }
  ];

  // Stats data
  const stats = [
    { value: "92%", label: "Prediction Accuracy" },
    { value: "$1.2B", label: "Assets Managed" },
    { value: "10,000+", label: "Satisfied Users" },
    { value: "4.9/5", label: "Average Rating" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-x-hidden transition-colors duration-500">
      {/* Floating gradient decorators */}
      <motion.div 
        className="fixed top-1/4 -left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10"
        style={{ y: y1 }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 10, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="fixed bottom-1/3 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10"
        style={{ y: y2 }}
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -15, 0]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* === HERO SECTION === */}
      <motion.section 
        className="relative h-screen flex items-center justify-center px-6"
        style={{ opacity, scale }}
        ref={ref}
      >
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm mb-6 border border-gray-200 dark:border-gray-700 backdrop-blur-sm"
          >
            <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              🚀 Now with GPT-4 Financial Analysis
            </span>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Banking</span> Meets <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Artificial</span> Intelligence
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Trackonomy combines <span className="font-semibold text-purple-600 dark:text-purple-400">Wall Street-grade algorithms</span> with <span className="font-semibold text-blue-600 dark:text-blue-400">consumer-friendly automation</span> to give you the financial superpowers of a Fortune 500 CFO.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Get Started Free <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 0.3
                }}
              />
            </motion.button>

            <motion.button
              className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-bold shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700 group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="flex items-center gap-2">
                <span>Watch Demo</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </span>
            </motion.button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            className="mt-16 flex flex-wrap justify-center items-center gap-6 opacity-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <FiAward className="text-purple-500" /> Forbes Fintech 50 2023
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <FiUsers className="text-blue-500" /> Trusted by 10K+ users
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <FiLock className="text-green-500" /> Bank-level security
            </div>
          </motion.div>
        </div>

        {/* AI Assistant Floating Bubble */}
        <motion.div 
          className="fixed bottom-8 right-8 w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-xl cursor-pointer border border-gray-200 dark:border-gray-700 z-50"
          animate={{ 
            y: [0, -15, 0],
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
            <FiZap className="text-white text-xl" />
          </div>
        </motion.div>
      </motion.section>

      {/* === STATS SECTION === */}
      <section className="py-16 bg-white dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === AI DASHBOARD SECTION === */}
      <section className="py-28 px-6 bg-white dark:bg-gray-800/50 backdrop-blur-lg relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Enterprise-Grade</span> Financial Intelligence
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              The same AI technology used by hedge funds and Fortune 500 companies, now available to everyone.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-28">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-700/50 dark:to-gray-800/50 p-8 rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20"
            >
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Portfolio Health Analysis</h3>
              <div className="h-72 bg-white dark:bg-gray-800 rounded-xl relative overflow-hidden p-4">
                {/* Animated Graph */}
                <div className="absolute inset-4 flex items-end gap-4">
                  {[30, 60, 45, 80, 55, 70, 40].map((height, i) => (
                    <motion.div
                      key={i}
                      className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg relative"
                      initial={{ height: 0 }}
                      whileInView={{ height: `${height}%` }}
                      viewport={{ once: true }}
                      transition={{ 
                        delay: i * 0.1,
                        type: "spring",
                        damping: 10
                      }}
                    >
                      <div className="absolute -top-6 left-0 right-0 text-center text-xs text-gray-500 dark:text-gray-400">
                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][i]}
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="absolute bottom-4 left-4 right-4 h-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "78%" }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  />
                </div>
              </div>
            </motion.div>

            <div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">AI-Powered Predictions</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
                  Our neural networks analyze market conditions, your spending patterns, and macroeconomic trends to forecast your financial future with unprecedented accuracy.
                </p>
                
                <div className="space-y-6 mb-10">
                  {[
                    { icon: <FiBarChart2 className="text-blue-500 text-xl" />, text: "Real-time market analysis" },
                    { icon: <FiCreditCard className="text-purple-500 text-xl" />, text: "Spending pattern recognition" },
                    { icon: <FiGlobe className="text-indigo-500 text-xl" />, text: "Global economic factor integration" },
                    { icon: <FiShield className="text-green-500 text-xl" />, text: "Risk-adjusted recommendations" },
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      className="flex items-center gap-4"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i }}
                    >
                      <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-700 shadow-sm flex items-center justify-center">
                        {item.icon}
                      </div>
                      <span className="text-gray-700 dark:text-gray-200">{item.text}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold shadow-md flex items-center gap-2 group"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Explore All Features <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </motion.div>
            </div>
          </div>

          {/* Additional Dashboard Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Cash Flow Optimization</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
                  Our algorithms identify hidden patterns in your transactions to suggest optimizations that can save you hundreds per month.
                </p>
                
                <div className="space-y-6 mb-10">
                  {[
                    { icon: "💰", text: "Recurring payment analysis" },
                    { icon: "📈", text: "Subscription optimization" },
                    { icon: "🛒", text: "Spending category balancing" },
                    { icon: "⏱️", text: "Timing optimization for large purchases" },
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      className="flex items-center gap-4"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i }}
                    >
                      <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-700 shadow-sm flex items-center justify-center text-lg">
                        {item.icon}
                      </div>
                      <span className="text-gray-700 dark:text-gray-200">{item.text}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg font-semibold shadow-md flex items-center gap-2 group border border-gray-200 dark:border-gray-700"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  See Cash Flow Analysis <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700/50 dark:to-gray-800/50 p-8 rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 order-2 lg:order-1"
            >
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Cash Flow Visualization</h3>
              <div className="h-72 bg-white dark:bg-gray-800 rounded-xl relative overflow-hidden p-4">
                {/* Circular chart */}
                <div className="absolute inset-4 flex items-center justify-center">
                  {[30, 25, 20, 15, 10].map((size, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full border-[12px] border-opacity-20"
                      style={{
                        width: `${size}%`,
                        height: `${size}%`,
                        borderColor: ['#8B5CF6', '#6366F1', '#EC4899', '#10B981', '#3B82F6'][i]
                      }}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    />
                  ))}
                  <div className="relative z-10 text-center">
                    <div className="text-3xl font-bold text-gray-800 dark:text-white">$4,280</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Monthly Cash Flow</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === FEATURES SECTION === */}
      <section className="py-28 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The Complete <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Financial</span> Toolkit
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              Everything you need to take control of your finances, grow your wealth, and achieve financial freedom.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 relative overflow-hidden group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                onHoverStart={() => setHoveredCard(i)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <div className="w-16 h-16 mb-6 rounded-xl bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{feature.desc}</p>
                <div className="text-sm font-medium text-purple-600 dark:text-purple-400 flex items-center gap-2">
                  Learn more <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </div>
                
                {/* Hover effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 -z-10"
                  animate={{ 
                    opacity: hoveredCard === i ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Glow effect */}
                <motion.div 
                  className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 bg-gradient-to-r from-purple-500/10 to-blue-500/10 -z-20 blur-md transition-opacity"
                  initial={{ scale: 0.9 }}
                />
              </motion.div>
            ))}
          </div>

          {/* Enhanced CTA Card */}
          <motion.div
            className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to transform your financial future?</h3>
              <p className="text-purple-100 mb-8 text-lg">
                Join thousands of users who have already taken control of their finances with Trackonomy.
              </p>
              <motion.button
                className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start Your Free Trial <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.span
                  className="absolute inset-0 bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 0.3
                  }}
                />
              </motion.button>
              <p className="mt-4 text-sm text-purple-200">
                No credit card required • Cancel anytime
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* === TESTIMONIALS SECTION === */}
      <section className="py-28 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Financial</span> Experts
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what industry professionals and our users say.
            </p>
          </motion.div>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {testimonials.map((testimonial, i) => (
                <motion.div
                  key={i}
                  className={`bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border-2 transition-all duration-300 ${activeTestimonial === i ? 'border-purple-500' : 'border-transparent'}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setActiveTestimonial(i)}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="text-3xl">{testimonial.avatar}</div>
                    <div>
                      <div className="font-bold text-gray-800 dark:text-white">{testimonial.name}</div>
                      <div className="text-sm text-purple-600 dark:text-purple-400">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 italic">"{testimonial.content}"</p>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all ${activeTestimonial === i ? 'bg-purple-600 w-6' : 'bg-gray-300 dark:bg-gray-600'}`}
                  onClick={() => setActiveTestimonial(i)}
                  aria-label={`View testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* === CTA SECTION === */}
      <section className="py-32 relative overflow-hidden bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 dark:opacity-5"></div>
          <div className="absolute top-1/2 left-1/2 w-full h-96 -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <motion.div 
          className="max-w-5xl mx-auto text-center relative z-10 px-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring" }}
            className="inline-block px-5 py-3 bg-white dark:bg-gray-800 rounded-full shadow-sm mb-8 border border-gray-200 dark:border-gray-700"
          >
            <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Ready to Transform Your Finances?
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800 dark:text-white">
            Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">10,000+</span> users achieving financial freedom
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Trackonomy members save an average of <span className="font-bold text-blue-600 dark:text-blue-400">$500/month</span> and see <span className="font-bold text-purple-600 dark:text-purple-400">27% higher</span> investment returns in their first year.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              className="px-10 py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold text-lg shadow-xl relative overflow-hidden group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Start Free Trial <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.button>

            <motion.button
              className="px-10 py-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-bold text-lg shadow-md transition-all border border-gray-200 dark:border-gray-700 flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Book Demo</span>
            </motion.button>
          </div>

          <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </motion.div>
      </section>
    </div>
  );
}