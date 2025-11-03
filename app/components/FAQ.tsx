'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus, Minus } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "What services do you offer as a creative developer?",
    answer: "I specialize in full-stack web development, creating modern, responsive websites and applications. My services include frontend development with React/Next.js, backend development with Node.js, UI/UX design, performance optimization, and custom web solutions tailored to your business needs."
  },
  {
    id: 2,
    question: "What technologies do you work with?",
    answer: "I work with modern web technologies including React, Next.js, TypeScript, Node.js, TailwindCSS, Framer Motion for animations, and various databases. I also have experience with cloud platforms like Vercel, AWS, and modern development tools for creating scalable applications."
  },
  {
    id: 3,
    question: "How long does a typical project take?",
    answer: "Project timelines vary depending on complexity and scope. A simple landing page might take 1-2 weeks, while a full web application could take 6-12 weeks. I provide detailed project timelines during our initial consultation and keep you updated throughout the development process."
  },
  {
    id: 4,
    question: "Do you work with clients remotely?",
    answer: "Yes, I work with clients worldwide through remote collaboration. I use modern communication tools and project management platforms to ensure smooth collaboration regardless of location. Regular video calls and progress updates keep everyone aligned throughout the project."
  },
  {
    id: 5,
    question: "What makes your development approach unique?",
    answer: "I combine technical expertise with creative design thinking to deliver solutions that are not only functional but also visually stunning. I focus on performance, user experience, and modern design principles while ensuring clean, maintainable code that scales with your business."
  },
  {
    id: 6,
    question: "Do you provide ongoing support after project completion?",
    answer: "Absolutely! I offer ongoing maintenance and support packages to ensure your website continues to perform optimally. This includes security updates, performance monitoring, content updates, and feature enhancements as your business grows."
  },
  {
    id: 7,
    question: "Can you help with existing projects or only new ones?",
    answer: "I work on both new projects and existing ones. Whether you need to modernize an outdated website, add new features to an existing application, fix bugs, or improve performance, I can help enhance your current digital presence."
  },
  {
    id: 8,
    question: "What is your development process like?",
    answer: "My process includes discovery and planning, design mockups and prototyping, development with regular check-ins, testing and optimization, deployment, and post-launch support. I believe in transparent communication and collaborative development throughout the entire process."
  },
  {
    id: 9,
    question: "How do you ensure project quality and deadlines?",
    answer: "I use modern development practices including version control, automated testing, code reviews, and agile methodologies. Regular communication, milestone tracking, and quality assurance testing ensure that projects are delivered on time and meet the highest standards."
  }
];

interface FAQProps {
  className?: string;
}

export default function FAQ({ className = "" }: FAQProps) {
  const [openItems, setOpenItems] = useState<number[]>([1]); // First item open by default

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section className={`py-16 px-4 max-w-4xl mx-auto ${className}`}>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions about my development services and process.
        </p>
      </div>

      <div className="space-y-4">
        {faqData.map((item) => {
          const isOpen = openItems.includes(item.id);
          
          return (
            <motion.div
              key={item.id}
              className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
              initial={false}
            >
              <motion.button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-inset"
                onClick={() => toggleItem(item.id)}
                whileHover={{ backgroundColor: "rgb(249 250 251)" }}
                whileTap={{ scale: 0.995 }}
              >
                <span className="text-lg font-semibold text-gray-900 pr-4">
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex-shrink-0"
                >
                  {isOpen ? (
                    <Minus className="w-5 h-5 text-green-600" />
                  ) : (
                    <Plus className="w-5 h-5 text-green-600" />
                  )}
                </motion.div>
              </motion.button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: "auto", 
                      opacity: 1,
                      transition: {
                        height: { duration: 0.4, ease: "easeInOut" },
                        opacity: { duration: 0.3, delay: 0.1 }
                      }
                    }}
                    exit={{ 
                      height: 0, 
                      opacity: 0,
                      transition: {
                        height: { duration: 0.3, ease: "easeInOut" },
                        opacity: { duration: 0.2 }
                      }
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 pt-2 border-t border-gray-100">
                      <motion.p
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ 
                          y: 0, 
                          opacity: 1,
                          transition: { delay: 0.2, duration: 0.3 }
                        }}
                        exit={{ y: -10, opacity: 0 }}
                        className="text-gray-700 leading-relaxed"
                      >
                        {item.answer}
                      </motion.p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}