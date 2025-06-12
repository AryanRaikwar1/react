import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

export default function AboutPage() {
  const ref = useRef();
  const { scrollYProgress } = useScroll({ target: ref });
  const [hoveredTeam, setHoveredTeam] = useState(null);
  const [activeValue, setActiveValue] = useState(null);
  const [showMoreStats, setShowMoreStats] = useState(false);

  // Enhanced animated background gradient
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.8], [0.1, 0.6]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  // Section entrance variants
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50/50 to-purple-50/50 overflow-hidden relative">
      {/* === ENHANCED DYNAMIC GRADIENT BACKGROUND === */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(at 71% 77%, hsla(271, 81%, 60%, 0.15), transparent 70%),
            radial-gradient(at 29% 36%, hsla(217, 91%, 60%, 0.15), transparent 70%)
          `,
          opacity: backgroundOpacity,
          scale: backgroundScale
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      />

      {/* Glassmorphism overlay */}
      <div className="fixed inset-0 backdrop-blur-[100px] opacity-30 pointer-events-none" />

      {/* === HERO SECTION === */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center px-6 py-20"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 mb-6">
              <motion.span 
                className="text-2xl mr-2"
                animate={{ rotate: [0, 20, -20, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              >
                🚀
              </motion.span>
              <span className="font-medium text-purple-600">About Trackonomy</span>
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Keep It Tracked. Keep It Smart.
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10"
            variants={itemVariants}
          >
            In a world where money moves faster than ever — Trackonomy gives you the clarity to slow down, zoom out, and own your financial story.
          </motion.p>
          
          <motion.div variants={itemVariants}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Start Your Journey
              <motion.span 
                className="inline-block ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>
          </motion.div>
          
          {/* Floating financial elements */}
          <motion.div 
            className="absolute -bottom-20 left-1/4 text-4xl opacity-20"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            💰
          </motion.div>
          <motion.div 
            className="absolute top-20 right-1/4 text-5xl opacity-20"
            animate={{
              y: [0, 15, 0],
              rotate: [0, -15, 15, 0]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          >
            📈
          </motion.div>
        </div>
      </motion.section>

      {/* === MISSION SECTION === */}
      <section className="relative py-20 px-6 bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="flex flex-col md:flex-row gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true }}
          >
            <motion.div className="md:w-1/2" variants={itemVariants}>
              <div className="p-1 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 inline-block mb-6">
                <div className="bg-white p-4 rounded-xl text-4xl">
                  🎯
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-lg text-gray-600">
                To break the myth that finance has to be complicated. We build tools that think ahead, help you spend intentionally, and give you the power to grow your money without the spreadsheets, the stress, or the second-guessing.
              </p>
            </motion.div>
            
            <motion.div className="md:w-1/2" variants={itemVariants}>
              <div className="p-1 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 inline-block mb-6">
                <div className="bg-white p-4 rounded-xl text-4xl">
                  🌟
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-lg text-gray-600">
                To become the most trusted digital companion for personal and business finance. By combining predictive AI, clean design, and real-world insights, we're making financial clarity not just possible — but beautiful.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* === DIFFERENTIATORS SECTION === */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            ✨ What Makes Trackonomy Different?
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            We're not just another finance app - we're your financial co-pilot
          </motion.p>
        </div>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-md border border-white/20 hover:shadow-lg transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4">{feature.emoji}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* === ORIGIN STORY SECTION === */}
      <section className="relative py-20 px-6 bg-white/80 backdrop-blur-sm" ref={ref}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="mb-16 text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 mb-6">
                <span className="text-2xl mr-2">💡</span>
                <span className="font-medium text-purple-600">The Origin Story</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">From Dorm Room to Financial Powerhouse</h2>
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 md:p-10 rounded-2xl shadow-inner border border-white relative overflow-hidden"
              variants={itemVariants}
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-purple-200/30 blur-xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-blue-200/30 blur-xl"></div>
              
              <p className="text-lg text-gray-700 relative z-10 mb-6">
                Trackonomy was born out of a university project — but built like a real-world startup. Founded by college students, it started as an idea to track expenses — but quickly evolved into a next-gen financial command center.
              </p>
              
              <p className="text-lg text-gray-700 relative z-10 mb-6">
                We designed it for people like us: <span className="font-medium text-purple-600">Curious. Mobile-first. Financially aware (or trying to be). Tired of boring money apps.</span>
              </p>
              
              <div className="relative z-10 bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="text-2xl mr-2">🔮</span> What's Next?
                </h3>
                <p className="text-gray-600 mb-4">
                  We're building more than just an app. A responsive website, community hub, and feature drops are coming your way. Smarter analytics, smoother UX, and tools that feel like magic — all on the roadmap.
                </p>
                <p className="text-purple-600 font-medium">
                  We're just getting started — and you're invited.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* === FINAL CTA === */}
      <section className="relative py-24 px-6 bg-gradient-to-br from-purple-900 to-blue-900 overflow-hidden">
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-white/10 text-4xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                x: [0, Math.random() * 100 - 50],
                rotate: [0, Math.random() * 360]
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }}
            >
              {['💰', '💳', '📈', '💲', '💱'][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Trackonomy is for anyone who wants to do more with their money — without doing more work.
            </h2>
            <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
              Your finances. Your future. Tracked beautifully.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-purple-900 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
              >
                Get Started Free
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-xl font-bold hover:border-white/60 transition-colors"
              >
                See How It Works
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    emoji: "🔮",
    title: "Predictive Magic",
    description: "Not just what you spent, but what you might. Powered by real trends."
  },
  {
    emoji: "⚡",
    title: "Real-Time Vibes",
    description: "Get alerts and nudges before things go sideways."
  },
  {
    emoji: "👆",
    title: "One Tap Everything",
    description: "Expenses. Goals. Investments. All in one clean dashboard."
  },
  {
    emoji: "🌎",
    title: "Multi-Currency",
    description: "Travel, transact, and track globally — we've got your back."
  },
  {
    emoji: "🔒",
    title: "Privacy First",
    description: "Military-grade encryption + 2FA + secure cloud. Sleep easy."
  },
  {
    emoji: "🤖",
    title: "AI Insights",
    description: "Personalized recommendations to optimize your finances."
  }
];