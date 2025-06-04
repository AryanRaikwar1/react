import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

export default function Homepage() {
  const ref = useRef();
  const { scrollYProgress } = useScroll({ target: ref });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);

  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 overflow-x-hidden">
      {/* === HERO === */}
      <motion.section 
        className="relative h-screen flex items-center justify-center px-6"
        style={{ opacity, scale }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Take Control of Your <span className="text-indigo-700">Money</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Trackonomy uses <span className="font-semibold text-purple-600">AI predictions</span> to optimize your spending, savings, and investments.
          </motion.p>

          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all">
              Get Started — It's Free
            </button>
          </motion.div>
        </div>

        {/* AI Assistant Floating Bubble */}
        <motion.div 
          className="absolute bottom-10 right-10 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer"
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          whileHover={{ scale: 1.1 }}
        >
          <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl">🤖</span>
          </div>
        </motion.div>
      </motion.section>

      {/* === AI PREDICTION DASHBOARD === */}
      <section className="py-20 px-6 bg-white/80 backdrop-blur-lg rounded-t-3xl -mt-20 relative z-10">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            AI-Powered Financial Insights
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-indigo-100 to-purple-100 p-8 rounded-2xl shadow-lg border border-white"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Monthly Trends</h3>
              <div className="h-64 bg-white rounded-xl relative overflow-hidden">
                {/* Animated Bar Graph */}
                {[30, 60, 45, 80, 55].map((height, i) => (
                  <motion.div
                    key={i}
                    className="absolute bottom-0 bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg"
                    style={{
                      width: "12%",
                      left: `${20 + i * 16}%`,
                      height: "0%"
                    }}
                    animate={{ height: `${height}%` }}
                    transition={{ 
                      delay: i * 0.1,
                      type: "spring",
                      damping: 10
                    }}
                  />
                ))}
              </div>
            </motion.div>

            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">AI Predictions</h3>
              <p className="text-gray-600 mb-6">
                Trackonomy learns your habits to forecast future spending, detect anomalies, and suggest optimizations.
              </p>
              
              <motion.div
                className="flex space-x-4 mb-8"
                initial={{ x: -20 }}
                whileInView={{ x: 0 }}
                transition={{ type: "spring" }}
              >
                {["Spending", "Savings", "Investments"].map((item, i) => (
                  <motion.div
                    key={i}
                    className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
                    whileHover={{ scale: 1.05 }}
                  >
                    {item}
                  </motion.div>
                ))}
              </motion.div>

              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold shadow-md"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                See All Predictions →
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* === FEATURES GRID === */}
      <section className="py-20 bg-gradient-to-b from-white to-indigo-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Why Trackonomy?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="bg-white p-8 rounded-2xl shadow-lg border border-white border-opacity-20 relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                onHoverStart={() => setHoveredCard(i)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <div className="w-16 h-16 mb-6 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 text-2xl">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
                
                {/* Hover Gradient Overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0"
                  animate={{ 
                    opacity: hoveredCard === i ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === CTA === */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 -rotate-3 scale-110"></div>
        
        <motion.div 
          className="max-w-4xl mx-auto text-center relative z-10 px-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800">
            Ready to Transform Your Finances?
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Join <span className="font-bold text-purple-600">10,000+</span> users who save an average of <span className="font-bold text-blue-600">$500/month</span> with Trackonomy.
          </p>
          
          <motion.button
            className="px-10 py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold text-lg shadow-xl relative overflow-hidden"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="relative z-10">Start Free Trial</span>
            {/* Button Shimmer Effect */}
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}

const features = [
  {
    icon: "📊",
    title: "AI-Powered Analytics",
    desc: "Get personalized spending insights and forecasts."
  },
  {
    icon: "🔮",
    title: "Future Prediction",
    desc: "See where your finances are headed with 90% accuracy."
  },
  {
    icon: "💸",
    title: "Auto-Savings",
    desc: "Let AI optimize your savings without thinking."
  }
];