"use client";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface Section {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  cards: {
    id: number;
    title: string;
    description: string;
    icon: string;
  }[];
}

const sections: Section[] = [
  {
    id: "proven-expertise",
    title: "Proven Expertise",
    subtitle: "01",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc",
    cards: []
  },
  {
    id: "robotic-precision",
    title: "Robotic Precision",
    subtitle: "02",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc.",
    cards: []
  },
  {
    id: "quality-assurance",
    title: "Quality Without Compromise",
    subtitle: "03",
    description: "Each product undergoes multiple levels of quality inspection, hydro-testing, and certification under strict performance standards. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    cards: []
  },
  {
    id: "sustainable-solutions",
    title: "Smarter, Sustainable Solutions",
    subtitle: "04",
    description: "Our systems are designed to save material waste, labor effort, and on-site time, contributing to more sustainable construction practices. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    cards: [
      { id: 13, title: "Material Efficiency", description: "Reduced waste and optimization", icon: "♻️" },
      { id: 14, title: "Time Savings", description: "Faster installation processes", icon: "⏱️" },
      { id: 15, title: "Labor Optimization", description: "Efficient workforce utilization", icon: "👥" },
      { id: 16, title: "Green Building", description: "Sustainable construction practices", icon: "🌱" },
    ]
  }
];

export default function ScrollSection() {
  const [activeSection, setActiveSection] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const currentSection = sections[activeSection];
  const isLastSection = activeSection === sections.length - 1;

  // Auto-rotate cards
  useEffect(() => {
    const interval = setInterval(() => {
      const lastSection = sections[sections.length - 1];
      if (lastSection?.cards && lastSection.cards.length > 0) {
        setCurrentCardIndex((prev) => (prev + 1) % lastSection.cards.length);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [sections]);

  // Track scroll position and update active section
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const containerTop = containerRef.current.offsetTop;
      const scrollPosition = window.scrollY - containerTop + window.innerHeight / 2;

      sectionRefs.current.forEach((ref, index) => {
        if (ref) {
          const sectionTop = ref.offsetTop;
          const sectionHeight = ref.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    const section = sectionRefs.current[index];
    if (section && containerRef.current) {
      const containerTop = containerRef.current.offsetTop;
      const sectionTop = section.offsetTop + containerTop;
      window.scrollTo({
        top: sectionTop - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section ref={containerRef} className="relative min-h-screen bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Navigation Menu */}
          <div className="col-span-3 sticky top-32 h-fit">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Why Choose<br />
                <span className="text-blue-600">Bofpipes Tech Pvt. Ltd.</span>
              </h2>
              
              <nav className="space-y-2">
                {sections.map((section, index) => (
                  <motion.button
                    key={section.id}
                    onClick={() => scrollToSection(index)}
                    className={`flex items-center w-full text-left p-3 rounded-lg transition-all duration-300 ${
                      activeSection === index 
                        ? 'bg-blue-50 border-l-4 border-blue-600' 
                        : 'hover:bg-gray-50'
                    }`}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3">
                      <motion.div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          activeSection === index
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                        animate={{
                          scale: activeSection === index ? 1.1 : 1,
                          backgroundColor: activeSection === index ? '#2563eb' : '#e5e7eb'
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {section.subtitle}
                      </motion.div>
                      <span className={`text-sm font-medium ${
                        activeSection === index ? 'text-blue-900' : 'text-gray-700'
                      }`}>
                        {section.title}
                      </span>
                    </div>
                    {activeSection === index && (
                      <motion.div
                        className="ml-auto w-2 h-2 bg-blue-600 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.button>
                ))}
              </nav>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="col-span-9">
            <div className="space-y-16">
              {sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  ref={(el) => {
                    sectionRefs.current[index] = el;
                  }}
                  className="py-8"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <div className="mb-12">
                    <motion.div
                      className="flex items-center space-x-4 mb-6"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <span className="text-6xl font-bold text-blue-600/20">
                        {section.subtitle}
                      </span>
                      <h3 className="text-3xl font-bold text-gray-900">
                        {section.title}
                      </h3>
                    </motion.div>
                    
                    <motion.p
                      className="text-lg text-gray-600 max-w-2xl leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      {section.description}
                    </motion.p>
                  </div>

                  {/* Animated Cards Section - Only for last section */}
                  {index === sections.length - 1 && section.cards && section.cards.length > 0 && (
                    <motion.div
                      className="relative"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="relative w-full overflow-hidden">
                        <motion.div 
                          className="flex space-x-6"
                          animate={{ 
                            x: -currentCardIndex * 336 // 320px width + 16px gap
                          }}
                          transition={{ 
                            duration: 0.6,
                            ease: "easeInOut"
                          }}
                        >
                          {section.cards.map((card, cardIndex) => (
                            <motion.div
                              key={card.id}
                              className="flex-shrink-0 w-80 p-6 rounded-xl border bg-white text-gray-900 border-gray-200 hover:border-gray-300 relative overflow-hidden"
                              animate={{ 
                                scale: cardIndex === (currentCardIndex + 1) % section.cards.length ? 1.05 : 1
                              }}
                              transition={{ 
                                duration: 0.6,
                                ease: "easeInOut"
                              }}
                              whileHover={{ 
                                y: cardIndex !== (currentCardIndex + 1) % section.cards.length ? -5 : 0,
                                transition: { duration: 0.2 }
                              }}
                            >
                            {/* Blue background overlay with fade effect - only for highlighted card */}
                            {cardIndex === (currentCardIndex + 1) % section.cards.length && (
                              <motion.div
                                className="absolute inset-0 bg-blue-600 rounded-xl"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ 
                                  duration: 0.8,
                                  ease: "easeInOut"
                                }}
                              />
                            )}
                            
                            {/* Content */}
                            <div className={`relative z-10 ${cardIndex === (currentCardIndex + 1) % section.cards.length ? 'text-white' : 'text-gray-900'}`}>
                              <div className="text-4xl mb-4">{card.icon}</div>
                              <h4 className="text-xl font-semibold mb-3">
                                {card.title}
                              </h4>
                              <p className={`text-sm leading-relaxed ${
                                cardIndex === (currentCardIndex + 1) % section.cards.length ? 'text-blue-100' : 'text-gray-600'
                              }`}>
                                {card.description}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>

                      {/* Card Navigation Dots */}
                      <div className="flex justify-center space-x-2 mt-8">
                        {section.cards.map((_, index) => (
                          <motion.button
                            key={index}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                              index === currentCardIndex 
                                ? 'bg-blue-600 scale-125' 
                                : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                            onClick={() => setCurrentCardIndex(index)}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-amber-100/20 rounded-full blur-2xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </section>
  );
}