"use client";
import { motion } from "framer-motion";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 30, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const creativeText = "Creative";
  const developerText = "Developer";

  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white">
      {/* Subtle floating objects */}
      <motion.div
        animate={{
          y: [-20, 20, -20],
          x: [-10, 10, -10],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse",
        }}
        className="absolute top-20 left-20 h-3 w-3 rounded-full bg-blue-500/20"
      />
      <motion.div
        animate={{
          y: [-15, 25, -15],
          x: [-8, 12, -8],
          rotate: [0, -3, 3, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse",
          delay: 1,
        }}
        className="absolute top-40 right-32 h-2 w-2 rounded-full bg-purple-500/30"
      />
      <motion.div
        animate={{
          y: [-25, 15, -25],
          x: [-12, 8, -12],
          rotate: [0, 8, -8, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse",
          delay: 2,
        }}
        className="absolute bottom-32 left-1/4 h-4 w-4 rounded-full bg-indigo-500/20"
      />
      <motion.div
        animate={{
          y: [-18, 22, -18],
          x: [-6, 14, -6],
          rotate: [0, -6, 6, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse",
          delay: 3,
        }}
        className="absolute bottom-20 right-20 h-2 w-2 rounded-full bg-pink-500/25"
      />
      
      {/* Geometric shapes */}
      <motion.div
        animate={{
          y: [-10, 15, -10],
          x: [-5, 8, -5],
          rotate: [45, 50, 40, 45],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse",
          delay: 0.5,
        }}
        className="absolute top-1/4 right-1/4 h-8 w-8 rotate-45 border border-gray-200"
      />
      <motion.div
        animate={{
          y: [-12, 18, -12],
          x: [-7, 10, -7],
          rotate: [12, 18, 6, 12],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse",
          delay: 1.5,
        }}
        className="absolute bottom-1/3 left-1/4 h-6 w-6 rotate-12 border border-gray-300"
      />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-6xl px-6 text-center"
      >
        <motion.div variants={wordVariants} className="mb-8">
          <span className="inline-flex items-center rounded-full bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 ring-1 ring-gray-200">
            ✨ Full Stack Developer
          </span>
        </motion.div>

        <div className="space-y-4">
          <motion.div
            variants={titleVariants}
            className="text-6xl font-bold tracking-tight text-gray-900 sm:text-7xl lg:text-8xl"
          >
            <motion.div className="flex justify-center">
              {creativeText.split("").map((letter, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  transition={{ delay: index * 0.1 }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={titleVariants}
            className="text-6xl font-bold tracking-tight sm:text-7xl lg:text-8xl"
          >
            <motion.div className="flex justify-center">
              {developerText.split("").map((letter, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  transition={{ delay: (creativeText.length * 0.1) + (index * 0.1) + 0.3 }}
                  className="relative inline-block"
                >
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    {letter}
                  </span>
                  {index === developerText.length - 1 && (
                    <motion.div
                      className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ 
                        duration: 1.5, 
                        delay: (creativeText.length * 0.1) + (developerText.length * 0.1) + 0.8 
                      }}
                    />
                  )}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.p
          variants={wordVariants}
          className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-gray-600"
        >
          Crafting digital experiences that blend creativity with cutting-edge technology. 
          Specialized in React, Next.js, and animations that captivate users.
        </motion.p>

        <motion.div 
          variants={wordVariants}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gray-900 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl"
          >
            <span className="relative z-10">View My Work</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              whileHover={{ scale: 1.1 }}
            />
          </motion.a>
          
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center justify-center rounded-full border-2 border-gray-300 bg-white px-8 py-4 text-lg font-semibold text-gray-700 transition-all duration-300 hover:border-gray-400 hover:bg-gray-50"
          >
            <span>Let's Connect</span>
            <motion.svg
              className="ml-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </motion.a>
        </motion.div>

        <motion.div
          variants={wordVariants}
          className="mt-16 flex flex-col items-center justify-center space-y-4 opacity-60 sm:flex-row sm:space-x-8 sm:space-y-0"
        >
          <div className="text-sm font-medium text-gray-500">Technologies I master:</div>
          <div className="flex flex-wrap justify-center gap-4">
            {["React", "Next.js", "TypeScript", "Tailwind", "Node.js", "Python"].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.5 + index * 0.1 }}
                whileHover={{ scale: 1.1, color: "#3b82f6" }}
                className="text-sm font-medium text-gray-600 transition-colors duration-200"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center space-y-2"
        >
          <span className="text-sm text-gray-500">Scroll down</span>
          <motion.svg 
            className="h-6 w-6 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            whileHover={{ scale: 1.2 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </motion.svg>
        </motion.div>
      </motion.div>
    </section>
  );
}