import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

export default function AboutPage() {
  const ref = useRef();
  const { scrollYProgress } = useScroll({ target: ref });
  const [hoveredTeam, setHoveredTeam] = useState(null);

  // Animated background gradient
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.8], [0.2, 0.8]);

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 overflow-hidden">
      {/* === DYNAMIC GRADIENT BACKGROUND === */}
      <motion.div
        className="fixed inset-0 opacity-20 pointer-events-none"
        style={{
          background: `
            radial-gradient(at 71% 77%, #7E22CE, transparent 50%),
            radial-gradient(at 29% 36%, #3B82F6, transparent 50%)
          `,
          opacity: backgroundOpacity,
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      />

      {/* === HERO === */}
      <motion.section 
        className="relative h-screen flex items-center justify-center px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Our <span className="text-indigo-700">Story</span>
          </motion.h1>
          
          <motion.p
            className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Born from a frustration with clunky finance apps, Trackonomy uses <span className="font-semibold text-purple-600">AI</span> to make money management <span className="font-semibold text-blue-600">effortless</span>.
          </motion.p>

          {/* Floating financial icons */}
          <AnimatePresence>
            {[["💰", -100, 20], ["📈", 100, -30], ["🤖", 0, 80]].map(([icon, x, y], i) => (
              <motion.div
                key={i}
                className="absolute text-4xl"
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{
                  x,
                  y,
                  opacity: 1,
                  rotate: [0, 15, -15, 0],
                }}
                transition={{
                  delay: i * 0.3,
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                style={{
                  left: `${50 + (i - 1) * 15}%`,
                  top: "50%",
                }}
              >
                {icon}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="text-sm text-gray-500 mb-2">Scroll to explore</p>
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center p-1">
            <motion.div
              className="w-1 h-2 bg-gray-500 rounded-full"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* === TIMELINE === */}
      <section className="relative py-20 px-6 max-w-4xl mx-auto" ref={ref}>
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Our Journey
        </h2>

        {/* Progress line */}
        <motion.div
          className="absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-purple-500 to-blue-500 transform -translate-x-1/2"
          style={{ scaleY: scrollYProgress }}
        />

        {timeline.map((item, i) => (
          <motion.div
            key={i}
            className="relative mb-20 last:mb-0"
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            {/* Dot connector */}
            <div className={`absolute top-8 ${i % 2 === 0 ? "right-0" : "left-0"} transform ${i % 2 === 0 ? "translate-x-7" : "-translate-x-7"} w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 z-10`} />

            {/* Card */}
            <div className={`bg-white p-8 rounded-2xl shadow-xl border border-gray-100 ${i % 2 === 0 ? "mr-16" : "ml-16"}`}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xl mr-4">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800">{item.year}</h3>
              </div>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* === TEAM === */}
      <section className="py-20 bg-gradient-to-b from-white to-indigo-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Meet the Brains
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={i}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                onHoverStart={() => setHoveredTeam(i)}
                onHoverEnd={() => setHoveredTeam(null)}
              >
                <motion.div
                  className="bg-white p-6 rounded-2xl shadow-lg border border-white border-opacity-20 overflow-hidden"
                  whileHover={{ y: -10 }}
                  style={{
                    rotateX: hoveredTeam === i ? 5 : 0,
                    rotateY: hoveredTeam === i ? -5 : 0,
                  }}
                >
                  <div className="relative mb-6">
                    <div className="w-full h-48 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl overflow-hidden">
                      {/* Placeholder for team photo */}
                      <div className="w-full h-full flex items-center justify-center text-4xl">
                        👨‍💻
                      </div>
                    </div>
                    {/* Pulse animation on hover */}
                    {hoveredTeam === i && (
                      <motion.div
                        className="absolute inset-0 border-2 border-purple-400 rounded-xl"
                        initial={{ scale: 1, opacity: 0.7 }}
                        animate={{ scale: 1.1, opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                  <p className="text-purple-600 mb-2">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === VALUES === */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Our Core Values
          </motion.h2>

          <motion.div
            className="flex overflow-x-auto pb-8 -mx-6 px-6"
            drag="x"
            dragConstraints={{ right: 0, left: -1000 }}
            whileTap={{ cursor: "grabbing" }}
          >
            <div className="flex space-x-6">
              {values.map((value, i) => (
                <motion.div
                  key={i}
                  className="flex-shrink-0 w-80 bg-gradient-to-br from-white to-indigo-50 p-8 rounded-2xl shadow-lg border border-white border-opacity-20"
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="w-16 h-16 mb-6 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white text-2xl">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Auto-scroll hint */}
        <motion.div
          className="text-center mt-8 text-gray-500 flex justify-center"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
          </svg>
          Drag to explore
        </motion.div>
      </section>

      {/* === CTA === */}
      <section className="py-32 relative">
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating particles */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-purple-400 to-blue-400"
              initial={{
                x: Math.random() * 100,
                y: Math.random() * 100,
                width: Math.random() * 10 + 5,
                height: Math.random() * 10 + 5,
                opacity: Math.random() * 0.5 + 0.1,
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                x: [0, Math.random() * 100 - 50],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        <div className="max-w-2xl mx-auto text-center relative z-10 px-6">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-8 text-gray-800"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Ready to Transform Your Finances?
          </motion.h2>
          
          <motion.button
            className="px-10 py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold text-lg shadow-xl relative overflow-hidden group"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="relative z-10">Join Trackonomy Now</span>
            {/* Magnetic hover effect */}
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 rounded-xl"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </motion.button>
        </div>
      </section>
    </div>
  );
}

// Data
const timeline = [
  {
    year: "2021",
    icon: "💡",
    description: "Founded in a garage with a vision to democratize financial intelligence through AI."
  },
  {
    year: "2022",
    icon: "🚀",
    description: "Launched our MVP and gained 10,000 users in the first 3 months."
  },
  {
    year: "2023",
    icon: "🤖",
    description: "Integrated predictive AI that saves users an average of $500/month."
  },
  {
    year: "2024",
    icon: "🌎",
    description: "Expanded globally with multi-currency support and 1M+ users."
  }
];

const team = [
  {
    name: "Aryan",
    role: "CEO & Founder",
    bio: "Ex-Google AI researcher obsessed with personal finance."
  },
  {
    name: "Anshuman",
    role: "Head of Product",
    bio: "Built 3 fintech apps used by millions."
  },
  {
    name: "Aakhya",
    role: "AI Architect",
    bio: "Makes neural networks predict market trends."
  }
];

const values = [
  {
    icon: "🔍",
    title: "Radical Transparency",
    description: "No hidden fees, no jargon—just clear insights."
  },
  {
    icon: "🧠",
    title: "AI for Good",
    description: "We use tech to empower, not exploit."
  },
  {
    icon: "🚀",
    title: "Relentless Innovation",
    description: "If it doesn’t exist, we’ll build it."
  },
  {
    icon: "❤️",
    title: "User Love",
    description: "We treat every user like family."
  },
  {
    icon: "🌱",
    title: "Sustainable Growth",
    description: "Grow your wealth without harming the planet."
  }
];