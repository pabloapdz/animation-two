'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Card {
  id: number;
  title: string;
  content: string;
  rating: number;
}

interface CardSliderProps {
  autoPlay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  cardsPerView?: number;
  title?: string;
  subtitle?: string;
}

export default function CardSlider({
  autoPlay = true,
  interval = 2500,
  showArrows = true,
  showDots = true,
  cardsPerView = 3,
  title = "TESTIMONIALS",
  subtitle = "Happy clients, trusted results!"
}: CardSliderProps) {
  // Dados dos testimonials diretamente no componente
  const cards: Card[] = [
    {
      id: 1,
      title: "Outstanding Development",
      content: "Working with this developer transformed our digital presence. The attention to detail and modern approach exceeded all expectations. Every interaction feels smooth and purposeful.",
      rating: 5
    },
    {
      id: 2,
      title: "Creative Excellence", 
      content: "The combination of technical expertise and creative vision is remarkable. Our project was delivered on time with innovative solutions that truly set us apart from competitors.",
      rating: 5
    },
    {
      id: 3,
      title: "Professional Results",
      content: "From concept to deployment, every aspect was handled with professionalism. The code quality is exceptional, and the user experience is exactly what we envisioned.",
      rating: 5
    },
    {
      id: 4,
      title: "Innovative Solutions",
      content: "The ability to translate complex ideas into elegant, functional designs is impressive. Our users love the new interface and the performance improvements are significant.",
      rating: 5
    },
    {
      id: 5,
      title: "Reliable Partnership", 
      content: "Communication was clear throughout the project, and deadlines were consistently met. The ongoing support and maintenance have been invaluable to our success.",
      rating: 5
    },
    {
      id: 6,
      title: "Exceptional Quality",
      content: "The level of craftsmanship in both design and development is top-tier. Every detail was considered, resulting in a product that truly represents our brand values.",
      rating: 5
    }
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Criar mais cards duplicados para efeito infinito mais suave
  const extendedCards = [...cards, ...cards, ...cards, ...cards, ...cards];
  const startIndex = cards.length * 2; // Começar mais no meio
  const middleCardIndex = Math.floor(cardsPerView / 2); // Índice do card do meio

  useEffect(() => {
    setCurrentIndex(startIndex);
  }, [startIndex]);

  useEffect(() => {
    if (autoPlay && cards.length > 1) {
      const timer = setInterval(() => {
        if (!isTransitioning) {
          goToNext();
        }
      }, interval);
      return () => clearInterval(timer);
    }
  }, [autoPlay, interval, cards.length, isTransitioning]);

  const goToNext = () => {
    if (isTransitioning) return;
    
    setCurrentIndex(prev => {
      const nextIndex = prev + 1;
      // Reset instantâneo quando chegar próximo ao final
      if (nextIndex >= cards.length * 4) {
        // Reset imediato sem animação
        setTimeout(() => {
          setIsTransitioning(true);
          setCurrentIndex(startIndex + (nextIndex - startIndex) % cards.length);
          setTimeout(() => setIsTransitioning(false), 50);
        }, 0);
        return nextIndex;
      }
      setIsTransitioning(true);
      setTimeout(() => setIsTransitioning(false), 300);
      return nextIndex;
    });
  };

  const goToPrevious = () => {
    if (isTransitioning) return;
    
    setCurrentIndex(prev => {
      const prevIndex = prev - 1;
      // Reset instantâneo quando chegar próximo ao início
      if (prevIndex < cards.length) {
        // Reset imediato sem animação
        setTimeout(() => {
          setIsTransitioning(true);
          setCurrentIndex(startIndex + (prevIndex - startIndex + cards.length) % cards.length);
          setTimeout(() => setIsTransitioning(false), 50);
        }, 0);
        return prevIndex;
      }
      setIsTransitioning(true);
      setTimeout(() => setIsTransitioning(false), 300);
      return prevIndex;
    });
  };

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    setCurrentIndex(startIndex + index);
  };

  if (!cards || cards.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Nenhum card disponível</p>
      </div>
    );
  }

  return (
    <section className="relative py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header Section */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-gray-600 tracking-wide uppercase mb-2">
            {title}
          </p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {subtitle}
          </h2>
          
          {/* Rating Stars */}
          <div className="flex justify-center items-center mb-8">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-6 h-6 text-yellow-400 fill-current"
              />
            ))}
          </div>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-600 mb-4">
              Clients choose to work with me for one simple reason — <strong>I deliver exceptional results</strong>: clean code, beautiful design, and seamless user experiences.
            </p>
            <p className="text-lg text-gray-600">
              Every project is built on collaboration, innovation, and attention to detail — because in web development, <strong>quality is crafted, not promised</strong>.
            </p>
          </div>
        </div>

        {/* Slider Container */}
        <div className="relative py-12">
          <div className="overflow-hidden" style={{ minHeight: '400px' }}>
            <motion.div
              className="flex items-center"
              animate={{
                x: -(currentIndex - middleCardIndex) * 336 // Centralizar o card destacado
              }}
              transition={
                isTransitioning ? {
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  duration: 0.3
                } : {
                  duration: 0 // Sem animação durante reset
                }
              }
              style={{
                width: `${extendedCards.length * 336}px`,
                height: '350px'
              }}
            >
              {extendedCards.map((card, index) => {
                // O card destacado é sempre o que está na posição central visível
                const isHighlighted = index === currentIndex;
                const distanceFromCenter = Math.abs(index - currentIndex);
                const isVisible = distanceFromCenter <= middleCardIndex + 1;
                
                return (
                  <motion.div
                    key={`${card.id}-${Math.floor(index / cards.length)}`}
                    className={`flex-shrink-0 px-4 transition-all duration-500 ${
                      isHighlighted 
                        ? 'transform scale-105 z-10' 
                        : isVisible
                        ? 'transform scale-95 opacity-70'
                        : 'transform scale-90 opacity-40'
                    }`}
                    style={{ width: '340px', height: '50%' }}
                    animate={{
                      scale: isHighlighted ? 1.1 : isVisible ? 0.95 : 0.9,
                      opacity: isHighlighted ? 1 : isVisible ? 0.7 : 0.4,
                      y: isHighlighted ? -20 : 0
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut"
                    }}
                  >
                    <div className={`h-full p-6 rounded-lg shadow-lg transition-all duration-500 flex flex-col justify-between min-h-[280px] ${
                      isHighlighted 
                        ? 'bg-blue-900 text-white border-4 border-blue-600 shadow-2xl' 
                        : 'bg-gray-100 text-gray-900 shadow-md'
                    }`}>
                      {/* Stars for individual card rating */}
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 transition-colors duration-500 ${
                              isHighlighted 
                                ? 'text-yellow-300 fill-current' 
                                : 'text-yellow-400 fill-current'
                            }`}
                          />
                        ))}
                      </div>
                      
                      <p className={`text-base leading-relaxed transition-colors duration-500 ${
                        isHighlighted ? 'text-blue-100' : 'text-gray-700'
                      }`}>
                        {card.content}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          {showArrows && cards.length > 1 && (
            <>
              <motion.button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </motion.button>
              
              <motion.button
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </motion.button>
            </>
          )}
        </div>

        {/* Navigation Dots */}
        {showDots && cards.length > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {cards.map((_, index) => {
              const actualIndex = (currentIndex - startIndex + cards.length) % cards.length;
              return (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    actualIndex === index
                      ? 'bg-blue-600 scale-125 shadow-lg'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-amber-100/15 rounded-full blur-2xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </section>
  );
}