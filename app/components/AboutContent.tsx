"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Registrar o plugin ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AboutContent = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Sequência de aparição das imagens
  const imageSequence = [
    // 1º scroll: 2 imagens (Coluna1Linha3 e Coluna3Linha2)
    { wave: 1, positions: [{ col: 1, row: 3 }, { col: 3, row: 2 }] },
    // 2º scroll: +8 imagens (aleatórias)
    { wave: 2, positions: [
      { col: 2, row: 1 }, { col: 4, row: 1 }, { col: 5, row: 1 },
      { col: 1, row: 2 }, { col: 5, row: 2 }, { col: 2, row: 3 },
      { col: 4, row: 3 }, { col: 1, row: 4 }
    ]},
    // 3º scroll: +5 imagens
    { wave: 3, positions: [
      { col: 1, row: 1 }, { col: 3, row: 1 }, { col: 2, row: 2 },
      { col: 4, row: 2 }, { col: 3, row: 3 }
    ]},
    // 4º scroll: +3 imagens
    { wave: 4, positions: [
      { col: 5, row: 3 }, { col: 2, row: 4 }, { col: 3, row: 4 }
    ]},
    // 5º scroll: +2 imagens
    { wave: 5, positions: [
      { col: 4, row: 4 }, { col: 5, row: 4 }
    ]}
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    const gridContainer = gridContainerRef.current;
    const video = videoRef.current;
    const text = textRef.current;

    if (!section || !grid || !gridContainer) return;

    // Ajustar altura do texto para coincidir com o vídeo
    const adjustTextHeight = () => {
      if (video && text) {
        const videoHeight = video.offsetHeight;
        text.style.height = `${videoHeight}px`;
      }
    };

    // Chamar ajuste inicial e em resize
    adjustTextHeight();
    window.addEventListener('resize', adjustTextHeight);

    // Configurar todas as imagens com estado inicial
    const allImages = grid.querySelectorAll('.grid-image');
    gsap.set(allImages, {
      opacity: 0,
      rotationX: -90,
      y: 100,
      transformOrigin: "center bottom",
    });

    // Criar timeline principal com scroll travado
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: gridContainer,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        pin: grid,
        anticipatePin: 1,
      },
    });

    // Animar cada onda de imagens
    let currentProgress = 0;
    const waveGap = 0.2; // Espaço entre cada onda

    imageSequence.forEach((wave, waveIndex) => {
      wave.positions.forEach((pos, imgIndex) => {
        const imageSelector = `.grid-image[data-col="${pos.col}"][data-row="${pos.row}"]`;
        const startTime = currentProgress + (imgIndex * 0.02); // Pequeno stagger dentro da onda
        
        tl.to(imageSelector, {
          opacity: 1,
          rotationX: 0,
          y: 0,
          duration: 0.15,
          ease: "power2.out",
        }, startTime);
      });
      
      currentProgress += waveGap;
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.removeEventListener('resize', adjustTextHeight);
    };
  }, []);

  // Gerar array de 20 imagens para a grade 5x4
  const images = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <div className="bg-white">
      {/* Seção do vídeo e texto */}
      <section ref={sectionRef} className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start gap-12">
            {/* Vídeo pequeno à esquerda */}
            <div className="w-full lg:w-80 flex-shrink-0">
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto rounded-2xl shadow-2xl"
                onLoadedMetadata={() => {
                  // Ajustar altura do texto quando o vídeo carregar
                  setTimeout(() => {
                    if (videoRef.current && textRef.current) {
                      const videoHeight = videoRef.current.offsetHeight;
                      textRef.current.style.height = `${videoHeight}px`;
                    }
                  }, 100);
                }}
                onError={() => {
                  // Se o vídeo falhar, usar um placeholder
                  if (videoRef.current) {
                    videoRef.current.style.display = 'none';
                    const placeholder = videoRef.current.nextElementSibling as HTMLElement;
                    if (placeholder) {
                      placeholder.style.display = 'flex';
                    }
                  }
                }}
              >
                <source src="/about/about-video.mp4" type="video/mp4" />
                Seu navegador não suporta o elemento de vídeo.
              </video>
              
              {/* Placeholder para quando o vídeo falhar */}
              <div 
                className="w-full aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl flex items-center justify-center relative overflow-hidden"
                style={{ display: 'none' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <p className="text-white/80 text-sm">Video Content</p>
                </div>
              </div>
            </div>

            {/* Texto à direita */}
            <div 
              ref={textRef}
              className="flex-1 flex flex-col justify-center space-y-8 overflow-hidden"
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-900 leading-tight">
                  Crafting Digital Experiences
                </h2>
                <p className="text-lg text-gray-600 leading-7">
                  With expertise in modern web technologies and a passion for clean code, I create digital solutions that combine functionality with beautiful design.
                </p>
              </div>

              <div>
                <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                  Innovation Through Code. Design Through Purpose.
                </h2>
                <p className="text-lg text-gray-600 leading-7">
                  As a Creative Developer, I bridge the gap between design and technology.
                </p>
                <p className="text-lg text-gray-600 leading-7">
                  My approach combines years of development experience with cutting-edge frameworks like React, Next.js, and modern animation libraries, delivering projects that are both visually stunning and technically robust.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  I don't just write code — I craft experiences that engage users and solve real-world problems.
                </p>
              </div>

              <div>
                <h2 className="text-4xl font-bold mb-6 text-gray-900 leading-tight">
                  Quality You Can Trust
                </h2>
                <p className="text-lg text-gray-600 leading-7">
                  Built on a foundation of best practices, accessibility standards, and performance optimization, every project is designed to scale and adapt to future needs.
                </p>
                <p className="text-lg text-gray-600 leading-7">
                  My vision is simple — to create digital solutions that make a meaningful impact through thoughtful design and intelligent development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção da grade de imagens com scroll travado */}
      <section ref={gridContainerRef} className="h-[500vh] relative">
        <div 
          ref={gridRef}
          className="sticky top-0 h-screen w-full overflow-hidden bg-white flex items-center justify-center"
        >
          <div className="grid grid-cols-5 grid-rows-4 gap-4 w-full h-full p-8">
            {images.map((imageNum, index) => {
              const col = (index % 5) + 1;
              const row = Math.floor(index / 5) + 1;
              
              return (
                <div
                  key={imageNum}
                  className="grid-image relative overflow-hidden rounded-lg"
                  data-col={col}
                  data-row={row}
                >
                  <Image
                    src={`/about/${imageNum}.jpg`}
                    alt={`About image ${imageNum}`}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 20vw"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutContent;